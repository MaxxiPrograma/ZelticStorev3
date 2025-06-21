-- Script simplificado para crear solo el usuario admin
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Verificar si el usuario admin ya existe
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@zeltic.com';
    
    IF admin_user_id IS NOT NULL THEN
        RAISE NOTICE 'Usuario admin ya existe, actualizando perfil...';
        
        -- Actualizar el perfil existente
        UPDATE public.profiles SET
            role = 'admin',
            first_name = 'Admin',
            last_name = 'Zeltic',
            updated_at = NOW()
        WHERE id = admin_user_id;
        
    ELSE
        RAISE NOTICE 'Creando nuevo usuario admin...';
        
        -- Generar ID para el nuevo usuario
        admin_user_id := gen_random_uuid();
        
        -- Insertar en auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            admin_user_id,
            'authenticated',
            'authenticated',
            'admin@zeltic.com',
            crypt('admin123', gen_salt('bf')),
            NOW(),
            NOW(),
            '{"provider":"email","providers":["email"]}',
            '{}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
        
        -- Insertar en profiles
        INSERT INTO public.profiles (
            id,
            email,
            first_name,
            last_name,
            role,
            created_at,
            updated_at
        ) VALUES (
            admin_user_id,
            'admin@zeltic.com',
            'Admin',
            'Zeltic',
            'admin',
            NOW(),
            NOW()
        );
    END IF;
    
    RAISE NOTICE 'Usuario admin configurado correctamente con ID: %', admin_user_id;
END $$;

-- Verificar el resultado
SELECT 
    u.id,
    u.email,
    u.email_confirmed_at IS NOT NULL as email_confirmed,
    p.role,
    p.first_name,
    p.last_name
FROM auth.users u
JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@zeltic.com';
