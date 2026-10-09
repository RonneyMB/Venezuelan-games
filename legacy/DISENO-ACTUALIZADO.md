# Diseño Actualizado del Juego - Overlay en Lado Derecho

## Nueva Estructura (Overlay Compacto a la Derecha)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                  │
│ 🇻🇪 CAPITALES DE VENEZUELA                    [🔒] [🔊] [🏠]          │
│                                                  ↑                      │
│                                     Botón para activar Modo Admin       │
└─────────────────────────────────────────────────────────────────────────┘

          ┌──────────────────────────────────────────────┐
          │ OVERLAY ADMIN (Lado Derecho - Compacto)     │
          │                                              │
          │ 🔐 Panel Admin                    [✕]        │
          │                                              │
          │ ┌──────────────────────────────────────────┐│
          │ │ Estado Actual                            ││
          │ │ Miranda                                  ││
          │ └──────────────────────────────────────────┘│
          │                                              │
          │ ┌──────────────────────────────────────────┐│
          │ │ Capital Correcta ⭐                      ││
          │ │ Los Teques                               ││
          │ └──────────────────────────────────────────┘│
          │                                              │
          │ [      ✓ Correcto      ]                   │
          │ [      ✗ Incorrecto    ]                   │
          │ [      → Avanzar       ]                   │
          │                                              │
          │ ⌨️ Atajos:                                  │
          │ [C] Correcto  [I] Incorrecto  [A] Avanzar  │
          └──────────────────────────────────────────────┘
                                ↓
                                ↓ (Flota sobre el lado derecho)
                                ↓

┌─────────────────────────────────────────────────────────────────────────┐
│ VISTA DEL JUEGO (Ocupa todo el ancho menos el overlay)                 │
│                                                                          │
│  ┌──────────────────────────────┐      ┌──────────────────────────┐    │
│  │ 📍 UBICACIÓN TERRITORIAL     │      │ 🎯 Progreso: 5/24        │    │
│  │                              │      │ 🔥 Racha: 3              │    │
│  │   [Mapa SVG de Venezuela     │      │ ⏱️ Tiempo: 02:15         │    │
│  │    con estado resaltado]     │      └──────────────────────────┘    │
│  │                              │                                      │
│  │   Estado:                    │      ┌──────────────────────────┐    │
│  │   MIRANDA                    │      │ 🎤                       │    │
│  │                              │      │ Esperando respuesta      │    │
│  │                              │      │ del jugador...           │    │
│  └──────────────────────────────┘      │                          │    │
│                                         │ 💡 Activa Modo Admin    │    │
│                                         │    con botón 🔒         │    │
│                                         └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

## Características del Nuevo Diseño

### Overlay Admin (Lado Derecho)
- ✅ **Posición**: Fijo en el lado derecho de la pantalla
- ✅ **Ancho**: 384px (compacto, no ocupa todo el ancho)
- ✅ **Altura**: Automática (según contenido)
- ✅ **Fondo**: Semi-transparente con blur (glass-panel)
- ✅ **Borde**: Amber con sombra y brillo
- ✅ **Animación**: Entra desde la derecha al activar

### Contenido del Overlay
1. **Header del Panel**:
   - Ícono 🔐
   - Título "Panel Admin"
   - Botón ✕ para cerrar

2. **Información del Estado**:
   - Card 1: Estado actual (texto blanco)
   - Card 2: Capital correcta (texto amber, destacado con borde)

3. **Botones de Validación** (Apilados verticalmente):
   - ✓ Correcto (verde)
   - ✗ Incorrecto (rojo)
   - → Avanzar (amber)

4. **Atajos de Teclado**:
   - Muestra las teclas C, I, A
   - Estilo visual de teclas de teclado

### Vista del Juego
- **Ocupa**: Todo el ancho de la pantalla
- **Layout**: 2 columnas (mapa + scoreboard/espera)
- **Nota**: El overlay flota sobre el lado derecho, pero no bloquea el contenido principal

## Ventajas del Nuevo Diseño

1. **No bloquea el contenido principal**: El mapa y el scoreboard son completamente visibles
2. **Accesible**: El admin puede ver la capital y los botones sin mover la vista
3. **Compacto**: Solo 384px de ancho, deja espacio para el juego
4. **Profesional**: Diseño limpio y organizado
5. **Cierre rápido**: Botón ✕ para cerrar el panel

## Cómo Usar

1. Abre `capitales.html` en el navegador
2. Selecciona modo de juego
3. Click en 🔒 (header)
4. El overlay aparece en el lado derecho
5. Admin ve la capital correcta en el overlay
6. Jugador responde oralmente
7. Admin presiona botón o usa atajo (C/I/A)
8. Feedback visual para ambos
9. Admin presiona "Avanzar" o tecla A
10. Continúa al siguiente estado

## Compartir Pantalla

### Opción 1: Compartir Pantalla Completa
- Admin ve: Overlay + Juego (ambos)
- Jugador remoto ve: Overlay + Juego (ambos) ⚠️
- **Problema**: El jugador podría ver el overlay si mira rápido

### Opción 2: Compartir Solo la Ventana del Navegador (Recomendado)
- Admin ve: Todo en su pantalla
- Configura la videoconferencia para compartir solo una región
- Jugador remoto ve: Solo el lado izquierdo (juego)
- **Ventaja**: El overlay queda fuera del área compartida

### Opción 3: Usar Dos Monitores
- Monitor 1: Vista del juego (para compartir)
- Monitor 2: Overlay admin + controles (solo para ti)
- **Nota**: Requiere modificar el código para tener dos ventanas separadas

## Ajustes Posicionales

Si necesitas mover el overlay, puedes editar el CSS:

```css
.admin-overlay {
    position: fixed;
    top: 70px;        /* Distancia desde arriba */
    right: 20px;      /* Distancia desde la derecha */
    max-width: 500px; /* Ancho máximo */
}
```

**Otras posiciones posibles**:
- `left: 20px;` → Lado izquierdo
- `bottom: 20px;` → Abajo
- `top: 50%; left: 50%; transform: translate(-50%, -50%);` → Centro

## Próximos Pasos

1. Probar el nuevo diseño compacto
2. Verificar que el overlay no bloquee información importante
3. Ajustar posición si es necesario
4. Probar compartir pantalla por videoconferencia
5. Confirmar que el jugador remoto no ve el overlay
