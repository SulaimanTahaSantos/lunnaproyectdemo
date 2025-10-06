# 🌙 Lunna Platform - API Documentation

## Documentación de Endpoints para Frontend

**Base URL:** `http://localhost:3000/api` (desarrollo) | `https://your-domain.com/api` (producción) //Aun no esta subido.

---

## 🔐 Autenticación

### `POST /auth/register`
Registrar nuevo usuario

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "password": "password123",
  "role": "USER" // USER | THERAPIST | ADMIN
}
```

Response (201):
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "cm1xyz123",
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "role": "USER",
    "image": null
  }
}
```

**Errores:**
- `400`: Email ya registrado, datos inválidos
- `500`: Error del servidor

---

### `POST /auth/login`
Iniciar sesión

**Request:**
```json
{
  "email": "juan@email.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "cm1xyz123",
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "role": "USER",
    "image": "https://s3.amazonaws.com/avatar.jpg"
  }
}
```

**Errores:**
- `401`: Credenciales incorrectas
- `400`: Datos faltantes

**Uso del token:**
```javascript
// Incluir en todas las requests autenticadas
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## 👤 Perfil de Usuario

### `GET /me`
Obtener perfil del usuario autenticado

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "user": {
    "id": "cm1xyz123",
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "role": "USER",
    "image": "https://s3.amazonaws.com/avatar.jpg"
  }
}
```

**Errores:**
- `401`: Token inválido o expirado

---

### `GET /me/sessions`
Obtener sesiones del usuario autenticado

**Headers:** `Authorization: Bearer <token>`

**Query Parameters (opcionales):**
- `status`: `PENDING` | `CONFIRMED` | `IN_PROGRESS` | `COMPLETED` | `CANCELLED`
- `limit`: Número (default: 10)
- `offset`: Número (default: 0)

**Response (200):**
```json
{
  "sessions": [
    {
      "id": "cm2session123",
      "date": "2024-10-15T15:00:00.000Z",
      "status": "CONFIRMED",
      "chimeLink": "https://chime.aws/meeting/abc123",
      "user": {
        "id": "cm1user123",
        "name": "Juan Pérez",
        "email": "juan@email.com",
        "image": null
      },
      "therapist": {
        "id": "cm1therapist456",
        "name": "Dr. María García",
        "email": "maria@lunna.com",
        "image": "https://s3.amazonaws.com/therapist.jpg"
      }
    }
  ],
  "total": 5,
  "pagination": {
    "limit": 10,
    "offset": 0,
    "hasNext": false
  }
}
```

---

## 👨‍⚕️ Terapeutas

### `GET /therapists`
Listar todos los terapeutas disponibles

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "therapists": [
    {
      "id": "cm1therapist456",
      "name": "Dr. María García",
      "email": "maria@lunna.com",
      "image": "https://s3.amazonaws.com/therapist.jpg",
      "specialties": ["Ansiedad", "Depresión"]
    }
  ],
  "total": 8
}
```

---

### `GET /therapists/availability`
Obtener disponibilidad de terapeutas

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `date`: Fecha en formato `YYYY-MM-DD` (requerido)
- `therapistId`: ID del terapeuta (opcional)

**Example:** `/therapists/availability?date=2024-10-15&therapistId=cm1therapist456`

**Response (200):**
```json
{
  "date": "2024-10-15",
  "therapists": [
    {
      "id": "cm1therapist456",
      "name": "Dr. María García",
      "email": "maria@lunna.com",
      "image": "https://s3.amazonaws.com/therapist.jpg",
      "availability": {
        "workingHours": {
          "start": "09:00",
          "end": "17:00"
        },
        "availableSlots": [
          {
            "time": "09:00",
            "available": true,
            "datetime": "2024-10-15T09:00:00.000Z"
          },
          {
            "time": "10:00",
            "available": false,
            "reason": "Sesión programada",
            "datetime": "2024-10-15T10:00:00.000Z"
          }
        ],
        "summary": {
          "totalSlots": 8,
          "availableSlots": 6,
          "bookedSlots": 2
        }
      }
    }
  ]
}
```

---

## 📅 Gestión de Sesiones

### `GET /sessions/{id}`
Obtener detalles de una sesión específica

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "session": {
    "id": "cm2session123",
    "date": "2024-10-15T15:00:00.000Z",
    "status": "CONFIRMED",
    "chimeLink": "https://chime.aws/meeting/abc123",
    "user": {
      "id": "cm1user123",
      "name": "Juan Pérez",
      "email": "juan@email.com"
    },
    "therapist": {
      "id": "cm1therapist456", 
      "name": "Dr. María García",
      "email": "maria@lunna.com"
    }
  }
}
```

**Errores:**
- `404`: Sesión no encontrada
- `403`: Sin permisos para ver esta sesión

---

### `GET /sessions/{id}/status`
Obtener estado actual y transiciones disponibles

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "session": {
    "id": "cm2session123",
    "status": "CONFIRMED",
    "date": "2024-10-15T15:00:00.000Z",
    "user": {
      "name": "Juan Pérez"
    },
    "therapist": {
      "name": "Dr. María García"
    }
  },
  "statusInfo": {
    "current": "CONFIRMED",
    "availableTransitions": ["IN_PROGRESS", "CANCELLED"],
    "yourPermissions": ["CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
    "workflow": {
      "PENDING": "Esperando confirmación del terapeuta",
      "CONFIRMED": "Confirmada y lista para iniciar",
      "IN_PROGRESS": "Sesión en curso",
      "COMPLETED": "Sesión finalizada exitosamente",
      "CANCELLED": "Sesión cancelada"
    }
  }
}
```

---

### `PATCH /sessions/{id}/status`
Cambiar estado de una sesión

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "status": "IN_PROGRESS",
  "reason": "Paciente se conectó puntualmente",
  "notes": "Sesión iniciada sin problemas"
}
```

**Response (200):**
```json
{
  "message": "Estado actualizado exitosamente",
  "session": {
    "id": "cm2session123",
    "status": "IN_PROGRESS",
    "date": "2024-10-15T15:00:00.000Z"
  },
  "log": {
    "id": "cm2log789",
    "fromStatus": "CONFIRMED",
    "toStatus": "IN_PROGRESS",
    "changedBy": {
      "id": "cm1therapist456",
      "name": "Dr. María García",
      "role": "THERAPIST"
    },
    "reason": "Paciente se conectó puntualmente",
    "notes": "Sesión iniciada sin problemas",
    "createdAt": "2024-10-15T15:00:00.000Z"
  }
}
```

**Errores:**
- `400`: Transición no permitida
- `403`: Sin permisos para cambiar este estado
- `404`: Sesión no encontrada

---

### `GET /sessions/{id}/logs`
Obtener historial de cambios de estado

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "session": {
    "id": "cm2session123",
    "currentStatus": "COMPLETED"
  },
  "logs": [
    {
      "id": "log1",
      "fromStatus": null,
      "toStatus": "PENDING",
      "changedBy": {
        "id": "cm1admin789",
        "name": "Admin Sistema",
        "role": "ADMIN"
      },
      "reason": "Sesión creada automáticamente",
      "notes": null,
      "createdAt": "2024-10-15T14:00:00.000Z"
    },
    {
      "id": "log2",
      "fromStatus": "PENDING",
      "toStatus": "CONFIRMED", 
      "changedBy": {
        "id": "cm1therapist456",
        "name": "Dr. María García",
        "role": "THERAPIST"
      },
      "reason": "Confirmación de disponibilidad",
      "notes": "Listo para la sesión",
      "createdAt": "2024-10-15T14:30:00.000Z"
    },
    {
      "id": "log3",
      "fromStatus": "CONFIRMED",
      "toStatus": "IN_PROGRESS",
      "changedBy": {
        "id": "cm1therapist456", 
        "name": "Dr. María García",
        "role": "THERAPIST"
      },
      "reason": "Sesión iniciada",
      "notes": "Paciente puntual",
      "createdAt": "2024-10-15T15:00:00.000Z"
    },
    {
      "id": "log4",
      "fromStatus": "IN_PROGRESS",
      "toStatus": "COMPLETED",
      "changedBy": {
        "id": "cm1therapist456",
        "name": "Dr. María García", 
        "role": "THERAPIST"
      },
      "reason": "Sesión finalizada exitosamente",
      "notes": "Excelente progreso del paciente",
      "createdAt": "2024-10-15T16:00:00.000Z"
    }
  ],
  "stats": {
    "totalChanges": 4,
    "uniqueUsers": 2,
    "timespan": "2 hours",
    "statusDistribution": {
      "PENDING": 1,
      "CONFIRMED": 1,
      "IN_PROGRESS": 1,
      "COMPLETED": 1
    }
  }
}
```

---

### 🧪 `POST /sessions/{id}/auto-complete` (Solo para Testing)
Ejecutar flujo completo automático: `PENDING → CONFIRMED → IN_PROGRESS → COMPLETED`

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "delayBetweenSteps": 1000,
  "skipDelays": false,
  "reason": "Test automático del workflow completo"
}
```

**Response (200):**
```json
{
  "message": "Flujo completo ejecutado exitosamente",
  "session": {
    "id": "cm2session123",
    "status": "COMPLETED",
    "date": "2024-10-15T15:00:00.000Z"
  },
  "steps": [
    {
      "step": 1,
      "from": "PENDING",
      "to": "CONFIRMED",
      "timestamp": "2024-10-06T14:30:00.000Z",
      "duration": "0ms"
    },
    {
      "step": 2, 
      "from": "CONFIRMED",
      "to": "IN_PROGRESS",
      "timestamp": "2024-10-06T14:30:01.000Z",
      "duration": "1000ms"
    },
    {
      "step": 3,
      "from": "IN_PROGRESS",
      "to": "COMPLETED",
      "timestamp": "2024-10-06T14:30:02.000Z",
      "duration": "1000ms"
    }
  ],
  "summary": {
    "totalTime": "2000ms",
    "stepsExecuted": [
      "PENDING → CONFIRMED",
      "CONFIRMED → IN_PROGRESS",
      "IN_PROGRESS → COMPLETED"
    ]
  }
}
```

---

## 👑 Administración (Solo ADMIN)

### `GET /admin/users`
Listar todos los usuarios con filtros

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters (opcionales):**
- `role`: `USER` | `THERAPIST` | `ADMIN`
- `search`: Buscar por nombre o email
- `limit`: Número (default: 10)
- `offset`: Número (default: 0)

**Example:** `/admin/users?role=THERAPIST&search=maria&limit=5`

**Response (200):**
```json
{
  "users": [
    {
      "id": "cm1therapist456",
      "name": "Dr. María García",
      "email": "maria@lunna.com",
      "role": "THERAPIST",
      "image": "https://s3.amazonaws.com/therapist.jpg",
      "createdAt": "2024-09-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 5,
    "offset": 0,
    "hasNext": false,
    "hasPrevious": false
  }
}
```

---

### `GET /admin/sessions`
Listar todas las sesiones del sistema

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters (opcionales):**
- `status`: `PENDING` | `CONFIRMED` | `IN_PROGRESS` | `COMPLETED` | `CANCELLED`
- `userId`: Filtrar por ID de usuario
- `therapistId`: Filtrar por ID de terapeuta
- `date`: Fecha específica (YYYY-MM-DD)
- `limit`: Número (default: 20)
- `offset`: Número (default: 0)

**Response (200):**
```json
{
  "sessions": [
    {
      "id": "cm2session123",
      "date": "2024-10-15T15:00:00.000Z",
      "status": "CONFIRMED",
      "chimeLink": "https://chime.aws/meeting/abc123",
      "user": {
        "id": "cm1user123",
        "name": "Juan Pérez",
        "email": "juan@email.com"
      },
      "therapist": {
        "id": "cm1therapist456",
        "name": "Dr. María García",
        "email": "maria@lunna.com"
      },
      "createdAt": "2024-10-10T12:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0,
    "hasNext": true
  }
}
```

---

### `POST /admin/sessions`
Crear nueva sesión

**Headers:** `Authorization: Bearer <admin_token>`

**Request:**
```json
{
  "userId": "cm1user123",
  "therapistId": "cm1therapist456",
  "date": "2024-10-15T15:00:00.000Z"
}
```

**Response (201):**
```json
{
  "message": "Sesión creada exitosamente",
  "session": {
    "id": "cm2session789",
    "date": "2024-10-15T15:00:00.000Z",
    "status": "PENDING",
    "userId": "cm1user123",
    "therapistId": "cm1therapist456",
    "chimeLink": "https://chime.aws/meeting/xyz789",
    "user": {
      "name": "Juan Pérez",
      "email": "juan@email.com"
    },
    "therapist": {
      "name": "Dr. María García", 
      "email": "maria@lunna.com"
    },
    "createdAt": "2024-10-06T14:30:00.000Z"
  }
}
```

**Errores:**
- `400`: Usuario o terapeuta no existe, fecha inválida
- `409`: Conflicto de horario

---

### `GET /admin/session-logs`
Obtener todos los logs de cambios de estado

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters (opcionales):**
- `sessionId`: Filtrar por sesión específica
- `status`: Filtrar por estado
- `userId`: Filtrar por usuario que hizo el cambio
- `limit`: Número (default: 50)
- `offset`: Número (default: 0)

**Response (200):**
```json
{
  "logs": [
    {
      "id": "cm2log123",
      "sessionId": "cm2session456",
      "fromStatus": "CONFIRMED",
      "toStatus": "IN_PROGRESS", 
      "changedBy": {
        "id": "cm1therapist456",
        "name": "Dr. María García",
        "role": "THERAPIST"
      },
      "reason": "Sesión iniciada",
      "notes": "Paciente puntual",
      "createdAt": "2024-10-15T15:00:00.000Z",
      "session": {
        "id": "cm2session456",
        "date": "2024-10-15T15:00:00.000Z",
        "user": { "name": "Juan Pérez" },
        "therapist": { "name": "Dr. María García" }
      }
    }
  ],
  "pagination": {
    "total": 328,
    "limit": 50,
    "offset": 0,
    "hasNext": true
  },
  "stats": {
    "totalLogs": 328,
    "todayLogs": 15,
    "statusDistribution": {
      "CONFIRMED": 85,
      "IN_PROGRESS": 72,
      "COMPLETED": 150,
      "CANCELLED": 21
    }
  }
}
```

---

## 🔧 Sistema

### `GET /system/status` (Solo ADMIN)
Estado general del sistema y métricas

**Headers:** `Authorization: Bearer <admin_token>`

**Response (200):**
```json
{
  "timestamp": "2024-10-06T14:30:00.000Z",
  "systemHealth": {
    "status": "HEALTHY",
    "score": 85,
    "uptime": "15 days, 4 hours",
    "metrics": {
      "completionRate": 87.5,
      "cancellationRate": 8.2,
      "activeUsers": 156,
      "averageSessionDuration": "55 minutes"
    }
  },
  "users": {
    "total": 200,
    "active": 156,
    "byRole": {
      "USER": 150,
      "THERAPIST": 45,
      "ADMIN": 5
    },
    "newThisWeek": 12
  },
  "sessions": {
    "total": 1250,
    "byStatus": {
      "PENDING": 12,
      "CONFIRMED": 25, 
      "IN_PROGRESS": 3,
      "COMPLETED": 1180,
      "CANCELLED": 30
    },
    "upcoming": 37,
    "today": 8,
    "thisWeek": 45
  },
  "performance": {
    "averageResponseTime": "120ms",
    "errorRate": "0.2%",
    "databaseConnections": 8
  }
}
```

---

## 📤 Upload de Archivos

### `POST /upload/avatar`
Subir imagen de avatar

**Headers:** 
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request:** (Form Data)
- `file`: Archivo de imagen (jpg, png, gif)

**Response (200):**
```json
{
  "message": "Avatar subido exitosamente",
  "user": {
    "id": "cm1user123",
    "name": "Juan Pérez",
    "image": "https://s3.amazonaws.com/avatars/cm1user123.jpg"
  },
  "upload": {
    "url": "https://s3.amazonaws.com/avatars/cm1user123.jpg",
    "size": "245KB",
    "type": "image/jpeg"
  }
}
```

**Errores:**
- `400`: Archivo no válido, tamaño excedido
- `500`: Error en S3

---

## 🚨 Códigos de Error Comunes

| Código | Descripción | Acción |
|--------|-------------|---------|
| **400** | Bad Request - Datos inválidos | Verificar formato de datos |
| **401** | Unauthorized - Token inválido | Renovar token de autenticación |
| **403** | Forbidden - Sin permisos | Verificar rol del usuario |
| **404** | Not Found - Recurso no existe | Verificar ID del recurso |
| **409** | Conflict - Conflicto de datos | Resolver duplicado |
| **500** | Internal Error - Error del servidor | Contactar soporte |

---

## 📋 Estados de Sesión

| Estado | Descripción | Quién puede cambiar |
|--------|-------------|-------------------|
| **PENDING** | Esperando confirmación del terapeuta | Sistema (automático) |
| **CONFIRMED** | Confirmada y lista para iniciar | THERAPIST, ADMIN |
| **IN_PROGRESS** | Sesión en curso | THERAPIST, ADMIN |
| **COMPLETED** | Finalizada exitosamente | THERAPIST, ADMIN |
| **CANCELLED** | Cancelada por cualquier motivo | USER, THERAPIST, ADMIN |

### Flujo Normal:
```
PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
```

### Cancelaciones:
```
PENDING → CANCELLED
CONFIRMED → CANCELLED
IN_PROGRESS → CANCELLED
```

---

## 🔗 Ejemplos de Uso Frontend

### Login y manejo de token
```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
};

// Request autenticada
const fetchWithAuth = async (url) => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};
```

### Cambio de estado de sesión
```javascript
const updateSessionStatus = async (sessionId, status, reason) => {
  const response = await fetchWithAuth(`/api/sessions/${sessionId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, reason })
  });
  
  return response.json();
};

// Uso
await updateSessionStatus('cm2session123', 'IN_PROGRESS', 'Sesión iniciada');
```

### Obtener disponibilidad
```javascript
const getAvailability = async (date, therapistId) => {
  const params = new URLSearchParams({ date });
  if (therapistId) params.append('therapistId', therapistId);
  
  const response = await fetchWithAuth(`/api/therapists/availability?${params}`);
  return response.json();
};

// Uso
const availability = await getAvailability('2024-10-15', 'cm1therapist456');
```

---

**¡Documentación completa de endpoints para el equipo de frontend!** 🚀
