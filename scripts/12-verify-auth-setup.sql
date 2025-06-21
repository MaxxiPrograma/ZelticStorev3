-- Verificar configuración de autenticación
SELECT 'Verificando usuarios creados...' as status;

-- Mostrar todos los usuarios
SELECT 
    u.id,
    u.email,
    u.email_confirmed_at IS NOT NULL as email_confirmed,
    u.created_at,
    p.role,
    p.first_name,
    p.last_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC;

-- Verificar políticas RLS
SELECT 'Verificando políticas RLS...' as status;

SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'products', 'inventory', 'orders', 'order_items');

-- Verificar que las tablas existen
SELECT 'Verificando tablas...' as status;

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'products', 'inventory', 'orders', 'order_items');

-- Contar registros en cada tabla
SELECT 'Contando registros...' as status;

SELECT 
    'profiles' as tabla, 
    COUNT(*) as registros 
FROM public.profiles
UNION ALL
SELECT 
    'products' as tabla, 
    COUNT(*) as registros 
FROM public.products
UNION ALL
SELECT 
    'inventory' as tabla, 
    COUNT(*) as registros 
FROM public.inventory
UNION ALL
SELECT 
    'orders' as tabla, 
    COUNT(*) as registros 
FROM public.orders
UNION ALL
SELECT 
    'order_items' as tabla, 
    COUNT(*) as registros 
FROM public.order_items;
