// Случайный массив
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

// Случайное число
const getRandomInteger = (min, max) => min + Math.floor(Math.random() * (max - min));

// Обновление задачи
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {
  getRandomArrayElement,
  getRandomInteger,
  updateItem
};
