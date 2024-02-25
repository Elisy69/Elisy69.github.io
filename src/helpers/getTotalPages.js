export const getTotalPages = (maxItemsAvailable) => {
  return Math.ceil(maxItemsAvailable / 50);
};
