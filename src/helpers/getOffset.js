import { LIMIT } from "../constants/constList";
export const getOffset = (page) => {
  return page === 1 || !page ? 0 : page * LIMIT;
};
