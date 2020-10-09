import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMenu } from "../actions/menuActions";
import NavBar from "../components/NavBar";
import CategoriesBar from "../components/CategoriesBar";

function UmbrellaContainer({ menuData, fetchMenu }) {
  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return menuData.loading ? (
    <h2>Loading</h2>
  ) : menuData.error ? (
    <h2>{menuData.error}</h2>
  ) : (
    <div>
      <NavBar back={false} text="Welcome" search={true} menu={menuData.menu} />
      <CategoriesBar menu={menuData.menu} />
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
    fetchMenu: () => dispatch(fetchMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UmbrellaContainer);
