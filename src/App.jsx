import React from 'react';
import Panel from './containers/Panel';
import { connect } from 'react-redux';

const App = ({ request_data }) => {
  return <Panel responseData={request_data} />;
};

const mapStateToProps = (state) => {
  return {
    request_data: state.request_data,
  };
};

export default connect(mapStateToProps, null)(App);
