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

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface BackendVerse {
  number: number;
  lines: string[];
  englishLines?: string[];
}

export interface BackendHymn {
  id: string;
  number: number;
  title: string;
  alternateTitle?: string;
  category: string;
  author: string;
  verses: BackendVerse[];
  chorus?: string[];
  englishChorus?: string[];
  tags?: string[];
  meter?: string;
  tune?: string;
  key?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteRecord {
  id: string;
  hymn: BackendHymn;
  createdAt: string;
}

export interface FavoritesResponse {
  success: boolean;
  data: FavoriteRecord[];
}

export interface HymnPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface HymnsResponse {
  success: boolean;
  data: BackendHymn[];
  pagination: HymnPagination;
}