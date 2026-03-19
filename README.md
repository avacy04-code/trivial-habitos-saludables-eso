# Misión Primeros Auxilios ESO · Pantalla dividida por equipos

Juego educativo de primeros auxilios para ESO, con varios equipos jugando a la vez en una sola pantalla.

## Funcionamiento

- El docente elige cuántos equipos quiere.
- La pantalla se divide automáticamente en tantas tarjetas como equipos haya.
- Cada equipo tiene su propio reto y su propia pregunta.
- Todos juegan al mismo tiempo.
- Cada equipo completa 10 rondas.
- En cada ronda:
  1. supera un reto
  2. responde una pregunta
- El ranking general se actualiza en vivo.

## Puntuación

- Reto superado: +20 puntos
- Pregunta correcta: +10 puntos

## Archivos

- `index.html` → estructura de la aplicación
- `style.css` → diseño visual
- `datos.js` → retos, preguntas y configuración
- `ruleta.js` → selección aleatoria
- `sonidos.js` → sonidos básicos
- `script.js` → lógica completa del juego
- `snake.js` → lógica y render del minijuego Snake clásico

## Uso

1. Abre `index.html` en el navegador.
2. Elige el número de equipos.
3. Pulsa “Generar equipos”.
4. Escribe los nombres.
5. Pulsa “Empezar partida”.

## Snake clásico

- Abre `index.html` en el navegador.
- En la pantalla inicial verás el panel `Snake clásico`.
- Usa flechas o `WASD` para empezar y mover la serpiente.
- En móvil puedes usar los botones táctiles.
- `Reiniciar` crea una partida nueva y `Pausar` detiene o reanuda el avance.

## Personalización

En `datos.js` puedes cambiar:
- `TOTAL_RONDAS`
- `TIEMPO_TOTAL_SEGUNDOS`
- `TIEMPO_POR_PREGUNTA`
- `PUNTOS_RETO`
- `PUNTOS_PREGUNTA`
- los retos
- las preguntas
