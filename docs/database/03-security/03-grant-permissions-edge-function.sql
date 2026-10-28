-- Otorgar permisos para que la Edge Function (mediante el rol anon/authenticated) pueda invocar la RPC y leer la vista

GRANT SELECT ON public.v_profiles_public TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fetch_full_profile(integer, text) TO anon, authenticated;