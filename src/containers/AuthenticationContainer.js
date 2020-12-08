import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { getToken } from "../actions/authActions";
import Loading from "../components/Loading";

export function AuthenticationContainer({ getToken }) {
  const { id } = useParams();

  useEffect(() => {
    // if user gets authenticated successfully, he will be redirected
    getToken(id);
  }, [getToken, id]);

  return <Loading />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: (id) => dispatch(getToken(id)),
  };
};

export default connect(null, mapDispatchToProps)(AuthenticationContainer);
