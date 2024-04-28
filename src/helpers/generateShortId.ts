export const generateShortId = (length = 6) => {
  const base64String =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * base64String.length);
    shortId += base64String[randomIndex];
  }
  return shortId;
};
