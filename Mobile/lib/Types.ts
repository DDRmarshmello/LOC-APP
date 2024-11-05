// UserModel.ts

export interface User {
    id: number; // Identificador único del usuario
    username: string; // Nombre de usuario
    email: string; // Correo electrónico del usuario
    passwordHash: string; // Contraseña hasheada (almacenada de forma segura)
    createdAt: Date; // Fecha de creación del usuario
    updatedAt: Date; // Fecha de la última actualización del usuario
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
    password: string; // Contraseña del usuario
}

// Puedes incluir otros modelos relacionados, como un modelo para el JWT
export interface AuthResponse {
    token: string; // Token de autenticación
    user: User; // Información del usuario autenticado
}
