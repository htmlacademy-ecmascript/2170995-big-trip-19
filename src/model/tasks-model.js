import { getRandomTask } from '../mocks/task.js';

const TASK_COUNT = 5;

export default class TaskModel {
  #tasks = Array.from({ length: TASK_COUNT }, getRandomTask);

  get tasks() {
    return this.#tasks;
  }
}
