export const menuCategories = [
  { id: 'all', name: 'Todo el Menú' },
  { id: 'cold_appetizers', name: 'Entradas Frías' },
  { id: 'hot_appetizers', name: 'Entradas Calientes' },
  { id: 'beef', name: 'Carnes Res' },
  { id: 'chicken', name: 'Pollo' },
  { id: 'smoke_meats', name: 'Carnes Ahumadas' },
  { id: 'sea', name: 'Del Mar' },
  { id: 'pastas', name: 'Pastas' },
  { id: 'pizzas', name: 'Pizzas' },
  { id: 'beverages', name: 'Bebidas' }
];

export const menuItems = [
  // --- 1. ENTRADAS FRÍAS ---
  {
    id: 'ef-01',
    name: 'Ceviche Tico / Tico Ceviche',
    englishName: 'Tico Ceviche',
    category: 'cold_appetizers',
    categoryName: 'Entradas Frías',
    price: 5100,
    description: 'Receta única de pescado de mar mezclado con chile, cebolla, culantro y aguacate, servido con chips de plátano.',
    englishDescription: 'Fresh fish, sweet pepper, onion, cilantro and avocado, served with plantain chips.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ef-02',
    name: 'Ensalada Caprese / Capresse Salad',
    englishName: 'Capresse Salad',
    category: 'cold_appetizers',
    categoryName: 'Entradas Frías',
    price: 5950,
    description: 'Rodajas de tomate fresco, queso mozzarella tierno, pesto y reducción de balsámico.',
    englishDescription: 'Fresh tomato, mozzarella, pesto and balsamic glaze.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ef-03',
    name: 'Carpaccio de Res / Beef Carpaccio',
    englishName: 'Beef Carpaccio',
    category: 'cold_appetizers',
    categoryName: 'Entradas Frías',
    price: 8100,
    description: 'Finos cortes de lomito de res con aceite de oliva, cebolla, limón, alcaparras y queso parmesano.',
    englishDescription: 'Fine cuts of beef tenderloin with olive oil, onion, lemon, capers and parmigiano cheese.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ef-04',
    name: 'Ensalada Thai / Thai Salad',
    englishName: 'Thai Salad',
    category: 'cold_appetizers',
    categoryName: 'Entradas Frías',
    price: 7900,
    description: 'Lonjas de lomito sobre una cama de lechuga aderezado con salsa a base de soya y semillas.',
    englishDescription: 'Slices of tenderloin served on a bed of lettuce, dressed with a soy-based sauce and seeds.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ef-05',
    name: 'Tartar de Atún / Tuna Tartare',
    englishName: 'Tuna Tartare',
    category: 'cold_appetizers',
    categoryName: 'Entradas Frías',
    price: 8400,
    description: 'Trozos de atún fresco marinado en salsa Thai mezclado con cebollino, aguacate y mango acompañado con chips de plátano.',
    englishDescription: 'Fresh tuna chunks marinated in Thai sauce, mixed with chives, avocado and mango, served with plantain chips.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ef-06',
    name: 'Tabule / Tabboule',
    englishName: 'Tabboule',
    category: 'cold_appetizers',
    categoryName: 'Entradas Frías',
    price: 6500,
    description: 'Tomate, zanahoria, brócoli, cebolla morada, lechuga, aguacate y quinoa aderezado con cítricos de la casa.',
    englishDescription: 'Tomato, carrot, broccoli, red onion, lettuce, avocado and quinoa dressed with our house citrus vinaigrette.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ef-07',
    name: 'Ensalada de La Huerta / Garden Salad',
    englishName: 'Garden Salad',
    category: 'cold_appetizers',
    categoryName: 'Entradas Frías',
    price: 6400,
    description: 'Lechuga, tomate, aguacate, cebolla morada, aceitunas, queso fresco y aderezo de pesto.',
    englishDescription: 'Lettuce, tomato, avocado, red onion, olives, fresh cheese and pesto dressing.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Extra de Proteína (+₡4.200)',
        type: 'optional_single',
        extraPrice: 4200,
        options: [
          { label: 'Sin extra de proteína', price: 0 },
          { label: 'Salmón (+₡4.200)', price: 4200 },
          { label: 'Atún (+₡4.200)', price: 4200 },
          { label: 'Camarones (+₡4.200)', price: 4200 },
          { label: 'Carne a la parrilla (+₡4.200)', price: 4200 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },

  // --- 2. ENTRADAS CALIENTES ---
  {
    id: 'ec-01',
    name: 'Mejillones al Ajillo / Mussels in Garlic Sauce',
    englishName: 'Mussels in Garlic Sauce',
    category: 'hot_appetizers',
    categoryName: 'Entradas Calientes',
    price: 6450,
    description: 'Mejillones salteados en salsa de ajo y limón.',
    englishDescription: 'Mussels sauteed in garlic sauce.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ec-02',
    name: 'Aros de Calamar / Calamari Rings',
    englishName: 'Calamari Rings',
    category: 'hot_appetizers',
    categoryName: 'Entradas Calientes',
    price: 5200,
    description: 'Acompañados con salsa de la casa ligeramente picante.',
    englishDescription: 'Calamari rings with a house chili sauce.',
    spicyLevel: 1,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ec-03',
    name: 'Crema de Papa / Potato Cream Soup',
    englishName: 'Potato Cream Soup',
    category: 'hot_appetizers',
    categoryName: 'Entradas Calientes',
    price: 5900,
    description: 'Sopa cremosa a base de papa y tocineta.',
    englishDescription: 'Creamy potato soup with bacon.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ec-04',
    name: 'Sopa al estilo Azteca / Aztec Style Soup',
    englishName: 'Aztec Style Soup',
    category: 'hot_appetizers',
    categoryName: 'Entradas Calientes',
    price: 6200,
    description: 'Sopa a base de caldo de pollo y tomate, con un ligero sabor a picante.',
    englishDescription: 'Chicken and tomato broth with a hint of spice.',
    spicyLevel: 1,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },

  // --- 3. CARNES DE RES ---
  {
    id: 'cr-01',
    name: 'Baby Beef 300g',
    englishName: 'Baby Beef 300g',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 13200,
    grammage: '300 g',
    description: 'Corte de lomito, considerado una de las partes más jugosas de la res. Preparado a la parrilla.',
    englishDescription: 'Tenderloin cut considered one of the juiciest parts of beef.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Salsa para el corte (Opcional)',
        type: 'optional_single',
        options: [
          { label: 'Sin salsa adicional', price: 0 },
          { label: 'Salsa Jalapeña', price: 0 },
          { label: 'Salsa al vino tinto', price: 0 },
          { label: 'Salsa de hongos', price: 0 },
          { label: 'Salsa Tamarindo', price: 0 },
          { label: 'Chimichurri', price: 0 },
          { label: 'Salsa Dijon', price: 0 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-02',
    name: 'Churrasco Argentino 450g',
    englishName: 'Argentinean Churrasco 450g',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 15600,
    grammage: '450 g',
    description: 'Tradicional corte de carne argentino con grasa alrededor. Preparado a la parrilla.',
    englishDescription: 'Traditional Argentinean meat cut with fat around.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Salsa para el corte (Opcional)',
        type: 'optional_single',
        options: [
          { label: 'Sin salsa adicional', price: 0 },
          { label: 'Salsa Jalapeña', price: 0 },
          { label: 'Salsa al vino tinto', price: 0 },
          { label: 'Salsa de hongos', price: 0 },
          { label: 'Salsa Tamarindo', price: 0 },
          { label: 'Chimichurri', price: 0 },
          { label: 'Salsa Dijon', price: 0 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-03',
    name: 'Rib Eye 350g',
    englishName: 'Rib Eye 350g',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 15600,
    grammage: '350 g',
    description: 'Corte mundialmente reconocido por su suavidad y sabor. Preparado a la parrilla.',
    englishDescription: 'Cut world renowned for its smoothness and flavor.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Salsa para el corte (Opcional)',
        type: 'optional_single',
        options: [
          { label: 'Sin salsa adicional', price: 0 },
          { label: 'Salsa Jalapeña', price: 0 },
          { label: 'Salsa al vino tinto', price: 0 },
          { label: 'Salsa de hongos', price: 0 },
          { label: 'Salsa Tamarindo', price: 0 },
          { label: 'Chimichurri', price: 0 },
          { label: 'Salsa Dijon', price: 0 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-04',
    name: 'New York 350g',
    englishName: 'New York 350g',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 15600,
    grammage: '350 g',
    description: 'Lomo corto particularmente caracterizado por ser un corte tierno y jugoso. Preparado a la parrilla.',
    englishDescription: 'Short loin known for being a tender and juicy cut.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Salsa para el corte (Opcional)',
        type: 'optional_single',
        options: [
          { label: 'Sin salsa adicional', price: 0 },
          { label: 'Salsa Jalapeña', price: 0 },
          { label: 'Salsa al vino tinto', price: 0 },
          { label: 'Salsa de hongos', price: 0 },
          { label: 'Salsa Tamarindo', price: 0 },
          { label: 'Chimichurri', price: 0 },
          { label: 'Salsa Dijon', price: 0 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-05',
    name: 'Filet Mignon 300g',
    englishName: 'Filet Mignon 300g',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 15600,
    grammage: '300 g',
    description: 'Tradicional corte de lomito albardado con tocineta bañado en una salsa demi-glace con hongos. Preparado a la parrilla.',
    englishDescription: 'Traditional filet mignon with bacon and dipped in a demi-glace sauce with mushrooms.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-06',
    name: 'Entraña 400g',
    englishName: 'Skirt Steak 400g',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 14500,
    grammage: '400 g',
    description: 'Corte largo que se aprecia más por su sabor que por textura. Preparado a la parrilla.',
    englishDescription: 'Long cut appreciated more for its flavor than for its texture.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Salsa para el corte (Opcional)',
        type: 'optional_single',
        options: [
          { label: 'Sin salsa adicional', price: 0 },
          { label: 'Salsa Jalapeña', price: 0 },
          { label: 'Salsa al vino tinto', price: 0 },
          { label: 'Salsa de hongos', price: 0 },
          { label: 'Salsa Tamarindo', price: 0 },
          { label: 'Chimichurri', price: 0 },
          { label: 'Salsa Dijon', price: 0 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-07',
    name: 'Lomito 2 Salsas / Tenderloin 2 Sauces',
    englishName: 'Tenderloin 2 Sauces',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 14600,
    description: 'Jugoso corte a la parrilla bañado en salsa cremosa de trufa y salsa de vino tinto.',
    englishDescription: 'Grilled tenderloin topped with creamy truffle sauce and red wine sauce.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-08',
    name: 'Hamburguesa Angus / Angus Burger',
    englishName: 'Angus Burger',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 8950,
    description: 'Torta 100% Angus, tocineta, cebolla caramelizada, pepinillo, queso cheddar, aderezo de la casa, acompañada con papas campesinas.',
    englishDescription: '100% Angus beef patty, bacon, caramelized onions, pickles, cheddar cheese and house dressing, served with rustic fries.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-09',
    name: 'Lomito al estilo La Vid / La Vid Style Tenderloin',
    englishName: 'La Vid Style Tenderloin',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 15600,
    description: 'Jugoso corte a la parrilla bañado en salsa de mariscos y ají.',
    englishDescription: 'Grilled tenderloin topped with seafood and chili sauce.',
    spicyLevel: 1,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'cr-10',
    name: 'Puntas de Lomito en Salsa Jalapeña / Tenderloin Tips in Jalapeño Sauce',
    englishName: 'Tenderloin Tips in Jalapeño Sauce',
    category: 'beef',
    categoryName: 'Carnes Res',
    price: 14500,
    description: 'Jugosas puntas de lomito salteadas con cebolla y chile dulce en una cremosa salsa jalapeña.',
    englishDescription: 'Juicy tenderloin tips sautéed with onions and sweet peppers in a creamy jalapeño sauce.',
    spicyLevel: 2,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },

  // --- 4. POLLO ---
  {
    id: 'po-01',
    name: 'El Pollo',
    englishName: 'Stuffed Breaded Chicken',
    category: 'chicken',
    categoryName: 'Pollo',
    price: 8300,
    description: 'Pechuga rellena de jamón y queso mozzarella, empanizada bañada en salsa de hongos.',
    englishDescription: 'Stuffed breaded chicken with ham and cheese covered mushroom sauce.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'po-02',
    name: 'Pollo en Salsa Menier y Alcaparras / Chicken in Meunière Sauce with Capers',
    englishName: 'Chicken in Meunière Sauce with Capers',
    category: 'chicken',
    categoryName: 'Pollo',
    price: 9500,
    description: 'Jugosa pechuga a la parrilla bañada en salsa a base de margarina, limón y alcaparras aromatizada con finas hierbas.',
    englishDescription: 'Grilled chicken breast topped with margarine, lemon and caper sauce, seasoned with fine herbs.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'po-03',
    name: 'Pechuga de Pollo al Chipotle / Chipotle Chicken Breast',
    englishName: 'Chipotle Chicken Breast',
    category: 'chicken',
    categoryName: 'Pollo',
    price: 9300,
    description: 'Filet de pechuga de pollo marinada en chipotle, cocida a la brasa, servida con arroz cremoso de aguacate y vegetales de estación.',
    englishDescription: 'Chipotle marinated chicken breast cooked on the grill, served with rice, avocado and organic vegetables.',
    spicyLevel: 2,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },

  // --- 5. CARNES AHUMADAS ---
  {
    id: 'ca-01',
    name: 'Costilla de Cerdo / Pork Rib',
    englishName: 'Pork Rib',
    category: 'smoke_meats',
    categoryName: 'Carnes Ahumadas',
    price: 10300,
    description: 'Deliciosas costillas arregladas con hierbas naturales y cocinadas con un delicioso sabor ahumado acompañado con salsa de piña y jamaica.',
    englishDescription: 'Pork rib with natural herbs and cooked with a delicious smoked flavor and Jamaican pineapple smoked sauce.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'ca-02',
    name: 'Costilla de Res / Beef Rib',
    englishName: 'Beef Rib',
    category: 'smoke_meats',
    categoryName: 'Carnes Ahumadas',
    price: 10700,
    description: 'Costilla tierna ahumada y sellada a la parrilla acompañada con salsa BBQ con guayaba.',
    englishDescription: 'Smoked beef rib and grilled covered with BBQ and guava sauce.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },

  // --- 6. DEL MAR ---
  {
    id: 'dm-01',
    name: 'Salmón Rostizado / Roasted Salmon',
    englishName: 'Roasted Salmon',
    category: 'sea',
    categoryName: 'Del Mar',
    price: 13200,
    description: 'Marinado en finas hierbas bañado en salsa de maracuyá.',
    englishDescription: 'Marinated with fine herbs and dipped with a tropical passion fruit sauce.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'dm-02',
    name: 'Atún Enconstrado / Crusted Tuna',
    englishName: 'Crusted Tuna',
    category: 'sea',
    categoryName: 'Del Mar',
    price: 12800,
    description: 'Medallón de atún cubierto con semillas de marañón servido con aderezo Thai.',
    englishDescription: 'Tuna medallion covered with cashew seeds served with Thai dressing.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'dm-03',
    name: 'Camarones Jumbo al gusto / Jumbo Shrimp to your liking',
    englishName: 'Jumbo Shrimp to your liking',
    category: 'sea',
    categoryName: 'Del Mar',
    price: 17950,
    description: 'Camarones jumbo al gusto, pueden ser empanizados o al ajillo acompañados de la guarnición del día.',
    englishDescription: 'Jumbo shrimps with garlic sauce or fried with panko, served with the garnish of the day.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Preparación (Obligatorio)',
        type: 'required_single',
        options: [
          { label: 'Al ajillo', price: 0 },
          { label: 'Empanizados / Panko', price: 0 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'dm-04',
    name: 'Pesca del Día / Catch of the Day',
    englishName: 'Catch of the Day',
    category: 'sea',
    categoryName: 'Del Mar',
    price: 12150,
    description: 'Bañada en salsa de hierbas y maracuyá.',
    englishDescription: 'Served with passion fruit and herbs beurre blanc.',
    spicyLevel: 0,
    isSpecialOfDay: true,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },

  // --- 7. PASTAS ---
  {
    id: 'pa-01',
    name: 'Fetuccini Salmón / Salmon Fettuccine',
    englishName: 'Salmon Fettuccine',
    category: 'pastas',
    categoryName: 'Pastas',
    price: 11600,
    description: 'Salmón grillado, hongos silvestres, bechamel y flambeado con vodka.',
    englishDescription: 'Grilled salmon, mushrooms, bechamel sauce flambeed with vodka.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Opción de Pasta',
        type: 'single',
        options: [
          { label: 'Normal', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pa-02',
    name: 'Spaguetti Mariscos / Seafood Spaghetti',
    englishName: 'Seafood Spaghetti',
    category: 'pastas',
    categoryName: 'Pastas',
    price: 12700,
    description: 'Selección de mariscos en una cremosa salsa de trufa y queso parmesano perfumada con vino blanco.',
    englishDescription: 'A selection of seafood in a creamy truffle and Parmesan sauce, infused with white wine.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Opción de Pasta',
        type: 'single',
        options: [
          { label: 'Normal', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pa-03',
    name: 'Penne Aguacate y Camarón / Penne Avocado & Shrimp',
    englishName: 'Penne Avocado & Shrimp',
    category: 'pastas',
    categoryName: 'Pastas',
    price: 10300,
    description: 'Camarones al pesto, salteados con tomate, aguacate y vino blanco.',
    englishDescription: 'Shrimps with pesto, sauteed with tomato, avocado and white wine.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Opción de Pasta',
        type: 'single',
        options: [
          { label: 'Normal', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },

  // --- 8. PIZZAS (Un Solo Tamaño - 100% Artesanales) ---
  {
    id: 'pz-01',
    name: "It's Britney",
    englishName: "It's Britney Pizza",
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 8800,
    description: 'Jamón, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Ham, pomodoro, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-02',
    name: 'La Vaca',
    englishName: 'La Vaca Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 11500,
    description: 'Gorgonzola, Queso cabra, Parmesano, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Pomodoro, gorgonzola cheese, goat cheese, parmesan cheese, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-03',
    name: 'Meat Lover',
    englishName: 'Meat Lover Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 11500,
    description: 'Pepperoni, Salami, Carne molida, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Pepperoni, salami, ground meat, pomodoro, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-04',
    name: 'Hawaiana / Hawaiian',
    englishName: 'Hawaiian Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 8800,
    description: 'Piña, Jamón, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Pineapple, ham, pomodoro, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-05',
    name: 'Pepperoni',
    englishName: 'Pepperoni Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 8700,
    description: 'Pepperoni, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Pepperoni, pomodoro, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-06',
    name: 'Lupita',
    englishName: 'Lupita Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 9350,
    description: 'Jamón, Hongos silvestres, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Ham, mushrooms, pomodoro, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-07',
    name: 'Margarita',
    englishName: 'Margarita Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 9100,
    description: 'Tomate, Albahaca, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Tomato, basil, pomodoro, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-08',
    name: 'Búffalo',
    englishName: 'Buffalo Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 8700,
    description: 'Pollo grillado, Salsa búfalo, Pesto, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Grilled chicken, buffalo sauce, pesto, pomodoro, mozzarella.',
    spicyLevel: 1,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-09',
    name: 'BBQ',
    englishName: 'BBQ Chicken Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 9100,
    description: 'BBQ, Queso mozzarella, Pollo, Cebolla morada. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'BBQ, mozzarella cheese, chicken, red onion.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-10',
    name: 'De la Casa / House Pizza',
    englishName: 'House Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 8700,
    description: 'Pomodoro, Queso mozzarella, Queso cheddar, Hongos, Jamón. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Pomodoro, mozzarella, cheddar, mushrooms, ham.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-11',
    name: 'Caprese',
    englishName: 'Caprese Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 11000,
    description: 'Tomate, Albahaca, Pesto, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Tomato, basil, pomodoro, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-12',
    name: 'Monchona',
    englishName: 'Monchona Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 11600,
    description: 'Carne molida, Salami, Jamón, Hongos silvestres, Cebollas rojas, Pimiento dulce, Pomodoro. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Ground beef, salami, ham, mushrooms, red onions, sweet pepper, pomodoro sauce.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-13',
    name: 'Altamar',
    englishName: 'Seafood Pizza Altamar',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 11900,
    description: 'Mariscos salteados en salsa blanca aromatizada con eneldo. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'A selection of seafood sauteed in a dill infused white sauce.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-14',
    name: 'Procciuto & Arúgula',
    englishName: 'Procciuto & Arugula Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 11900,
    description: 'Procciuto, Arúgula, Granapadano, Queso gorgonzola. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Prosciutto, arugula, Grana Padano and gorgonzola cheese.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-15',
    name: 'La Ciao Bella',
    englishName: 'La Ciao Bella Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 12300,
    description: 'Gorgonzola, Pepperoni, Tocino, Hongos silvestres, Pomodoro, Mozzarella. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Gorgonzola, pepperoni, bacon, mushrooms, pomodoro, mozzarella.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-16',
    name: 'Brazileña / Brazilian',
    englishName: 'Brazilian Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 10100,
    description: 'Pomodoro, Queso, Carne molida, Jamón, Tomate, Condimento mixto, Limón. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Pomodoro, cheese, ground beef, ham, tomato, mixed seasoning, lemon.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'pz-17',
    name: 'Vegetariana / Vegetarian',
    englishName: 'Vegetarian Pizza',
    category: 'pizzas',
    categoryName: 'Pizzas',
    price: 8700,
    description: 'Pomodoro, Queso, Hongos, Aceituna negra, Tomate, Albahaca, Zucchini. (Pizza 100% artesanal en un solo tamaño).',
    englishDescription: 'Pomodoro, cheese, mushrooms, black olives, tomatoes, basil, zucchini.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: true,
    modifiers: [
      {
        title: 'Masa de Pizza',
        type: 'single',
        options: [
          { label: 'Artesanal Tradicional', price: 0 },
          { label: 'Gluten Free (+₡3.500)', price: 3500 }
        ]
      }
    ],
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },

  // --- 9. BEBIDAS / DRINKS ---
  {
    id: 'beb-01',
    name: 'Vino Tinto de la Casa / House Red Wine',
    englishName: 'House Red Wine (Glass / Bottle)',
    category: 'beverages',
    categoryName: 'Bebidas',
    price: 4800,
    description: 'Copa de vino tinto seleccionado de nuestra cava exclusiva para maridar con cortes de carne.',
    englishDescription: 'Glass of selected house red wine ideal for pairing with steak cuts.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'beb-02',
    name: 'Sangría Artesanal de la Casa / House Sangria',
    englishName: 'House Artisanal Sangria',
    category: 'beverages',
    categoryName: 'Bebidas',
    price: 5500,
    description: 'Receta de la casa con mezcla de vinos, licor de naranja, frutas frescas y especias.',
    englishDescription: 'House sangria with red wine, orange liqueur, fresh fruits and natural spices.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'beb-03',
    name: 'Coctelería de Autor / Signature Cocktails',
    englishName: 'Signature Cocktails',
    category: 'beverages',
    categoryName: 'Bebidas',
    price: 6200,
    description: 'Cocteles artesanales preparados al momento con licores premium y botánicos.',
    englishDescription: 'Handcrafted cocktails made with premium spirits and fresh botanicals.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'beb-04',
    name: 'Cerveza Artesanal / Craft Beer',
    englishName: 'Local Craft Beer',
    category: 'beverages',
    categoryName: 'Bebidas',
    price: 3900,
    description: 'Selección de cervezas artesanales costarricenses e importadas bien frías.',
    englishDescription: 'Selection of ice-cold local Costa Rican and imported craft beers.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'beb-05',
    name: 'Jugos Naturales / Fresh Juices',
    englishName: 'Fresh Natural Juices',
    category: 'beverages',
    categoryName: 'Bebidas',
    price: 2800,
    description: 'Bebidas preparadas con frutas frescas de estación (Maracuyá, Piña, Mango, Cas).',
    englishDescription: 'Natural beverages made with seasonal fresh tropical fruits.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  },
  {
    id: 'beb-06',
    name: 'Bebidas Gaseosas & Agua / Soft Drinks & Water',
    englishName: 'Soft Drinks & Water',
    category: 'beverages',
    categoryName: 'Bebidas',
    price: 2200,
    description: 'Agua embotellada, agua con gas y refrescos gaseosos variados.',
    englishDescription: 'Bottled water, sparkling water and assorted sodas.',
    spicyLevel: 0,
    isSpecialOfDay: false,
    hasModifiers: false,
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11'
  }
];

// Helper to format Colones (e.g. 10600 -> ₡10.600)
export const formatColones = (amount) => {
  if (amount === undefined || amount === null) return '₡0';
  return '₡' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
