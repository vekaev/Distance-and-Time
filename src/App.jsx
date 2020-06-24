import React from 'react';
import Panel from './containers/Panel';
import { connect } from 'react-redux';
import { sendRequest } from './redux/actions/actions';

const App = ({ responce_data }) => {
  return <Panel data={responce_data} />;
};

const mapStateToProps = (state) => {
  return {
    responce_data: state.responce_data,
  };
};

export default connect(mapStateToProps, null)(App);
