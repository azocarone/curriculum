# Infraestructura de Desarrollo Profesional y Flujo de Despliegue CI/CD

Esta guía detalla la configuración de una infraestructura de desarrollo profesional, priorizando la seguridad de credenciales y la optimización de recursos.

## 1. Instalar NVM (Node Version Manager)

Ejecuta el script de instalación oficial desde tu terminal:

``` bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

## 2. Cargar NVM en tu sesión

Para que los cambios surtan efecto en la sesión actual de Bash, ejecuta:

``` bash
source ~/.bashrc
```

Para verificar que se instaló correctamente, escribe `nvm --version`

## 3. Instalar la versión estable de Node.js

Utilizaremos la versión LTS (Long Term Support) por su estabilidad:

``` bash
nvm install --lts
```

## 4. Verificar la instalación

Confirma que tanto el entorno de ejecución como el gestor de paquetes están listos:

``` bash
node -v
npm -v
```

## 5. Empleando el Shell **Fish**

Los scripts instalados por NVM están escritos en Bash y no son compatibles de forma nativa con Fish. Por lo tanto, realizaremos la integración mediante un plugin.

### 5.1. Instalar Fisher (El gestor de plugins de Fish)

``` bash
curl -sL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && fisher install jorgebucaran/fisher
```

### 5.2. Instalar el plugin nvm.fish

Este plugin detectará automáticamente tu instalación previa de NVM:

``` bash
fisher install jorgebucaran/nvm.fish
```

### 5.3. Uso de NVM en Fish

A partir de ahora, puedes usar NVM normalmente dentro de Fish:

- **Verificar versión**: `nvm --version`

- **Instalar la versión estable**: `nvm install lts`

- **Usar una versión específica**: `nvm use lts`

- **Ver qué tienes instalado**: `nvm list`

## 6. Primer paso con Vite (Protección de claves)

Realiza estos pasos en la raíz de tu proyecto para migrar a un entorno de compilación moderno.

### 6.1. Inicializar el proyecto

Genera el archivo package.json:

``` bash
npm init -y
```

### 6.2. Instalar Vite como dependencia de desarrollo

``` bash
npm install vite --save-dev
```

### 6.3. Crear archivo `.env`

``` bash
touch .env
```

### 6.4. Configurar el archivo `.gitignore`

**Crucial**: Esto evita que tus claves y archivos pesados se suban a GitHub.

``` bash
echo ".env" >> .gitignore
echo "node_modules" >> .gitignore
echo "dist/" >> .gitignore
```

### 6.5. Configurar Claves

Edita el archivo .env (puedes usar nano .env) y añade tus credenciales:

```
VITE_SUPABASE_URL=https://tu_proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=clave_publica_aqui
```

### 6.4. Ajustar Código JavaScript

**Ejemplo sustituye las cadenas de texto manuales por referencias a las variables de entorno**:

```
// Antes: const supabaseKey = 'abc123...';
// Ahora:
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabase.createClient(supabaseUrl, supabaseKey);
```

### 6.5. Configurar Comandos de Ejecución

Edita tu `package.json` para que la sección `"scripts"` incluya los comandos de Vite:

La sección `"scripts"` debe contener lo siguiente:

```
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## 7. ¿Cómo trabajar ahora?

- **Para desarrollar**: Ejecuta `npm run dev`. Vite abrirá un servidor local (normalmente en `localhost:5173`) con refresco instantáneo..

- **Para subir a producción (Netlify)**:

    - Realizar el `git push` de los cambios (el `.env` no subirá).

    - En el panel del proyecto **Netlify**, ir a **Project configuration** > **Environment Variables**.

    - Agregar `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y `SECRETS_SCAN_OMIT_KEYS` con sus valores. El valor de esta última es: `VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY`

    - Luego en **Project configuration** > **Build & deploy** > **Build settings**.

    - Asegúrarse de que el **Build command** sea `npm run build` y la **Publish directory** sea `dist`.

    **Consejo "pro"**: Si clonas el proyecto en otra máquina o borras `node_modules`, solo ejecuta `npm install` para restaurar todo el entorno.

## 8. ¿Qué se obtiene con todo esto?

Has pasado de un sitio "artesanal" a uno "**compilado**" bajo los estándares del Frontend Moderno. Gracias a Vite y Rollup, tu proyecto ahora disfruta de:

- **Minificación y ofuscación**: Código más ligero y difícil de leer para terceros.

- **Cache Busting (Hash)**: Los archivos generados (ej: `index-BFZwfYyT.js`) cambian de nombre al actualizarse, obligando al navegador a cargar siempre la última versión.

- **Empaquetado (Bundling)**: Optimización de todas las dependencias en archivos únicos y eficientes.