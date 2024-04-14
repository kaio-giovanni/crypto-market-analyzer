import React from "react";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";

const Home = () => {
  return (
    <Private>
      <NavbarMenu />
    </Private>
  );
};

export default Home;
