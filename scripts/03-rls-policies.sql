-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Los admins pueden ver todos los perfiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para products (lectura pública, escritura solo admin)
CREATE POLICY "Cualquiera puede ver productos" ON products
  FOR SELECT USING (true);

CREATE POLICY "Solo admins pueden crear productos" ON products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Solo admins pueden actualizar productos" ON products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Solo admins pueden eliminar productos" ON products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para inventory (lectura pública, escritura solo admin)
CREATE POLICY "Cualquiera puede ver inventario" ON inventory
  FOR SELECT USING (true);

CREATE POLICY "Solo admins pueden gestionar inventario" ON inventory
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para orders
CREATE POLICY "Los usuarios pueden ver sus propias órdenes" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Los usuarios pueden crear órdenes" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Los admins pueden ver todas las órdenes" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Los admins pueden actualizar órdenes" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para order_items
CREATE POLICY "Los usuarios pueden ver items de sus órdenes" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Los usuarios pueden crear items de órdenes" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE id = order_id AND (user_id = auth.uid() OR user_id IS NULL)
    )
  );

CREATE POLICY "Los admins pueden ver todos los items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
