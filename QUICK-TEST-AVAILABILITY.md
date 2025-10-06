# 🚀 QUICK TEST - /api/therapists/availability

## **Paso 1: Obtener ID de terapeuta**
```bash
# Listar terapeutas para obtener un ID
GET http://localhost:3000/api/therapists

# O usar el admin dashboard para ver usuarios con role THERAPIST
GET http://localhost:3000/api/admin/users?role=THERAPIST
Authorization: Bearer ADMIN_TOKEN
```

## **Paso 2: Probar disponibilidad básica**
```bash
# Reemplaza THERAPIST_ID con un ID real
GET http://localhost:3000/api/therapists/availability?therapistId=THERAPIST_ID_HERE&date=2025-12-20
```

## **Paso 3: Probar para mañana** 
```bash
GET http://localhost:3000/api/therapists/availability?therapistId=THERAPIST_ID_HERE&date=2025-10-07
```

## **Paso 4: Crear sesión y ver cambio**
```bash
# Crear una sesión primero
POST http://localhost:3000/api/admin/sessions
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "userId": "USER_ID_HERE", 
  "therapistId": "THERAPIST_ID_HERE",
  "date": "2025-12-20T10:00:00.000Z"
}

# Luego consultar disponibilidad otra vez
GET http://localhost:3000/api/therapists/availability?therapistId=THERAPIST_ID_HERE&date=2025-12-20
# Ahora deberías ver el slot 10:00 ocupado
```

## **Paso 5: Probar casos de error**
```bash
# Sin therapistId
GET http://localhost:3000/api/therapists/availability?date=2025-12-20

# Fecha inválida
GET http://localhost:3000/api/therapists/availability?therapistId=123&date=invalid

# Fecha pasada
GET http://localhost:3000/api/therapists/availability?therapistId=123&date=2020-01-01
```

---

## 📊 **RESPUESTA ESPERADA (slots disponibles):**
```json
{
  "therapist": { "id": "...", "name": "Dr. García" },
  "date": "2025-12-20",
  "availability": {
    "slots": [
      { "time": "09:00", "available": true, "status": "available" },
      { "time": "10:00", "available": false, "status": "occupied", "session": {...} },
      // ... más slots
    ],
    "summary": {
      "totalSlots": 10,
      "availableSlots": 9, 
      "occupiedSlots": 1,
      "occupancyRate": 10,
      "availabilityRate": 90
    }
  }
}
```

---

## ✅ **ENDPOINT COMPLETADO:**

- ✅ **Ruta:** `/api/therapists/availability`
- ✅ **Parámetros:** `therapistId`, `date` (requeridos)
- ✅ **Horarios:** 9 AM - 6 PM (10 slots de 1 hora)
- ✅ **Integración:** Lee sesiones existentes de la DB
- ✅ **Estadísticas:** Ocupación, disponibilidad, totales
- ✅ **Validaciones:** Fecha, terapeuta, formato
- ✅ **Frontend-ready:** URLs de reserva incluidas

🎉 **ISSUE #7 COMPLETADO EXITOSAMENTE!**

**Próximo:** Issue #8 - Estados de sesiones (`/api/sessions/{id}/status`)