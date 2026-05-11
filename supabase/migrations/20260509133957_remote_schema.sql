


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."fetch_full_profile"("p_identifier" integer, "p_lang" "text") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
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


ALTER FUNCTION "public"."fetch_full_profile"("p_identifier" integer, "p_lang" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."rls_auto_enable"() RETURNS "event_trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


ALTER FUNCTION "public"."rls_auto_enable"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."education" (
    "id" integer NOT NULL,
    "profile_id" integer,
    "type_id" integer,
    "start_date" "date",
    "end_date" "date",
    "url" "text",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."education" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."education_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."education_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."education_id_seq" OWNED BY "public"."education"."id";



CREATE TABLE IF NOT EXISTS "public"."education_translations" (
    "id" integer NOT NULL,
    "education_id" integer,
    "language_code" character(2) NOT NULL,
    "title" character varying(150) NOT NULL,
    "institution" character varying(150) NOT NULL,
    "location" character varying(100),
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."education_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."education_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."education_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."education_translations_id_seq" OWNED BY "public"."education_translations"."id";



CREATE TABLE IF NOT EXISTS "public"."education_types" (
    "id" integer NOT NULL,
    "slug" character varying(50) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."education_types" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."education_types_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."education_types_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."education_types_id_seq" OWNED BY "public"."education_types"."id";



CREATE TABLE IF NOT EXISTS "public"."experiences" (
    "id" integer NOT NULL,
    "profile_id" integer,
    "company" character varying(100) NOT NULL,
    "start_date" "date" NOT NULL,
    "end_date" "date",
    "url" "text",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."experiences" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."experiences_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."experiences_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."experiences_id_seq" OWNED BY "public"."experiences"."id";



CREATE TABLE IF NOT EXISTS "public"."experiences_translations" (
    "id" integer NOT NULL,
    "experience_id" integer,
    "language_code" character(2) NOT NULL,
    "position" character varying(100) NOT NULL,
    "location" character varying(100),
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."experiences_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."experiences_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."experiences_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."experiences_translations_id_seq" OWNED BY "public"."experiences_translations"."id";



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" integer NOT NULL,
    "full_name" character varying(100) NOT NULL,
    "website" character varying(100),
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles_contact" (
    "id" integer NOT NULL,
    "profile_id" integer,
    "phone" character varying(20),
    "email" character varying(100) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."profiles_contact" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."profiles_contact_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."profiles_contact_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."profiles_contact_id_seq" OWNED BY "public"."profiles_contact"."id";



CREATE SEQUENCE IF NOT EXISTS "public"."profiles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."profiles_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."profiles_id_seq" OWNED BY "public"."profiles"."id";



CREATE TABLE IF NOT EXISTS "public"."profiles_translations" (
    "id" integer NOT NULL,
    "profile_id" integer,
    "language_code" character(2) NOT NULL,
    "location" character varying(150),
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."profiles_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."profiles_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."profiles_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."profiles_translations_id_seq" OWNED BY "public"."profiles_translations"."id";



CREATE TABLE IF NOT EXISTS "public"."responsibilities" (
    "id" integer NOT NULL,
    "experience_id" integer,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."responsibilities" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."responsibilities_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."responsibilities_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."responsibilities_id_seq" OWNED BY "public"."responsibilities"."id";



CREATE TABLE IF NOT EXISTS "public"."responsibilities_translations" (
    "id" integer NOT NULL,
    "responsibility_id" integer,
    "language_code" character(2) NOT NULL,
    "description" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."responsibilities_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."responsibilities_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."responsibilities_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."responsibilities_translations_id_seq" OWNED BY "public"."responsibilities_translations"."id";



CREATE TABLE IF NOT EXISTS "public"."skill_translations" (
    "id" integer NOT NULL,
    "skill_id" integer,
    "language_code" character(2) NOT NULL,
    "name" character varying(100) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."skill_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."skill_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."skill_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."skill_translations_id_seq" OWNED BY "public"."skill_translations"."id";



CREATE TABLE IF NOT EXISTS "public"."skill_types" (
    "id" integer NOT NULL,
    "slug" character varying(50) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."skill_types" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."skill_types_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."skill_types_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."skill_types_id_seq" OWNED BY "public"."skill_types"."id";



CREATE TABLE IF NOT EXISTS "public"."skills" (
    "id" integer NOT NULL,
    "profile_id" integer,
    "type_id" integer,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."skills" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."skills_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."skills_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."skills_id_seq" OWNED BY "public"."skills"."id";



CREATE TABLE IF NOT EXISTS "public"."summaries" (
    "id" integer NOT NULL,
    "profile_id" integer,
    "is_default" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."summaries" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."summaries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."summaries_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."summaries_id_seq" OWNED BY "public"."summaries"."id";



CREATE TABLE IF NOT EXISTS "public"."summaries_translations" (
    "id" integer NOT NULL,
    "summary_id" integer,
    "language_code" character(2) NOT NULL,
    "label" character varying(100),
    "content" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."summaries_translations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."summaries_translations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."summaries_translations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."summaries_translations_id_seq" OWNED BY "public"."summaries_translations"."id";



CREATE OR REPLACE VIEW "public"."v_profiles_public" AS
 SELECT "p"."id",
    "p"."full_name",
        CASE
            WHEN ("pc"."phone" IS NOT NULL) THEN ('******'::"text" || "right"(("pc"."phone")::"text", 4))
            ELSE 'No disponible'::"text"
        END AS "phone",
        CASE
            WHEN ("pc"."email" IS NOT NULL) THEN (("left"(("pc"."email")::"text", 1) || '****@'::"text") || "split_part"(("pc"."email")::"text", '@'::"text", 2))
            ELSE 'No disponible'::"text"
        END AS "email",
    "p"."website"
   FROM ("public"."profiles" "p"
     LEFT JOIN "public"."profiles_contact" "pc" ON (("p"."id" = "pc"."profile_id")));


ALTER VIEW "public"."v_profiles_public" OWNER TO "postgres";


ALTER TABLE ONLY "public"."education" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."education_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."education_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."education_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."education_types" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."education_types_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."experiences" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."experiences_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."experiences_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."experiences_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."profiles" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."profiles_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."profiles_contact" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."profiles_contact_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."profiles_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."profiles_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."responsibilities" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."responsibilities_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."responsibilities_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."responsibilities_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."skill_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."skill_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."skill_types" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."skill_types_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."skills" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."skills_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."summaries" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."summaries_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."summaries_translations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."summaries_translations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."education"
    ADD CONSTRAINT "education_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."education_translations"
    ADD CONSTRAINT "education_translations_education_id_language_code_key" UNIQUE ("education_id", "language_code");



ALTER TABLE ONLY "public"."education_translations"
    ADD CONSTRAINT "education_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."education_types"
    ADD CONSTRAINT "education_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."education_types"
    ADD CONSTRAINT "education_types_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."experiences"
    ADD CONSTRAINT "experiences_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."experiences_translations"
    ADD CONSTRAINT "experiences_translations_experience_id_language_code_key" UNIQUE ("experience_id", "language_code");



ALTER TABLE ONLY "public"."experiences_translations"
    ADD CONSTRAINT "experiences_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles_contact"
    ADD CONSTRAINT "profiles_contact_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles_contact"
    ADD CONSTRAINT "profiles_contact_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles_contact"
    ADD CONSTRAINT "profiles_contact_profile_id_key" UNIQUE ("profile_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles_translations"
    ADD CONSTRAINT "profiles_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles_translations"
    ADD CONSTRAINT "profiles_translations_profile_id_language_code_key" UNIQUE ("profile_id", "language_code");



ALTER TABLE ONLY "public"."responsibilities"
    ADD CONSTRAINT "responsibilities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."responsibilities_translations"
    ADD CONSTRAINT "responsibilities_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."responsibilities_translations"
    ADD CONSTRAINT "responsibilities_translations_responsibility_id_language_co_key" UNIQUE ("responsibility_id", "language_code");



ALTER TABLE ONLY "public"."skill_translations"
    ADD CONSTRAINT "skill_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skill_translations"
    ADD CONSTRAINT "skill_translations_skill_id_language_code_key" UNIQUE ("skill_id", "language_code");



ALTER TABLE ONLY "public"."skill_types"
    ADD CONSTRAINT "skill_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skill_types"
    ADD CONSTRAINT "skill_types_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."summaries"
    ADD CONSTRAINT "summaries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."summaries_translations"
    ADD CONSTRAINT "summaries_translations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."summaries_translations"
    ADD CONSTRAINT "summaries_translations_summary_id_language_code_key" UNIQUE ("summary_id", "language_code");



ALTER TABLE ONLY "public"."education"
    ADD CONSTRAINT "education_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."education_translations"
    ADD CONSTRAINT "education_translations_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "public"."education"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."education"
    ADD CONSTRAINT "education_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "public"."education_types"("id");



ALTER TABLE ONLY "public"."experiences"
    ADD CONSTRAINT "experiences_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."experiences_translations"
    ADD CONSTRAINT "experiences_translations_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles_contact"
    ADD CONSTRAINT "profiles_contact_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles_translations"
    ADD CONSTRAINT "profiles_translations_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."responsibilities"
    ADD CONSTRAINT "responsibilities_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."responsibilities_translations"
    ADD CONSTRAINT "responsibilities_translations_responsibility_id_fkey" FOREIGN KEY ("responsibility_id") REFERENCES "public"."responsibilities"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skill_translations"
    ADD CONSTRAINT "skill_translations_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "public"."skill_types"("id");



ALTER TABLE ONLY "public"."summaries"
    ADD CONSTRAINT "summaries_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."summaries_translations"
    ADD CONSTRAINT "summaries_translations_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "public"."summaries"("id") ON DELETE CASCADE;



CREATE POLICY "Lectura pública traducciones education" ON "public"."education_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Lectura pública traducciones experiences" ON "public"."experiences_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Lectura pública traducciones profiles" ON "public"."profiles_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Lectura pública traducciones responsibilities" ON "public"."responsibilities_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Lectura pública traducciones skills" ON "public"."skill_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Lectura pública traducciones summaries" ON "public"."summaries_translations" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Permitir lectura pública en education" ON "public"."education" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Permitir lectura pública en education_types" ON "public"."education_types" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Permitir lectura pública en experiences" ON "public"."experiences" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Permitir lectura pública en profiles" ON "public"."profiles" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Permitir lectura pública en responsibilities" ON "public"."responsibilities" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Permitir lectura pública en skill_types" ON "public"."skill_types" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Permitir lectura pública en skills" ON "public"."skills" FOR SELECT TO "anon" USING (true);



CREATE POLICY "Permitir lectura pública en summaries" ON "public"."summaries" FOR SELECT TO "anon" USING (true);



ALTER TABLE "public"."education" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."education_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."education_types" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."experiences" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."experiences_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles_contact" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."responsibilities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."responsibilities_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."skill_translations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."skill_types" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."skills" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."summaries" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."summaries_translations" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































GRANT ALL ON FUNCTION "public"."fetch_full_profile"("p_identifier" integer, "p_lang" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."fetch_full_profile"("p_identifier" integer, "p_lang" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."fetch_full_profile"("p_identifier" integer, "p_lang" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "anon";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."rls_auto_enable"() TO "service_role";


















GRANT ALL ON TABLE "public"."education" TO "anon";
GRANT ALL ON TABLE "public"."education" TO "authenticated";
GRANT ALL ON TABLE "public"."education" TO "service_role";



GRANT ALL ON SEQUENCE "public"."education_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."education_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."education_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."education_translations" TO "anon";
GRANT ALL ON TABLE "public"."education_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."education_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."education_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."education_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."education_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."education_types" TO "anon";
GRANT ALL ON TABLE "public"."education_types" TO "authenticated";
GRANT ALL ON TABLE "public"."education_types" TO "service_role";



GRANT ALL ON SEQUENCE "public"."education_types_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."education_types_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."education_types_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."experiences" TO "anon";
GRANT ALL ON TABLE "public"."experiences" TO "authenticated";
GRANT ALL ON TABLE "public"."experiences" TO "service_role";



GRANT ALL ON SEQUENCE "public"."experiences_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."experiences_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."experiences_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."experiences_translations" TO "anon";
GRANT ALL ON TABLE "public"."experiences_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."experiences_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."experiences_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."experiences_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."experiences_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."profiles_contact" TO "anon";
GRANT ALL ON TABLE "public"."profiles_contact" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles_contact" TO "service_role";



GRANT ALL ON SEQUENCE "public"."profiles_contact_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."profiles_contact_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."profiles_contact_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."profiles_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles_translations" TO "anon";
GRANT ALL ON TABLE "public"."profiles_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."profiles_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."profiles_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."profiles_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."responsibilities" TO "anon";
GRANT ALL ON TABLE "public"."responsibilities" TO "authenticated";
GRANT ALL ON TABLE "public"."responsibilities" TO "service_role";



GRANT ALL ON SEQUENCE "public"."responsibilities_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."responsibilities_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."responsibilities_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."responsibilities_translations" TO "anon";
GRANT ALL ON TABLE "public"."responsibilities_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."responsibilities_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."responsibilities_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."responsibilities_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."responsibilities_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."skill_translations" TO "anon";
GRANT ALL ON TABLE "public"."skill_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."skill_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."skill_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."skill_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."skill_types" TO "anon";
GRANT ALL ON TABLE "public"."skill_types" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_types" TO "service_role";



GRANT ALL ON SEQUENCE "public"."skill_types_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."skill_types_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."skill_types_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."skills" TO "anon";
GRANT ALL ON TABLE "public"."skills" TO "authenticated";
GRANT ALL ON TABLE "public"."skills" TO "service_role";



GRANT ALL ON SEQUENCE "public"."skills_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."skills_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."skills_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."summaries" TO "anon";
GRANT ALL ON TABLE "public"."summaries" TO "authenticated";
GRANT ALL ON TABLE "public"."summaries" TO "service_role";



GRANT ALL ON SEQUENCE "public"."summaries_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."summaries_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."summaries_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."summaries_translations" TO "anon";
GRANT ALL ON TABLE "public"."summaries_translations" TO "authenticated";
GRANT ALL ON TABLE "public"."summaries_translations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."summaries_translations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."summaries_translations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."summaries_translations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."v_profiles_public" TO "anon";
GRANT ALL ON TABLE "public"."v_profiles_public" TO "authenticated";
GRANT ALL ON TABLE "public"."v_profiles_public" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";



































drop extension if exists "pg_net";


