
INSERT INTO categories (name, slug, description) VALUES
  ('Проводные', 'wired', 'Мыши с USB-подключением для минимальной задержки'),
  ('Беспроводные', 'wireless', 'Мыши с 2.4 ГГц / Bluetooth'),
  ('Ультралайт', 'ultralight', 'Мыши весом до 70 г'),
  ('Для FPS', 'fps', 'Оптимизированы для шутеров');

INSERT INTO products (category_id, name, description, price, price_old, image_url, specs, brand, in_stock) VALUES
  (1, 'HyperX Pulsefire Haste 2', 'Ультралёгкая проводная мышь с сотовым дизайном. Эргономичная форма подходит под хват palm и claw. Совместима с HyperX NGENUITY.', 5490, 6990, 'https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/211ba433-dc4e-4dd0-abc6-e5c6d6986d22.jpg', '{"dpi":"100–26000","weight":"53г","connection":"USB-A","buttons":6,"polling":"8000 Гц","sensor":"Оптический"}', 'HyperX', TRUE),
  (2, 'Razer Viper V3 Pro', 'Профессиональная беспроводная мышь, разработанная совместно с киберспортсменами. Симметричная форма под любой хват.', 14990, NULL, 'https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/2f05b386-30cf-427a-be87-76a9691166e3.jpg', '{"dpi":"100–35000","weight":"82г","connection":"Беспроводная 2.4 ГГц","buttons":8,"polling":"4000 Гц","battery":"95 ч","sensor":"Оптический"}', 'Razer', TRUE),
  (1, 'Logitech G502 HERO', 'Флагманская проводная мышь с настраиваемым весом. 11 программируемых кнопок и сенсор HERO 25K для максимальной точности.', 7990, 9490, 'https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/360821e6-b095-4582-a1ea-9172b83b37ab.jpg', '{"dpi":"100–25600","weight":"121г","connection":"USB-A","buttons":11,"polling":"1000 Гц","sensor":"Оптический HERO 25K"}', 'Logitech', TRUE);
