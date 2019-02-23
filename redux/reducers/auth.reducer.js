import { authConstants } from "../constants";

export const auth = (state = {}, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      return (state = {
        user: action.user
      });
    }

    case authConstants.LOGIN_SUCCESS: {
      return (state = {
        user: action.user
      });
    }

    case authConstants.LOGIN_FAILURE: {
      return (state = {
        error: action.error
      });
    }
    case authConstants.CATEOGRY_SUCCESS: {
      return (state = {
        category: action.data
      });
    }

    case authConstants.LOGOUT:
      return {};
    default:
      return (state = {
        unrecognizedRoute: true
      });
  }
};
