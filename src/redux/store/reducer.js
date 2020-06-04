import React from 'react';
import {
  SPEED_INCREMENT,
  SPEED_DECREMENT,
  CHANGE_SPEED_VALUE,
} from './actionTypes';

const initialState = {
  speed_value: 13,
};

export const speedReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SPEED_VALUE:
      return {
        ...state,
        ...action.playload,
      };
      break;
    case SPEED_INCREMENT:
      return {
        ...state,
        ...action.playload,
      };
      break;
    case SPEED_DECREMENT:
      return {
        ...state,
        speed_value: state.speed_value - 1,
      };
      break;
    default:
      return { ...state };
  }
};
