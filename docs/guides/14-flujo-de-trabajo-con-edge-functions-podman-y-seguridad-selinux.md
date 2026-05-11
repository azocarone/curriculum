# Flujo de Trabajo con Edge Functions, Podman y Seguridad SELinux

Esta guía proporciona un flujo de trabajo optimizado para ingenieros que operan en el ecosistema de Fedora, priorizando el uso de **Podman** como motor de contenedores y **Fish Shell** como intérprete de comandos, garantizando compatibilidad con el ecosistema de Supabase.

## Checklist de Requisitos Previos

- [ ] Fedora Workstation (40/41+) actualizado.
- [ ] Node.js y NPM instalados (preferiblemente vía NVM).
- [ ] Paquete `podman` y `podman-docker` instalados.
- [ ] Usuario con privilegios para ejecutar contenedores *rootless*.

### 💡 Tip<i>
---

Para que un usuario pueda ejecutar contenedores **rootless** (sin privilegios de root) en Fedora, el sistema debe tener configurados correctamente los archivos de mapeo de IDs de usuario y grupo.

Aquí tienes los pasos para verificarlo de forma rápida:

### 1. Verificar archivos de subordinados

Los contenedores rootless necesitan un rango de IDs de usuario auxiliares. Verifica que tu usuario aparezca en `/etc/subuid` y `/etc/subgid`:

```bash
grep $(whoami) /etc/subuid
grep $(whoami) /etc/subgid
```

**¿Qué deberías ver?**

Deberías obtener una línea similar a esta:

`tu_usuario:100000:65536`

> **Nota:** El primer número es el inicio del rango y el segundo es la cantidad de IDs permitidos. Si estos archivos están vacíos o tu usuario no aparece, no podrás ejecutar contenedores rootless.

### 2. Validar con Podman (El estándar en Fedora)

Fedora utiliza **Podman** por defecto, que está diseñado específicamente para ser rootless. Ejecuta el siguiente comando para ver la configuración actual de tu usuario:

```bash
podman info
```

Busca la sección llamada **`idMappings`**. Si ves rangos de IDs definidos allí, tu usuario está listo. 

También puedes hacer una prueba real ejecutando un contenedor simple:

```bash
podman run --rm hello-world
```

Si el contenedor corre sin pedirte `sudo`, los privilegios están correctamente configurados.

### 3. Verificar el estado de `cgroups v2`

Los contenedores rootless modernos dependen de **cgroups v2**. En Fedora esto viene activado por defecto, pero puedes confirmarlo con:

```bash
stat -fc %T /sys/fs/cgroup/
```

**Resultado esperado**

`cgroup2fs`

### ¿Qué pasa si no cumplo los requisitos?

Si los archivos del paso 1 están vacíos o tu usuario no aparece, puedes configurar los rangos manualmente con este comando (reemplaza `tu_usuario` por tu nombre real):

```bash
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 tu_usuario
```

Después de ejecutar esto, es recomendable reiniciar la sesión o ejecutar `podman system migrate` para que los cambios surtan efecto.

---
</i><br>

## Fase A: Preparación de Podman para Supabase

Supabase CLI está diseñado para interactuar con el socket de Docker. En Fedora, debemos exponer el socket de Podman y configurar el entorno para que la CLI lo reconozca de forma transparente.

### Habilitación del socket de Podman

Para que las herramientas que buscan `/var/run/docker.sock` funcionen en un entorno *rootless*, activamos el socket a nivel de usuario:

```bash
# Habilitar y arrancar el socket de usuario
systemctl --user enable --now podman.socket
```

### Configuración de la variable DOCKER_HOST

Fish Shell requiere una sintaxis específica para exportar variables de entorno de forma global y persistente. Añade lo siguiente a tu archivo de configuración:

```bash
# Editar ~/.config/fish/config.fish y añadir:
set -gx DOCKER_HOST unix://$XDG_RUNTIME_DIR/podman/podman.sock
```

> 🛠️ **Troubleshooting**: Si la CLI de Supabase no detecta el motor, verifica la ruta del socket con `systemctl --user status podman.socket`. Asegúrate de que `podman-docker` esté instalado para mapear las llamadas de `docker` a `podman`.

#### 💡 Tip<i>
---

Para que esa variable de entorno se configure correctamente cada vez que abras tu terminal, tienes dos opciones principales dependiendo de si quieres que sea exclusiva para sesiones interactivas o para cualquier instancia de la shell.

Aquí tienes cómo y dónde colocarlo:

#### Opción 1: Fuera del bloque `if` (Recomendado)

Si quieres que la variable esté disponible siempre (por ejemplo, para scripts que uses o herramientas que llamen a la shell), colócala **al principio o al final del archivo**, fuera de las llaves del `if`.

```bash
set -gx DOCKER_HOST unix://$XDG_RUNTIME_DIR/podman/podman.sock

if status is-interactive
    # Commands to run in interactive sessions can go here
end
```

#### Opción 2: Dentro del bloque `if`

Si solo necesitas que esa variable exista cuando estás usando la terminal físicamente (escribiendo comandos), puedes ponerla dentro.

```bash
if status is-interactive
    # Commands to run in interactive sessions can go here
    set -gx DOCKER_HOST unix://$XDG_RUNTIME_DIR/podman/podman.sock
end
```

#### ¿Qué significan los flags?

Es bueno saber qué estás haciendo exactamente con ese comando:

- **`set`**: Es el comando de Fish para definir variables.

- **`-g` (global)**: Hace que la variable sea accesible en cualquier parte de la sesión actual de Fish.

- **`-x` (export)**: Es la clave aquí. Exporta la variable a los procesos hijos. Sin esto, `podman` o `docker-compose` no podrían "ver" la variable desde fuera de Fish.

#### Un pequeño consejo Pro

Como estás usando `$XDG_RUNTIME_DIR`, asegúrate de que esa variable del sistema esté definida antes. En la mayoría de las distros modernas de Linux (con systemd) lo está, pero si notas que no funciona, puedes verificarlo escribiendo `echo $XDG_RUNTIME_DIR` en tu terminal.

Para aplicar los cambios inmediatamente sin cerrar la terminal, ejecuta:

`source ~/.config/fish/config.fish`

---
</i><br>

## Fase B: Instalación y Configuración

### Instalación de Supabase CLI

Instalar binario oficial (RECOMENDADO). Anteriormente se empleaba `npm install -g supabase`, pero generaba problemas de incompatibilidad.Con la distribucción directa del binario, Supabase CLI no depende del Node.js instaladao. Por ello se realizan los siguientes pasos:

``` bash
curl -L https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz -o supabase.tar.gz
```

``` bash
tar -xvzf supabase.tar.gz
```

``` bash
sudo mv supabase /usr/local/bin/
```

### Configuración de Autocompletado nativo para Fish

Para mejorar la productividad, generamos las definiciones de autocompletado para Fish Shell:

```bash
# Crear el directorio de completado si no existe
mkdir -p ~/.config/fish/completions

# Generar el archivo de autocompletado
supabase completion fish > ~/.config/fish/completions/supabase.fish
```

> **Nota**: Puedes recargar tu shell con `source ~/.config/fish/config.fish` para aplicar los cambios de inmediato sin cerrar la terminal.

---
</i><br>

## Fase C: Flujo de Trabajo con Edge Functions

### Inicialización y Ejecución Local

Al iniciar un proyecto, Supabase intentará levantar varios contenedores (PostgreSQL, GoTrue, Realtime, etc.) mediante Podman.

```bash
# Iniciar proyecto
supabase init

# Arrancar servicios locales
supabase start
```

#### 💡 Tip<i>
---

Para volver a ver las tablas con las URLs del API, el Dashboard (Studio), y las credenciales de la base de datos, ejecutar:

``` bash
supabase status
```

#### ¿Qué información te devuelve?

Este comando consulta el estado actual de tus contenedores locales y te imprime exactamente el mismo resumen que viste al inicio:

- **API URL**: El punto de enlace para `supabase-js`.

- **DB URL**: La cadena de conexión para tu base de datos PostgreSQL.

- **Studio URL**: Generalmente `http://localhost:54323 (donde puedes ver la interfaz gráfica).

- **Inbucket URL**: Para testear los correos electrónicos.

- **anon key & service_role key**: Las llaves JWT necesarias para el desarrollo.

#### Tips adicionales de "supervivencia" con Supabase CLI

1. **Si necesitas una clave específica**: A veces la terminal corta el texto. Puedes usar `supabase status -o json` si necesitas copiar los valores de forma más limpia en un script o archivo.

2. **Si algo no carga**: Si ejecutas `supabase status` y ves que algún servicio dice `red` o `down`, intenta con `supabase restart` para refrescar los contenedores sin perder tus datos.

3. **Configuración guardada**: Recuerda que gran parte de esta info se guarda automáticamente en tu carpeta local dentro de `supabase/config.toml` (aunque las claves se generan dinámicamente al iniciar).

---
</i><br>

### Creación de una Edge Function

```bash
supabase functions new hello-world
```

### Solución de problemas de montaje (SELinux)

Fedora aplica políticas estrictas de SELinux. Cuando Podman intenta montar volúmenes locales (como el código de tus funciones) dentro del contenedor, puede denegar el acceso.

> ⚠️ **Advertencia**: Si encuentras errores de "Permission Denied" al ejecutar funciones localmente, se debe a que SELinux bloquea el acceso al volumen. La CLI de Supabase maneja gran parte del despliegue, pero si realizas montajes manuales, recuerda el sufijo `:Z`.

Para permitir que los contenedores accedan a los archivos del proyecto, puedes aplicar el contexto de seguridad de forma recursiva:

```bash
# Aplicar etiqueta de volumen compartido de SELinux
chcon -Rt svirt_sandbox_file_t ./supabase/
```

## Fase D: Gestión de Secretos y Despliegue

### Manejo de variables de entorno

Supabase utiliza archivos `.env` para la configuración local. No obstante, para el despliegue, debemos inyectar los secretos en la infraestructura de Supabase.

1. Crea un archivo `.env.local` (asegúrate de incluirlo en `.gitignore`).

2. Para subir secretos a producción:

```bash
# Establecer secretos desde un archivo
supabase secrets set --env-file .env.local

# Establecer un secreto individual
supabase secrets set MY_API_KEY=example_value
```

### Despliegue de funciones

```bash
# Desplegar una función específica
supabase functions deploy hello-world --project-ref tu_id_de_proyecto
```

## Comparativa de Comandos Clave

| Acción | Comando Docker (Tradicional) | Equivalente Podman (Fedora) |
| :--- | :--- | :--- |
| Ver Socket | `/var/run/docker.sock` | `$XDG_RUNTIME_DIR/podman/podman.sock` |
| Persistencia | `export DOCKER_HOST=...` | `set -gx DOCKER_HOST ...` |
| Permisos | Grupo `docker` | Socket `--user` (rootless) |
| Volúmenes | `-v /path:/container` | `-v /path:/container:Z` (SELinux) |

### Notas de Seguridad en Fedora

- **Firewalld**: Por defecto, Fedora permite el tráfico de la interfaz de red de Podman, pero si tienes reglas personalizadas, asegúrate de que el puerto `54321` (API local) y `54322` (Dashboard) estén abiertos para comunicación interna.

- **Actualizaciones**: Al ser Fedora un sistema *rolling-release* indirecto (Fast-track), siempre verifica que la versión de `podman` sea compatible con la versión actual de la CLI de Supabase tras una actualización de sistema (`dnf update`).

## Fase E: Pruebas de la Función `hello-world`

A continuación, se detalla el flujo práctico para validar el funcionamiento de una Edge Function, desde el código fuente hasta su ejecución en el borde (edge).

### 1. Preparación del Código

Al ejecutar `supabase functions new hello-world`, se genera un archivo en `supabase/functions/hello-world/index.ts`. Asegúrate de que el contenido sea el siguiente estándar de Deno:

```TypeScript
// supabase/functions/hello-world/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: `¡Hola, ${name || 'Mundo'} desde el borde!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})
```

### 2. Verificación en Modo Local (Podman)

**Paso A: Iniciar servicios**

``` bash
supabase start
```

*Este comando descargará e iniciará las imágenes necesarias utilizando el socket de Podman configurado previamente.*

**Paso B: Servir la función**

``` bash
supabase functions serve hello-world --no-verify-jwt
```

*La bandera --no-verify-jwt simplifica las pruebas iniciales al omitir la validación de tokens de autenticación.*

Paso C: Testeo con cURL (Sintaxis Fish)

``` bash
curl -X POST http://localhost:54321/functions/v1/hello-world \
     -H "Content-Type: application/json" \
     -d '{"name": "Desarrollador Fedora"}'
```

> 🛠️ Troubleshooting: Si recibes un error de "Connection Refused", verifica que el contenedor `supabase_edge_runtime` esté en ejecución mediante `podman ps`. Si el contenedor existe pero no responde, revisa los logs con `podman logs` `supabase_edge_runtime`

### 3. Verificación en Modo Remoto (Producción)

**Paso A: Inicio de sesión  (Si es la primera vez)**

``` bash
supabase login
```

**Paso B: Despliegue de la función**

Debes tener a mano el ID de tu proyecto (disponible en la URL del Dashboard de Supabase).

``` bash
supabase functions deploy hello-world --project-ref tu_id_proyecto_aqui
```

**Paso C: Testeo de la función remota**

Para probarla en vivo, necesitarás la `ANON_KEY` de tu proyecto (se encuentra en Settings > API).

``` bash
# Configurar variables temporales en Fish
set -gx PROJECT_ID "tu_id_proyecto_aqui"
set -gx ANON_KEY "tu_anon_key_aqui"

# Ejecutar petición
curl -i -X POST "https://$PROJECT_ID.supabase.co/functions/v1/hello-world" \
     -H "Authorization: Bearer $ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"name": "Usuario Remoto"}'

```

> 💡 **Wildcard Recommendation**: Para flujos de trabajo complejos con múltiples parámetros, considera utilizar herramientas como HTTPie (disponible en los repositorios de Fedora: sudo dnf install httpie). Su sintaxis es más legible que cURL para enviar JSON:
http POST http://localhost:54321/functions/v1/hello-world name="Fedora User"

## Resolución de Conflictos y Despliegue Avanzado

Esta sección documenta los obstáculos críticos encontrados durante la fase de pruebas de la función hello-world y la transición a la base de datos remota.

### 1. El Conflicto de Montaje y Lectura (Runtime Boot)

**Síntoma**: El contenedor de Supabase está arriba, pero el cURL local falla.

**Logs del error** (podman logs -f ...):

``` txt
worker boot error: failed to bootstrap runtime: failed to determine entrypoint
InvalidWorkerCreation: worker boot error: failed to bootstrap runtime: failed to determine entrypoint
```

**Resolución Técnica**

El problema radica en que SELinux marca los archivos del host como inaccesibles para el proceso interno del contenedor. Se aplicó la etiqueta de contexto de sandbox de forma recursiva:

``` bash
# Aplicar etiquetas a la carpeta de funciones para visibilidad del runtime
sudo chcon -Rt svirt_sandbox_file_t (pwd)/supabase/functions/

# Reiniciar el entorno para limpiar estados de montaje corruptos
supabase stop --clean
supabase start
```

### 2. El Conflicto de Empaquetado (Despliegue Remoto)

**Síntoma**: Error al intentar subir la función a la nube.

**Mensaje de error**: `Error: Permission denied (os error 13).`

**Resolución Técnica**

La CLI de Supabase utiliza un contenedor adicional para realizar el "bundling" (compilación y compresión). Este contenedor falla si no puede leer los archivos de configuración en la raíz del proyecto.

``` bash
# Aplicar permiso SELinux a la raíz del proyecto (nivel superior)
# Esto permite que el bundler lea config.toml y archivos de dependencias
sudo chcon -Rt svirt_sandbox_file_t (pwd)

# Comando de despliegue validado:
supabase functions deploy hello-world --project-ref ####################
```

### 3. Discrepancia de Tokens y Arquitectura Híbrida

**Síntoma**: `Error UNAUTHORIZED_INVALID_JWT_FORMAT` al usar las nuevas llaves de Supabase.

**Causa**: El Edge Runtime espera un JWT (JSON Web Token) y las nuevas `Publishable Keys` tienen un formato que el validador estricto rechaza.

**Implementación del "Entorno Híbrido" (Código y Headers)**

Se decidió mantener la seguridad del Gateway (`--verify-jwt`) pero enviando ambos identificadores en la petición para asegurar compatibilidad.

Configuración de variables en Fish:

``` bash
# Seteo de variables de entorno para la sesión
set -gx SB_URL "https://qhpkvnhpdyqzysrsueuz.supabase.co"
set -gx LEGACY_KEY "ey... (Token JWT largo)"
set -gx NEW_KEY "pk... (Nuevo formato de llave)"
```

**Petición técnica optimizada (HTTPie)**:

```bash
http POST "$SB_URL/functions/v1/hello-world" \
     "Authorization: Bearer $LEGACY_KEY" \
     "apikey: $NEW_KEY" \
     name="Desarrollador Fedora"
```

### 4. Integración Remota (Sin Base de Datos Local)

**Contexto**: Conexión de la función a la instancia remota de PostgreSQL.

**A. Gestión de Secretos en la Nube**

Para que la función conozca las credenciales, se inyectan en la infraestructura de Supabase mediante un archivo de entorno:

``` Bash
# Contenido de supabase/functions/.env
SUPABASE_URL=https://qhpkvnhpdyqzysrsueuz.supabase.co
SUPABASE_ANON_KEY=tu_legacy_anon_key_aqui
```

**Comando de sincronización**:

``` bash
# Subir variables al servidor remoto para que estén disponibles en el borde
supabase secrets set --env-file supabase/functions/.env --project-ref qhpkvnhpdyqzysrsueuz
```

**B. Código Deno (TypeScript) con Inyección Dinámica**

La función utiliza el cliente de Supabase extrayendo las credenciales del entorno de ejecución, funcionando igual en local que en producción:

``` TypeScript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    // Inyección de variables de entorno (seteables vía CLI o Dashboard)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Lógica de conexión a BD Remota
    const { data, error } = await supabase.from('profiles').select('*').limit(5)
    if (error) throw error

    return new Response(JSON.stringify({ data }), { 
      headers: { "Content-Type": "application/json" } 
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
```

### 5. Resumen de Ejecución Local de Pruebas

Para simular el entorno remoto en tu equipo Fedora sin romper la seguridad:

``` bash
# Servir función cargando secretos locales pero apuntando a la nube
supabase functions serve hello-world --env-file supabase/functions/.env --no-verify-jwt
``` 