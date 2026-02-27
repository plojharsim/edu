-- Fix IDOR vulnerability in get_topic_with_author_v2
-- Tato funkce byla SECURITY DEFINER, ale chyběla v ní kontrola, 
-- zda je téma veřejné nebo zda patří aktuálně přihlášenému uživateli.

CREATE OR REPLACE FUNCTION public.get_topic_with_author_v2(topic_id_param uuid)
 RETURNS TABLE(id uuid, user_id uuid, name text, allowed_modes text[], randomize_direction boolean, is_public boolean, created_at timestamp with time zone, author_name text, author_grade text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.user_id,
    t.name,
    t.allowed_modes,
    t.randomize_direction,
    t.is_public,
    t.created_at,
    p.name as author_name,
    p.grade as author_grade
  FROM topics t
  LEFT JOIN profiles p ON t.user_id = p.id
  WHERE t.id = topic_id_param 
    AND (t.is_public = true OR t.user_id = auth.uid()) -- Přidaná kontrola oprávnění
  LIMIT 1;
END;
$function$;