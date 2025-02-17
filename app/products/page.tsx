import { SanityDocument } from "next-sanity";
import ProductsView from "./ProductsView";
import { client } from "../sanity/client";

export default async function Page() {
  const PRODUCTS_QUERY = `*[_type == "product"]`;
  const options = { next: { revalidate: 3 } };
  const Products = await client.fetch<SanityDocument[]>(
    PRODUCTS_QUERY,
    {},
    options
  );

  console.log(Products);
  return (
    <div className="m-20  justify-center">
      <ProductsView products={Products} />
    </div>
  );
}
