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