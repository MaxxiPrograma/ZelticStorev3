-- Verificar las restricciones de la tabla profiles
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.profiles'::regclass
AND contype = 'c';

-- Verificar la estructura de la tabla profiles
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Verificar qué roles existen actualmente
SELECT DISTINCT role FROM public.profiles WHERE role IS NOT NULL;

-- Verificar si hay un enum para roles
SELECT 
    t.typname,
    e.enumlabel
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid 
WHERE t.typname LIKE '%role%'
ORDER BY t.typname, e.enumsortorder;

-- Verificar todos los usuarios existentes
SELECT 
    u.id,
    u.email,
    u.email_confirmed_at IS NOT NULL as email_confirmed,
    p.role,
    p.first_name,
    p.last_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;
