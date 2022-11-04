const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(function () {
      resolve(true);
    }, time);
  });

export default wait;
