export const getMiniProgramInfo = function(){
  const data = uni.getAccountInfoSync();
  return data.miniProgram;
};