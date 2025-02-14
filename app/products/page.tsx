import ProductsView from "./ProductsView";

export default async function Page() {
  const products = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          fetch("https://fakestoreapi.com/products").then((res) => res.json())
        ),
      500
    )
  );
  return (
    <div className="m-20  justify-center">
      <ProductsView products={products} />
    </div>
  );
}
