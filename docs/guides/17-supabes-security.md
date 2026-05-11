# Supabase Security

Configuración en dashboard:

- **_Enable Data API_**:

    Esta opción es la que hace que Supabase sea "mágico". Al activarla, Supabase crea automáticamente una API REST y una API de GraphQL sobre tu base de datos.

    ¿Para qué sirve? Te permite consultar tus datos directamente desde el navegador o una App móvil usando la librería supabase-js, sin necesidad de escribir un backend propio (Node.js, Python, etc.).

    Si la desactivas: Solo podrías acceder a los datos mediante conexiones directas a la > base de datos (puerto 5432), lo cual anula la mayor parte de las ventajas de usar Supabase.

- **_Enable Automatic RLS (Row Level Security)_**:

     Esta es la configuración de seguridad más importante y donde muchos desarrolladores suelen confundirse al principio. RLS significa Seguridad a Nivel de Fila.
 
    ¿Qué hace? Por defecto, protege tus tablas para que nadie pueda leer ni escribir datos a menos que tú crees una "política" (regla) específica que lo permita.

    ¿Por qué es importante? Como tu base de datos está expuesta a internet a través de la API (paso anterior), si no tienes RLS activado, cualquiera que encuentre tu URL y tu anon key podría borrar toda tu información.
 
    Recomendación: Déjalo activado. Es mejor que al principio "no funcione nada" porque te falta una regla, a que tus datos estén públicos para todo el mundo por error.