# Diseño Actual del Juego - Diagrama Visual

## Estructura Actual (Después de los Cambios)

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ 🇻🇪 CAPITALES DE VENEZUELA        [🔒] [🔊] [🏠]              │
│                                          ↑                      │
│                             Botón para activar Modo Admin       │
└─────────────────────────────────────────────────────────────────┘

                    ↓ (Cuando se activa Modo Admin) ↓

┌─────────────────────────────────────────────────────────────────┐
│ OVERLAY ADMIN (Panel Flotante - Posicionado en la parte superior)│
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🔐 Panel Administrador                                      │ │
│ │    Estado: Miranda    |    Capital: Los Teques              │ │
│ │                                                              │ │
│ │    [✓ Correcto]  [✗ Incorrecto]  [→ Avanzar]              │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
         ↓
         ↓ (Debajo del overlay está la vista del juego)
         ↓

┌─────────────────────────────────────────────────────────────────┐
│ VISTA DEL JUEGO (Lo que se comparte por videoconferencia)      │
│                                                                  │
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │ 📍 UBICACIÓN         │      │ 🎯 Progreso: 5/24    │        │
│  │   TERRITORIAL        │      │ 🔥 Racha: 3          │        │
│  │                      │      │ ⏱️ Tiempo: 02:15     │        │
│  │   [Mapa SVG de       │      └──────────────────────┘        │
│  │    Venezuela con     │                                      │
│  │    estado resaltado] │      ┌──────────────────────┐        │
│  │                      │      │ 🎤                   │        │
│  │   Estado:            │      │ Esperando respuesta  │        │
│  │   MIRANDA            │      │ del jugador...       │        │
│  │                      │      │                      │        │
│  └──────────────────────┘      │ 💡 Activa Modo Admin │        │
│                                 │    con botón 🔒      │        │
│                                 └──────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

## Problema Identificado

**El overlay admin está diseñado para flotar SOBRE la vista del juego**, pero ambos están en la **misma ventana del navegador**.

Cuando compartes la pantalla por videoconferencia:
- **Admin ve**: Overlay + Vista del juego (ambos en su pantalla)
- **Jugador remoto ve**: Solo la vista del juego (si compartes solo esa parte) O todo (si compartes pantalla completa)

## Solución Propuesta

### Opción 1: Overlay Siempre Visible Cuando Modo Admin Está Activo
- El overlay flota sobre el juego
- Admin puede ver ambos simultáneamente
- Jugador remoto (por videoconferencia) solo ve el juego si compartes la ventana correcta

### Opción 2: Dos Ventanas Separadas
- Ventana 1: Vista del jugador (para compartir)
- Ventana 2: Panel del admin (solo para ti)
- Requiere sincronización entre ventanas (más complejo)

### Opción 3: Overlay en Posición Fija que NO Cubra el Juego
- El overlay se posiciona en un área que no interfiera con el mapa
- Ej: Lado derecho o inferior de la pantalla
- Ambos elementos visibles sin superposición

## ¿Cuál Prefieres?

Por favor, indícame:
1. ¿Cómo quieres que se vea la pantalla del admin?
2. ¿El overlay debe flotar sobre el juego o estar en un área separada?
3. ¿Vas a compartir pantalla completa o solo una ventana específica?

Con esta información puedo ajustar el diseño correctamente.
