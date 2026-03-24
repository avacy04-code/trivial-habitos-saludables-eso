# Misión Primeros Auxilios ESO · Versión 3.6 ULTRA mejorada

Juego educativo de primeros auxilios para ESO, pensado para jugar por equipos en una sola pantalla y por turnos.

## Funcionamiento

- El docente elige cuántos equipos quiere.
- Cada equipo juega **por turnos**, no simultáneamente.
- En cada turno, el equipo debe:
  1. realizar **1 reto**
  2. responder **5 preguntas**
- Cuando termina un equipo, pasa al siguiente.
- Cuando juegan todos los equipos, se completa una ronda.
- La partida tiene un máximo de **10 rondas**.
- Al final se muestra la clasificación general y un informe de resultados.

## Mecánica actual

- **Tiempo total de partida:** 30 minutos
- **Tiempo por reto:** 45 segundos
- **Tiempo por pregunta:** 20 segundos
- **Rondas máximas:** 10
- **Preguntas por turno:** 5

## Puntuación

- **Reto superado:** +20 puntos
- **Pregunta correcta:** +10 puntos
- **Reto no superado por tiempo:** no suma puntos y se registra como reto no superado

## Comodines

Cada equipo dispone de estos comodines:

- **x2 Doble puntuación**  
  Duplica la puntuación de la siguiente pregunta correcta.

- **⏸ Congelar tiempo**  
  Detiene el temporizador de la pregunta durante 5 segundos.

- **⏭ Pasar pregunta**  
  Salta una pregunta sin penalización.

- **🎯 50%**  
  Elimina dos respuestas incorrectas de la pregunta actual.

Los comodines, una vez usados, desaparecen.

## Informe final

Al final de la partida se muestra para cada equipo:

- número de preguntas acertadas
- número de preguntas falladas
- número de retos superados
- número de retos no superados
- nota final de **0 a 10**

La nota se calcula así:

- `nota = (aciertos / total de preguntas respondidas) × 10`

## Archivos

- `index.html` → estructura principal del juego
- `style.css` → diseño visual de la aplicación
- `datos.js` → configuración general, retos, preguntas y puntuaciones
- `sonidos.js` → sonidos del juego
- `script.js` → lógica completa de turnos, puntuación, temporizadores y comodines
- `README.md` → documentación del proyecto

## Uso

1. Abre `index.html` en el navegador.
2. Elige el número de equipos.
3. Pulsa **Generar equipos**.
4. Escribe los nombres de los equipos.
5. Pulsa **Empezar partida**.
6. Juega por turnos hasta completar las rondas o hasta que se agote el tiempo total.

## Personalización

En `datos.js` puedes cambiar fácilmente:

- `TOTAL_RONDAS`
- `PREGUNTAS_POR_TURNO`
- `TIEMPO_TOTAL_SEGUNDOS`
- `TIEMPO_POR_RETO`
- `TIEMPO_POR_PREGUNTA`
- `PUNTOS_RETO`
- `PUNTOS_PREGUNTA`
- la lista de `retos`
- la lista de `preguntas`

## Requisitos

Para que el proyecto funcione correctamente, deben estar en la misma carpeta:

- `index.html`
- `style.css`
- `datos.js`
- `sonidos.js`
- `script.js`

Y además debe existir una carpeta:

- `img/`

Dentro de `img/` deben estar las imágenes usadas por retos y preguntas, por ejemplo:

- `pls.jpg`
- `rcp.jpg`
- `112.jpg`
- `hemorragia.jpg`
- `quemadura.jpg`
- `fractura.jpg`
- `esguince.jpg`
- `botiquin.jpg`
- `convulsion.jpg`
- `herida.jpg`

## Observaciones

- Los equipos no juegan a la vez.
- Los retos y preguntas se asignan de forma aleatoria.
- El ranking se actualiza durante la partida.
- Gana el equipo con mayor puntuación al final.
