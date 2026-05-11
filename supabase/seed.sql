-- Master data base (Metadatos y Estructura)

-- 1. PERFIL PRINCIPAL

INSERT INTO profiles (id, full_name,  website) VALUES
(1, 'José Antonio Azócar Marcano', 'joseazocar.pro');

INSERT INTO profiles_contact (id, profile_id, phone, email) VALUES
(1, 1, '******8626', 'a****@proton.me');

-- 2. TIPOS DE EDUCACIÓN Y HABILIDADES (Tablas Maestras)

INSERT INTO education_types (id, slug) VALUES
(1, 'academic-education'),
(2, 'continuous-training'),
(3, 'certifications');

INSERT INTO skill_types (id, slug) VALUES
(1, 'technical-skill'),
(2, 'soft-skill'),
(3, 'languages-skill');

-- 3. RESUMEN Y EXPERIENCIAS

INSERT INTO summaries (id, profile_id, is_default) VALUES
(1, 1, true);

INSERT INTO experiences (id, profile_id, start_date, end_date, company, url, is_active) VALUES
(1, 1, '2010-01-10', NULL, 'Freelance', 'https://joseazocar.pro', true),
(2, 1, '2007-05-10', '2009-10-10', 'Almacenes y Depósitos Integrales Portuarios, C.A.', 'https://drive.google.com/file/d/15UP-_bxBGPBW5Z1lkk62BZPf25dZYUtj/view?usp=drive_link', true),
(3, 1, '2006-03-10', '2006-06-10', 'CompuMarket S.A.', 'https://drive.google.com/file/d/1D9YjClWbaLc8cRyMFn16X6GAAOOnLYcV/view?usp=drive_link', true);

-- 4. RESPONSABILIDADES (Relacionadas con experiencias)

INSERT INTO responsibilities (id, experience_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1),
(7, 2), (8, 2), (9, 2), (10, 2), (11, 2), (12, 2),
(13, 3), (14, 3), (15, 3);

-- 5. EDUCACIÓN

INSERT INTO education (id, profile_id, type_id, start_date, end_date, url, is_active) VALUES
(1, 1, 1, '2005-10-10', '2006-09-10', 'https://drive.google.com/file/d/1z5K-iYm4WesIh68qvL_6UazhPAo_be70/view?usp=drive_link', true),
(2, 1, 1, '1999-09-10', '2004-06-10', 'https://drive.google.com/file/d/1buZX7Al93yzHXyfRpOjB5S86frdihGfi/view?usp=drive_link', true),
(3, 1, 1, '1988-09-10', '1992-12-10', 'https://drive.google.com/file/d/1SQhcfn_ccc34pnOwPwoxXZL1y9HsJqp8/view?usp=drive_link', true),
(4, 1, 2, NULL, '2023-06-01', 'https://drive.google.com/file/d/1Bj93CSt9ZhMV1GNDTqqWW415_zYJaKQe/view?usp=drive_link', false),
(5, 1, 2, NULL, '2023-07-02', 'https://drive.google.com/file/d/1qPSzcZJVm8jVIDJ8U8Guwqtjlao-gbyM/view?usp=drive_link', false),
(6, 1, 2, NULL, '2023-07-06', 'https://drive.google.com/file/d/1gNtnw6OIEcYehHiANXYV3G4JmMPyniGq/view?usp=drive_link', false),
(7, 1, 2, NULL, '2023-11-20', 'https://codigofacilito.com/certificates/99167', false),
(8, 1, 2, NULL, '2023-11-20', 'https://codigofacilito.com/certificates/99292', false),
(9, 1, 2, NULL, '2023-11-21', 'https://codigofacilito.com/certificates/100301', false),
(10, 1, 2, NULL, '2023-11-21', 'https://drive.google.com/file/d/1btGSX8Z8tNfd3mAOcXyeggJAVv4vJ5tg/view?usp=drive_link', false),
(11, 1, 2, NULL, '2023-11-22', 'https://drive.google.com/file/d/18GsbtfHT8cFwBRXKsJLtls5B5diyQ-bK/view?usp=drive_link', false),
(12, 1, 2, NULL, '2023-11-22', 'https://drive.google.com/file/d/1yESjbzR2ngRliU-FfefUN_Hm96paiRwm/view?usp=drive_link', false),
(13, 1, 2, NULL, '2023-11-22', 'https://drive.google.com/file/d/10wx_TF1WzZw2Fi9hQq5M5kusHEqqxiQP/view?usp=drive_link', false),
(14, 1, 2, NULL, '2023-11-23', 'https://drive.google.com/file/d/1ZOKry2EcPzqe5tKQ-2Py9BIvxacH83M5/view?usp=drive_link', false),
(15, 1, 2, NULL, '2023-11-23', 'https://drive.google.com/file/d/15owt740I5FqHQ2NFz_WTny7iZwr7sNyY/view?usp=drive_link', false),
(16, 1, 2, NULL, '2023-11-24', 'https://drive.google.com/file/d/1_4zikAahcNJJiET_wDgzxaTlj2zid05m/view?usp=drive_link', true),
(17, 1, 2, NULL, '2023-11-25', 'https://drive.google.com/file/d/1YU-zjlhyRkS8_K8qgvMDTPop_k9c0oVn/view?usp=drive_link', false),
(18, 1, 2, NULL, '2023-03-01', 'https://codigofacilito.com/certificates/130476', false),
(19, 1, 2, NULL, '2023-11-25', 'https://drive.google.com/file/d/1fC4B70Ply3HznSfiIrJU4kLmuZDgtoX0/view?usp=drive_link', true),
(20, 1, 2, NULL, '2024-03-17', 'https://drive.google.com/file/d/1dyX-o3kAu-7QKg3VB1K1uiaw-TfJ8gQZ/view?usp=drive_link', false),
(21, 1, 2, NULL, '2024-03-18', 'https://drive.google.com/file/d/1E2dwKzlFoXM1MRHQTcsO77Ggi7jZQKQh/view?usp=drive_link', false),
(22, 1, 3, '2022-07-27', '2023-05-16', 'https://app.aluracursos.com/user/joseazocar/fullCertificate/4ccff4b5373324134b6783e53c7b6203', true);

-- 6. HABILIDADES

INSERT INTO skills (id, profile_id, type_id) VALUES
(1, 1, 1), (2, 1, 1), (3, 1, 1), (4, 1, 1), (5, 1, 1), (6, 1, 1), (7, 1, 1), (8, 1, 1), (9, 1, 1), (10, 1, 1), (11, 1, 1), (12, 1, 1),
(13, 1, 2), (14, 1, 2), (15, 1, 2), (16, 1, 2), (17, 1, 2), (18, 1, 2), (19, 1, 2), (20, 1, 2),
(21, 1, 3), (22, 1, 3);

-- Master data traducciones (Contenido literario)

-- 1. PERFIL

INSERT INTO profiles_translations (id, profile_id, language_code, location) VALUES
(1, 1, 'es', 'San Diego (Carabobo), Venezuela'),
(2, 1, 'en', 'San Diego, Carabobo, Venezuela');

-- 2. RESUMEN

INSERT INTO summaries_translations (id, summary_id, language_code, label, content) VALUES
(1, 1, 'es', 'Versión general', 'Ingeniero en Informática y Máster en e-Commerce con más de 20 años de trayectoria vinculando la estrategia digital y la gestión de sistemas críticos. Desde 2010, como <strong>Consultor de Infraestructura y Operaciones IT</strong>, orquesto de forma transversal la <strong>arquitectura técnica</strong>, la <strong>continuidad de procesos</strong> y el <strong>blindaje del ecosistema</strong> para optimizar la conectividad empresarial, garantizar la disponibilidad de servicios y mitigar riesgos en entornos donde las <strong>soluciones estándar resultan insuficientes</strong>.'),
(2, 1, 'en', 'General version', 'Computer Engineer and Master in e-Commerce with over 20 years of experience bridging digital strategy and critical systems management. Since 2010, as an <strong>IT Infrastructure & Operations Consultant</strong>, I have orchestrated <strong>technical architecture</strong>, <strong>process continuity</strong>, and <strong>ecosystem hardening</strong> across diverse platforms. My focus is on optimizing enterprise connectivity, ensuring service availability, and mitigating risks in complex environments where <strong>standard solutions fall short</strong>.');

-- 3. EXPERIENCIAS

INSERT INTO experiences_translations (id, experience_id, language_code, position, location) VALUES
(1, 1, 'es', 'Consultor de Infraestructura y Operaciones IT', 'Valencia, Venezuela'),
(2, 1, 'en', 'IT Infrastructure & Operations Consultant', 'Valencia, Venezuela'),
(3, 2, 'es', 'Coordinador de Sistemas', 'Puerto Cabello, Venezuela'),
(4, 2, 'en', 'Systems Coordinator', 'Puerto Cabello, Venezuela'),
(5, 3, 'es', 'Pasante de Máster en Comercio Electrónico', 'Madrid, España'),
(6, 3, 'en', 'Master’s Intern in E-commerce', 'Madrid, Spain');

-- 4. RESPONSABILIDADES

INSERT INTO responsibilities_translations (id, responsibility_id, language_code, description) VALUES
(1, 1, 'es', 'Diseño y despliegue de redes LAN, optimizando la conectividad y reduciendo la latencia en entornos empresariales.'),
(2, 1, 'en', 'Design and deployment of LAN networks, optimizing connectivity and reducing latency in enterprise environments.'),
(3, 2, 'es', 'Dirección de proyectos de cableado estructurado e instalaciones eléctricas especializadas para equipos informáticos, cumpliendo con normas técnicas de seguridad.'),
(4, 2, 'en', 'Project management of structured cabling and specialized electrical installations for IT equipment, ensuring compliance with technical safety standards.'),
(5, 3, 'es', 'Administración de servidores y estaciones de trabajo en entornos GNU/Linux, asegurando la estabilidad y seguridad del sistema operativo.'),
(6, 3, 'en', 'Server and workstation administration in <a href=''https://en.wikipedia.org/wiki/GNU/Linux'' target=''_blank''><strong>GNU/Linux</strong></a> environments, ensuring operating system stability and security.'),
(7, 4, 'es', 'Gestión del ciclo de vida de activos digitales, desde el registro de dominios hasta el despliegue y optimización de hosting de alto rendimiento.'),
(8, 4, 'en', 'Digital asset lifecycle management, ranging from domain registration to the deployment and optimization of high-performance hosting.'),
(9, 5, 'es', 'Liderazgo en la resolución de incidentes críticos de Nivel 2 y 3, garantizando la continuidad del negocio y disponibilidad de servicios.'),
(10, 5, 'en', 'Leadership in Tier 2 and 3 critical incident resolution, ensuring business continuity and service availability.'),
(11, 6, 'es', 'Implementación de protocolos de seguridad perimetral y ejecución de análisis forenses tras incidentes, mitigando vulnerabilidades críticas.'),
(12, 6, 'en', 'Implementation of perimeter security protocols and post-incident forensic analysis to mitigate critical vulnerabilities.'),
(13, 7, 'es', 'Garantía de operatividad 24/7 de la infraestructura crítica, asegurando la continuidad del flujo de datos hacia el SENIAT - SIDUNEA para procesos de nacionalización de mercancías.'),
(14, 7, 'en', 'Ensuring 24/7 uptime of critical infrastructure, securing continuous data flow to <a href=''https://declaraciones.seniat.gob.ve/portal/page/portal/MANEJADOR_CONTENIDO_SENIAT/04ADUANAS/4.html'' target=''_blank''>SENIAT - ASYCUDA</a> for customs clearance processes.'),
(15, 8, 'es', 'Administración y parametrización del ERP (Datamatic - Neptuno), mejorando la precisión en el control de inventarios y la trazabilidad de contenedores.'),
(16, 8, 'en', 'Administration and configuration of the ERP (<a href=''https://www.datamaticgroup.com/en/neptuno-managerial-solution/'' target=''_blank''>Datamatic - Neptuno</a>), improving inventory control accuracy and container traceability.'),
(17, 9, 'es', 'Supervisión y mantenimiento de redes inalámbricas y dispositivos móviles (handhelds/escáneres) para la captura de datos en tiempo real en zonas de almacenamiento.'),
(18, 9, 'en', 'Supervision and maintenance of wireless networks and mobile devices (handhelds/scanners) for real-time data capture in storage areas.'),
(19, 10, 'es', 'Diseño y ejecución de políticas de backup y seguridad de la información, blindando la integridad de los datos ante posibles contingencias.'),
(20, 10, 'en', 'Design and execution of backup and information security policies, safeguarding data integrity against potential contingencies.'),
(21, 11, 'es', 'Coordinación de comunicaciones técnicas con plataformas navieras para la agilización de trámites electrónicos de despacho de mercancías.'),
(22, 11, 'en', 'Coordination of technical communications with shipping lines to streamline electronic cargo release and dispatch procedures.'),
(23, 12, 'es', 'Capacitación técnica y funcional del personal sobre el uso de herramientas integradas, reduciendo la curva de aprendizaje.'),
(24, 12, 'en', 'Technical and functional training for staff on the use of integrated tools, effectively reducing the learning curve.'),
(25, 13, 'es', 'Administración de sistemas CMS y ejecución de estudios de benchmarking para la identificación de oportunidades competitivas.'),
(26, 13, 'en', 'CMS administration and execution of benchmarking studies to identify competitive opportunities.'),
(27, 14, 'es', 'Optimización on-page y análisis de métricas para el incremento del tráfico orgánico en el portal de ventas.'),
(28, 14, 'en', 'On-page optimization and metrics analysis to increase organic traffic on the sales portal.'),
(29, 15, 'es', 'Soporte operativo en el ciclo de ventas online y atención al cliente especializado.'),
(30, 15, 'en', 'Operational support in the online sales cycle and specialized customer service.');

-- 5. EDUCACIÓN

INSERT INTO education_translations (id, education_id, language_code, title, institution, location) VALUES
(1, 1, 'es', 'Máster en Comercio Electrónico', 'Universidad "Carlos III de Madrid"', 'Madrid, España'),
(2, 1, 'en', 'Master''s in E-commerce', 'University "Carlos III de Madrid"', 'Madrid, Spain'),
(3, 2, 'es', 'Ingeniería en Informática', 'Universidad "Alejandro de Humboldt"', 'Caracas, Venezuela'),
(4, 2, 'en', 'Computer Engineering', 'University "Alejandro de Humboldt"', 'Caracas, Venezuela'),
(5, 3, 'es', 'Técnico Superior en Computación', 'Instituto Universitario de "Nuevas Profesiones"', 'Valencia, Venezuela'),
(6, 3, 'en', 'Advanced Technician in Computing', 'University Institute of "Nuevas Profesiones"', 'Valencia, Venezuela'),
(7, 4, 'es', 'Profesional de Python', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(8, 4, 'en', 'Python Professional', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(9, 5, 'es', 'Power BI', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(10, 5, 'en', 'Power BI', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(11, 6, 'es', 'Introducción al análisis de datos con Python', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(12, 6, 'en', 'Introduction to Data Analysis with Python', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(13, 7, 'es', 'Lógica proposicional', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(14, 7, 'en', 'Propositional Logic', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(15, 8, 'es', 'Teoría de conjuntos', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(16, 8, 'en', 'Set Theory', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(17, 9, 'es', 'Álgebra lineal', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(18, 9, 'en', 'Linear Algebra', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(19, 10, 'es', 'Álgebra lineal (Certificado Drive)', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(20, 10, 'en', 'Linear Algebra (Drive Certificate)', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(21, 11, 'es', 'Regresión', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(22, 11, 'en', 'Regression', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(23, 12, 'es', 'Árboles de decisión', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(24, 12, 'en', 'Decision Trees', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(25, 13, 'es', 'Fundamentos de Estadística I & II', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(26, 13, 'en', 'Fundamentals of Statistics I & II', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(27, 14, 'es', 'Instalación y configuración de Python', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(28, 14, 'en', 'Python Installation and Configuration', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(29, 15, 'es', 'Anotaciones y Type Hints con Python', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(30, 15, 'en', 'Annotations and Type Hints with Python', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(31, 16, 'es', 'Profesional de Docker', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(32, 16, 'en', 'Docker Professional', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(33, 17, 'es', 'Manejo de archivos con Python', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(34, 17, 'en', 'File Handling with Python', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(35, 18, 'es', 'Reto Python', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(36, 18, 'en', 'Python Challenge', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(37, 19, 'es', 'GitHub Copilot', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(38, 19, 'en', 'GitHub Copilot', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(39, 20, 'es', 'Introducción a Machine Learning', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(40, 20, 'en', 'Introduction to Machine Learning', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(41, 21, 'es', 'MLOps', 'Código Facilito', 'Tuxtla Gutiérrez, México'),
(42, 21, 'en', 'MLOps', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
(43, 22, 'es', 'Programa Oracle Next Education', 'Alura Latam', 'São Paulo, Brasil'),
(44, 22, 'en', 'Program Oracle Next Education', 'Alura Latam', 'São Paulo, Brazil');

--6. HABILIDADES

INSERT INTO skill_translations (id, skill_id, language_code, name) VALUES
(1, 1, 'es', 'Automatización'),
(2, 1, 'en', 'Automation'),
(3, 2, 'es', 'Raspberry Pi/Arduino'),
(4, 2, 'en', 'Raspberry Pi/Arduino'),
(5, 3, 'es', 'Debian/Fedora'),
(6, 3, 'en', 'Debian/Fedora'),
(7, 4, 'es', 'KVM/QEMU'),
(8, 4, 'en', 'KVM/QEMU'),
(9, 5, 'es', 'PodMan'),
(10, 5, 'en', 'Podman'),
(11, 6, 'es', 'SSH/VPN'),
(12, 6, 'en', 'SSH/VPN'),
(13, 7, 'es', 'Bash Scripting'),
(14, 7, 'en', 'Bash Scripting'),
(15, 8, 'es', 'SQL/MySQL'),
(16, 8, 'en', 'SQL/MySQL'),
(17, 9, 'es', 'HTML/CSS'),
(18, 9, 'en', 'HTML/CSS'),
(19, 10, 'es', 'JavaScript'),
(20, 10, 'en', 'JavaScript'),
(21, 11, 'es', 'Documentación'),
(22, 11, 'en', 'Technical Writing'),
(23, 12, 'es', 'Git'),
(24, 12, 'en', 'Git'),
(25, 13, 'es', 'Liderazgo'),
(26, 13, 'en', 'Leadership'),
(27, 14, 'es', 'Resiliencia'),
(28, 14, 'en', 'Resilience'),
(29, 15, 'es', 'Adaptabilidad'),
(30, 15, 'en', 'Adaptability'),
(31, 16, 'es', 'Autonomía'),
(32, 16, 'en', 'Autonomy'),
(33, 17, 'es', 'Negociación'),
(34, 17, 'en', 'Negotiation'),
(35, 18, 'es', 'Comunicación'),
(36, 18, 'en', 'Communication'),
(37, 19, 'es', 'Resolución'),
(38, 19, 'en', 'Problem-solving'),
(39, 20, 'es', 'Estrategia'),
(40, 20, 'en', 'Strategy'),
(41, 21, 'es', 'Español nativo (C2)'),
(42, 21, 'en', 'Native Spanish (C2)'),
(43, 22, 'es', 'Inglés básico-intermedio (A1-A2)'),
(44, 22, 'en', 'Basic-Intermediate English (A1-A2)');

-- Sincronización de secuencias para todas las tablas
SELECT setval(pg_get_serial_sequence('profiles', 'id'), coalesce(max(id), 0) + 1, false) FROM profiles;
SELECT setval(pg_get_serial_sequence('profiles_contact', 'id'), coalesce(max(id), 0) + 1, false) FROM profiles_contact;
SELECT setval(pg_get_serial_sequence('education_types', 'id'), coalesce(max(id), 0) + 1, false) FROM education_types;
SELECT setval(pg_get_serial_sequence('skill_types', 'id'), coalesce(max(id), 0) + 1, false) FROM skill_types;
SELECT setval(pg_get_serial_sequence('summaries', 'id'), coalesce(max(id), 0) + 1, false) FROM summaries;
SELECT setval(pg_get_serial_sequence('experiences', 'id'), coalesce(max(id), 0) + 1, false) FROM experiences;
SELECT setval(pg_get_serial_sequence('responsibilities', 'id'), coalesce(max(id), 0) + 1, false) FROM responsibilities;
SELECT setval(pg_get_serial_sequence('education', 'id'), coalesce(max(id), 0) + 1, false) FROM education;
SELECT setval(pg_get_serial_sequence('skills', 'id'), coalesce(max(id), 0) + 1, false) FROM skills;
SELECT setval(pg_get_serial_sequence('profiles_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM profiles_translations;
SELECT setval(pg_get_serial_sequence('summaries_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM summaries_translations;
SELECT setval(pg_get_serial_sequence('experiences_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM experiences_translations;
SELECT setval(pg_get_serial_sequence('responsibilities_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM responsibilities_translations;
SELECT setval(pg_get_serial_sequence('education_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM education_translations;
SELECT setval(pg_get_serial_sequence('skill_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM skill_translations;