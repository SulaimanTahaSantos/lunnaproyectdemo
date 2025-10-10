

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  iat: number; // issued at
  exp: number; // expiration
}


export function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}


export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
}


export function getTokenTimeRemaining(token: string): number {
  try {
    const decoded = decodeToken(token);
    if (!decoded) return 0;

    const currentTime = Math.floor(Date.now() / 1000);
    const remaining = decoded.exp - currentTime;
    return Math.max(0, remaining);
  } catch (error) {
    console.error('Error getting token time remaining:', error);
    return 0;
  }
}


export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return 'Expirado';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}


export function isTokenNearExpiry(token: string, warningMinutes: number = 5): boolean {
  const remaining = getTokenTimeRemaining(token);
  return remaining > 0 && remaining < (warningMinutes * 60);
}