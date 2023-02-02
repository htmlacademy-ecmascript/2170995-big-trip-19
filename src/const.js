const POINT_TYPES = ['bus', 'taxi', 'train', 'ship', 'flight', 'drive', 'restaurant', 'sightseeing', 'check-in'];
const DESTINATIONS = ['Simferopol', 'Sevastopol', 'Feodosia', 'Kerch', 'Sudak', 'Yalta'];
const DESCRIPTIONS = ['Lorem ipsum, dolor sit amet consectetur adipisicing elit.', 'Quos debitis asperiores praesentium reiciendisэ', 'vero nisi ratione commodi accusamus ut illo', 'provident quaerat quasi veniam.', 'Minima perspiciatis reprehenderit doloremque.', 'Voluptate, maxime Adipisci laudantium iste delectus', 'maiores commodi magni ad a, distinctio', 'optio ducimus eveniet molestias doloribus deleniti', 'culpa voluptate saepe ipsa asperiores!', 'Excepturi ratione sunt nostrum commodi ? Dolor consequatur repellat impedit ?'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};


export {
  POINT_TYPES,
  DESTINATIONS,
  DESCRIPTIONS,
  FilterType,
  SortType,
  UserAction,
  UpdateType
};
