import { SEND_SEARCH_REQUEST, SET_TRANSPORTATION_STATUS } from './actionTypes';
import axios from 'axios';
import { getStatus } from '../../utils';

export const sendSearchRequest = (value) => {
  return {
    type: SEND_SEARCH_REQUEST,
    playload: value,
  };
};
export const setTransportationStatus = (value) => {
  return {
    type: SET_TRANSPORTATION_STATUS,
    playload: value,
  };
};

export const sendRequest = (value) => (dispatch) => {
  axios
    .get('https://sirius.searates.com/distance-and-time/search', value)
    .then((res) => {
      let customResponce = {
        ...res.data,
        status: getStatus(res.data),
      };
      dispatch(sendSearchRequest({ responce_data: customResponce }));
    })
    .catch((error) => {
      console.log(error);
    });
};
