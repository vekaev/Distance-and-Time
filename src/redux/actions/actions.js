import {
  CHANGE_SPEED_VALUE,
  CHANGE_POSITION,
  CHANGE_SHIPMENT_TYPE,
} from './actionTypes';

export const speedChange = (value) => {
  return {
    type: CHANGE_SPEED_VALUE,
    playload: value,
  };
};

export const positionChange = (value) => {
  return {
    type: CHANGE_POSITION,
    playload: value,
  };
};

export const shimpentChange = (value) => {
  return {
    type: CHANGE_SHIPMENT_TYPE,
    playload: value,
  };
};
