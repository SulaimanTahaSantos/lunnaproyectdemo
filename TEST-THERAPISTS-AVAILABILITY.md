# 🕐 TEST: Endpoint /api/therapists/availability - Disponibilidad de Horarios

## 📋 DESCRIPCIÓN
Endpoint que calcula y muestra los slots de tiempo disponibles para un terapeuta en una fecha específica, considerando las sesiones ya agendadas.

---

## 🚀 ENDPOINT

```
GET /api/therapists/availability
```

### **Query Parameters (requeridos):**
- `therapistId` - ID del terapeuta
- `date` - Fecha en formato YYYY-MM-DD

### **Ejemplo de URL:**
```
GET /api/therapists/availability?therapistId=THERAPIST_ID_HERE&date=2025-12-20
```

---

## 🧪 CASOS DE PRUEBA

### **1. Consulta básica de disponibilidad**
```bash
GET http://localhost:3000/api/therapists/availability?therapistId=cmgb24y380002finojdl10xbg&date=2025-12-20

# Respuesta esperada:
{
  "therapist": {
    "id": "cmgb24y380002finojdl10xbg",
    "name": "Dra. María López",
    "email": "maria@lunna.com",
    "image": "https://example.com/avatar.jpg"
  },
  "date": "2025-12-20",
  "dayOfWeek": "viernes",
  "availability": {
    "slots": [
      {
        "time": "09:00",
        "available": true,
        "status": "available", 
        "session": null,
        "bookingUrl": "/api/sessions/book?therapistId=123&time=09:00&date=2025-12-20"
      },
      {
        "time": "10:00",
        "available": false,
        "status": "occupied",
        "session": {
          "sessionId": "session_123",
          "patientName": "Juan Pérez", 
          "patientImage": "avatar.jpg",
          "chimeLink": "chime://meeting?..."
        },
        "bookingUrl": null
      },
      {
        "time": "11:00", 
        "available": true,
        "status": "available",
        "session": null,
        "bookingUrl": "/api/sessions/book?therapistId=123&time=11:00&date=2025-12-20"
      }
      // ... más slots hasta 18:00
    ],
    "summary": {
      "totalSlots": 10,
      "availableSlots": 8, 
      "occupiedSlots": 2,
      "occupancyRate": 20,
      "availabilityRate": 80
    }
  },
  "workingHours": {
    "start": "09:00",
    "end": "18:00", 
    "timezone": "UTC",
    "sessionDuration": "60 minutes"
  },
  "metadata": {
    "generatedAt": "2025-10-06T...",
    "isToday": false,
    "daysFromNow": 75
  }
}
```

### **2. Día completamente disponible**
```bash
GET http://localhost:3000/api/therapists/availability?therapistId=THERAPIST_ID&date=2025-12-25

# Todos los slots con "available": true
```

### **3. Día muy ocupado**
```bash
# Después de crear varias sesiones
GET http://localhost:3000/api/therapists/availability?therapistId=THERAPIST_ID&date=2025-12-20

# Varios slots con "available": false y detalles de sesiones
```

---

## ❌ CASOS DE ERROR

### **Sin therapistId:**
```bash
GET http://localhost:3000/api/therapists/availability?date=2025-12-20

# Respuesta: 400
{
  "error": "therapistId es requerido",
  "example": "/api/therapists/availability?therapistId=123&date=2025-12-20"
}
```

### **Sin date:**
```bash
GET http://localhost:3000/api/therapists/availability?therapistId=123

# Respuesta: 400
{
  "error": "date es requerido (formato: YYYY-MM-DD)",
  "example": "/api/therapists/availability?therapistId=123&date=2025-12-20"
}
```

### **Formato de fecha inválido:**
```bash
GET http://localhost:3000/api/therapists/availability?therapistId=123&date=invalid-date

# Respuesta: 400
{
  "error": "Formato de fecha inválido. Use YYYY-MM-DD",
  "received": "invalid-date"
}
```

### **Terapeuta no encontrado:**
```bash
GET http://localhost:3000/api/therapists/availability?therapistId=NONEXISTENT&date=2025-12-20

# Respuesta: 404
{
  "error": "Terapeuta no encontrado o no tiene rol THERAPIST",
  "therapistId": "NONEXISTENT"
}
```

### **Fecha en el pasado:**
```bash
GET http://localhost:3000/api/therapists/availability?therapistId=123&date=2020-01-01

# Respuesta: 400
{
  "error": "No se puede consultar disponibilidad de fechas pasadas",
  "requestedDate": "2020-01-01",
  "currentDate": "2025-10-06"
}
```

---

## 🔍 CARACTERÍSTICAS PRINCIPALES

### **🕐 Horarios de Trabajo:**
- **Inicio:** 09:00 AM
- **Fin:** 06:00 PM  
- **Duración por slot:** 60 minutos
- **Total slots:** 10 por día

### **📊 Estadísticas incluidas:**
- Total de slots disponibles
- Slots ocupados vs libres
- Porcentaje de ocupación  
- Porcentaje de disponibilidad

### **📅 Información de sesiones ocupadas:**
- ID de la sesión
- Nombre del paciente
- Avatar del paciente
- Link de Chime para la reunión

### **🎯 URLs de reserva:**
- Para slots disponibles, incluye URL directa para reservar
- Facilita la integración con frontend

---

## 🚀 FLUJO DE INTEGRACIÓN CON FRONTEND

### **Paso 1: Obtener lista de terapeutas**
```bash
GET /api/therapists
```

### **Paso 2: Consultar disponibilidad**
```bash
GET /api/therapists/availability?therapistId={ID}&date={FECHA}
```

### **Paso 3: Mostrar calendario visual**
```javascript
// Ejemplo de uso en React
const slots = availabilityData.availability.slots;
slots.map(slot => (
  <TimeSlot 
    time={slot.time}
    available={slot.available}
    occupied={slot.session}
    bookingUrl={slot.bookingUrl}
  />
))
```

### **Paso 4: Reservar slot disponible**
```bash
POST /api/sessions/book
{
  "therapistId": "...",
  "date": "2025-12-20T10:00:00.000Z"
}
```

---

## 🎯 CASOS DE USO DEL FRONTEND

### **📅 Vista de calendario:**
- Mostrar disponibilidad de múltiples días
- Código de colores: Verde=libre, Rojo=ocupado
- Tooltips con información de sesiones

### **🕐 Selector de horario:**
- Lista de slots disponibles para reservar
- Deshabilitador automático de slots ocupados
- Información del terapeuta

### **📊 Dashboard del terapeuta:**
- Resumen de ocupación diaria/semanal
- Lista de próximas sesiones
- Estadísticas de disponibilidad

---

## ✅ CRITERIOS DE ACEPTACIÓN

- ✅ **Cálculo correcto:** Identifica slots ocupados vs disponibles
- ✅ **Integración con DB:** Lee sesiones existentes correctamente  
- ✅ **Validaciones:** Parámetros requeridos y formatos
- ✅ **Horarios realistas:** 9 AM - 6 PM, slots de 1 hora
- ✅ **Información completa:** Detalles de sesiones y estadísticas
- ✅ **Frontend-ready:** URLs de reserva y datos estructurados
- ✅ **Manejo de errores:** Respuestas claras para todos los casos
- ✅ **Performance:** Respuesta rápida con caché deshabilitado

**🎉 ENDPOINT DE DISPONIBILIDAD COMPLETADO!**