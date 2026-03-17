# Misión Primeros Auxilios ESO · Modo simultáneo

Juego educativo de primeros auxilios para ESO, pensado para aula y competición por equipos.

## Cómo funciona

- El docente elige cuántos equipos van a jugar.
- Se escriben los nombres de los equipos.
- La partida tiene 10 rondas.
- En cada ronda:
  1. todos los equipos realizan el mismo reto
  2. el docente marca qué equipos lo superan
  3. todos responden la misma pregunta
  4. al terminar, el docente marca qué equipos han acertado
- Se suman los puntos y se actualiza el ranking automáticamente.

## Puntuación

- Reto superado: +20 puntos
- Pregunta acertada: +10 puntos

## Archivos

- `index.html` → estructura de la aplicación
- `style.css` → diseño visual
- `datos.js` → configuración, retos y preguntas
- `ruleta.js` → reto aleatorio
- `sonidos.js` → sonidos básicos
- `script.js` → lógica completa del juego

## Uso

1. Abre `index.html` en el navegador.
2. Elige el número de equipos.
3. Pulsa “Generar equipos”.
4. Escribe los nombres.
5. Pulsa “Empezar partida”.

## Personalización

En `datos.js` puedes cambiar:
- `TOTAL_RONDAS`
- `TIEMPO_TOTAL_SEGUNDOS`
- `TIEMPO_POR_PREGUNTA`
- `PUNTOS_RETO`
- `PUNTOS_PREGUNTA`
- los retos
- las preguntas
