-- Verificar la estructura actual de la tabla profiles
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Verificar las restricciones
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    cc.check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc 
    ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public' 
AND tc.table_name = 'profiles';

-- Mostrar algunos registros de ejemplo
SELECT id, email, first_name, last_name, role, created_at 
FROM public.profiles 
LIMIT 5;
