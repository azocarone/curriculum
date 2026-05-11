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
