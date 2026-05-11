# Gestión de Información Sensible y Compartimentación en PostgreSQL

## 1. Evolución del Proyecto

El proyecto comenzó con la necesidad de proteger la **Información de Identificación Personal (PII)** —específicamente el número telefónico y el correo electrónico— dentro de un currículum vitae digital construido con un stack de **JavaScript Vanilla, HTML, CSS y Supabase**. 

El arco de la conversación ha pasado por tres fases críticas:

1.  **Fase de Ofuscación Cosmética:** Intento inicial de ocultar datos mediante codificación Base64 en el lado del cliente.

2.  **Fase de Evaluación de Servidor:** Análisis de arquitecturas *Serverless* (Edge Functions y Netlify Functions) para mover la lógica de seguridad fuera del alcance del navegador.

3.  **Fase de Consolidación en Base de Datos:** Decisión final de implementar una solución de "corte por lo sano" utilizando la potencia nativa de **PostgreSQL** para garantizar que los datos sensibles nunca abandonen el servidor sin autorización.

## 2. Decisiones Técnicas Clave

Para alcanzar el nivel de seguridad "Senior" deseado, se establecieron los siguientes pilares arquitectónicos:

- **Compartimentación de Datos:** Separación de la información en dos tablas: `profiles` (pública) y `profiles_contact` (privada), vinculadas por una relación de llave foránea.

- **Capa de Abstracción (SQL Views):** Creación de una vista (`v_cv_publico`) que procesa los strings en el servidor para entregar versiones ya ofuscadas (ej. `a****@dominio.com`) al frontend.

- **Control de Acceso mediante RPC:** Implementación de una función de base de datos con privilegios de **Security Definer** para permitir el "revelado" controlado de datos reales solo bajo demanda explícita (impresión o contacto).

- **Denegación por Defecto (RLS):** Activación de **Row Level Security** en la tabla sensible sin políticas de acceso para el rol público, convirtiéndola en una caja fuerte inaccesible vía API directa.

## 3. Descartes y Correcciones

Durante la auditoría se identificaron las siguientes ideas abandonadas en favor de mejores prácticas:

- **Descarte de `btoa()` / `atob()`:** Se determinó que la codificación en el cliente es "seguridad por oscuridad" y no ofrece protección real contra usuarios con conocimientos técnicos o bots.

- **Corrección de Lógica de Ofuscación:** Se refinó la función de SQL para el manejo de correos electrónicos. Se descartó el uso de `split_part` para el nombre de usuario (que exponía el nombre completo) en favor de `left(email, 1)`, logrando una protección de privacidad superior.

- **Postergación de Edge Functions:** Aunque se analizó su implementación, se decidió por una solución de **Vistas SQL** por ser más directa, eficiente y fácil de mantener para el estado actual del proyecto.

## 4. Estado Actual

En este momento, la arquitectura técnica está definida y validada:

1.  **Esquema de BD:** Tablas creadas y normalizadas.

2.  **Seguridad:** RLS activado en la tabla de contacto; la vista pública está operativa con la lógica de ofuscación corregida.

3.  **Interfaz de Acceso:** La función RPC `get_contact_info` está lista para ser consumida desde el frontend.

4.  **Frontend:** Se ha definido el patrón de "Inyección Efímera" para manejar los datos reales durante el evento de impresión (`window.print()`) y su posterior limpieza del DOM.

## 5. Glosario de Implementación

- **PII (Personally Identifiable Information):** Datos que pueden identificar a un individuo. En este caso, el foco de nuestra seguridad.

- **RLS (Row Level Security):** Mecanismo de PostgreSQL que permite restringir qué filas de una tabla puede ver o manipular un usuario según su rol.

- **Security Definer:** Ajuste en funciones SQL que permite que estas se ejecuten con los privilegios del creador de la función, no de quien la invoca.

- **Ofuscación Real:** A diferencia de la codificación, esta técnica destruye parte de la información en el origen (servidor), enviando al cliente un dato incompleto que no puede ser reconstruido.

- **RPC (Remote Procedure Call):** Funciones definidas en la base de datos que pueden ser llamadas desde el cliente Supabase como si fueran una API personalizada.