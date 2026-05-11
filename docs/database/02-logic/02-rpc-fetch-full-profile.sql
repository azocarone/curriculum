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

    'id', p.id,
    'full_name', p.full_name,
    'phone', p.phone,
    'email', p.email,
    'website', p.website,

    'profiles_translations', (
        select coalesce(jsonb_agg(pt), '[]'::jsonb)
        from profiles_translations pt
        where pt.profile_id = p.id
          and pt.language_code = p_lang
    ),

    'summaries', (
        select coalesce(jsonb_agg(
            jsonb_build_object(
                'id', s.id,
                'summaries_translations', (
                    select coalesce(jsonb_agg(st), '[]'::jsonb)
                    from summaries_translations st
                    where st.summary_id = s.id
                      and st.language_code = p_lang
                )
            )
        ), '[]'::jsonb)
        from summaries s
        where s.profile_id = p.id
    ),

    'experiences', (
        select coalesce(jsonb_agg(
            jsonb_build_object(
                'id', e.id,
                'company', e.company,
                'start_date', e.start_date,
                'end_date', e.end_date,
                'url', e.url,
                'is_active', e.is_active,

                'experiences_translations', (
                    select coalesce(jsonb_agg(et), '[]'::jsonb)
                    from experiences_translations et
                    where et.experience_id = e.id
                      and et.language_code = p_lang
                ),

                'responsibilities', (
                    select coalesce(jsonb_agg(
                        jsonb_build_object(
                            'id', r.id,
                            'responsibilities_translations', (
                                select coalesce(jsonb_agg(rt), '[]'::jsonb)
                                from responsibilities_translations rt
                                where rt.responsibility_id = r.id
                                  and rt.language_code = p_lang
                            )
                        )
                    ), '[]'::jsonb)
                    from responsibilities r
                    where r.experience_id = e.id
                )
            )
            order by e.start_date desc
        ), '[]'::jsonb)
        from experiences e
        where e.profile_id = p.id
          and e.is_active = true
    ),

    'education', (
        select coalesce(jsonb_agg(
            jsonb_build_object(
                'id', ed.id,
                'start_date', ed.start_date,
                'end_date', ed.end_date,
                'url', ed.url,
                'is_active', ed.is_active,

                'education_types', (
                    select jsonb_build_object('slug', et.slug)
                    from education_types et
                    where et.id = ed.type_id
                ),

                'education_translations', (
                    select coalesce(jsonb_agg(edt), '[]'::jsonb)
                    from education_translations edt
                    where edt.education_id = ed.id
                      and edt.language_code = p_lang
                )
            )
            order by ed.end_date desc nulls first
        ), '[]'::jsonb)
        from education ed
        where ed.profile_id = p.id
          and ed.is_active = true
    ),

    'skills', (
        select coalesce(jsonb_agg(
            jsonb_build_object(
                'id', sk.id,

                'skill_types', (
                    select jsonb_build_object('slug', st.slug)
                    from skill_types st
                    where st.id = sk.type_id
                ),

                'skill_translations', (
                    select coalesce(jsonb_agg(skt), '[]'::jsonb)
                    from skill_translations skt
                    where skt.skill_id = sk.id
                      and skt.language_code = p_lang
                )
            )
        ), '[]'::jsonb)
        from skills sk
        where sk.profile_id = p.id
    )

)
from v_profiles_public p
where p.id = p_identifier;
$$;