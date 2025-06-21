-- Verificar si hay productos en la tabla
SELECT COUNT(*) as total_productos FROM products;

-- Mostrar todos los productos
SELECT * FROM products LIMIT 10;

-- Verificar si hay inventario
SELECT COUNT(*) as total_inventario FROM inventory;

-- Verificar las políticas RLS
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'products';

-- Insertar productos de ejemplo si no hay ninguno
INSERT INTO products (name, description, price, images, category, tag)
SELECT 
  'Jean Slim Fit Negro ' || i, 
  'Jean negro de corte slim fit, perfecto para cualquier ocasión. Fabricado con denim de alta calidad.', 
  89.99, 
  ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'], 
  'jeans', 
  'Slim Fit'
FROM generate_series(1, 6) i
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

-- Insertar inventario para cada producto si no hay ninguno
INSERT INTO inventory (product_id, size, stock)
SELECT 
  p.id, 
  s.size, 
  floor(random() * 10 + 1)::int
FROM 
  products p,
  (VALUES ('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL')) as s(size)
WHERE 
  NOT EXISTS (SELECT 1 FROM inventory LIMIT 1);

-- Mostrar resultados finales
SELECT 'products' as tabla, COUNT(*) as registros FROM products
UNION ALL
SELECT 'inventory' as tabla, COUNT(*) as registros FROM inventory;
