# Estándares de Terminología Técnica y Nomenclatura Profesional SQL

## 1. El veredicto: ¿SQL o Queries?

La realidad es que ninguna de las dos es perfecta para definir una "agrupación", pero **"Queries"** es la más aceptada en el habla común. Sin embargo:

- **SQL (Structured Query Language):** Es el **lenguaje**, no el objeto. Decir "pásame los SQL" es como decir "pásame los españoles" cuando te refieres a unos párrafos escritos en español. Es gramaticalmente incorrecto en contextos técnicos.

- **Queries (Consultas):** Se refiere específicamente a la acción de pedir datos (SELECT). Aunque por extensión se usa para todo (INSERT, UPDATE, DELETE), técnicamente una sentencia `CREATE TABLE` no es una "query", es una sentencia de definición (DDL).

## 2. Nomenclatura profesional (Lo que un Documentalista usaría)

Si estás redactando documentación técnica o estructurando un repositorio, te sugiero utilizar términos que describan mejor la **naturaleza del grupo**:

### **Scripts SQL**

Es el término estándar para un **archivo o conjunto de sentencias** que se ejecutan de forma secuencial. Es lo que pones en un archivo `.sql`.

> *Ejemplo:* "El script de migración contiene las sentencias para actualizar la base de datos."

### **Sentencias SQL (Statements)**

Es el término más preciso si te refieres a las líneas de código individuales agrupadas. Cubre todo: DDL (definición), DML (manipulación) y DCL (control).

> *Ejemplo:* "Se ejecutó un bloque de sentencias SQL para corregir los registros huérfanos."

### **Consultas / Queries**

Úsalo exclusivamente cuando la agrupación tenga como fin **extraer información** o cuando estés en un contexto de análisis de datos.

> *Ejemplo:* "La carpeta `/queries` contiene los reportes de ventas mensuales."

## 3. Guía rápida de uso según el contexto

Para que tu documentación se vea nivel "Arquitecto", sigue esta tabla:

| Contexto | Término Recomendado | ¿Por qué? |
| :--- | :--- | :--- |
| **Repositorio de código** | `Scripts` | Indica que son archivos ejecutables. |
| **Manual de usuario/API** | `Queries` | Es lo que el usuario final entiende como "hacer una pregunta" al sistema. |
| **Especificación Técnica** | `Sentencias / Statements` | Es el término formal de la norma ISO/IEC de SQL. |
| **Lógica interna (DB)** | `Stored Procedures / Blocks` | Si están agrupados dentro del motor de la base de datos. |

### Resumen para tu caso

Como **Senior**, si te preguntan en el Slack: *"¿Dónde están las queries de creación?"*, se entiende. Pero si estás escribiendo el **README** o la **Documentación del Sistema**, lo más pulcro es llamar a esa agrupación **"Scripts SQL"** o **"Sentencias de base de datos"**.

> **Tip de Documentalista:** Nunca uses "SQLs" (en plural). SQL es un nombre de lenguaje y es incontable. Es como decir "los Python" o "los Javas". Suena a programador junior que todavía se pelea con los `JOIN`.