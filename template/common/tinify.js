const { spawn } = require("child_process"),
  path = require("path"),
  tinify = require("tinify"),
  ls = spawn("git", ["status"]),
  keys = ["<%= options.tinifyKey %>"];
let index = 0;
tinify.key = keys[index];

const validateCallback = list => function(err){
  if(err){
    // eslint-disable-next-line no-console
    console.log("tinify validate defeated,Key:", keys[index]);
    index++;
    if(index > keys.length){
      throw err;
    }
    else {
      tinify.key = keys[index];
      // eslint-disable-next-line no-console
      console.log("tinify changed Key:", keys[index]);
      tinify.validate(validateCallback(list));
    }
  }
  else {
    list.map(async item => {
      const p = path.join(__dirname, item);
      // eslint-disable-next-line no-console
      console.log("开始压缩文件", p);
      const back = await tinify.fromFile(p).toFile(p);
      // eslint-disable-next-line no-console
      console.log("完成压缩返回", p, back);
      spawn("git", ["add", p]);
    });
  }
};

ls.stdout.on("data", data => {
  /**
   * 被添加的文件
   * 新文件:   \u65b0\u6587\u4ef6\uff1a
   * 修改:     \u4fee\u6539\uff1a
  */
  const list = data.toString().split("git add")[0]
    .match(/(?<=((new file:|modified:|\u65b0\u6587\u4ef6\uff1a|\u4fee\u6539\uff1a)+[ ]*))\w+.*(jpg|png)+/gi) || [];
  // eslint-disable-next-line no-console
  console.log("list:", list);
  if(list.length > 0){
    tinify.validate(validateCallback(list));
  }
});

ls.stderr.on("data", data => {
  // eslint-disable-next-line no-console
  console.log(`stderr: ${data}`);
});