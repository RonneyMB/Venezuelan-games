# Guía Rápida de Uso - Juego de Capitales con Modo Administrador

## Diagrama de la Interfaz

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER: 🇻🇪 CAPITALES DE VENEZUELA    [🔒] [🔊] [🏠]              │
│                                               ↑                     │
│                                    Botón Modo Admin                │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ OVERLAY ADMIN (Solo visible cuando se activa el Modo Admin)        │
│ ┌───────────────────────────────────────────────────────────────┐  │
│ │ 🔐 Estado: Miranda | Capital: Los Teques                     │  │
│ │    [✓ Correcto]  [✗ Incorrecto]  [→ Avanzar]                │  │
│ └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ VISTA DEL JUGADOR (Lo que se comparte por videoconferencia)        │
│                                                                      │
│   ┌──────────────────────┐      ┌──────────────────────┐           │
│   │ 📍 UBICACIÓN         │      │ 🎯 Progreso: 5/24    │           │
│   │   TERRITORIAL        │      │ 🔥 Racha: 3          │           │
│   │                      │      │ ⏱️ Tiempo: 02:15     │           │
│   │   [Mapa SVG de       │      └──────────────────────┘           │
│   │    Venezuela con     │                                          │
│   │    estado resaltado] │      ┌──────────────────────┐           │
│   │                      │      │ 🎤                   │           │
│   │   Estado:            │      │ Esperando respuesta  │           │
│   │   MIRANDA            │      │ del jugador...       │           │
│   │                      │      │                      │           │
│   └──────────────────────┘      │ 💡 Activa Modo Admin │           │
│                                  │    con botón 🔒      │           │
│                                  └──────────────────────┘           │
└─────────────────────────────────────────────────────────────────────┘
```

## Flujo de Uso Paso a Paso

### 1. Inicio
```
┌────────────────────────────────────┐
│   🗺️ ¿Te sabes las 24 Capitales   │
│   de Venezuela?                    │
│                                    │
│   [🧭 Modo Práctica]              │
│   [⏱️ Contrarreloj]               │
│                                    │
│   💡 Tip: El administrador...    │
└────────────────────────────────────┘
```
**Acción**: Selecciona un modo de juego

### 2. Activar Modo Admin
```
Header: [🔒] ← Click aquí
         ↓
        [🔓] (Se activa)
```
**Resultado**: Aparece el overlay admin en la parte superior

### 3. Compartir Pantalla
- Inicia videoconferencia (Zoom, Meet, Teams, etc.)
- Comparte tu pantalla completa
- El jugador remoto verá SOLO la vista del display (sin el overlay)

### 4. Ronda de Juego
```
Admin ve:                    Jugador ve:
┌─────────────────────┐     ┌─────────────────────┐
│ Estado: Miranda     │     │ Estado: Miranda     │
│ Capital: Los Teques │     │ (en el mapa)        │
│                     │     │                     │
│ [✓] [✗] [→]        │     │ 🎤 Esperando...     │
└─────────────────────┘     └─────────────────────┘

Admin escucha: "¡Los Teques!"
Admin presiona: [✓ Correcto]
```

### 5. Feedback Visual
```
Ambos ven en sus pantallas:

┌─────────────────────────────┐
│ ✓ ¡Correcto! 🎉             │
│ La capital de Miranda       │
│ es Los Teques.              │
│                             │
│ [Confetti cayendo] 🎊      │
└─────────────────────────────┘
```

### 6. Avanzar
```
Admin presiona: [→ Avanzar]
                o tecla A/Espacio

Resultado:
- Se oculta el feedback
- Se resalta el siguiente estado
- Overlay admin se actualiza con nueva capital
```

### 7. Final del Juego
```
┌─────────────────────────────┐
│ 🏆 ¡Desafío Completado!     │
│                             │
│ Aciertos: 20/24             │
│ Precisión: 83%              │
│ Tiempo: 145s                │
│                             │
│ [JUGAR DE NUEVO 🔄]        │
└─────────────────────────────┘
```

## Atajos de Teclado (Modo Admin)

| Tecla | Acción |
|-------|--------|
| **C** | Marcar como Correcto |
| **I** | Marcar como Incorrecto |
| **A** o **Espacio** | Avanzar al siguiente estado |

**Nota**: Los atajos solo funcionan cuando:
- El Modo Admin está activo (🔓)
- El juego está en ejecución (pantalla de juego visible)

## Consejos Prácticos

### Para el Administrador
1. **Posición del overlay**: El overlay está en la parte superior, asegúrate de que tu pantalla sea lo suficientemente grande para verlo cómodamente
2. **Uso de atajos**: Las teclas C/I/A son más rápidas que hacer click en los botones
3. **Timing**: Espera a que el jugador termine de hablar antes de validar
4. **Feedback**: Sé claro al indicar si es correcto o incorrecto

### Para el Jugador
1. **Audio claro**: Asegúrate de que tu micrófono capture bien tu voz
2. **Pronunciación**: Pronuncia claramente el nombre de la capital
3. **Paciencia**: El administrador necesita escuchar y validar manualmente
4. **Alternativas**: Algunas capitales tienen nombres alternativos (ej: "San Fernando" o "San Fernando de Apure")

## Solución de Problemas

### El overlay no aparece
- Verifica que el botón 🔒 esté en el header
- Haz click en el botón 🔒
- Debería cambiar a 🔓 y aparecer el overlay

### El jugador ve el overlay
- Esto NO debería pasar si estás compartiendo la pantalla correctamente
- El overlay está diseñado para estar en una posición que solo el admin vea
- Si el jugador lo ve, ajusta qué ventana/compartir en la videoconferencia

### Los atajos de teclado no funcionan
- Verifica que el Modo Admin esté activo (🔓)
- Verifica que estés en la pantalla de juego (no en inicio o resultados)
- Asegúrate de que la ventana del navegador esté enfocada

### El feedback no aparece para el jugador
- El feedback es visual y aparece en la vista compartida
- Asegúrate de que el jugador esté viendo la pantalla compartida
- Verifica que los sonidos estén activados (botón 🔊)

## Características Técnicas

- **Archivo**: `capitales.html` (standalone)
- **Tamaño**: ~722 líneas
- **Dependencias**: Tailwind CSS, canvas-confetti (CDN)
- **Navegadores**: Chrome, Firefox, Safari, Edge (modernos)
- **Responsive**: Sí (funciona en desktop y tablets)
