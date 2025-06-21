-- Eliminar todas las políticas existentes que causan recursión
DROP POLICY IF EXISTS "Los usuarios pueden ver su propio perfil" ON profiles;
DROP POLICY IF EXISTS "Los usuarios pueden actualizar su propio perfil" ON profiles;
DROP POLICY IF EXISTS "Los admins pueden ver todos los perfiles" ON profiles;
DROP POLICY IF EXISTS "Solo admins pueden crear productos" ON products;
DROP POLICY IF EXISTS "Solo admins pueden actualizar productos" ON products;
DROP POLICY IF EXISTS "Solo admins pueden eliminar productos" ON products;
DROP POLICY IF EXISTS "Solo admins pueden gestionar inventario" ON inventory;
DROP POLICY IF EXISTS "Los admins pueden ver todas las órdenes" ON orders;
DROP POLICY IF EXISTS "Los admins pueden actualizar órdenes" ON orders;
DROP POLICY IF EXISTS "Los admins pueden ver todos los items" ON order_items;

-- Crear políticas simples sin recursión para profiles
CREATE POLICY "Usuarios pueden ver su propio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Permitir inserción de perfiles" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para products (sin verificación de admin por ahora)
CREATE POLICY "Admins pueden crear productos" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins pueden actualizar productos" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Admins pueden eliminar productos" ON products
  FOR DELETE USING (true);

-- Políticas para inventory (sin verificación de admin por ahora)
CREATE POLICY "Admins pueden gestionar inventario" ON inventory
  FOR ALL USING (true);

-- Políticas para orders (sin verificación de admin por ahora)
CREATE POLICY "Admins pueden ver todas las órdenes" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Admins pueden actualizar órdenes" ON orders
  FOR UPDATE USING (true);

-- Políticas para order_items (sin verificación de admin por ahora)
CREATE POLICY "Admins pueden ver todos los items" ON order_items
  FOR SELECT USING (true);

-- Verificar que las tablas tienen datos
SELECT 'products' as tabla, count(*) as registros FROM products
UNION ALL
SELECT 'inventory' as tabla, count(*) as registros FROM inventory
UNION ALL
SELECT 'profiles' as tabla, count(*) as registros FROM profiles;
