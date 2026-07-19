/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Review, RestaurantConfig } from './types';
// @ts-ignore
import crownCrustImg from './assets/images/crown_crust_pizza_1784282187272.jpg';
// @ts-ignore
import periPeriImg from './assets/images/peri_peri_pizza_1784282347746.jpg';
// @ts-ignore
import kebabStufferImg from './assets/images/kebab_stuffer_pizza_1784282366152.jpg';
// @ts-ignore
import crownLegendImg from './assets/images/crown_legend_pizza_1784282478351.jpg';
// @ts-ignore
import crunchySandwichImg from './assets/images/crunchy_sandwich_square_1784283451116.jpg';
// @ts-ignore
import supremeSandwichImg from './assets/images/supreme_sandwich_1784282664331.jpg';
// @ts-ignore
import grilledSandwichImg from './assets/images/grilled_sandwich_1784282682993.jpg';
// @ts-ignore
import cheesionSpecialSandwichImg from './assets/images/cheesion_special_sandwich_1784282702138.jpg';
// @ts-ignore
import crispyChickenRollsImg from './assets/images/crispy_chicken_rolls_1784283898403.jpg';
// @ts-ignore
import gourmetFoodPlatterImg from './assets/images/gourmet_food_platter_1784283917137.jpg';

export const INITIAL_CATEGORIES = [
  'All',
  'Appetizers',
  'Burgers',
  'Pizza',
  'Shawarma',
  'Wraps',
  'Fries',
  'Wings',
  'Sandwiches',
  'BBQ',
  'Rolls & Platter',
  'Deals',
  'Beverages',
  'Desserts'
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // --- Appetizers ---
  {
    id: 'ap1',
    name: 'Nuggets & Chips Gpa',
    category: 'Appetizers',
    price: 580,
    description: 'Golden crispy chicken nuggets paired with hot, crunchy potato chips. A perfect crowd-pleaser appetizer.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    tags: ['Crispy', 'Shareable', 'Kids Favorite']
  },
  {
    id: 'ap2',
    name: 'French Fries',
    category: 'Appetizers',
    price: 290,
    description: 'Classic premium cut French potatoes fried to crispy perfection and lightly dusted with sea salt.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    tags: ['Classic', 'Hot & Fresh']
  },
  {
    id: 'ap3',
    name: 'Loaded Fries',
    category: 'Appetizers',
    price: 710,
    description: 'Premium crispy fries loaded with grilled chicken chunks, melted cheese, jalapenos, and our signature ranch dressing.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOOARx3PS1JoKr_xwGjYXsFagGuFBYuh6_ftlsj0azwQ&s=10',
    tags: ['Heavy Cheese', 'Spicy Chunks']
  },
  {
    id: 'ap4',
    name: 'Cheesion Fries',
    category: 'Appetizers',
    price: 640,
    description: 'Our house special crispy fries fully drenched in warm liquid cheesion sauce and premium herbs.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpm3eTXsMMcKp-BYdIQpMvsLTe0vSIclu0ZKMSHmtVJw&s=10',
    tags: ['Cheese Drenched', 'Signature']
  },
  {
    id: 'ap5',
    name: 'Salad Tower',
    category: 'Appetizers',
    price: 800,
    description: 'A towering assortment of freshly tossed garden greens, tomatoes, cucumbers, olives, and premium cheese with a zesty vinaigrette.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    tags: ['Fresh & Healthy', 'Garden Fresh', 'Low Carb']
  },

  // --- Burgers ---
  {
    id: 'b1',
    name: 'Zinger Burger',
    category: 'Burgers',
    price: 440,
    description: 'Crispy fried chicken breast fillet topped with fresh lettuce and rich signature mayo sauce in a toasted sesame bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    tags: ['Crispy', 'Spicy', 'Best Seller']
  },
  {
    id: 'b2',
    name: 'Chicken Burger',
    category: 'Burgers',
    price: 350,
    description: 'Grilled premium chicken patty seasoned to perfection, layered with sliced cheese, lettuce, onion, and creamy sauce.',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80',
    tags: ['Classic', 'Mild']
  },
  {
    id: 'b3',
    name: 'Beef Burger',
    category: 'Burgers',
    price: 550,
    description: 'Juicy prime smash beef patty with melted cheddar cheese, pickles, onions, and our special house sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    tags: ['Premium', 'Juicy']
  },
  {
    id: 'b4',
    name: 'Double Patty Burger',
    category: 'Burgers',
    price: 680,
    description: 'Two sizzling grilled patties (chicken or beef) with double cheddar cheese, caramelized onions, and smoky BBQ glaze.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    tags: ['Extra Large', 'Cheese Loaded']
  },
  {
    id: 'b5',
    name: 'Special Burger (Single Smash)',
    category: 'Burgers',
    price: 820,
    description: 'Juicy, flame-seared single beef smash patty with cheddar, grilled onions, and our signature special smash sauce.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80',
    tags: ['Single Smash', 'Special Sauce', 'Freshly Pressed']
  },
  {
    id: 'b6',
    name: 'Special Burger (Double Smash)',
    category: 'Burgers',
    price: 1050,
    description: 'Double the beef smash patties, double cheddar cheese, fresh pickles, grilled onions, and house special sauce.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80',
    tags: ['Double Smash', 'Double Cheese', 'Mega Loaded']
  },
  {
    id: 'b7',
    name: 'Grilled Burger',
    category: 'Burgers',
    price: 490,
    description: 'Flame-grilled tender chicken breast patty topped with jalapeños, lettuce, tomatoes, and spicy tandoori mayo.',
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=600&q=80',
    tags: ['Flame Grilled', 'Healthy & Tender', 'Spicy Mayo']
  },
  {
    id: 'b8',
    name: 'Cheesion Double Goat Burger',
    category: 'Burgers',
    price: 1500,
    description: 'Double juicy goat meat patties with melted cheddar slices, fresh veggies, caramelized onions, and Chession house sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    tags: ['Double Patty', 'Gourmet Goat', 'Extra Cheese']
  },
  {
    id: 'b9',
    name: 'Chapli Burger',
    category: 'Burgers',
    price: 330,
    description: 'Traditional spiced Pakistani chapli patty fried to perfection, layered with fresh onions, tomatoes, and mint raita sauce.',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=600&q=80',
    tags: ['Traditional Spices', 'Mint Raita', 'Desi Twist']
  },
  {
    id: 'b10',
    name: 'Tower Burger',
    category: 'Burgers',
    price: 600,
    description: 'A tall, crispy chicken zinger fillet stacked with a golden hash brown, melted cheese, fresh lettuce, and sweet chili sauce.',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80',
    tags: ['Extra Tall', 'Hashbrown Layer', 'Super Filling']
  },

  // --- Pizza ---
  {
    id: 'p1',
    name: 'Chicken Tikka Pizza',
    category: 'Pizza',
    price: 1100,
    description: 'Local favorite pizza loaded with smoky grilled chicken tikka chunks, red onions, bell peppers, and premium mozzarella.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    tags: ['Smoky', 'Spicy', 'Highly Recommended']
  },
  {
    id: 'p2',
    name: 'Fajita Pizza',
    category: 'Pizza',
    price: 1150,
    description: 'Marinated fajita chicken, spicy green chilies, mixed bell peppers, onions, and hot salsa base under gooey cheese.',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
    tags: ['Mexican Style', 'Tangy']
  },
  {
    id: 'p3',
    name: 'Supreme Pizza',
    category: 'Pizza',
    price: 1300,
    description: 'The ultimate combo of smoked chicken sausage, beef pepperoni, black olives, mushrooms, peppers, and double cheese.',
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=600&q=80',
    tags: ['Fully Loaded']
  },
  {
    id: 'p4',
    name: 'Crown Crust Pizza',
    category: 'Pizza',
    price: 1450,
    description: 'Premium golden crown crust stuffed with garlic cream cheese, surrounding a core of rich tikka meat and melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    tags: ['Premium', 'Cheese Stuffed']
  },
  {
    id: 'p5',
    name: 'Extreme Pizza',
    category: 'Pizza',
    price: 1660,
    description: 'Extreme toppings of spicy chicken, pepperoni, sausages, olives, onions, peppers, and extra cheese.',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
    tags: ['Extreme Loaded', 'Best Seller'],
    sizes: [
      { name: 'Medium', price: 1660 },
      { name: 'Large', price: 2450 }
    ]
  },
  {
    id: 'p6',
    name: 'Peri Peri Crunch',
    category: 'Pizza',
    price: 1660,
    description: 'Spicy peri peri chicken chunks, crunchy nachos/onions, jalapeños, and drizzled with fiery peri peri sauce.',
    image: periPeriImg,
    tags: ['Spicy Peri Peri', 'Crunchy'],
    sizes: [
      { name: 'Medium', price: 1660 },
      { name: 'Large', price: 2450 }
    ]
  },
  {
    id: 'p7',
    name: 'Kebab Stuffer',
    category: 'Pizza',
    price: 1550,
    description: 'Delicious seekh kebab pieces stuffed in the crust or topped generously with cheese, onions, and mint drizzles.',
    image: kebabStufferImg,
    tags: ['Kebab Crust', 'Desi Twist'],
    sizes: [
      { name: 'Medium', price: 1550 },
      { name: 'Large', price: 2250 },
      { name: 'XL', price: 2650 }
    ]
  },
  {
    id: 'p8',
    name: 'Crown Crust Pizza',
    category: 'Pizza',
    price: 1550,
    description: 'Beautiful crown-shaped crust stuffed with cream cheese and topped with spicy tikka, olives, and premium mozzarella.',
    image: crownCrustImg,
    tags: ['Crown Crust', 'Cheese Filled'],
    sizes: [
      { name: 'Medium', price: 1550 },
      { name: 'Large', price: 2250 },
      { name: 'XL', price: 2650 }
    ]
  },
  {
    id: 'p9',
    name: 'Crown Legend',
    category: 'Pizza',
    price: 1550,
    description: 'The ultimate crown masterpiece, topped with grilled chicken kabab, sweet corn, mushrooms, and signature legend sauce.',
    image: crownLegendImg,
    tags: ['Crown Legend', 'Chef Special'],
    sizes: [
      { name: 'Medium', price: 1550 },
      { name: 'Large', price: 2250 },
      { name: 'XL', price: 2650 }
    ]
  },

  // --- Shawarma ---
  {
    id: 'sh1',
    name: 'Chicken Shawarma',
    category: 'Shawarma',
    price: 220,
    description: 'Thinly sliced slow-roasted chicken thighs, wrapped in soft pita bread with pickled cucumbers and rich garlic sauce.',
    image: 'https://images.unsplash.com/photo-1662116765994-1e30460970a3?auto=format&fit=crop&w=600&q=80',
    tags: ['Authentic', 'Daily Fresh']
  },
  {
    id: 'sh2',
    name: 'Special Shawarma',
    category: 'Shawarma',
    price: 280,
    description: 'Overloaded chicken breast cuts, spiced fries, cheese slice, house secret chili paste, and sweet garlic whip wrapped inside flatbread.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80',
    tags: ['Spicy Sauce', 'Cheese Loaded']
  },
  // --- Wraps ---
  {
    id: 'wr1',
    name: 'Classic Wrap',
    category: 'Wraps',
    price: 570,
    description: 'Tender, crispy chicken strips wrapped in a soft tortilla with fresh lettuce, tomatoes, and our signature classic creamy sauce.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz7HQ6TKLPPcW7tXltHnu__yndpcM66yfYeV39lL10Tw&s=10',
    tags: ['Classic', 'Fresh']
  },
  {
    id: 'wr2',
    name: 'Crazy Wrap',
    category: 'Wraps',
    price: 590,
    description: 'An explosion of spicy chicken chunks, loaded with melted cheddar cheese, jalapeños, onions, and our signature crazy hot sauce.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpFcRCMguHNhp2aSASzdwCyT0bcv77I2bv08hsUw2bxw&s=10',
    tags: ['Spicy Chili', 'Cheese Loaded']
  },
  {
    id: 'wr3',
    name: 'Grilled Wrap',
    category: 'Wraps',
    price: 610,
    description: 'Our signature grizzled wrap loaded with flame-grilled chicken strips, fresh lettuce, red onion rings, melted cheddar, and premium garlic sauce.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR89sqTObplwMH7mC8HlDFZVkJGrMcPIgz73Qg35xP_UQ&s=10',
    tags: ['Flame Grilled', 'Grizzled Special', 'Highly Recommended']
  },

  // --- Fries ---
  {
    id: 'fr1',
    name: 'Regular Fries',
    category: 'Fries',
    price: 150,
    description: 'Golden, crispy, skin-on French potatoes, lightly seasoned with premium sea salt. Cooked fresh upon order.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    tags: ['Vegan', 'Classic']
  },
  {
    id: 'fr2',
    name: 'Masala Fries',
    category: 'Fries',
    price: 180,
    description: 'Crispy golden fries tossed in our signature hot-and-sour local gun-powder spice mix.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    tags: ['Spicy', 'Tangy']
  },
  {
    id: 'fr3',
    name: 'Loaded Fries',
    category: 'Fries',
    price: 390,
    description: 'Golden fries layered with shredded grilled chicken, hot cheese sauce, chopped jalapeños, and white ranch dressing.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80',
    tags: ['Cheese Bomb', 'Shareable']
  },

  // --- Wings ---
  {
    id: 'wg1',
    name: 'Oven Baked Wings',
    category: 'Wings',
    price: 520,
    description: 'Perfectly seasoned wings baked in our brick oven until tender, juicy, and golden brown. Served with a cool dipping sauce.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
    tags: ['Oven Baked', 'Juicy', 'Low Fat'],
    sizes: [
      { name: '5 Pcs', price: 520 },
      { name: '10 Pcs', price: 950 }
    ]
  },
  {
    id: 'wg2',
    name: 'Chipotle Wings',
    category: 'Wings',
    price: 560,
    description: 'Succulent wings glazed with our smoky and mildly sweet chipotle chili glaze, garnished with fresh cilantro.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    tags: ['Smoky Chipotle', 'Tangy & Spicy'],
    sizes: [
      { name: '5 Pcs', price: 560 },
      { name: '10 Pcs', price: 990 }
    ]
  },
  {
    id: 'wg3',
    name: 'BBQ Wings',
    category: 'Wings',
    price: 520,
    description: 'Tender roasted wings smothered in our thick, rich, hickory-smoked BBQ sauce. A timeless favorite.',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80',
    tags: ['Hickory Smoked', 'Sweet & Savory', 'Crowd Favorite'],
    sizes: [
      { name: '5 Pcs', price: 520 },
      { name: '10 Pcs', price: 950 }
    ]
  },
  {
    id: 'wg4',
    name: 'Crispo Wings',
    category: 'Wings',
    price: 560,
    description: 'Super crunchy, golden double-fried chicken wings seasoned with our signature spice blend. Unmatched crunch!',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    tags: ['Extra Crispy', 'Golden Crunch', 'Highly Recommended'],
    sizes: [
      { name: '5 Pcs', price: 560 },
      { name: '10 Pcs', price: 990 }
    ]
  },
  {
    id: 'wg5',
    name: 'Buffalo Wings',
    category: 'Wings',
    price: 595,
    description: 'Classic New York style wings tossed in our signature tangy, hot cayenne pepper buffalo sauce. Served with ranch dip.',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=600&q=80',
    tags: ['Classic Buffalo', 'Fiery Hot', 'Tangy'],
    sizes: [
      { name: '5 Pcs', price: 595 },
      { name: '10 Pcs', price: 995 }
    ]
  },

  // --- Sandwiches ---
  {
    id: 'sw1',
    name: 'Crunchy Sandwich',
    category: 'Sandwiches',
    price: 880,
    description: 'Crispy fried golden chicken breast layered with crunchy lettuce, creamy coleslaw, spicy mayo, and toasted artisanal bread.',
    image: crunchySandwichImg,
    tags: ['Crunchy', 'Best Seller']
  },
  {
    id: 'sw2',
    name: 'Supreme Sandwich',
    category: 'Sandwiches',
    price: 870,
    description: 'Overloaded shredded roasted chicken, sweet corn, mushrooms, melted mozzarella, and signature herb supreme sauce.',
    image: supremeSandwichImg,
    tags: ['Cheese Loaded', 'Supreme']
  },
  {
    id: 'sw3',
    name: 'Grilled Sandwich',
    category: 'Sandwiches',
    price: 870,
    description: 'Flame-grilled succulent chicken strips, bell peppers, sliced onions, cheddar cheese, and a dash of house garlic aioli.',
    image: grilledSandwichImg,
    tags: ['Flame Grilled', 'Healthy & Fresh']
  },
  {
    id: 'sw4',
    name: 'Cheesion Special Sandwich',
    category: 'Sandwiches',
    price: 880,
    description: 'The ultimate cheese-lovers dream. Double cheese crust bread stuffed with peri peri grilled chicken, loads of cheddar and mozzarella cheese, and rich garlic butter.',
    image: cheesionSpecialSandwichImg,
    tags: ['Double Cheese', 'Chef Special']
  },

  // --- BBQ ---
  {
    id: 'bbq1',
    name: 'Chicken Tikka',
    category: 'BBQ',
    price: 340,
    description: 'Juicy quarter chicken leg/breast piece marinated in traditional spices, skewered and flame-grilled on coal. Served with mint chutney.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    tags: ['Coal Grilled', 'Traditional']
  },
  {
    id: 'bbq2',
    name: 'Malai Boti',
    category: 'BBQ',
    price: 520,
    description: 'Boneless chicken cubes marinated in heavy fresh cream, yogurt, white pepper, and local herbs, grilled soft as butter.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    tags: ['Mild & Creamy', 'Melt in Mouth']
  },
  {
    id: 'bbq3',
    name: 'Seekh Kabab',
    category: 'BBQ',
    price: 480,
    description: 'Minced chicken skewered over open charcoal grill, blended with green herbs, coriander, onions, and rich local spices.',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80',
    tags: ['Juicy', 'Highly Spiced']
  },

  // --- Deals ---
  {
    id: 'dl1',
    name: 'Family Deal',
    category: 'Deals',
    price: 2499,
    description: 'Perfect for 4! Contains 2 Medium Pizzas, 2 Zinger Burgers, Large Loaded Fries, and 1.5 Liter Soft Drink.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    tags: ['Mega Saving', 'Feast Pack']
  },
  {
    id: 'dl2',
    name: 'Couple Deal',
    category: 'Deals',
    price: 1199,
    description: 'Crafted for 2: Includes 1 Medium Pizza, 2 Crispy Chicken Burgers, Regular Fries, and 2 Soft Drink cans.',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80',
    tags: ['Best For Two']
  },
  {
    id: 'dl3',
    name: 'Student Deal',
    category: 'Deals',
    price: 599,
    description: 'Pocket-friendly single box: 1 Zinger Burger, 1 Regular Fries, and 1 Chilled Soft Drink can.',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80',
    tags: ['Budget Friendly', 'Student Special']
  },

  // --- Beverages ---
  {
    id: 'bv1',
    name: 'Soft Drinks',
    category: 'Beverages',
    price: 120,
    description: 'Choose your flavor: Coca Cola, Sprite, Fanta, or Dew. Served super chilled with optional ice.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    tags: ['Chilled', 'Refreshment']
  },
  {
    id: 'bv2',
    name: 'Mineral Water',
    category: 'Beverages',
    price: 80,
    description: 'Fresh and pure mineral spring water bottle (500ml), served at your temperature choice.',
    image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=600&q=80',
    tags: ['Hydration', 'Pure']
  },
  {
    id: 'bv3',
    name: 'Fresh Juices',
    category: 'Beverages',
    price: 250,
    description: 'Squeezed to order: Choice of Fresh Seasonal Orange, Mint Lemonade, or Apple Ginger juice.',
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=600&q=80',
    tags: ['100% Organic', 'Vitamin Boost']
  },

  // --- Desserts ---
  {
    id: 'ds1',
    name: 'Ice Cream',
    category: 'Desserts',
    price: 180,
    description: 'Two scoops of luxury high-fat ice cream. Flavors: Classic Vanilla, Rich Dark Chocolate, or Pistachio Almond.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    tags: ['Sweet Treat']
  },
  {
    id: 'ds2',
    name: 'Brownie with Fudge',
    category: 'Desserts',
    price: 260,
    description: 'Warm, gooey double chocolate fudge brownie. Highly recommended with a side of vanilla ice cream (+100).',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=600&q=80',
    tags: ['Best Seller', 'Warm & Sweet']
  },
  {
    id: 'ds3',
    name: 'Cake Slice',
    category: 'Desserts',
    price: 240,
    description: 'A slice of our famous red velvet cake or decadent chocolate malt premium bakery cake.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    tags: ['Fluffy', 'Indulgent']
  },

  // --- Rolls & Platter ---
  {
    id: 'rp1',
    name: 'Spin Rolls',
    category: 'Rolls & Platter',
    price: 570,
    description: 'Sizzling grilled chicken pieces wrapped in crispy golden-fried paratha bread with garlic mayo and spicy chili chutney.',
    image: crispyChickenRollsImg,
    tags: ['Crispy', 'Spicy', 'Staff Pick']
  },
  {
    id: 'rp2',
    name: 'Malai Roll',
    category: 'Rolls & Platter',
    price: 590,
    description: 'Super tender, cream-marinated boneless Malai Boti wrapped with fresh onions and a smooth yogurt mint sauce.',
    image: crispyChickenRollsImg,
    tags: ['Mild', 'Creamy', 'Melt-in-Mouth']
  },
  {
    id: 'rp3',
    name: 'Cheesion Special Roll',
    category: 'Rolls & Platter',
    price: 650,
    description: 'Our signature roll packed with juicy chicken, oozing mozzarella and cheddar cheese, and house secret spiced cheese sauce.',
    image: crispyChickenRollsImg,
    tags: ['Double Cheese', 'Signature']
  },
  {
    id: 'rp4',
    name: 'Crispo Roll',
    category: 'Rolls & Platter',
    price: 600,
    description: 'Incredibly crunchy double-fried chicken breast strip wrapped with shredded lettuce, cheese slice, and sweet-and-sour dressing.',
    image: crispyChickenRollsImg,
    tags: ['Extra Crunchy', 'Best Seller']
  },
  {
    id: 'rp5',
    name: 'Platter',
    category: 'Rolls & Platter',
    price: 990,
    description: 'A perfect sharing platter of succulent chicken boti, mini seekh kababs, golden crispy fries, and a variety of delicious house dips.',
    image: gourmetFoodPlatterImg,
    tags: ['Variety Feast', 'Shareable']
  },
  {
    id: 'rp6',
    name: 'Crispo Platter',
    category: 'Rolls & Platter',
    price: 1020,
    description: 'Golden-fried crispy zinger chunks, crispy fish/chicken bites, stacked fries, onion rings, and a duet of garlic mayo and chili cheese dip.',
    image: gourmetFoodPlatterImg,
    tags: ['Fried Gold', 'Crunchy Feast']
  },
  {
    id: 'rp7',
    name: 'Malai Platter',
    category: 'Rolls & Platter',
    price: 1020,
    description: 'Extremely tender creamy Malai Boti, cream-stuffed grilled chicken breast pieces, flatbread, fresh salad, and rich garlic sauce.',
    image: gourmetFoodPlatterImg,
    tags: ['Rich & Creamy', 'Desi Gourmet']
  },
  {
    id: 'rp8',
    name: 'Cheesion Special Platter',
    category: 'Rolls & Platter',
    price: 1050,
    description: 'A premium majestic platter of double cheese chicken seekh kababs, loaded cheese fries, grilled chicken skewers, and cheesion dipping bowl.',
    image: gourmetFoodPlatterImg,
    tags: ['Cheese Bomb', 'Ultimate Feast']
  }
];

export const INITIAL_REVIEWS: Review[] = [];

export const DEFAULT_CONFIG: RestaurantConfig = {
  phone: '0966714555',
  whatsapp: '923066714555', // digits only with country code
  address: 'north circular road ,near commerce college dikhan',
  openingHours: '12:00 PM - 02:00 AM',
  deliveryCharges: 150
};

export const GALLERY_IMAGES = [
  {
    id: 'g1',
    title: 'Sizzling Burgers',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'g2',
    title: 'Hot Pizza Freshly Baked',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'g3',
    title: 'Juicy Coal BBQ',
    url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'g4',
    title: 'Specialty Shakes & Juices',
    url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'g5',
    title: 'Gourmet Club Sandwiches',
    url: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'g6',
    title: 'Loaded Cheese Fries',
    url: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80'
  }
];
