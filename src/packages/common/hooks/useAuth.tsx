import router, { Router } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ACCESS_TOKEN_KEY } from "../constants";
import { Auth } from "../types/auth";
import { LocalStorageUtils } from "../utils";

type AuthContextType = {
  user: Auth | null;
  logout: () => void;
  login: (user: Auth, token: string) => void;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
  login: () => {},
  isAuth: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Auth | null>(null);
  const logout = useCallback(() => {
    setUser(null);
    LocalStorageUtils.remove(ACCESS_TOKEN_KEY);
    router.push("/login");
  }, []);

  const login = useCallback((user: Auth, token: string) => {
    setUser(user);
    LocalStorageUtils.set(ACCESS_TOKEN_KEY, token);
  }, []);

  const isAuth = useMemo(() => !!LocalStorageUtils.get(ACCESS_TOKEN_KEY), []);

  const providerValue = useMemo(
    () => ({
      user,
      isAuth,
      logout,
      login,
    }),
    [user, isAuth, logout, login]
  );

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
