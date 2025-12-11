const pictureCache = new Map();
const placeholder =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fsteam-question-mark-icon%2Fsteam-question-mark-icon-29.jpg&f=1&nofb=1&ipt=d2906203a69b0fa4b03f2ae3eca26315d9f941598094207631629571cded2972";

export default function getReadyPicture(picture) {
  if (pictureCache.has(picture?.[0]?.data)) {
    const blob = pictureCache.get(picture?.[0]?.data);

    return URL.createObjectURL(blob);
  }

  const blob = picture?.[0]?.data
    ? new Blob([picture[0].data], { type: picture[0].format })
    : null;

  if (blob) {
    pictureCache.set(picture?.[0]?.data, blob);
    return URL.createObjectURL(blob);
  }

  return placeholder;
}
