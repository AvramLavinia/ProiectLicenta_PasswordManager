import { refreshRequest } from "../requests/auth.requests";
import { loggedIn } from "../redux/slices/auth.slice";
import logoutService from "./logout.service";
import { UseAppDispatch } from "../redux/redux-hooks";
import { setUser } from "../redux/slices/user.slice";

const refreshService = () => {
  const dispatch = UseAppDispatch();
  const { logout } = logoutService();

  const refreshRequestService = async (accessToken: string) => {
    try {
      const result = await refreshRequest(accessToken);
      if (result !== undefined) {
        const data = result.data;
        localStorage.setItem("accessToken", data.accessToken);
        //Auth value in redux store
        dispatch(
          loggedIn({
            isLogged: true,
            accessToken: data.accessToken,
            isLoading: false,
          })
        );
        //User value in redux store
        dispatch(setUser({ id: data.id, email: data.email, name: data.name }));
      } else {
        await logout();
      }
    } catch (error) {
      console.log(error);
      await logout();
    }
  };

  return { refreshRequestService };
};

export default refreshService;
