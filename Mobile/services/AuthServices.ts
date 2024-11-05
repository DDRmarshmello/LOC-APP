// authService.ts
import apiService from '~/lib/axiosClient';

import { RegisterUser, AuthResponse, LoginUser } from '~/lib/Types';

class AuthService {
  // Método para registrar un nuevo usuario
  async register(user: RegisterUser): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse, RegisterUser>('/user/register', user);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error registrando el usuario');
    }
  }

  // Método para autenticar a un usuario
  async login(user: LoginUser): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse, LoginUser>('/user/login', user);
      // Establece el token en el servicio API si la autenticación es exitosa
      apiService.setAuthToken(response.token);
      return response;
    } catch (error) {
      throw new Error(error.response.data.message || 'Error iniciando sesión');
    }
  }

  // Método para cerrar sesión
  logout(): void {
    apiService.setAuthToken(null); // Elimina el token de autorización
  }
}

const authService = new AuthService();
export default authService;
