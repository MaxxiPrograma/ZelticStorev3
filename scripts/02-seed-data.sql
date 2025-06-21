-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, images, category, tag) VALUES
('Jean Slim Fit Negro', 'Jean negro de corte slim fit, perfecto para cualquier ocasión. Fabricado con denim de alta calidad.', 89.99, 
 ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'], 'jeans', 'Slim Fit'),

('Jean Relaxed Azul Clásico', 'Jean azul clásico con corte relajado. Comodidad y estilo en una sola prenda.', 79.99,
 ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'], 'jeans', 'Relaxed'),

('Jean Skinny Gris', 'Jean gris de corte skinny, ideal para un look moderno y urbano.', 94.99,
 ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'], 'jeans', 'Skinny'),

('Jean Straight Azul Oscuro', 'Jean azul oscuro con corte straight, versátil y atemporal.', 84.99,
 ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'], 'jeans', 'Straight'),

('Jean Bootcut Negro', 'Jean negro con corte bootcut, perfecto para combinar con botas.', 92.99,
 ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'], 'jeans', 'Bootcut'),

('Jean Wide Leg Azul', 'Jean azul con corte wide leg, tendencia y comodidad.', 99.99,
 ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'], 'jeans', 'Wide Leg');

-- Insertar inventario para cada producto
INSERT INTO inventory (product_id, size, stock) VALUES
-- Producto 1: Jean Slim Fit Negro
(1, 'XS', 5), (1, 'S', 8), (1, 'M', 12), (1, 'L', 10), (1, 'XL', 6), (1, 'XXL', 3),
-- Producto 2: Jean Relaxed Azul Clásico
(2, 'XS', 4), (2, 'S', 9), (2, 'M', 15), (2, 'L', 11), (2, 'XL', 7), (2, 'XXL', 4),
-- Producto 3: Jean Skinny Gris
(3, 'XS', 6), (3, 'S', 10), (3, 'M', 8), (3, 'L', 9), (3, 'XL', 5), (3, 'XXL', 2),
-- Producto 4: Jean Straight Azul Oscuro
(4, 'XS', 3), (4, 'S', 7), (4, 'M', 13), (4, 'L', 12), (4, 'XL', 8), (4, 'XXL', 5),
-- Producto 5: Jean Bootcut Negro
(5, 'XS', 5), (5, 'S', 11), (5, 'M', 9), (5, 'L', 8), (5, 'XL', 6), (5, 'XXL', 3),
-- Producto 6: Jean Wide Leg Azul
(6, 'XS', 4), (6, 'S', 8), (6, 'M', 14), (6, 'L', 10), (6, 'XL', 7), (6, 'XXL', 4);
