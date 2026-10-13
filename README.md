# Incret 360NET — Zona de Juegos

Aplicación de escritorio para Windows de juegos para eventos y dinámicas: **Trivia**, **Mímicas** y **Capitales de Venezuela**.

## Descargar

[![Descargar para Windows](https://img.shields.io/badge/Descargar%20para%20Windows-Instalador%20.exe-2ea44f?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/RonneyMB/Venezuelan-games/releases/latest)

1. Abre la página de **[Releases](https://github.com/RonneyMB/Venezuelan-games/releases/latest)**.
2. Descarga el archivo `Incret 360NET Setup *.exe`.
3. Ejecuta el instalador y elige la carpeta de destino.

> **Nota de Windows SmartScreen:** la aplicación no está firmada digitalmente, por lo que Windows puede mostrar *"Editor desconocido"*. Pulsa **Más información → Ejecutar de todos modos** para instalarla.

## Juegos incluidos

- **Trivia** — preguntas con sistema de proyección en pantalla.
- **Mímicas** — juego de actuación por equipos.
- **Capitales de Venezuela** — quiz de capitales por estado.
- **Tradicional** — juegos clásicos (Perinola y trivia).

## Desarrollo

Requisitos: [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install          # instalar dependencias
npm run dev          # modo web (Vite)
npm run electron:dev # modo escritorio (Electron)
```

## Compilar el instalador

```bash
npm run electron:build:win   # genera el .exe en release/
```

Cada tag `v*` empujado al repositorio genera automáticamente un Release con el instalador (GitHub Actions).
