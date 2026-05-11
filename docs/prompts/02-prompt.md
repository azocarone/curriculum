Actúa como un experto en DevOps y Backend especializado en el ecosistema de Supabase. Genera una guía técnica exhaustiva para configurar un entorno de desarrollo de Supabase Edge Functions bajo las siguientes condiciones:

1. Especificaciones del Entorno:

- OS: Fedora Workstation (considerando SELinux y el firewall predeterminado).

- Shell: Fish Shell (usando sintaxis set -gx para variables).

- Container Engine: Podman (en sustitución total de Docker).

- Herramienta: Supabase CLI.

2. Estructura Requerida de la Guía:

Fase A: Preparación de Podman para Supabase

- Habilitación del socket de Podman (systemctl --user enable --now podman.socket).

- Configuración de la variable DOCKER_HOST persistente en config.fish.

- Uso de podman-docker para la emulación de comandos.

Fase B: Instalación y Configuración

- Instalación de Supabase CLI vía NPM.

- Configuración de autocompletado nativo para Fish.

Fase C: Flujo de Trabajo con Edge Functions

- Inicialización, creación y ejecución local.

- Solución de problemas específicos de montaje de volúmenes en Fedora (etiquetas :Z de SELinux si aplica).

Fase D: Gestión de Secretos y Despliegue

- Manejo de .env y comandos de despliegue.

3. Requisitos Estrictos de Formato (Markdown):

- Estructura: Utiliza encabezados H1 para el título, H2 para las fases y H3 para subtareas.

- Bloques de Código: Especifica siempre el lenguaje (ej: fish, bash, json).

- Tablas: Incluye una tabla comparativa de comandos clave (Docker vs. Podman en este contexto).

- Admonitions/Callouts: Usa bloques de cita (quote blocks) o emojis para resaltar:

    - ⚠️ Advertencias: Especialmente para SELinux o permisos de socket.

    - 💡 Tips: Para optimizar el flujo en Fish Shell.

    - 🛠️ Troubleshooting: Pasos rápidos para errores comunes de conexión con el daemon.

- Listas: Usa listas de tareas (checklists) para los pasos de verificación inicial.

Genera la guía con un tono profesional, directo y orientado a la resolución de problemas técnicos.