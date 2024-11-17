// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import authService from "./AuthServices"; // Asegúrate de que este servicio esté definido
import { AuthResponse, LoginUser, RegisterUser, User } from "~/lib/Types"; // Asegúrate de que estos modelos estén definidos

interface AuthContextType {
  user: AuthResponse | null;
  userInfo: User | null;
  login: (user: LoginUser) => Promise<void>;
  logout: () => void;
  register: (user: RegisterUser) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (userData: LoginUser) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(userData);
      const responseInfo = await authService.GetUserInfo();

      console.log(response);
      setUser(response); // Almacena la respuesta del usuario, que generalmente incluirá el token
      setUserInfo(responseInfo)
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterUser) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      console.log(response);
      setUser(response); // Almacena la respuesta del usuario, que generalmente incluirá el token
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout(); // Llama al método logout de AuthService
    setUser(null); // Limpia el usuario en el contexto
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, error, isLoading, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
