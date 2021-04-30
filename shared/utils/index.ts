export const wait = async (ms = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
