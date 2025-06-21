-- Primero, verificamos si el usuario ya existe
DO $$
DECLARE
    admin_user_id UUID;
    user_exists BOOLEAN := FALSE;
BEGIN
    -- Verificar si el usuario ya existe
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@zeltic.com';
    
    IF admin_user_id IS NOT NULL THEN
        user_exists := TRUE;
        RAISE NOTICE 'Usuario admin ya existe con ID: %', admin_user_id;
    ELSE
        -- Crear nuevo usuario admin
        admin_user_id := gen_random_uuid();
        
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
            '{"first_name":"Admin","last_name":"Zeltic"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
        
        RAISE NOTICE 'Usuario admin creado con ID: %', admin_user_id;
    END IF;
    
    -- Crear o actualizar el perfil del admin
    IF EXISTS (SELECT 1 FROM public.profiles WHERE id = admin_user_id) THEN
        UPDATE public.profiles SET
            role = 'admin',
            first_name = 'Admin',
            last_name = 'Zeltic',
            updated_at = NOW()
        WHERE id = admin_user_id;
        RAISE NOTICE 'Perfil admin actualizado';
    ELSE
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
        RAISE NOTICE 'Perfil admin creado';
    END IF;
    
END $$;

-- Verificar que el usuario se creó correctamente
SELECT 
    u.id,
    u.email,
    u.email_confirmed_at,
    p.role,
    p.first_name,
    p.last_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@zeltic.com';
