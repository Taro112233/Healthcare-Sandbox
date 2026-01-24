// types/auth.d.ts
// NextHealTH Sandbox - Authentication Type Definitions (Simplified - No Multi-tenant)

// ===== USER TYPES =====

export interface User {
  id: string;
  email?: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Computed fields
  fullName?: string;
  avatar?: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE',
}

// ===== JWT INTERFACES =====

export interface JWTPayload {
  userId: string;
  email?: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface JWTUser {
  userId: string;
  email?: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// ===== AUTH REQUEST/RESPONSE =====

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface RegisterResponse {
  success: boolean;
  user: User;
  token?: string;
  message?: string;
}

// ===== AUTH CONTEXT =====

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
  
  // Permission helpers
  isAdmin: boolean;
  isAuthenticated: boolean;
}

// ===== API RESPONSE =====

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  message?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AuthError {
  code: string;
  message: string;
  details?: ValidationError[];
}

// ===== MIDDLEWARE TYPES =====

export interface RequestWithUser extends Request {
  user?: JWTUser;
}

// ===== HELPER FUNCTIONS =====

export function isAdmin(user: User | JWTUser | null): boolean {
  return user?.role === UserRole.ADMIN;
}

export function getUserFullName(user: User | JWTUser | null): string {
  if (!user) return 'Unknown';
  return `${user.firstName} ${user.lastName}`;
}

export function getUserInitials(user: User | JWTUser | null): string {
  if (!user) return 'U';
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
}