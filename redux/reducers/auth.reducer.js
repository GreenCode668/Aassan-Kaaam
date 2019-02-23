import { authConstants } from "../constants";

export const auth = (state = {}, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      return (state = {
        ...state,

        user: action.user
      });
    }

    case authConstants.LOGIN_SUCCESS: {
      return (state = {
        ...state,
        user: action.user
      });
    }

    case authConstants.LOGIN_FAILURE: {
      return (state = {
        ...state,
        error: action.error
      });
    }
    case authConstants.CATEOGRY_SUCCESS: {
      return (state = {
        ...state,
        data: action.data
      });
    }
    case authConstants.CURRENT_PROFILE: {
      return (state = {
        ...state,
        currentprofile: action.data
      });
    }
    case authConstants.ORDER_CONFIRM: {
      return (state = {
        ...state,
        orderConfirm: action.data
      });
    }
    case authConstants.VIEW_ORDER: {
      return (state = {
        ...state,
        yourOrders: action.orders
      });
    }
    default:
      return (state = {});
  }
};
