import React from "react";

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;
  return {
    props: {
      id: "userid-" + userId,
    },
  };
}

const UserIdPage = (props) => {
  return <div>{props.id}</div>;
};

export default UserIdPage;
