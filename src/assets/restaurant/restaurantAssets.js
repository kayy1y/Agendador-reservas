import userPhoto1 from './user_photo_1.png';
import userPhoto2 from './user_photo_2.png';
import userPhoto3 from './user_photo_3.png';
import userPhoto4 from './user_photo_4.png';
import userPhoto5 from './user_photo_5.png';

import menuShot1 from './menu_shot_1.png';
import menuShot2 from './menu_shot_2.png';
import menuShot3 from './menu_shot_3.png';
import menuShot4 from './menu_shot_4.png';
import menuShot5 from './menu_shot_5.png';
import unnamedWebp from './unnamed.webp';

import heroImg from './hero.jpg';
import steakImg from './steak.jpg';
import pizzaImg from './pizza.jpg';
import terraceImg from './terrace.jpg';
import wineBarImg from './wine_bar.jpg';

export const restaurantImages = {
  hero: userPhoto1 || heroImg,
  heroBg: heroImg,
  steak: userPhoto4 || steakImg,
  pizza: userPhoto5 || pizzaImg,
  terrace: userPhoto2 || terraceImg,
  wineBar: userPhoto3 || wineBarImg,
  unnamed: unnamedWebp,
  userPhoto1,
  userPhoto2,
  userPhoto3,
  userPhoto4,
  userPhoto5,
  menuShot1,
  menuShot2,
  menuShot3,
  menuShot4,
  menuShot5
};

export const galleryItems = [
  {
    id: 1,
    title: "Experiencia Gastronómica La Vid",
    category: "Restaurante",
    image: userPhoto1,
    description: "Fotografía oficial de la experiencia gastronómica en La Vid Steak House & Pizza."
  },
  {
    id: 2,
    title: "Ambiente & Salón Principal",
    category: "Ambiente",
    image: userPhoto2,
    description: "Detalles cálidos en madera y ambientación pensada para el confort."
  },
  {
    id: 3,
    title: "Especialidades de la Casa",
    category: "Gastronomía",
    image: userPhoto3,
    description: "Presentación exclusiva de platillos elaborados por nuestro chef."
  },
  {
    id: 4,
    title: "Cortes de Carne & Parrilla",
    category: "Steak House",
    image: userPhoto4,
    description: "Cortes seleccionados a la parrilla de leña."
  },
  {
    id: 5,
    title: "Pizza Artesanal a la Leña",
    category: "Pizza",
    image: userPhoto5,
    description: "Pizzas de masa madre en horno de piedra rústico."
  },
  {
    id: 6,
    title: "Menú & Entradas Frías",
    category: "Carta",
    image: menuShot1,
    description: "Variedad de entradas frías, calientes y recetas tradicionales."
  },
  {
    id: 7,
    title: "Presentación de Platos",
    category: "Culinario",
    image: menuShot2,
    description: "Calidad artesanal e ingredientes seleccionados."
  },
  {
    id: 8,
    title: "Pastas & Mariscos",
    category: "Del Mar",
    image: menuShot3,
    description: "Selección de pastas frescas y productos del mar."
  }
];
