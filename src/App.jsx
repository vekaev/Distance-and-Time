import React, { useState } from 'react';
import Panel from './containers/Panel';
import axios from 'axios';
import store from './redux/store/store';
import { Provider } from 'react-redux';

const App = () => {
  const [loading, setSubmitButtonLoading] = useState(false);
  const [responseData, setResponseData] = useState();
  const [positionPort, setPositionPort] = useState({});

  const onSubmit = (data) => {
    data.preventDefault();

    setSubmitButtonLoading(true);

    let filterData = {
      params: {
        lat_from: positionPort.lat_from,
        lng_from: positionPort.lng_from,
        lat_to: positionPort.lat_to,
        lng_to: positionPort.lng_to,
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
    <Provider store={store}>
      <Panel
        toggleBtnStatus={loading}
        submitForm={onSubmit}
        responseData={responseData}
        setPositionPort={setPositionPort}
      />
    </Provider>
  );
};

export default App;

// export default withData(App, (store) => {
//     return {
//         some: store.some
//     }
// });
