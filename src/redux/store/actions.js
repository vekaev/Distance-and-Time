import {CHANGE_SPEED_VALUE, SPEED_INCREMENT, SPEED_DECREMENT} from './actionTypes'

export const speedChange = (value) => {
  return {
      type: CHANGE_SPEED_VALUE,
      playload: value
  }
}

export const speedIncrement = (value) => {
  return {
      type: SPEED_INCREMENT,
      playload: value

  }
}

export const speedDecrement = (value) => {
  return {
    type: SPEED_DECREMENT,
    playload: value
  }
}

