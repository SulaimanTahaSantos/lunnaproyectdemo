export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string;
  createdAt?: string;
}

export enum Role {
  USER = 'USER',
  THERAPIST = 'THERAPIST',
  ADMIN = 'ADMIN'
}

export interface Session {
  id: string;
  date: string;
  status: SessionStatus;
  chimeLink: string;
  userId: string;
  therapistId: string;
  user: Pick<User, 'id' | 'name' | 'email' | 'image'>;
  therapist: Pick<User, 'id' | 'name' | 'email' | 'image'>;
  createdAt?: string;
}

export enum SessionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface SessionStatusLog {
  id: string;
  sessionId: string;
  fromStatus?: SessionStatus;
  toStatus: SessionStatus;
  changedBy: Pick<User, 'id' | 'name' | 'role'>;
  reason?: string;
  notes?: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrevious?: boolean;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface TherapistAvailability {
  id: string;
  name: string;
  email: string;
  image?: string;
  availability: {
    workingHours: {
      start: string;
      end: string;
    };
    availableSlots: TimeSlot[];
    summary: {
      totalSlots: number;
      availableSlots: number;
      bookedSlots: number;
    };
  };
}

export interface TimeSlot {
  time: string;
  datetime: string;
  available: boolean;
  reason?: string;
}

export interface SessionCreateRequest {
  userId: string;
  therapistId: string;
  date: string;
}

export interface SessionStatusUpdateRequest {
  status: SessionStatus;
  reason?: string;
  notes?: string;
}