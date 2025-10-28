import data from "../../src/data/data.json";

function filterProducts(products, minPrice, maxPrice, category) {
  return products.filter((product) => {
    const price = product.price;
    return (
      price >= minPrice &&
      price <= maxPrice &&
      (category === "all" || product.category.slug === category)
    );
  });
}

function sortProducts(products, sortBy) {
  switch (sortBy) {
    case "lowest":
      return products.toSorted((a, b) => a.price - b.price);
    case "highest":
      return products.toSorted((a, b) => b.price - a.price);
    case "name":
      return products.toSorted((a, b) => a.title.localeCompare(b.title));
    default:
      return products;
  }
}

export function onRequestGet(request) {
  let products = data;
  const itemsPerPage = 20;
  const params = new URL(request.request.url).searchParams;
  const page = params.get("page") || 1;
  const minPrice = parseInt(params.get("min"));
  const maxPrice = parseInt(params.get("max"));
  const category = params.get("category");
  const sort = params.get("sortBy");
  if (minPrice > 0 || maxPrice < 1000 || category !== "all") {
    products = filterProducts(products, minPrice, maxPrice, category);
  }
  if (sort !== "category") {
    products = sortProducts(products, sort);
  }
  const startingIndex = page * itemsPerPage - itemsPerPage;
  const response = {
    products: products.slice(startingIndex, startingIndex + itemsPerPage),
    info: { pages: Math.ceil(products.length / itemsPerPage) },
  };

  return Response.json(response);
}
