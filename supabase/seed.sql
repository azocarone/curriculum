-- Master data base (Metadatos y Estructura)

-- 1. PROFILES
INSERT INTO public.profiles (
    id, full_name, location, phone, email, website, created_at
) VALUES (
    1, 
    'José Antonio Azócar Marcano', 
    'San Diego (Carabobo), Venezuela', 
    '+58********26', 
    'i**********************m', 
    'joseazocar.pro', 
    '2026-09-21 13:18:17.627667+00'
);

-- 2. PROFILES_TITLES
INSERT INTO public.profiles_titles (
    id, profile_id, is_default, created_at, version
) VALUES 
    (1, 1, false, '2026-09-21 12:47:03.246519+00', 'Infraestructura'),
    (2, 1, false, '2026-09-24 18:48:48.495189+00', 'Logistica'),
    (3, 1, true, '2026-09-24 19:09:02.416743+00', 'IA');

-- 3. SUMMARIES
INSERT INTO public.summaries (
    id, profile_id, is_default, created_at, version
) VALUES 
    (1, 1, false, '2026-04-01 19:16:51.73453+00', 'Infraestructura'),
    (2, 1, false, '2026-09-19 19:12:49.259068+00', 'Logistica'),
    (3, 1, false, '2026-09-24 19:15:38.702099+00', 'IA v2'),
    (4, 1, true, '2026-09-26 13:47:25.297769+00', 'IA v2');

-- 4. SKILL_TYPES
INSERT INTO public.skill_types (
    id, slug, created_at, context
) VALUES 
    (1, 'ai', '2026-04-01 19:16:51.73453+00', 'AI & Intelligence'),
    (2, 'data', '2026-04-01 19:16:51.73453+00', 'Data Science & Analytics'),
    (3, 'development', '2026-04-01 19:16:51.73453+00', 'Web & Software Dev'),
    (4, 'cloud', '2026-09-26 00:25:47.855443+00', 'Cloud & Infrastructure'),
    (5, 'business', '2026-09-26 00:26:10.310224+00', 'Business, Agility & Soft Skills'),
    (6, 'languages', '2026-09-27 14:11:03.783153+00', 'Languages');

-- 5. SKILLS
INSERT INTO public.skills (
    id, profile_id, type_id, is_active, created_at
) VALUES 
    (5, 1, 6, true, '2026-09-24 14:46:34.854659+00'),
    (6, 1, 6, true, '2026-09-24 14:50:48.700114+00'),
    (11, 1, 1, true, '2026-09-24 16:19:55.439033+00'),
    (12, 1, 1, true, '2026-09-24 16:22:53.80753+00'),
    (13, 1, 1, true, '2026-09-24 16:25:12.984383+00'),
    (14, 1, 1, true, '2026-09-24 16:27:00.138713+00'),
    (15, 1, 2, true, '2026-09-24 16:28:58.25317+00'),
    (16, 1, 3, true, '2026-09-24 16:31:24.567004+00'),
    (17, 1, 3, true, '2026-09-24 16:33:27.092299+00'),
    (18, 1, 3, true, '2026-09-24 16:35:07.408514+00'),
    (19, 1, 4, true, '2026-09-24 16:36:57.901243+00'),
    (20, 1, 3, true, '2026-09-24 16:39:39.329506+00'),
    (21, 1, 4, true, '2026-09-24 16:42:30.793031+00'),
    (22, 1, 5, false, '2026-09-24 16:45:03.791206+00'),
    (23, 1, 5, true, '2026-09-24 16:48:15.096139+00'),
    (24, 1, 5, true, '2026-09-24 16:49:58.262208+00'),
    (25, 1, 5, true, '2026-09-24 16:51:43.82714+00'),
    (26, 1, 5, false, '2026-09-24 16:54:51.51739+00'),
    (27, 1, 5, false, '2026-09-24 16:56:27.475478+00'),
    (28, 1, 5, true, '2026-09-24 16:58:26.688373+00'),
    (29, 1, 1, true, '2026-09-26 13:32:05.025514+00'),
    (30, 1, 2, true, '2026-09-26 13:33:57.020007+00'),
    (31, 1, 2, true, '2026-09-26 13:34:45.749949+00'),
    (32, 1, 2, true, '2026-09-26 13:34:57.901323+00'),
    (33, 1, 4, true, '2026-09-27 15:24:02.105117+00');

-- 6. EXPERIENCES
INSERT INTO public.experiences (
    id, profile_id, company, start_date, end_date, url, is_active, created_at, location
) VALUES 
    (1, 1, 'Freelance', '2010-01-10', null, 'https://joseazocar.pro', true, '2026-04-01 19:16:51.73453+00', 'Valencia, Venezuela'),
    (2, 1, 'Almacenes y Depósitos Integrales Portuarios, C.A.', '2007-05-10', '2009-10-10', 'https://drive.google.com/file/d/15UP-_bxBGPBW5Z1lkk62BZPf25dZYUtj/view?usp=drive_link', true, '2026-04-01 19:16:51.73453+00', 'Puerto Cabello, Venezuela'),
    (3, 1, 'CompuMarket S.A.', '2006-03-10', '2006-06-10', 'https://drive.google.com/file/d/1D9YjClWbaLc8cRyMFn16X6GAAOOnLYcV/view?usp=drive_link', true, '2026-04-01 19:16:51.73453+00', 'Madrid, España');

-- 7. RESPONSIBILITIES
INSERT INTO public.responsibilities (
    id, experience_id, created_at
) VALUES 
    (1, 1, '2026-04-01 19:16:51.73453+00'),
    (2, 1, '2026-04-01 19:16:51.73453+00'),
    (3, 1, '2026-04-01 19:16:51.73453+00'),
    (4, 1, '2026-04-01 19:16:51.73453+00'),
    (7, 2, '2026-04-01 19:16:51.73453+00'),
    (8, 2, '2026-04-01 19:16:51.73453+00'),
    (9, 2, '2026-04-01 19:16:51.73453+00'),
    (10, 2, '2026-04-01 19:16:51.73453+00'),
    (11, 2, '2026-04-01 19:16:51.73453+00'),
    (12, 2, '2026-04-01 19:16:51.73453+00'),
    (13, 3, '2026-04-01 19:16:51.73453+00'),
    (14, 3, '2026-04-01 19:16:51.73453+00'),
    (15, 3, '2026-04-01 19:16:51.73453+00');

-- 8. EDUCATION_TYPES
INSERT INTO public.education_types (
    id, slug, created_at
) VALUES 
    (1, 'academic', '2026-04-01 19:16:51.73453+00'),
    (2, 'certifications', '2026-04-01 19:16:51.73453+00');

-- 9. EDUCATION
INSERT INTO public.education (
    id, profile_id, type_id, start_date, end_date, url, is_active, created_at, institution, location
) VALUES 
    (1, 1, 1, '2005-10-10', '2006-09-10', 'https://drive.google.com/file/d/1z5K-iYm4WesIh68qvL_6UazhPAo_be70/view?usp=drive_link', true, '2026-04-01 19:16:51.73453+00', 'Universidad "Carlos III de Madrid"', 'Madrid, España'),
    (2, 1, 1, '1999-09-10', '2004-06-10', 'https://drive.google.com/file/d/1buZX7Al93yzHXyfRpOjB5S86frdihGfi/view?usp=drive_link', true, '2026-04-01 19:16:51.73453+00 ', 'Universidad "Alejandro de Humboldt"', 'Caracas, Venezuela'),
    (3, 1, 1, '1988-09-10', '1992-12-10', 'https://drive.google.com/file/d/1SQhcfn_ccc34pnOwPwoxXZL1y9HsJqp8/view?usp=drive_link', true, '2026-04-01 19:16:51.73453+00', 'Instituto Universitario de "Nuevas Profesiones"', 'Valencia, Venezuela'),
    (4, 1, 2, null, '2023-06-01', 'https://drive.google.com/file/d/1Bj93CSt9ZhMV1GNDTqqWW415_zYJaKQe/view?usp=drive_link', true, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (6, 1, 2, null, '2023-07-06', 'https://drive.google.com/file/d/1gNtnw6OIEcYehHiANXYV3G4JmMPyniGq/view?usp=drive_link', false, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (14, 1, 2, null, '2023-11-23', 'https://drive.google.com/file/d/1ZOKry2EcPzqe5tKQ-2Py9BIvxacH83M5/view?usp=drive_link', false, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (15, 1, 2, null, '2023-11-23', 'https://drive.google.com/file/d/15owt740I5FqHQ2NFz_WTny7iZwr7sNyY/view?usp=drive_link', false, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (16, 1, 2, null, '2023-11-24', 'https://drive.google.com/file/d/1_4zikAahcNJJiET_wDgzxaTlj2zid05m/view?usp=drive_link', true, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (17, 1, 2, null, '2023-11-25', 'https://drive.google.com/file/d/1YU-zjlhyRkS8_K8qgvMDTPop_k9c0oVn/view?usp=drive_link', false, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (18, 1, 2, null, '2023-03-01', 'https://codigofacilito.com/certificates/130476', false, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (19, 1, 2, null, '2023-11-25', 'https://drive.google.com/file/d/1fC4B70Ply3HznSfiIrJU4kLmuZDgtoX0/view?usp=drive_link', false, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (20, 1, 2, null, '2024-03-17', 'https://drive.google.com/file/d/1dyX-o3kAu-7QKg3VB1K1uiaw-TfJ8gQZ/view?usp=drive_link', false, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (21, 1, 2, null, '2024-03-18', 'https://drive.google.com/file/d/1E2dwKzlFoXM1MRHQTcsO77Ggi7jZQKQh/view?usp=drive_link', false, '2026-04-01 19:16:51.73453+00', 'Código Facilito', 'Tuxtla Gutiérrez, Mexico'),
    (22, 1, 2, '2022-07-27', '2023-05-16', 'https://app.aluracursos.com/user/joseazocar/fullCertificate/4ccff4b5373324134b6783e53c7b6203', false, '2026-04-01 19:16:51.73453+00', 'Alura Latam', 'São Paulo, Brazil'),
    (23, 1, 2, '2026-05-16', '2026-08-26', 'https://app.aluracursos.com/user/azocarone/fullCertificate/6942f704af85c32dd6706ce6b35266f6', false, '2026-09-10 16:25:10.84339+00', 'Alura Latam', 'São Paulo, Brazil'),
    (24, 1, 2, '2026-08-15', '2028-08-15', 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=3F73B906F2AA8AFC806813F3ECE42E79CE4813B6BFFCA87AA4FFE97AF0B93AD9', true, '2026-09-10 16:25:10.84339+00', 'Oracle', 'Redwood Shores, EE. UU.'),
    (25, 1, 2, null, '2023-01-12', 'https://app.aluracursos.com/user/joseazocar/degree-business-agility-grupo3-one-15462/certificate', true, '2026-09-26 14:54:36.458188+00', 'Alura Latam', 'São Paulo, Brazil'),
    (26, 1, 2, null, '2023-01-16', 'https://app.aluracursos.com/user/joseazocar/degree-empreendimiento-grupo3-one-15468/certificate', true, '2026-09-26 15:20:52.8635+00', 'Alura Latam', 'São Paulo, Brazil'),
    (27, 1, 2, '2023-04-13', '2023-05-14', 'https://app.aluracursos.com/user/joseazocar/fullCertificate/4ccff4b5373324134b6783e53c7b6203', true, '2026-09-26 16:17:46.553658+00', 'Alura Latam', 'São Paulo, Brazil'),
    (28, 1, 2, '2022-11-25', '2023-01-20', 'https://app.aluracursos.com/user/joseazocar/degree-javaoo-grupo3-one-15489/certificate', true, '2026-09-26 16:51:48.88769+00', 'Alura Latam', 'São Paulo, Brazil'),
    (29, 1, 2, '2023-01-17', '2023-05-14', 'https://app.aluracursos.com/user/joseazocar/degree-sql-con-mysql-15415/certificate', true, '2026-09-26 17:07:58.33425+00', 'Alura Latam', 'São Paulo, Brazil'),
    (30, 1, 2, null, '2026-06-13', 'https://app.aluracursos.com/user/azocarone/degree-desarollo-y-orquestacion-con-ia-generativa-one-16189/certificate', true, '2026-09-26 18:01:14.292959+00', 'Alura Latam', 'São Paulo, Brazil'),
    (31, 1, 2, '2026-06-16', '2026-07-09', 'https://app.aluracursos.com/user/azocarone/degree-ingenieria-de-agentes-y-automatizacion-con-ia-one-16190/certificate', true, '2026-09-26 18:08:32.077494+00', 'Alura Latam', 'São Paulo, Brazil');

-- Master data traducciones (Contenido literario)

-- 1. PROFILES_TITLES_TRANSLATIONS
INSERT INTO public.profiles_titles_translations (
    id, title_id, language_code, content, created_at
) VALUES 
    (1, 1, 'es', 'Ing. en Informática | Especialista en Infraestructura TI, ERP & Seguridad', '2026-09-21 12:48:30.419809+00'),
    (2, 1, 'en', 'Computer Engineer | IT Infrastructure, ERP & Security Specialist', '2026-09-21 12:49:08.907542+00'),
    (3, 2, 'es', 'Ing. en Informática | Líder de Infraestructura TI, Redes & Logística', '2026-09-24 18:50:17.576235+00'),
    (4, 2, 'en', 'Computer Engineer | IT Infrastructure, Networks & Logistics Leader', '2026-09-24 18:51:03.098222+00'),
    (6, 3, 'es', 'Ing. en Informática | Especialista en Agentes de IA, Cloud & Automatización', '2026-09-24 19:09:59.603533+00'),
    (7, 3, 'en', 'Computer Engineer | AI Agent Engineering, Cloud & Automation Specialist', '2026-09-24 19:10:23.849146+00');

-- 2. SUMMARIES_TRANSLATIONS
INSERT INTO public.summaries_translations (
    id, summary_id, language_code, content, created_at
) VALUES 
    (1, 1, 'es', '<p><strong>Profesional de Tecnologías de la Información</strong> especializado en la administración de infraestructura de TI, gestión de sistemas empresariales (ERP) y aseguramiento de la continuidad operativa 24/7 en entornos de alta exigencia. Posee amplia experiencia en la supervisión de redes, monitoreo de plataformas críticas, parametrización de sistemas ERP y optimización en el control de inventarios. Destaca por su capacidad para diseñar e integrar flujos de datos, procesos ETL e integrar APIs para el intercambio continuo de información estratégica y la automatización de flujos de trabajo.</p>\n\n<p>Orientado a la <strong>gestión de proyectos tecnológicos</strong> y la aplicación rigurosa de políticas de gestión de accesos y seguridad (IAM) para salvaguardar los activos digitales. Cuenta con demostrada competencia en la coordinación efectiva entre equipos técnicos, operativos y partes interesadas (<em>stakeholders</em>). Su alta adaptabilidad al cambio y habilidades de comunicación efectiva le permiten impulsar la estabilidad operativa, la ciberseguridad y la mejora continua de los servicios de TI.<p>', '2026-04-01 19:18:24.327779+00'),
    
    (2, 1, 'en', '<p><strong>IT Professional</strong> specialized in IT infrastructure administration, enterprise resource planning (ERP) systems, and ensuring 24/7 operational continuity across high-demand environments. Demonstrates extensive experience in network supervision, critical platform monitoring, ERP parameterization, and inventory control optimization. Skilled in designing and integrating data flows, ETL processes, and API integrations to enable strategic data exchange and workflow automation.\n\n<p><strong>Driven by technology project management</strong> and the rigorous implementation of Identity and Access Management (IAM) security policies to safeguard digital assets. Proven track record of fostering effective coordination among technical, operational, and stakeholder teams. Combines high adaptability to change with strong communication capabilities to drive operational stability, cybersecurity, and continuous improvement in IT services.</p>', '2026-04-01 19:18:24.327779+00'),
    
    (3, 2, 'es', '<p><strong>Profesional de Tecnologías de la Información</strong> especializado en la gestión, supervisión y mantenimiento de infraestructura crítica y redes inalámbricas, garantizando la continuidad operativa 24/7 en entornos de alta exigencia logística y portuaria. Cuenta con amplia experiencia en el soporte a dispositivos móviles de campo (*handhelds* y escáneres), la administración y parametrización de sistemas ERP (<strong>Datamatic - Neptuno</strong>), y la integración de flujos de datos para optimizar el control de inventarios, la trazabilidad de contenedores y la transmisión continua de información hacia organismos aduanales (<strong>SENIAT - SIDUNEA</strong>).</p>\n\n<p>Orientado a la <strong>gestión de proyectos tecnológicos</strong> y la coordinación efectiva con partes interesadas (<em>stakeholders</em>), aplicando buenas prácticas de seguridad informática y gestión de accesos para salvaguardar los datos operativos. Posee una elevada adaptabilidad al cambio y sólidas habilidades de comunicación para liderar soluciones integrales que aseguren la estabilidad operativa y la mejora continua en entornos de alta complejidad.</p>', '2026-09-19 19:12:49.259068+00'),
    
    (4, 2, 'en', '<p><strong>IT Professional</strong> specialized in managing, supervising, and maintaining critical infrastructure and wireless networks to guarantee 24/7 operational continuity across demanding logistics and port environments. Demonstrates extensive experience in field device support (handhelds and scanners), ERP system administration and parameterization (<strong>Datamatic - Neptuno</strong>), and data integration pipelines designed to optimize inventory control, container traceability, and seamless transmission to customs authorities (<strong>SENIAT - SIDUNEA</strong>).</p>\n\n<p>Driven by <strong>technology project management</strong> and effective stakeholder coordination, applying cybersecurity best practices and access controls to safeguard operational data. Features high adaptability to change and strong communication capabilities to lead end-to-end technology solutions that ensure operational stability and continuous improvement within complex environments.</p>', '2026-09-19 19:12:49.259068+00'),
    
    (6, 3, 'es', '<p><strong>Ingeniero en Informática</strong> y <strong>Técnico Superior Universitario en Computación</strong>, con estudios de <strong>Máster en Comercio Electrónico</strong> por la Universidad Carlos III de Madrid. Posee una trayectoria profesional estructurada que integra fundamentos de ingeniería de software, arquitectura de datos y agilidad empresarial. Especialista certificado en <strong>Inteligencia Artificial y Cloud Computing</strong> por Oracle (<em>OCI AI Foundations Associate</em>), con dominio enfocado en el desarrollo de <strong>IA Generativa, Ingeniería de Agentes Autónomos</strong> y orquestación multiagente mediante LangGraph, LangChain y arquitecturas RAG.</p>\n\n<p>Cuenta con competencia técnica integral en <strong>Python, Java Orientado a Objetos, SQL/MySQL Server y DevOps con Docker</strong>, junto con desarrollo Front-End responsivo (HTML5, CSS3, JavaScript) y análisis de datos con Pandas, Seaborn y Scikit-Learn. Complementa su perfil con formación en transformación de procesos bajo marcos de <strong>Business Agility, Lean Startup y modelado de negocios</strong> (Business Model Canvas), orientado al diseño de soluciones tecnológicas inteligentes, automatización de flujos con n8n y escalabilidad organizativa.<p>', '2026-09-24 19:16:07.835718+00'),
    
    (7, 3, 'en', '<p><strong>Computer Engineer</strong> and <strong>Higher University Technician in Computing</strong>, holding <strong>Master’s studies in E-Commerce</strong> from Universidad Carlos III de Madrid. Features a structured professional background combining software engineering principles, data architecture, and business agility. Certified specialist in <strong>Artificial Intelligence and Cloud Computing</strong> by Oracle (<em>OCI AI Foundations Associate</em>), skilled in <strong>Generative AI development, Autonomous AI Agent Engineering</strong>, and multi-agent orchestration utilizing LangGraph, LangChain, and RAG architectures.</p>\n\n<p>Demonstrates comprehensive technical proficiency in <strong>Python, Object-Oriented Java, SQL/MySQL Server, and DevOps with Docker</strong>, alongside responsive Front-End web development (HTML5, CSS3, JavaScript) and data science with Pandas, Seaborn, and Scikit-Learn. Integrates technical capabilities with organizational transformation under <strong>Business Agility, Lean Startup, and business modeling</strong> frameworks (Business Model Canvas), focused on delivering intelligent tech solutions, workflow automation using n8n, and scalable systems.<p>', '2026-09-24 19:16:43.358017+00'),
    
    (8, 4, 'es', '<strong>Ingeniero en Informática</strong> y <strong>Técnico Superior Universitario en Computación</strong>, con estudios de posgrado en <strong>Máster en Comercio Electrónico</strong> por la Universidad Carlos III de Madrid. Especialista certificado en <strong>Inteligencia Artificial y Cloud Computing</strong> por Oracle (OCI AI Foundations Associate). Posee un perfil integral que combina la ingeniería de software tradicional con <strong>IA Generativa</strong>, <strong>Ingeniería de Agentes Autónomos</strong> y orquestación multiagente mediante LangGraph, LangChain y arquitecturas RAG. Amplia competencia en desarrollo con Python, Java, SQL/MySQL Server, contenedores con Docker y automatización de procesos con n8n, respaldado por sólidos fundamentos en <strong>Business Agility</strong> y <strong>Lean Startup</strong>.', '2026-09-26 13:48:27.206157+00'),
    
    (9, 4, 'en', '<strong>Computer Engineer</strong> and <strong>Associate Degree in Computer Science</strong>, with graduate studies in a <strong>Master''s in E-Commerce</strong> from Universidad Carlos III de Madrid. Certified specialist in <strong>Artificial Intelligence and Cloud Computing</strong> by Oracle (OCI AI Foundations Associate). Features a well-rounded profile combining traditional software engineering with <strong>Generative AI</strong>, <strong>Autonomous Agent Engineering</strong>, and multi-agent orchestration using LangGraph, LangChain, and RAG architectures. Highly skilled in development with Python, Java, SQL/MySQL Server, containerization with Docker, and process automation with n8n, backed by strong fundamentals in <strong>Business Agility</strong> and <strong>Lean Startup</strong>.', '2026-09-26 13:53:01.868367+00');

-- 3. SKILL_TRANSLATIONS
INSERT INTO public.skill_translations (
    id, skill_id, language_code, name, created_at
) VALUES 
    (1, 5, 'es', 'Español (Nativo)', '2026-09-24 14:48:05.66942+00'),
    (3, 5, 'en', 'Spanish (Native)', '2026-09-24 14:49:47.536633+00'),
    (4, 6, 'es', 'Inglés (Básico-Intermedio / A2)', '2026-09-24 14:51:40.867763+00'),
    (5, 6, 'en', 'English (Basic-Intermediate / A2)', '2026-09-24 14:52:04.30347+00'),
    (16, 11, 'es', 'Ingeniería de Agentes (LangGraph)', '2026-09-24 16:21:14.299816+00'),
    (17, 11, 'en', 'Agent Engineering (LangGraph)', '2026-09-24 16:21:51.964102+00'),
    (18, 12, 'es', 'IA Generativa (LangChain, LLMs)', '2026-09-24 16:23:26.319098+00'),
    (19, 12, 'en', 'Generative AI (LangChain, LLMs)', '2026-09-24 16:23:48.696205+00'),
    (20, 13, 'es', 'Workflows en n8n', '2026-09-24 16:25:44.950158+00'),
    (21, 13, 'en', 'Workflows in n8n', '2026-09-24 16:26:09.942101+00'),
    (22, 14, 'es', 'Servicios de OCI AI', '2026-09-24 16:27:43.912335+00'),
    (23, 14, 'en', 'OCI AI Services', '2026-09-24 16:28:06.894123+00'),
    (24, 15, 'es', 'Python', '2026-09-24 16:29:28.736017+00'),
    (25, 15, 'en', 'Python', '2026-09-24 16:30:04.708851+00'),
    (26, 16, 'es', 'Java (POO, JDBC)', '2026-09-24 16:31:56.236201+00'),
    (27, 16, 'en', 'Java  (POO, JDBC)', '2026-09-24 16:32:32.129441+00'),
    (28, 17, 'es', 'HTML5', '2026-09-24 16:33:57.701189+00'),
    (29, 17, 'en', 'HTML5', '2026-09-24 16:34:22.568166+00'),
    (30, 18, 'es', 'CSS3', '2026-09-24 16:35:39.411486+00'),
    (31, 18, 'en', 'CSS3', '2026-09-24 16:36:04.192097+00'),
    (32, 19, 'es', 'SQL (MySQL Server)', '2026-09-24 16:37:31.118923+00'),
    (33, 19, 'en', 'SQL (MySQL Server)', '2026-09-24 16:37:55.518183+00'),
    (34, 20, 'es', 'JavaScript (DOM/CRUD)', '2026-09-24 16:40:13.834117+00'),
    (35, 20, 'en', 'JavaScript (DOM/CRUD)', '2026-09-24 16:40:53.483388+00'),
    (36, 21, 'es', 'Docker', '2026-09-24 16:43:02.25532+00'),
    (37, 21, 'en', 'Docker', '2026-09-24 16:43:25.701843+00'),
    (38, 22, 'es', 'Ingeniería e Informática Académica', '2026-09-24 16:45:55.50806+00'),
    (39, 22, 'en', 'Computer Science & Software Engineering', '2026-09-24 16:46:30.221625+00'),
    (40, 23, 'es', 'Agilidad Organizacional', '2026-09-24 16:48:54.103265+00'),
    (41, 23, 'en', 'Business Agility', '2026-09-24 16:49:16.190512+00'),
    (42, 24, 'es', 'Modelado de Negocios (Lean Startup, Canvas)', '2026-09-24 16:50:30.953437+00'),
    (43, 24, 'en', 'Business Modeling (Lean Startup, Canvas)', '2026-09-24 16:51:02.35312+00'),
    (44, 25, 'es', 'Comunicación Asertiva', '2026-09-24 16:53:12.588241+00'),
    (45, 25, 'en', 'Assertive Communication', '2026-09-24 16:53:43.33222+00'),
    (46, 26, 'es', 'Gestión del Tiempo', '2026-09-24 16:55:24.339728+00'),
    (47, 26, 'en', 'Time Management', '2026-09-24 16:55:53.043384+00'),
    (48, 27, 'es', 'Marca Profesional', '2026-09-24 16:57:03.891409+00'),
    (49, 27, 'en', 'Professional Branding', '2026-09-24 16:57:30.38728+00'),
    (50, 28, 'es', 'Pensamiento Computacional', '2026-09-24 16:58:58.451537+00'),
    (51, 28, 'en', 'Computational Thinking', '2026-09-24 16:59:22.350175+00'),
    (52, 29, 'es', 'Arquitectura RAG', '2026-09-26 13:32:41.329207+00'),
    (53, 29, 'en', 'RAG Architecture', '2026-09-26 13:33:19.73806+00'),
    (54, 30, 'es', 'Pandas', '2026-09-26 13:35:36.383885+00'),
    (55, 30, 'en', 'Pandas', '2026-09-26 13:36:33.637974+00'),
    (56, 31, 'es', 'Seaborn', '2026-09-26 13:37:19.738806+00'),
    (57, 31, 'en', 'Seaborn', '2026-09-26 13:37:41.163612+00'),
    (58, 32, 'es', 'Machine Learning (Scikit-Learn)', '2026-09-26 13:38:26.602549+00'),
    (59, 32, 'en', 'Machine Learning (Scikit-Learn)', '2026-09-26 13:39:02.296164+00'),
    (60, 33, 'es', 'IaC Cloud (OCI)', '2026-09-27 15:25:18.746537+00'),
    (61, 33, 'en', 'Cloud IaC (OCI)', '2026-09-27 15:25:44.473126+00');

-- 4. EXPERIENCES_TRANSLATIONS
INSERT INTO public.experiences_translations (
    id, experience_id, language_code, "position", created_at
) VALUES 
    (1, 1, 'es', 'Consultor de Infraestructura y Operaciones IT', '2026-04-01 19:18:24.327779+00'),
    (2, 1, 'en', 'IT Infrastructure & Operations Consultant', '2026-04-01 19:18:24.327779+00'),
    (3, 2, 'es', 'Coordinador de Sistemas', '2026-04-01 19:18:24.327779+00'),
    (4, 2, 'en', 'Systems Coordinator', '2026-04-01 19:18:24.327779+00'),
    (5, 3, 'es', 'Pasante de Máster en Comercio Electrónico', '2026-04-01 19:18:24.327779+00'),
    (6, 3, 'en', 'Master’s Intern in E-commerce', '2026-04-01 19:18:24.327779+00');

-- 5. RESPONSIBILITIES_TRANSLATIONS
INSERT INTO public.responsibilities_translations (
    id, responsibility_id, language_code, description, created_at
) VALUES 
    (1, 1, 'es', '<strong>Diseñar e implementar redes LAN y proyectos de cableado estructurado</strong>, garantizando instalaciones eléctricas especializadas y conectividad de baja latencia bajo normas técnicas de seguridad.', '2026-04-01 19:18:24.327779+00'),
    (2, 1, 'en', '<strong>Design and deploy LAN networks and structured cabling projects</strong>, delivering specialized electrical setups and low-latency connectivity in compliance with technical safety standards.', '2026-04-01 19:18:24.327779+00'),
    (3, 2, 'es', '<strong>Administrar servidores y estaciones de trabajo en entornos GNU/Linux</strong>, optimizando la estabilidad del sistema operativo, la disponibilidad de servicios y la seguridad de la infraestructura.', '2026-04-01 19:18:24.327779+00'),
    (4, 2, 'en', '<strong>Administer GNU/Linux servers and workstations</strong>, maximizing operating system stability, service availability, and overall infrastructure security.', '2026-04-01 19:18:24.327779+00'),
    (5, 3, 'es', '<strong>Liderar la resolución de incidentes críticos (Nivel 2 y 3)</strong>, implementando protocolos de seguridad perimetral y análisis forense post-incidente para mitigar vulnerabilidades y asegurar la continuidad del negocio.', '2026-04-01 19:18:24.327779+00'),
    (6, 3, 'en', '<strong>Lead Level 2 and Level 3 critical incident resolution</strong>, executing perimeter security protocols and post-incident forensic analysis to mitigate vulnerabilities and ensure business continuity.', '2026-04-01 19:18:24.327779+00'),
    (7, 4, 'es', '<strong>Gestionar el ciclo de vida de activos digitales</strong>, desde la administración de dominios hasta el despliegue y optimización de plataformas web y hosting de alto rendimiento.', '2026-04-01 19:18:24.327779+00'),
    (8, 4, 'en', '<strong>Manage the full lifecycle of digital assets</stromg>, from domain administration to high-performance hosting deployment and web infrastructure optimization.', '2026-04-01 19:18:24.327779+00'),
    (13, 7, 'es', '<strong>Garantizar la disponibilidad 24/7 de la infraestructura crítica</strong>, asegurando la transmisión ininterrumpida de flujos de datos hacia el <strong>SENIAT - SIDUNEA</strong> para la nacionalización eficiente de mercancías.', '2026-04-01 19:18:24.327779+00'),
    (14, 7, 'en', '<strong>Ensure 24/7 availability of critical IT infrastructure</strong>, maintaining continuous data integration with <strong>SENIAT - SIDUNEA</strong> systems for efficient customs clearance operations.', '2026-04-01 19:18:24.327779+00'),
    (15, 8, 'es', '<strong>Administrar y parametrizar el sistema ERP (Datamatic - Neptuno)</strong>, incrementando la precisión en el control de inventarios, la trazabilidad de contenedores y la agilidad operacional.', '2026-04-01 19:18:24.327779+00'),
    (16, 8, 'en', '<strong>Administer and configure the ERP system (Datamatic - Neptuno)</strong>, enhancing inventory control precision, container traceability, and overall operational efficiency.', '2026-04-01 19:18:24.327779+00'),
    (17, 9, 'es', '<strong>Supervisar la infraestructura de redes inalámbricas y dispositivos de campo</strong> (<en>handhelds</em> y escáneres), optimizando la captura de datos en tiempo real dentro de las zonas de almacenamiento.', '2026-04-01 19:18:24.327779+00'),
    (18, 9, 'en', '<strong>Supervise wireless network infrastructure and field mobile devices</strong> (handhelds and scanners), ensuring real-time data capture across storage facilities.', '2026-04-01 19:18:24.327779+00'),
    (19, 10, 'es', '<strong>Diseñar y ejecutar políticas de respaldo (backup) y seguridad de la información</strong>, protegiendo la integridad de los datos operativos y minimizando riesgos por contingencias.', '2026-04-01 19:18:24.327779+00'),
    (20, 10, 'en', '<strong>Design and execute data backup and information security policies</strong>, safeguarding operational data integrity and mitigating business interruption risks.', '2026-04-01 19:18:24.327779+00'),
    (21, 11, 'es', '<strong>Coordinar comunicaciones técnicas con plataformas navieras</strong>, agilizando el intercambio electrónico de información para el despacho de mercancías.', '2026-04-01 19:18:24.327779+00'),
    (22, 11, 'en', '<strong>Coordinate technical communications with shipping platforms</strong>, accelerating electronic documentation exchange for cargo dispatch.', '2026-04-01 19:18:24.327779+00'),
    (23, 12, 'es', '<strong>Impartir capacitación técnica y funcional al personal</strong>, reduciendo la curva de aprendizaje en la adopción de herramientas y plataformas integradas.', '2026-04-01 19:18:24.327779+00'),
    (24, 12, 'en', '<strong>Deliver technical and functional training to staff</strong>, shortening the learning curve for integrated systems and tools adoption.', '2026-04-01 19:18:24.327779+00'),
    (25, 13, 'es', '<strong>Administrar plataformas CMS y realizar estudios de benchmarking</strong>, identificando oportunidades competitivas y tendencias de mercado para potenciar el portal e-commerce.', '2026-04-01 19:18:24.327779+00'),
    (26, 13, 'en', '<strong>Manage CMS platforms and conduct benchmarking studies</strong>, identifying competitive market opportunities to enhance e-commerce operations.', '2026-04-01 19:18:24.327779+00'),
    (27, 14, 'es', '<strong>Ejecutar estrategias de optimización On-Page y análisis de métricas web</strong>, impulsando el posicionamiento SEO y el incremento del tráfico orgánico en el sitio de ventas.', '2026-04-01 19:18:24.327779+00'),
    (28, 14, 'en', '<strong>Execute On-Page optimization strategies and web analytics monitoring</strong>, driving organic traffic growth and improving search engine rankings for the e-commerce portal.', '2026-04-01 19:18:24.327779+00'),
    (29, 15, 'es', '<strong>Brindar soporte operativo en el ciclo de ventas digitales</strong> y atención al cliente especializado, optimizando la experiencia de usuario y la resolución de requerimientos.', '2026-04-01 19:18:24.327779+00'),
    (30, 15, 'en', '<strong>Provide operational support across the digital sales funnel</strong> and specialized customer service, improving user experience and inquiry resolution.', '2026-04-01 19:18:24.327779+00');

-- 6. EDUCATION_TRANSLATIONS
INSERT INTO public.education_translations (
    id, education_id, language_code, title, created_at, top_badges, bottom_badges
) VALUES 
    (1, 1, 'es', 'Máster en Comercio Electrónico ', '2026-04-01 19:18:24.327779+00', ARRAY['Posgrado'], ARRAY['500 hrs']),
    (2, 1, 'en', 'Master’s in E-Commerce', '2026-04-01 19:18:24.327779+00', ARRAY['Postgraduate'], ARRAY['500 hrs']),
    (3, 2, 'es', 'Ingeniero en Informática', '2026-04-01 19:18:24.327779+00', ARRAY['Grado','CIV Nº 160.497'], ARRAY['5 años']),
    (4, 2, 'en', 'B.S. in Computer Engineering', '2026-04-01 19:18:24.327779+00', ARRAY['Undergraduate','CIV Nº 160,497'], ARRAY['5 years']),
    (5, 3, 'es', 'TSU en Computación ', '2026-04-01 19:18:24.327779+00', ARRAY['Técnico'], ARRAY['3 años']),
    (6, 3, 'en', 'A.S. in Computer Technology', '2026-04-01 19:18:24.327779+00', ARRAY['Technical'], ARRAY['3 years']),
    (7, 4, 'es', 'Profesional de Python', '2026-04-01 19:18:24.327779+00', ARRAY['DEV'], ARRAY['10 hrs']),
    (8, 4, 'en', 'Professional Python', '2026-04-01 19:18:24.327779+00', ARRAY['DEV'], ARRAY['10 hrs']),
    (9, 25, 'es', 'Business Agility', '2026-09-26 15:03:39.379016+00', ARRAY['AGILITY'], ARRAY['26 hrs']),
    (11, 6, 'es', 'Introducción al análisis de datos con Python', '2026-04-01 19:18:24.327779+00', null, null),
    (12, 6, 'en', 'Introduction to Data Analysis with Python', '2026-04-01 19:18:24.327779+00', null, null),
    (19, 25, 'en', 'Business Agility', '2026-09-26 15:15:07.25702+00', ARRAY['AGILITY'], ARRAY['26 hrs']),
    (20, 26, 'es', 'Emprendimiento', '2026-09-26 15:22:48.20362+00', ARRAY['BUSINESS'], ARRAY['45 hrs']),
    (21, 26, 'en', 'Entrepreneurship', '2026-09-26 15:24:54.330486+00', ARRAY['BUSINESS'], ARRAY['45 hrs']),
    (22, 27, 'es', 'Especialización en Data Science', '2026-09-26 16:24:54.686654+00', ARRAY['DATA'], ARRAY['58 hrs']),
    (23, 27, 'en', 'Data Science', '2026-09-26 16:40:30.925247+00', ARRAY['DATA'], ARRAY['58 hrs']),
    (24, 28, 'es', 'Java Orientado a Objetos', '2026-09-26 16:53:33.590969+00', ARRAY['DEV'], ARRAY['110 hrs']),
    (26, 28, 'en', 'Object-Oriented Java Programming', '2026-09-26 16:55:29.040758+00', ARRAY['DEV'], ARRAY['110 hrs']),
    (27, 14, 'es', 'Instalación y configuración de Python', '2026-04-01 19:18:24.327779+00', null, null),
    (28, 14, 'en', 'Python Installation and Configuration', '2026-04-01 19:18:24.327779+00', null, null),
    (29, 15, 'es', 'Anotaciones y Type Hints con Python', '2026-04-01 19:18:24.327779+00', null, null),
    (30, 15, 'en', 'Annotations and Type Hints with Python', '2026-04-01 19:18:24.327779+00', null, null),
    (31, 16, 'es', 'Profesional de Docker', '2026-04-01 19:18:24.327779+00', ARRAY['DEVOPS'], ARRAY['3.5 hrs']),
    (32, 16, 'en', 'Professional Docker', '2026-04-01 19:18:24.327779+00', ARRAY['DEVOPS'], ARRAY['3.5 hrs']),
    (33, 17, 'es', 'Manejo de archivos con Python', '2026-04-01 19:18:24.327779+00', null, null),
    (34, 17, 'en', 'File Handling with Python', '2026-04-01 19:18:24.327779+00', null, null),
    (35, 18, 'es', 'Reto Python', '2026-04-01 19:18:24.327779+00', null, null),
    (36, 18, 'en', 'Python Challenge', '2026-04-01 19:18:24.327779+00', null, null),
    (37, 19, 'es', 'GitHub Copilot', '2026-04-01 19:18:24.327779+00', null, null),
    (38, 19, 'en', 'GitHub Copilot', '2026-04-01 19:18:24.327779+00', null, null),
    (39, 20, 'es', 'Introducción a Machine Learning', '2026-04-01 19:18:24.327779+00', null, null),
    (40, 20, 'en', 'Introduction to Machine Learning', '2026-04-01 19:18:24.327779+00', null, null),
    (41, 21, 'es', 'MLOps', '2026-04-01 19:18:24.327779+00', null, null),
    (42, 21, 'en', 'MLOps', '2026-04-01 19:18:24.327779+00', null, null),
    (43, 22, 'es', 'Programa Oracle Next Education G3', '2026-04-01 19:18:24.327779+00', null, null),
    (44, 22, 'en', 'Program Oracle Next Education G3', '2026-04-01 19:18:24.327779+00', null, null),
    (45, 23, 'es', 'Programa Oracle Next Education G10', '2026-09-10 16:25:10.84339+00', null, null),
    (46, 23, 'en', 'Program Oracle Next Education G10', '2026-09-10 16:25:10.84339+00', null, null),
    (47, 24, 'es', 'OCI AI Foundations Associate', '2026-09-10 16:25:10.84339+00', ARRAY['IA'], ARRAY['Vigente']),
    (48, 24, 'en', 'OCI AI Foundations Associate', '2026-09-10 16:25:10.84339+00', ARRAY['IA'], ARRAY['Valid']),
    (49, 29, 'es', 'SQL con MySQL', '2026-09-26 17:14:00.13622+00', ARRAY['DATA'], ARRAY['79 hrs']),
    (50, 29, 'en', 'SQL & MySQL', '2026-09-26 17:15:21.686111+00', ARRAY['DATA'], ARRAY['79 hrs']),
    (51, 30, 'es', 'Orquestación con IA Generativa', '2026-09-26 18:03:06.110848+00', ARRAY['IA'], ARRAY['25 hrs']),
    (52, 30, 'en', 'Generative AI Orchestration', '2026-09-26 18:04:02.652095+00', ARRAY['IA'], ARRAY['25 hrs']),
    (53, 31, 'es', 'Ingeniería de Agentes con IA', '2026-09-26 18:09:26.735493+00', ARRAY['IA'], ARRAY['36 hrs']),
    (54, 31, 'en', 'AI Agent Engineering', '2026-09-26 18:10:03.386469+00', ARRAY['IA'], ARRAY['36 hrs']);

-- Sincronización de secuencias para todas las tablas
SELECT setval(pg_get_serial_sequence('profiles', 'id'), coalesce(max(id), 0) + 1, false) FROM profiles;
SELECT setval(pg_get_serial_sequence('profiles_titles', 'id'), coalesce(max(id), 0) + 1, false) FROM profiles_title;
SELECT setval(pg_get_serial_sequence('summaries', 'id'), coalesce(max(id), 0) + 1, false) FROM summaries;
SELECT setval(pg_get_serial_sequence('skill_types', 'id'), coalesce(max(id), 0) + 1, false) FROM skill_types;
SELECT setval(pg_get_serial_sequence('skills', 'id'), coalesce(max(id), 0) + 1, false) FROM skills;
SELECT setval(pg_get_serial_sequence('experiences', 'id'), coalesce(max(id), 0) + 1, false) FROM experiences;
SELECT setval(pg_get_serial_sequence('responsibilities', 'id'), coalesce(max(id), 0) + 1, false) FROM responsibilities;
SELECT setval(pg_get_serial_sequence('education_types', 'id'), coalesce(max(id), 0) + 1, false) FROM education_types;
SELECT setval(pg_get_serial_sequence('education', 'id'), coalesce(max(id), 0) + 1, false) FROM education;
SELECT setval(pg_get_serial_sequence('profiles_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM profiles_translations;
SELECT setval(pg_get_serial_sequence('summaries_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM summaries_translations;
SELECT setval(pg_get_serial_sequence('skill_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM skill_translations;
SELECT setval(pg_get_serial_sequence('experiences_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM experiences_translations;
SELECT setval(pg_get_serial_sequence('responsibilities_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM responsibilities_translations;
SELECT setval(pg_get_serial_sequence('education_translations', 'id'), coalesce(max(id), 0) + 1, false) FROM education_translations;