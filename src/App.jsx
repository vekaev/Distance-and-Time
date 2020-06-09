import React, { useState } from 'react';
import Panel from './containers/Panel';
import axios from 'axios';
import { connect } from 'react-redux';

const App = ({ lat_from, lng_from, lat_to, lng_to, shipment_type }) => {
  const [loading, setSubmitButtonLoading] = useState(false);
  const [responseData, setResponseData] = useState();

  const onSubmit = (data) => {
    data.preventDefault();

    setSubmitButtonLoading(true);

    let filterData = {
      params: {
        lat_from: lat_from,
        lng_from: lng_from,
        lat_to: lat_to,
        lng_to: lng_to,
        key: 'E1KN-9PFZ-BO20-PGMG',
      },
    };

    axios
      .get('https://sirius.searates.com/api/distanceandtime', filterData)
      .then((res) => {
        console.log(res);
        setResponseData(res.data);
        setSubmitButtonLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setResponseData('error');
        setSubmitButtonLoading(false);
      });
  };

  return (
    <Panel
      toggleBtnStatus={loading}
      submitForm={onSubmit}
      responseData={responseData}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    speed_value: state.speed_value,
    // road_speed_value: state.road_speed_value,
    lat_from: state.lat_from,
    lng_from: state.lng_from,
    lat_to: state.lat_to,
    lng_to: state.lng_to,
  };
};

export default connect(mapStateToProps, null)(App);

// export default withData(App, (store) => {
//     return {
//         some: store.some
//     }
// });
