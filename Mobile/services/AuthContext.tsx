// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import authService from "./AuthServices"; // Asegúrate de que este servicio esté definido
import { AuthResponse, LoginUser } from "~/lib/Types"; // Asegúrate de que estos modelos estén definidos

interface AuthContextType {
  user: AuthResponse | null;
  login: (user: LoginUser) => Promise<void>;
  logout: () => void;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (userData: LoginUser) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(userData);
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
    <AuthContext.Provider value={{ user, login, logout, error, isLoading }}>
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
