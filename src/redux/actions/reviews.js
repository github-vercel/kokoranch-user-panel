import { POST } from "../../apis/requests";
import ActionTypes from "../constant";
import { toast } from "react-toastify";
const RATE_PRODUCT_ACTION = (data, token) => {
  return async (dispatch) => {
    try {
      const response = await POST("/reviews", token, data);
      dispatch({
        type: ActionTypes.RATE_PRODUCT,
        payload: response?.data,
      });
      toast.success("Review Submited Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    
  };
};

const RATE_SERVICE_ACTION = (data, token) => {
  return (dispatch) => {
    return POST("/review/rate-service", token, data)
      .then((response) => {
        if (response.success === false) {
          // toast.error(response.message)
        } else {
          dispatch({
            type: ActionTypes.RATE_SERVICE,
            payload: response,
          });

          toast.success(response.message);
        }
      })
      .catch((error) => {
        // toast.error(error.message)
        console.log(error.message);
        dispatch({
          type: ActionTypes.ERROR_RATE,
          payload: error,
        });
      });
  };
};

export { RATE_PRODUCT_ACTION, RATE_SERVICE_ACTION };
