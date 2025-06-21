-- Eliminar inventario existente con talles incorrectos
DELETE FROM inventory;

-- Insertar inventario con talles numéricos correctos
INSERT INTO inventory (product_id, size, stock) VALUES
-- Producto 1
(1, '28', 5), (1, '30', 8), (1, '32', 12), (1, '34', 10), (1, '36', 6), (1, '38', 3),
-- Producto 2
(2, '28', 4), (2, '30', 9), (2, '32', 15), (2, '34', 11), (2, '36', 7), (2, '38', 4),
-- Producto 3
(3, '28', 6), (3, '30', 10), (3, '32', 8), (3, '34', 9), (3, '36', 5), (3, '38', 2),
-- Producto 4
(4, '28', 3), (4, '30', 7), (4, '32', 13), (4, '34', 12), (4, '36', 8), (4, '38', 5),
-- Producto 5
(5, '28', 5), (5, '30', 11), (5, '32', 9), (5, '34', 8), (5, '36', 6), (5, '38', 3),
-- Producto 6
(6, '28', 4), (6, '30', 8), (6, '32', 14), (6, '34', 10), (6, '36', 7), (6, '38', 4);

-- Verificar que se insertaron correctamente
SELECT 
  p.name,
  i.size,
  i.stock
FROM products p
JOIN inventory i ON p.id = i.product_id
ORDER BY p.id, CAST(i.size AS INTEGER);
