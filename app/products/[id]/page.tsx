import { client } from "@/app/sanity/client";
import Product from "./Product";

export default async function Page({ params }: any) {
  const { id } = await params;
  const PRODUCTS_QUERY = `*[_type == "product" && _id == $id][0]`;
  const product = await client.fetch(PRODUCTS_QUERY, { id });

  return <Product product={product} />;
}
