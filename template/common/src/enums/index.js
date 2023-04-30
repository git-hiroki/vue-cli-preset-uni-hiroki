/**
 * @desc 枚举工具
 * @param {Object/Number} words 枚举值
 * 可传入:
 * 1、数字或纯数字组成的字符串
 * 2、枚举值
 * 3、不传任何值(此时返回整个maps)
 * @param {String} key 枚举对象中的字段名称
 * @param {Object} maps 枚举对象
 * @returns {Object/String} 根据条件,返回不同结果
*/

export default (words, key, maps) => {
  let result;

  if(words || 0 === words){
    if(isNaN(words)){
      result = maps[words];
    }
    else {
      result = Object.values(maps).find(item => words == item.enum);
    }
    result = result[key];
  }
  else {
    if("text" == key){
      result = null;
    }
    else {
      result = maps;
    }
  }

  return result;
};