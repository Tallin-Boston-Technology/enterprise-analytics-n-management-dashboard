import { loginUser, logoutUser } from "../app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import type { AuthCredentials } from "../types";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const { user, accessToken, refreshToken, isAuthenticated, isLoading, error } =
    useAppSelector((state) => state.auth);

  const login = (credentials: AuthCredentials) => {
    return dispatch(loginUser(credentials));
  };

  const logout = () => {
    return dispatch(logoutUser());
  };

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
};
