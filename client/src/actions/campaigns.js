import axios from "axios";
import { GET_CAMPAIGNS, GET_CAMPAIGNS_ERROR } from "./types";

export function getCampaigns() {
  return function(dispatch) {
    axios
      .get("/get-campaigns")
      .then(response => {
        dispatch({ type: GET_CAMPAIGNS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: GET_CAMPAIGNS_ERROR, payload: error });
      });
  };
}
