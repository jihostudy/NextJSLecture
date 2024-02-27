import React from "react";

import path from "path";
import fs from "fs/promises";
import Link from "next/link";

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const paths = ids.map((id) => ({
    params: { pid: id },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

const ProductDescriptionPage = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
      <Link href="/">Back to Front</Link>
    </React.Fragment>
  );
};

export default ProductDescriptionPage;
