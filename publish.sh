#!/usr/bin/env bash
#
# Publica el proyecto en GitHub y dispara la compilación del instalador.
#
#   ./publish.sh "mensaje del commit" v1.1.0
#
# El tag (v*) es lo que activa el workflow .github/workflows/release.yml,
# que compila el instalador de Windows y lo sube a GitHub Releases.
# Subir solo la rama main NO compila nada.

set -euo pipefail

cd "$(dirname "$0")"

MSG="${1:-}"
VERSION="${2:-}"

if [[ -z "$VERSION" ]]; then
  # Si no se pasa versión, se propone la siguiente sobre el último tag.
  LAST_TAG="$(git describe --tags --abbrev=0 2>/dev/null || echo 'v0.0.0')"
  VERSION="v$(( ${LAST_TAG#v} + 1 ))"
  echo "Version sugerida: $VERSION (usa '$VERSION' como segundo argumento para fijar otra)"
fi

if [[ -z "$MSG" ]]; then
  MSG="chore: actualizar proyecto ($VERSION)"
fi

echo "==> Commit:    $MSG"
echo "==> Version:   $VERSION"
echo

# --- 1. Build local de verificacion ------------------------------------------
echo "==> [1/5] Verificando que el proyecto compila..."
if [[ -d node_modules ]]; then
  npm run build
else
  echo "    node_modules no existe, ejecutando npm install..."
  npm install
  npm run build
fi
echo

# --- 2. Revisar cambios pendientes --------------------------------------------
echo "==> [2/5] Cambios pendientes:"
git status --short
echo

if [[ -z "$(git status --porcelain)" ]]; then
  echo "==> [3/5] No hay cambios, se omite el commit."
else
  # --- 3. Commit ---------------------------------------------------------------
  echo "==> [3/5] Creando commit..."
  git add -A
  git commit -m "$MSG"
fi
echo

# --- 4. Subir la rama ---------------------------------------------------------
echo "==> [4/5] Subiendo a origin/main..."
git push origin main
echo

# --- 5. Tag + push del tag (esto dispara la compilacion en GitHub) -------------
if git rev-parse "refs/tags/$VERSION" >/dev/null 2>&1; then
  echo "==> [5/5] El tag $VERSION ya existe localmente."
  echo "    Usa una version distinta para disparar una nueva compilacion."
  exit 1
fi

echo "==> [5/5] Creando y subiendo el tag $VERSION (dispara la compilacion)..."
git tag -a "$VERSION" -m "$MSG"
git push origin "$VERSION"

cat <<EOF

============================================================
 Listo. Sigue estos pasos en GitHub:

 1. Pestana "Actions" -> job "Build Windows Installer".
 2. Espera a que termine (build en windows-latest, ~2-5 min).
 3. Pestana "Releases" -> descarga el instalador .exe.

 Compilacion local (opcional, requiere Wine en macOS):
   npm run electron:build:win
============================================================
EOF