import path from "path";
import fs from "fs/promises";
import Test from "./test";
import Link from "next/link";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  console.log("Re-Generating");
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

// props : getStaticPros return value
function HomePage(props) {
  /*
  의문점!
  props를 상위 컴포넌트로부터 전달받는 경우에는 getStaticProps와 상위 컴포넌트 중에 어떤걸 사용하는 거지?
  // const products = [{ id: "h1", title: "bad boy" }];
   */
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
      {/* 여기는 Test공간입니다
      <Test products={products} /> */}
    </ul>
  );
}

export default HomePage;
