export default (longArr, row = 3) => {
  const result = [];
  for(let i = 0, len = longArr.length; i < len; i += row){
    const item = longArr.slice(i, i + row);
    result.push(item);
  }
  return result;
};