-- Primero verificamos qué valores de rol son válidos
DO $$
DECLARE
    constraint_def TEXT;
BEGIN
    -- Obtener la definición de la restricción
    SELECT pg_get_constraintdef(oid) INTO constraint_def
    FROM pg_constraint 
    WHERE conrelid = 'public.profiles'::regclass
    AND contype = 'c'
    AND conname LIKE '%role%';
    
    RAISE NOTICE 'Restricción de rol actual: %', constraint_def;
END $$;

-- Actualizar la restricción para permitir 'user' y 'customer'
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Crear nueva restricción que permita los valores correctos
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('admin', 'customer', 'user'));

-- Verificar que la restricción se aplicó correctamente
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.profiles'::regclass
AND contype = 'c'
AND conname = 'profiles_role_check';
