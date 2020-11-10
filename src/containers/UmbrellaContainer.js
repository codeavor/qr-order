import React, { useEffect } from "react";

import { connect } from "react-redux";

import { getMenu } from "../actions/menuActions";
import BottomBox from "../components/BottomBox";
import CategoriesBar from "../components/CategoriesBar";
import Error from "../components/Error";
import Loading from "../components/Loading";
import MenuArea from "../components/MenuArea";
import NavBar from "../components/NavBar";

export function UmbrellaContainer({ menuData, getMenu }) {
  useEffect(() => {
    getMenu();
  }, [getMenu]);

  return menuData.loading ? (
    <Loading />
  ) : menuData.error ? (
    <Error error={menuData.error} />
  ) : (
    <div>
      <NavBar back={false} text="Welcome" search={true} />
      <CategoriesBar menu={menuData.menu} />
      <MenuArea menu={menuData.menu} />
      <BottomBox text="Cart" quantity={false} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    menuData: state.menu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMenu: () => dispatch(getMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UmbrellaContainer);
