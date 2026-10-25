-- Vista Publica Datos Ofuscados

create view public.v_profiles_public as
select
  p.id,
  p.full_name,
  p.location,
  case
    when p.phone is not null
    and length(p.phone::text) >= 10 then ("left" (p.phone::text, 4) || '*****'::text) || "right" (p.phone::text, 4)
    when p.phone is not null then '******'::text || "right" (p.phone::text, 4)
    else 'No disponible'::text
  end as phone,
  case
    when p.email is not null then ("left" (p.email::text, 3) || '******@'::text) || split_part(p.email::text, '@'::text, 2)
    else 'No disponible'::text
  end as email,
  p.website,
  pt.id as default_title_id
from
  profiles p
  left join profiles_titles pt on p.id = pt.profile_id
  and pt.is_default = true;