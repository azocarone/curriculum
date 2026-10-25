-- RPC Fetch full profile

create or replace function fetch_full_profile(
    p_identifier integer,
    p_lang text
)
returns jsonb
language sql
stable
as $$
select jsonb_build_object(

    'contact', jsonb_build_object(
            'id', p.id,
            'full_name', p.full_name,
            'title', (
                select pt.content
                from profiles_titles_translations pt
                where pt.title_id = p.default_title_id
                and pt.language_code = p_lang
                limit 1
            ),
            'location', p.location,
            'phone', p.phone,
            'email', p.email,
            'website', p.website
    ),

    'summary', (
        select jsonb_build_object(
            'id', s.id,
            'content', st.content
        )
        from summaries s
        join summaries_translations st on st.summary_id = s.id
        where s.profile_id = p.id
        and s.is_default
        and st.language_code = p_lang
        limit 1
    ),

    'experiences', (
        select coalesce(jsonb_agg(
            jsonb_build_object(
                'id', e.id,
                -- Mapeo directo de la traducción de la experiencia
                'position', et.position,
                'start_date', e.start_date,
                'end_date', e.end_date,
                'company', e.company,
                'location', e.location,
                'url', e.url,
                'is_active', e.is_active,
                                
                'responsibilities', (
                    select coalesce(jsonb_agg(
                        jsonb_build_object(
                            'id', r.id,
                            'description', rt.description
                        )
                    ), '[]'::jsonb)
                    from responsibilities r
                    join responsibilities_translations rt on rt.responsibility_id = r.id
                    where r.experience_id = e.id
                      and rt.language_code = p_lang
                )
            )
            order by e.start_date desc
        ), '[]'::jsonb)
        from experiences e
        left join experiences_translations et on et.experience_id = e.id and et.language_code = p_lang
        where e.profile_id = p.id
          and e.is_active = true
    ),

    'educationGroups', (
        select coalesce(
            jsonb_object_agg(
                grp.slug, 
                grp.items
            ), 
            '{}'::jsonb
        )
        from (
            select 
                et.slug as slug,
                jsonb_agg(
                    jsonb_build_object(
                        'id', ed.id,
                        'title', edt.title,             -- Traducción directa
                        'institution', ed.institution,
                        'location', ed.location,
                        'start_date', ed.start_date,
                        'end_date', ed.end_date,
                        'url', ed.url,
                        'is_active', ed.is_active,
                        'top_badges', edt.top_badges,
                        'bottom_badges', edt.bottom_badges
                    )
                    order by ed.end_date desc nulls first
                ) as items
            from education ed
            join education_types et on et.id = ed.type_id
            left join education_translations edt 
                   on edt.education_id = ed.id 
                  and edt.language_code = p_lang
            where ed.profile_id = p.id
              and ed.is_active = true
            group by et.slug
        ) grp
    ),

    'skillGroups', (
        select coalesce(
            jsonb_object_agg(
                grp.slug, 
                grp.items
            ), 
            '{}'::jsonb
        )
        from (
            select 
                st.slug as slug,
                jsonb_agg(
                    jsonb_build_object(
                        'id', sk.id,
                        'name', skt.name,             -- Nombre/descripción traducida directa (ajusta 'name' si la columna se llama diferente en skt, p. ej. 'content')
                        'is_active', sk.is_active
                    )
                ) as items
            from skills sk
            join skill_types st on st.id = sk.type_id
            left join skill_translations skt 
                   on skt.skill_id = sk.id 
                  and skt.language_code = p_lang
            where sk.profile_id = p.id
              and sk.is_active = true
            group by st.slug
        ) grp
    )
)
from v_profiles_public p
where p.id = p_identifier;
$$;