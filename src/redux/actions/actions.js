import {
  CHANGE_SHIPMENT_TYPE,
  CHANGE_REQUEST_SHIPMENT_TYPE,
  SEND_SEARCH_REQUEST,
} from './actionTypes';
import axios from 'axios';

export const shimpentChange = (value) => {
  return {
    type: CHANGE_SHIPMENT_TYPE,
    playload: value,
  };
};

export const requestShimpentChange = (value) => {
  return {
    type: CHANGE_REQUEST_SHIPMENT_TYPE,
    playload: value,
  };
};

export const sendSearchRequest = (value) => {
  return {
    type: SEND_SEARCH_REQUEST,
    playload: value,
  };
};

export const sendRequest = (value) => (dispatch) => {
  console.log(value);
  axios
    .get('https://sirius.searates.com/api/distanceandtime', value)
    .then((res) => {
      console.log(res.data);
      dispatch(sendSearchRequest({ request_data: res.data }));
    })
    .catch((error) => {
      console.log(error);
    });
};
