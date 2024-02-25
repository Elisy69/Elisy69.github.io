import { ref } from "vue";
import { getTotalPages } from "../helpers/getTotalPages";
import { getSlicedProducts } from "../helpers/getSlicedProducts";
import { getOffset } from "../helpers/getOffset";
import { KEY, LIMIT, URL } from "../constants/constList";

const productsHeaders = new Headers({
  "Content-Type": "application/json",
  "X-Auth": KEY,
});
const products = ref(null);
const currentPage = ref(null);
const totalPages = ref(null);
const isLoading = ref(false);
const errorStatus = ref(false);
const filterParam = ref(null);
const filterValue = ref(null);
const totalFilteredProducts = ref(null);
const filteredProducts = ref(null);

const fetchData = async (action, params) => {
  try {
    const body = { action, params };
    console.log("REQUEST BODY", body);
    const res = await fetch(URL, {
      method: "POST",
      headers: productsHeaders,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log("RESPONSE DATA", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    errorStatus.value = error;
    throw error;
  }
};

const processItems = (items) => {
  const uniqueSetOfItems = new Set(items.result.map((i) => i.id));
  return Array.from(uniqueSetOfItems, (id) =>
    items.result.find((i) => i.id === id)
  );
};

const updateState = (page, data) => {
  currentPage.value = page || 1;
  totalPages.value = getTotalPages(data.size);
  products.value = data.items;
  isLoading.value = false;
};

export function useSearch() {
  const getProducts = async (page) => {
    try {
      isLoading.value = true;
      const action = "get_ids";
      const params = { offset: getOffset(page), limit: LIMIT };
      const allIds = await fetchData(action);
      const ids = await fetchData(action, params);
      const items = await fetchData("get_items", { ids: ids.result });

      const totalUniqueIdsCount = new Set(allIds.result);
      const uniqueArrayOfItems = processItems(items);

      updateState(page, {
        size: totalUniqueIdsCount.size,
        items: uniqueArrayOfItems,
      });
    } catch (error) {
      errorStatus.value = error;
    }
    console.log(
      "TOTAL PAGES",
      totalPages.value,
      "CURRENT PAGE",
      currentPage.value,
      "offset",
      getOffset(page),
      "OUTPUT DATA",
      products.value
    );
  };

  const getFilteredProducts = async (page) => {
    try {
      isLoading.value = true;
      products.value = null;
      const action = "filter";
      const params = { [filterParam.value]: filterValue.value };

      const ids = await fetchData(action, params);
      const items = await fetchData("get_items", { ids: ids.result });

      const totalUniqueIdsCount = new Set(ids.result);
      const uniqueArrayOfItems = processItems(items);

      currentPage.value = page || 1;
      totalPages.value = getTotalPages(totalUniqueIdsCount.size);
      totalFilteredProducts.value = uniqueArrayOfItems;
      filteredProducts.value = getSlicedProducts(
        page,
        totalFilteredProducts.value
      );
      isLoading.value = false;

      console.log(
        "TOTAL PAGES",
        totalPages.value,
        "CURRENT PAGE",
        currentPage.value,
        "offset",
        getOffset(page),
        "OUTPUT DATA",
        filteredProducts.value
      );
    } catch (error) {
      errorStatus.value = error;
    }
  };

  return {
    getProducts,
    getFilteredProducts,
    products,
    totalPages,
    currentPage,
    isLoading,
    errorStatus,
    filterParam,
    filterValue,
    totalFilteredProducts,
    filteredProducts,
  };
}
