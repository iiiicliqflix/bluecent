import { SAVE_SETTINGS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case SAVE_SETTINGS:
      return {
        ...state
      };
    default:
      return state;
  }
}
