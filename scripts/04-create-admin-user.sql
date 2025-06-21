-- Este script debe ejecutarse DESPUÉS de crear un usuario admin@zeltic.com en la interfaz de Supabase Auth

-- Actualizar el perfil del usuario admin para que tenga rol de admin
-- Primero necesitas crear el usuario en Authentication > Users en Supabase
-- Email: admin@zeltic.com
-- Password: admin123

-- Luego ejecuta este script para darle rol de admin:
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@zeltic.com';

-- Si el perfil no existe, créalo manualmente:
-- INSERT INTO profiles (id, email, first_name, last_name, role)
-- VALUES ('USER_ID_FROM_AUTH', 'admin@zeltic.com', 'Admin', 'User', 'admin');
