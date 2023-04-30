export const getPrev = function(){
  const
    currentPages = getCurrentPages(),
    prevPage = currentPages[currentPages.length - 2];
  return prevPage;
};