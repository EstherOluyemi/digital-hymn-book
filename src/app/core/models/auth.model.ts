export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
}

export interface User{
    id: string;
    name: string;
    email: string;
    authProvider: string;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterResponse{
    success: boolean;
    message: string;
    data: {
        user:User;
    };
}  

export interface LoginRequest{
    email: string;
    password: string;
}