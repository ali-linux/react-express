import axios from "axios";
import { setAlert } from "../actions/alert.action";
import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../constants/auth.constants";

//REGISTER
export const register =
  ({ name, email, password }) =>
    async (dispatch) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ name, email, password });
      try {
        await axios.post("api/auth/register", body, config);
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch(setAlert("successfully registered", "success"));
        return true;
      } catch (err) {
        const errors = err?.response.data.errors;
        if (errors) {
          errors.forEach((err) => {
            dispatch(setAlert(err.msg, "danger"));
          });
        } else {
          dispatch(setAlert(err?.response.data.msg, "danger"));
        }
        dispatch({
          type: REGISTER_FAIL,
        });
        return false;
      }
    };

export const login =
  ({ email, password }) =>
    async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify({ email, password });

        const { data } = await axios.post("api/auth/login", body, config);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      } catch (err) {
        const errors = err?.response.data.errors;
        if (errors) {
          errors.forEach((err) => {
            dispatch(setAlert(err.msg, "danger"));
          });
        } else {
          dispatch(setAlert("SERVER ERROR", "danger"));
        }
        dispatch({
          type: REGISTER_FAIL,
        });
        return false;
      }
    };
export const logout = () => (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    dispatch(setAlert(err?.response.message), "warning");
  }
};
