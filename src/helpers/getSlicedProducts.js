import { LIMIT } from "../constants/constList";
export const getSlicedProducts = (page, productArray) => {
  let start = page === 1 ? 0 : (page - 1) * LIMIT;
  let end = page * LIMIT;

  return productArray.slice(start, end);
};
