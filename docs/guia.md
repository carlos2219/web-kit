# Guía paso a paso

Para quien nunca ha hecho un sitio web. Lleva unos 20 minutos de preparación, una sola vez, y después cada sitio arranca con un comando.

## 1. Preparar tu computadora (una sola vez)

1. **Node.js:** descarga la versión LTS desde [nodejs.org](https://nodejs.org) e instálala con las opciones por defecto.
2. **Git:** descárgalo desde [git-scm.com](https://git-scm.com) e instálalo con las opciones por defecto.
3. **Claude Code:** sigue las instrucciones de [claude.com/claude-code](https://claude.com/claude-code). Necesitas una cuenta de Claude.
4. **web-kit:** abre una terminal (en Windows, "Terminal" o "PowerShell") y escribe:

   ```bash
   claude plugin marketplace add carlos2219/web-kit
   claude plugin install web-kit@web-kit
   ```

5. **Chrome (recomendado):** instala la extensión Claude in Chrome desde la Chrome Web Store. Después abre Claude Code con `claude --chrome`. Así Claude puede "ver" tu sitio y compararlo con la referencia.

Para comprobar que todo quedó instalado, escribe `node -v`, `git --version` y `claude plugin list` en la terminal. Cada uno debe responder sin error, y la lista de plugins debe incluir `web-kit`.

## 2. Tu primer sitio

1. Crea una carpeta para tus sitios, por ejemplo `Documentos/sitios`. Abre la terminal ahí y ejecuta `claude --chrome`.
2. Escribe `/web-kit:new-site` y cuenta tu idea. Por ejemplo:

   > Un sitio para mi taller mecánico en Cuenca. Quiero que la gente me escriba por WhatsApp para agendar.

3. Responde las preguntas. Casi siempre son de opción múltiple, con una marcada como "(Recomendado)". Si dudas, elige esa. Siempre puedes escribir tu propia respuesta.
4. **Corrige, no redactes.** Claude te mostrará borradores (el brief, los textos). Dile qué cambiar en tus palabras: *"suena muy formal"*, *"no ofrecemos pintura"*, *"el cliente típico es una flota de taxis"*.
5. **Elige el diseño viendo.** Verás 3 direcciones con capturas. Elige una, o combina: *"los colores de la 2 con la tipografía de la 1"*.
6. **Opina sobre lo construido.** Cuando veas capturas, di lo que sientes, aunque sea vago (*"se ve apagado"*). Claude lo convierte en opciones concretas.
7. **Publica.** Al final, Claude te pide crear una cuenta gratis de Cloudflare. Se abre en tu navegador y solo tienes que seguir los pasos. Tu sitio queda en `https://tusitio.pages.dev`.

Si cierras Claude Code a mitad de camino, abre la terminal en la carpeta del sitio, ejecuta `claude --chrome` y escribe `/web-kit:new-site`. Retoma donde quedaste.

## 3. Después de publicar

Abre Claude Code en la carpeta del sitio y pide en lenguaje normal:

| Quieres | Escribe |
|---|---|
| Cambiar un texto | *"Cambia el título del inicio por …"* |
| Agregar una página | *"Agrega una página de preguntas frecuentes"* |
| Subir los cambios | *"Publica los cambios"* |
| Tu propio dominio | *"Quiero un dominio propio"*. Claude te muestra el precio y los pasos. |
| Formulario de contacto | *"Agrega un formulario de contacto"* (gratis hasta 250 mensajes al mes) |
| Aparecer en Google | *"Quiero aparecer en Google"*. Claude te guía con Search Console y, si atiendes una zona, con tu perfil de Google Business (gratis). |
| Ver cuántas visitas tienes | *"Activa las estadísticas"* (gratis) |
| Imágenes o animaciones generadas | *"Quiero mejores imágenes para el inicio"*. Primero te dice cuánto costaría. |

## 4. Preguntas frecuentes

**¿Cuánto cuesta?** El sitio publicado, nada. Pagas tu suscripción de Claude, y opcionalmente un dominio (unos 10–15 USD al año) o créditos de imágenes (Higgsfield, desde unos 9 USD al mes, y puedes pagar solo un mes).

**¿Claude puede gastar mi dinero?** No. Nunca compra, crea cuentas ni gasta créditos sin tu confirmación explícita.

**Tengo fotos y videos de mi trabajo, ¿sirven?** Son lo mejor que puedes poner. Guarda los originales en la carpeta `media-originals/` del sitio. Claude los comprime para la web y les quita los datos de ubicación GPS que traen las fotos de drones y celulares. Los videos largos se suben a YouTube y se muestran desde ahí.

**¿El sitio es mío?** Sí. Todo el código queda en tu carpeta, versionado con Git, y puedes llevarlo a cualquier hosting.

**¿Y si no me gusta el resultado?** Dilo. El piloto (fase 4) existe justamente para iterar el estilo antes de construir todo. Pide cambios hasta que te guste.

**Veo mensajes de error en rojo mientras Claude trabaja.** Normalmente son los chequeos automáticos avisándole a Claude de algo que debe corregir, y lo corrige solo. Si se repiten o Claude se detiene, pregúntale *"¿qué está fallando?"*.

**Claude no puede ver el sitio (el design loop falla).** Abre Chrome, verifica que la extensión esté activa y reinicia Claude Code con `claude --chrome`.

**¿Puedo mejorar la herramienta?** Sí. Al terminar un sitio, escribe `/web-kit:retro`: Claude propone cómo convertir lo que corregiste en reglas para el próximo sitio. Si quieres compartir esas mejoras, abre un pull request en el repositorio.
