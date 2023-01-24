import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomInteger } from './utils/common.js';
import { getRandomPhoto } from './utils/task.js';

const POINT_TYPES = ['bus', 'taxi', 'train', 'ship', 'flight', 'drive', 'restaurant', 'sightseeing', 'check-in'];
const DESTINATIONS = ['Simferopol', 'Sevastopol', 'Feodosia', 'Kerch', 'Sudak', 'Yalta'];
const DESCRIPTIONS = ['Lorem ipsum, dolor sit amet consectetur adipisicing elit.', 'Quos debitis asperiores praesentium reiciendisэ', 'vero nisi ratione commodi accusamus ut illo', 'provident quaerat quasi veniam.', 'Minima perspiciatis reprehenderit doloremque.', 'Voluptate, maxime Adipisci laudantium iste delectus', 'maiores commodi magni ad a, distinctio', 'optio ducimus eveniet molestias doloribus deleniti', 'culpa voluptate saepe ipsa asperiores!', 'Excepturi ratione sunt nostrum commodi ? Dolor consequatur repellat impedit ?'];
const OFFERS = [
  {
    type: 'bus',
    id: [getRandomInteger(1, 3), 0]
  },
  {
    type: 'taxi',
    id: [getRandomInteger(1, 3), 0]
  },
  {
    type: 'train',
    id: [getRandomInteger(1, 3), 0]
  },
  {
    type: 'ship',
    id: [getRandomInteger(1, 3), 0]
  },
  {
    type: 'flight',
    id: [getRandomInteger(1, 3), 0]
  },
  {
    type: 'drive',
    id: [getRandomInteger(1, 3), 0]
  },
  {
    type: 'restaurant',
    id: [getRandomInteger(1, 3), 0]
  },
];

const OffersByType = [
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'bus stop',
        price: 10,
      },
      {
        id: 2,
        title: 'bus start',
        price: 20,
      },
    ]
  },

  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'child seat',
        price: 15,
      },
      {
        id: 2,
        title: 'select radio',
        price: 10,
      },
    ]
  },

  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'play poker with the conductor',
        price: 250,
      },
    ]
  },

  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'dinner with the captain',
        price: 1500,
      },
    ]
  },

  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'flying on an airplane wing',
        price: 150,
      },
      {
        id: 2,
        title: 'flying business class',
        price: 300,
      },
    ]
  },

  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Personal driver',
        price: 150,
      },
    ]
  },

  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Personal driver',
        price: 150,
      },
    ]
  },

  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'cofee',
        price: 100,
      },
      {
        id: 2,
        title: 'tea',
        price: 200,
      },
      {
        id: 3,
        title: 'water',
        price: 300,
      },
    ]
  },

  {
    type: 'sightseeing',
    offers: []
  },

  {
    type: 'check-in',
    offers: []
  },
];

const randomDestinations = [
  {
    id: nanoid(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    picture: [
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  {
    id: nanoid(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    picture: [
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
  {
    id: nanoid(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    picture: [
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: getRandomPhoto(),
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  }
];

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const FILTER_TYPES = {
  everything: 'checked',
  future: '',
  present: 'checked',
  past: '',
};


export {
  POINT_TYPES,
  DESTINATIONS,
  DESCRIPTIONS,
  OFFERS,
  OffersByType,
  randomDestinations,
  FILTER_TYPES,
  SortType
};
