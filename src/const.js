const TYPE = ['bus', 'taxi', 'train', 'ship', 'flight', 'drive', 'restaurant', 'sightseeing', 'check-in'];
const destination = ['Simferopol', 'Sevastopol', 'Feodosia', 'Kerch', 'Sudak', 'Yalta'];
const description = ['Lorem ipsum, dolor sit amet consectetur adipisicing elit.', 'Quos debitis asperiores praesentium reiciendisэ', 'vero nisi ratione commodi accusamus ut illo', 'provident quaerat quasi veniam.', 'Minima perspiciatis reprehenderit doloremque.', 'Voluptate, maxime Adipisci laudantium iste delectus', 'maiores commodi magni ad a, distinctio', 'optio ducimus eveniet molestias doloribus deleniti', 'culpa voluptate saepe ipsa asperiores!', 'Excepturi ratione sunt nostrum commodi ? Dolor consequatur repellat impedit ?'];
const offers = [
  {
    id: 1,
    title: 'flying on an airplane wing',
    price: 100,
    isChecked: Math.random() > 0.5,
    typeOffer: 'flight',
  },

  {
    id: 2,
    title: 'Personal driver',
    price: 70,
    isChecked: Math.random() > 0.5,
    typeOffer: 'drive',
  },

  {
    id: 3,
    title: 'Window seat',
    price: 10,
    isChecked: Math.random() > 0.5,
    typeOffer: 'bus',
  },

  {
    id: 4,
    title: 'child seat',
    price: 15,
    isChecked: Math.random() > 0.5,
    typeOffer: 'taxi',
  },

  {
    id: 5,
    title: 'dinner with the captain',
    price: 1500,
    isChecked: Math.random() > 0.5,
    typeOffer: 'ship',
  },

  {
    id: 6,
    title: 'play poker with the conductor',
    price: 200,
    isChecked: Math.random() > 0.5,
    typeOffer: 'train',
  },
];

export {
  TYPE,
  destination,
  description,
  offers
};
