import { RoleDto, UserDto } from "./auth.dto";

export interface User {
    id: number;
    name: string;
    avatar: string;
    phone: string;
    email: string;
    is_active: number;
    created_at: Date;
    subject_favorite: SubjectFavorite[];
    subject: Subject[];
    technology: Technology[];
}

export interface SubjectFavorite {
    id: number;
    rate: number;
    subject: Subject;
}

export interface Subject {
    name: string;
}

export interface Technology {
    name: string;
}

export interface Technology {
    id: number;
    rate: number;
    technology: Technology;
}
export interface Role {
    roleName: string;
}
export interface UserRole {
    user: User;
    role: Role[];
}
export interface AuthResponse {
    access_token: string;
    expires_in: string;
    user: UserDto;
    roles: RoleDto[];
}