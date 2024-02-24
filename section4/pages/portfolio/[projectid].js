import React from "react";
import { useRouter } from "next/router";
const PortfolioProjectPage = () => {
  const router = useRouter();

  // router.query.projectid 로 특정 포토폴리오 fetch하기
  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
};

export default PortfolioProjectPage;
