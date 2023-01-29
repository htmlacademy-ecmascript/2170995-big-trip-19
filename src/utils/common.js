// Случайный массив
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

// Случайное число
const getRandomInteger = (min, max) => min + Math.floor(Math.random() * (max - min));


export {
  getRandomArrayElement,
  getRandomInteger,
};
