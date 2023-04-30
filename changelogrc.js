const compareFunc = require("compare-func");
module.exports = {
  writerOpts: {
    // eslint-disable-next-line complexity, max-lines-per-function
    transform: (commit, context) => {
      let discard = true;
      const issues = [];

      commit.notes.forEach(note => {
        note.title = "BREAKING CHANGES";
        discard = false;
      });
      if("feat" === commit.type){
        commit.type = "✨ 新功能";
      }
      else if("fix" === commit.type){
        commit.type = "⚙️ Bug 修复";
      }
      else if("docs" === commit.type){
        commit.type = "📝 文档";
      }
      else if("style" === commit.type){
        commit.type = "📐 代码风格";
      }
      else if("refactor" === commit.type){
        commit.type = "⚒️ 重构";
      }
      else if("test" === commit.type){
        commit.type = "🕹️ 测试用例";
      }
      else if("chore" === commit.type){
        commit.type = "👷‍ 构建过程";
      }
      else if("perf" === commit.type){
        commit.type = "⚡ 性能优化";
      }
      else if("revert" === commit.type || commit.revert){
        commit.type = "↪️ 回退";
      }

      if("*" === commit.scope){
        commit.scope = "";
      }
      if("string" === typeof commit.hash){
        commit.hash = commit.hash.substring(0, 7);
      }
      if("string" === typeof commit.subject){
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl;
        if(url){
          url = `${url}/issues/`;
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue);
            return `[#${issue}](${url}${issue})`;
          });
        }
        if(context.host){
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if(username.includes("/")){
              return `@${username}`;
            }

            return `[@${username}](${context.host}/${username})`;
          });
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if(-1 === issues.indexOf(reference.issue)){
          return true;
        }

        return false;
      });
      return commit;
    },
    groupBy: "type",
    commitGroupsSort: "title",
    commitsSort: ["scope", "subject"],
    noteGroupsSort: "title",
    notesSort: compareFunc
  }
};