-- Verificar las restricciones de la tabla profiles
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.profiles'::regclass
AND contype = 'c';

-- Verificar la estructura de la tabla profiles
\d public.profiles;

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
