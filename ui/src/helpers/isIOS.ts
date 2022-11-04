const isIOS = () => {
  if (/ip(hone|od)|ipad/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
};

export default isIOS;
