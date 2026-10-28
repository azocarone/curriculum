-- Vista Publica Datos Ofuscados

drop view if exists v_profiles_public;

create or replace view public.v_profiles_public as
with config as (
    -- Cambia a 'false' para ver los datos reales, 'true' para ofuscar
    select true as mask_data 
)
select
    p.id,
    p.full_name,
    p.location,
    
    case
        when not c.mask_data or p.phone is null then p.phone::text
        when length(p.phone::text) >= 10 
            then left(p.phone::text, 4) || '*****' || right(p.phone::text, 4)
        else '******' || right(p.phone::text, 4)
    end as phone,
    
    case
        when not c.mask_data or p.email is null then p.email::text
        else left(p.email::text, 3) || '******@' || split_part(p.email::text, '@', 2)
    end as email,
    
    p.website,
    pt.id as default_title_id
from
    profiles p
    cross join config c
    left join profiles_titles pt 
        on p.id = pt.profile_id 
        and pt.is_default = true;