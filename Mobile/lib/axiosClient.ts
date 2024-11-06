import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private instance = axios.create({
    baseURL: 'http://10.10.43.21:7059/api', // Cambia la URL base según tu caso
    timeout: 5000000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  setAuthToken(token: string | null) {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }

  // Método genérico para hacer GET requests
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.get<T>(url, config);
      return response.data;
    } catch (error: any) {
      console.error('Error en GET:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error en GET');
    }
  }

  // Método genérico para hacer POST requests
  async post<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> {
    try {
      console.log(this.instance.getUri())
      const response: AxiosResponse<T> = await this.instance.post<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      console.error('Error en POST:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error en POST');
    }
  }

  // Método genérico para hacer PUT requests
  async put<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.put<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      console.error('Error en PUT:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error en PUT');
    }
  }

  // Método genérico para hacer DELETE requests
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete<T>(url, config);
      return response.data;
    } catch (error: any) {
      console.error('Error en DELETE:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error en DELETE');
    }
  }
}

const apiService = new ApiService();
export default apiService;
