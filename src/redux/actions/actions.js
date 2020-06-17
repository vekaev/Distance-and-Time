import { SEND_SEARCH_REQUEST } from './actionTypes';
import axios from 'axios';

export const sendSearchRequest = (value) => {
  return {
    type: SEND_SEARCH_REQUEST,
    playload: value,
  };
};

let getStatus = (responce) => {
  let array = ['response', 'sea', 'air', 'road'];

  for (var i = 0; i < 4; i++) {
    if (Object.keys(responce).includes(array[i])) {
      return array[i];
    }
  }
  return 'error';
};

export const sendRequest = (value) => (dispatch) => {
  console.log(value);
  axios
    .get('https://sirius.searates.com/api/distanceandtime', value)
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
