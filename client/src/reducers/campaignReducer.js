import { GET_CAMPAIGNS, GET_CAMPAIGNS_ERROR } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload.campaigns
      };
    case GET_CAMPAIGNS_ERROR:
      return {
        ...state,
        campaignsError: action.payload
      };
    default:
      return state;
  }
}
