# Juego de Capitales de Venezuela - Modo Administrador

## Resumen de Cambios

El juego ha sido modificado para funcionar con una dinámica de **dos participantes**: un **administrador** y un **jugador remoto**.

## Nueva Dinámica

### Configuración
- **Pantalla compartida**: Ambos participantes ven la misma pantalla por videoconferencia
- **Jugador remoto**: Solo ve el display con el estado resaltado y responde oralmente
- **Administrador**: Controla el juego desde un panel overlay visible solo para él

### Flujo de Juego
1. Admin inicia el juego y selecciona el modo (Práctica/Contrarreloj)
2. Admin activa el **Modo Administrador** con el botón 🔒 en el header
3. Se muestra el panel overlay con la capital correcta
4. Jugador ve el estado y responde oralmente
5. Admin escucha y valida con los botones:
   - **✓ Correcto** (tecla C): Marca como acertado
   - **✗ Incorrecto** (tecla I): Marca como fallido
   - **→ Avanzar** (tecla A o Espacio): Avanza al siguiente estado
6. Ambos ven el feedback visual (animación + sonido)
7. Se repite hasta completar los 24 estados

## Interfaz

### Vista del Jugador (Display/Compartida)
- Mapa SVG de Venezuela con estado resaltado
- Nombre del estado actual
- Scoreboard: Progreso, Racha, Tiempo
- Mensaje "Esperando respuesta del jugador..."
- Feedback visual al validar

### Vista del Administrador (Overlay - Solo visible para admin)
- Panel superior con fondo semi-transparente
- Estado actual y capital correcta (texto grande)
- Botones de validación: Correcto, Incorrecto, Avanzar
- Accesible con botón 🔒 en el header

## Atajos de Teclado (Modo Admin)

Cuando el Modo Administrador está activo y el juego está en ejecución:
- **C**: Marcar como Correcto
- **I**: Marcar como Incorrecto
- **A** o **Espacio**: Avanzar al siguiente estado

## Características Mantenidas

- ✅ Sonidos (correcto, incorrecto, click)
- ✅ Confetti al acertar
- ✅ Temporizador (modo Contrarreloj)
- ✅ Estadísticas finales (aciertos, precisión, tiempo)
- ✅ Mapa SVG interactivo
- ✅ Diseño glassmorphism
- ✅ Animaciones (shake, pop)

## Características Eliminadas

- ❌ Input de texto del jugador
- ❌ Botón "Pedir Pista"
- ❌ Botón "Saltar Estado"
- ❌ Validación automática de respuestas

## Uso

1. Abre `capitales.html` en un navegador
2. Selecciona el modo de juego (Práctica o Contrarreloj)
3. Activa el Modo Administrador con el botón 🔒
4. Comparte tu pantalla por videoconferencia
5. El jugador remoto verá solo el mapa y el nombre del estado
6. Escucha la respuesta oral del jugador
7. Valida con los botones o atajos de teclado
8. Avanza al siguiente estado manualmente

## Notas Técnicas

- **Archivo standalone**: No requiere backend ni dependencias externas
- **Sincronización**: Al ser la misma pantalla compartida, no necesita sincronización en tiempo real
- **Seguridad**: La capital correcta NUNCA aparece en la vista compartida
- **Discreción**: El botón de Modo Admin es discreto (🔒/🔓)
