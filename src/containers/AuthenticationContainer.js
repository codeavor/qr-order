import React, { useEffect } from "react";

import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getToken } from "../actions/authActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

export function AuthenticationContainer({ userData, getToken }) {
  const { id } = useParams();

  useEffect(() => {
    getToken(id);
  }, [getToken, id]);

  return userData.loading ? (
    <Loading />
  ) : userData.error || userData.orderId == null ? (
    <Error error={userData.error} />
  ) : (
    <Redirect to="/menu" />
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: (id) => dispatch(getToken(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationContainer);
