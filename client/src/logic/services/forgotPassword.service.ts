import { UseAppDispatch } from "./../redux/redux-hooks";
import { setAlert } from "../redux/slices/alert.slice";
import {
  forgotPasswordRequest,
  sendForgotPasswordEmailRequest,
} from "../requests/auth.requests";

const forgotPasswordService = () => {
  const dispatch = UseAppDispatch();

  const sendForgotPasswordEmail = async (email: string) => {
    return await sendForgotPasswordEmailRequest(email)
      .then(() => {
        dispatch(
          setAlert({
            description: `Email send successfuly to ${email}`,
            type: "SUCCESS",
          })
        );
        return;
      })
      .catch((error) => {
        dispatch(setAlert({ description: error.response.data.message }));
        return;
      });
  };

  const sendForgotPasswordRequest = async (
    password: string,
    accessToken: string
  ) => {
    return await forgotPasswordRequest(password, accessToken)
      .then(() => {
        dispatch(
          setAlert({
            description: "Password change successfuly",
            type: "SUCCESS",
          })
        );
        return;
      })
      .catch((error) => {
        dispatch(setAlert({ description: error.response.data.message }));
        return;
      });
  };

  return { sendForgotPasswordEmail, sendForgotPasswordRequest };
};

export default forgotPasswordService;
