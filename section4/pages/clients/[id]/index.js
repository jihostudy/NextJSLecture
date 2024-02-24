import React from "react";
// next
import { useRouter } from "next/router";

const ClientProjectsPage = () => {
  const router = useRouter();

  function loadProjectHandler() {
    // router.replace("/clients/max/projecta");
    router.replace({
      pathname: `clients/[id].[clientProjectid]`,
      query: { id: "Max", cleintProjectid: "projecta" },
    });
  }

  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
