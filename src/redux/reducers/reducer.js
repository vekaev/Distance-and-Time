import React from 'react';
import {
  CHANGE_SPEED_VALUE,
  CHANGE_POSITION,
  CHANGE_SHIPMENT_TYPE,
} from '../actions/actionTypes';

export const initialState = {
  shipment_type: 'sea',
  speed_value: 13,
  // road_speed_value: 0,
  lat_from: 0,
  lng_from: 0,
  lat_to: 0,
  lng_to: 0,
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SPEED_VALUE:
      return {
        ...state,
        ...action.playload,
      };
      break;
    case CHANGE_POSITION:
      return {
        ...state,
        ...action.playload,
      };
      break;
    case CHANGE_SHIPMENT_TYPE:
      return {
        ...state,
        ...action.playload,
      };
      break;
    default:
      return { ...state };
  }
};
