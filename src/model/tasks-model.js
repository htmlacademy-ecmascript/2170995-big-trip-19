import { createRandomPoint } from '../mocks/point.js';

const POINT_COUNT = 4;

export default class TaskModel {
  #tasks = Array.from({ length: POINT_COUNT }, createRandomPoint);

  get tasks() {
    return this.#tasks;
  }
}
