import path from "path";
import fs from "fs/promises";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
  };
}

function HomePage(props) {
  /*
  의문점!
  props를 상위 컴포넌트로부터 전달받는 경우에는 getStaticProps와 상위 컴포넌트 중에 어떤걸 사용하는 거지?
   */
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export default HomePage;
