import React from 'react';
import { SEND_SEARCH_REQUEST } from '../actions/actionTypes';

export const initialState = {
  responce_data: false,
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
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
