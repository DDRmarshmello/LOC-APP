// UserModel.ts

export interface User {
    id: number; // Identificador único del usuario
    username: string; // Nombre de usuario
    email: string; // Correo electrónico del usuario
    passwordHash: string; // Contraseña hasheada (almacenada de forma segura)
    createdAt: Date; // Fecha de creación del usuario
    updatedAt: Date; // Fecha de la última actualización del usuario
    eventRegisters: EventRegister[];

}

// Opcionalmente, puedes definir un modelo para el registro de usuario
export interface RegisterUser {
    username: string; // Nombre de usuario
    email: string; // Correo electrónico del usuario
    password: string; // Contraseña del usuario
}

// Opcionalmente, puedes definir un modelo para el inicio de sesión
export interface LoginUser {
    username: string; // Nombre de usuario
    PasswordHash: string; // Contraseña del usuario
}

// Puedes incluir otros modelos relacionados, como un modelo para el JWT
export interface AuthResponse {
    id: number; // Identificador único del usuario
    username: string; // Nombre de usuario
    email: string; // Correo electrónico del usuario
    token: string; // Token de autenticación
}


// Interface para las imágenes (si las hay)
export interface Image {
    url: string;
    // Puedes agregar otros atributos de imagen si es necesario
  }
  
  // Interface para un "eventRegister" (registro de evento)
export interface EventRegister {
    id?: number;
    username: string;
    usernameId: number;
    nombre_empresa: string;
    cedula_rnc: string;
    latitud: string;
    longitud: string;
    createdAt?: string ; // Fecha como string, si lo quieres como Date, usa Date en vez de string
    description: string | null;
    notas: string | null;
    images?: Image[] | null; // Lista de imágenes asociadas al evento
  }
  
  