import React from "react";

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  return {
    props: {
      username: "Jiho",
    },
  };
}

const UserProfilePage = (props) => {
  return <div>{props.username}</div>;
};

export default UserProfilePage;
