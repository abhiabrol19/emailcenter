import { NEXT_PAGE, PREVIOUS_PAGE, RESET_PAGE } from '../actions/types';

export const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return state + 1;
    case PREVIOUS_PAGE:
      return state - 1;
    case RESET_PAGE:
      return 1;
    default:
      return state;
  }
};
