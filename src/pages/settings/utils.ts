export const resetApp = (callback?: () => void) => {
  localStorage.clear();
  sessionStorage.clear();
  callback && callback();
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
