-- Vista Publica Datos Ofuscados

CREATE OR REPLACE VIEW v_profiles_public AS
SELECT
    p.id,
    p.full_name,
    -- Ofuscación: ****** + últimos 4 dígitos
    CASE 
        WHEN pc.phone IS NOT NULL THEN 
            '******' || right(pc.phone, 4)
        ELSE 'No disponible' 
    END as phone,
    -- Ofuscación: Primera letra + asteriscos + @ + dominio
    CASE 
        WHEN pc.email IS NOT NULL THEN 
            left(pc.email, 1) || '****@' || split_part(pc.email, '@', 2)
        ELSE 'No disponible' 
    END as email,
    p.website   
FROM profiles p
LEFT JOIN profiles_contact pc ON p.id = pc.profile_id;