import React from 'react';
import {
  CHANGE_SHIPMENT_TYPE,
  CHANGE_REQUEST_SHIPMENT_TYPE,
  SEND_SEARCH_REQUEST,
} from '../actions/actionTypes';

export const initialState = {
  shipment_type: 'sea',
  request_shipment_type: 'sea',
  request_data: {},
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SHIPMENT_TYPE:
      return {
        ...state,
        ...action.playload,
      };
      break;
    case CHANGE_REQUEST_SHIPMENT_TYPE:
      return {
        ...state,
        ...action.playload,
      };
    case SEND_SEARCH_REQUEST:
      return {
        ...state,
        ...action.playload,
      };
      break;
    default:
      return { ...state };
  }
};
