import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import type {
  User,
  Session,
  SessionStatusLog,
  TherapistAvailability,
  PaginatedResponse,
  SessionCreateRequest,
  SessionStatusUpdateRequest,
} from '@/types';

export const queryKeys = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  me: ['me'] as const,
  sessions: ['sessions'] as const,
  session: (id: string) => ['sessions', id] as const,
  sessionLogs: (id: string) => ['sessions', id, 'logs'] as const,
  therapists: ['therapists'] as const,
  therapistAvailability: (date: string, therapistId?: string) => 
    ['therapists', 'availability', date, therapistId] as const,
  adminSessions: ['admin', 'sessions'] as const,
  adminUsers: ['admin', 'users'] as const,
  systemStatus: ['system', 'status'] as const,
};

export function useMe() {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const response = await api.get<{ user: User }>('/me');
      return response.data.user;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, 
  });
}

export function useMySessions() {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: [...queryKeys.sessions, 'my'],
    queryFn: async () => {
      const response = await api.get<{ sessions: Session[]; total: number }>('/me/sessions');
      return response.data;
    },
    enabled: isAuthenticated,
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: queryKeys.session(id),
    queryFn: async () => {
      const response = await api.get<{ session: Session }>(`/sessions/${id}`);
      return response.data.session;
    },
    enabled: !!id,
  });
}

export function useSessionStatus(id: string) {
  return useQuery({
    queryKey: [...queryKeys.session(id), 'status'],
    queryFn: async () => {
      const response = await api.get(`/sessions/${id}/status`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useSessionLogs(id: string) {
  return useQuery({
    queryKey: queryKeys.sessionLogs(id),
    queryFn: async () => {
      const response = await api.get<{ logs: SessionStatusLog[]; stats: any }>(`/sessions/${id}/logs`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useTherapists() {
  return useQuery({
    queryKey: queryKeys.therapists,
    queryFn: async () => {
      const response = await api.get<{ therapists: User[] }>('/therapists');
      return response.data.therapists;
    },
  });
}

export function useTherapistAvailability(date: string, therapistId?: string) {
  return useQuery({
    queryKey: queryKeys.therapistAvailability(date, therapistId),
    queryFn: async () => {
      const params = new URLSearchParams({ date });
      if (therapistId) params.append('therapistId', therapistId);
      
      const response = await api.get<{ therapists: TherapistAvailability[] }>(
        `/therapists/availability?${params}`
      );
      return response.data.therapists;
    },
    enabled: !!date,
  });
}

export function useAdminSessions(filters?: {
  status?: string;
  userId?: string;
  therapistId?: string;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: [...queryKeys.adminSessions, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.userId) params.append('userId', filters.userId);
      if (filters?.therapistId) params.append('therapistId', filters.therapistId);
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.offset) params.append('offset', filters.offset.toString());
      
      const response = await api.get<PaginatedResponse<Session>>(
        `/admin/sessions?${params}`
      );
      return response.data;
    },
  });
}

export function useAdminUsers(filters?: {
  role?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: [...queryKeys.adminUsers, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.role) params.append('role', filters.role);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.offset) params.append('offset', filters.offset.toString());
      
      const response = await api.get<PaginatedResponse<User>>(
        `/admin/users?${params}`
      );
      return response.data;
    },
  });
}

export function useSystemStatus() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  
  return useQuery({
    queryKey: queryKeys.systemStatus,
    queryFn: async () => {
      const response = await api.get('/system/status');
      return response.data;
    },
    enabled: isAdmin,
    refetchInterval: 30000, 
  });
}

export function useUpdateSessionStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      sessionId, 
      data 
    }: { 
      sessionId: string; 
      data: SessionStatusUpdateRequest 
    }) => {
      const response = await api.patch(`/sessions/${sessionId}/status`, data);
      return response.data;
    },
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.session(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessionLogs(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminSessions });
    },
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: SessionCreateRequest) => {
      const response = await api.post('/admin/sessions', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
      queryClient.invalidateQueries({ queryKey: queryKeys.adminSessions });
    },
  });
}

export function useAutoCompleteSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      sessionId, 
      data 
    }: { 
      sessionId: string; 
      data?: { 
        delayBetweenSteps?: number; 
        skipDelays?: boolean; 
        reason?: string; 
      } 
    }) => {
      const response = await api.post(`/sessions/${sessionId}/auto-complete`, data);
      return response.data;
    },
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.session(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessionLogs(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();
  
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      updateUser({ image: data.user.image });
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
}