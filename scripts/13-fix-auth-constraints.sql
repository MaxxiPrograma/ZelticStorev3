-- Agregar restricciones únicas si no existen
DO $$
BEGIN
    -- Verificar y agregar índice único en auth.users.email si no existe
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'users_email_key' 
        AND conrelid = 'auth.users'::regclass
    ) THEN
        -- Primero eliminar duplicados si existen
        DELETE FROM auth.users a USING auth.users b 
        WHERE a.id > b.id AND a.email = b.email;
        
        -- Agregar restricción única
        ALTER TABLE auth.users ADD CONSTRAINT users_email_key UNIQUE (email);
        RAISE NOTICE 'Restricción única agregada a auth.users.email';
    ELSE
        RAISE NOTICE 'Restricción única ya existe en auth.users.email';
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'No se pudo agregar restricción única: %', SQLERRM;
END $$;

-- Verificar restricciones
SELECT 
    conname as constraint_name,
    contype as constraint_type
FROM pg_constraint 
WHERE conrelid = 'auth.users'::regclass
AND contype = 'u';
