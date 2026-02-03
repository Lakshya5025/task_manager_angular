import { Injectable } from '@angular/core';
import { TasksInterface } from '../schema';
import { HttpClient } from '@angular/common/http';
import { interceptorAPI } from 'env';

@Injectable({
  providedIn: 'root',
})
export class DataModifyService {
  private tasks = [
    {
      id: 1,
      title: 'task1',
      description: 'this is task 1',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'task2',
      description: 'this is task 2',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'task3',
      description: 'this is task 3  gdasgf dsg dasf asd fads ',
      isCompleted: false,
    },
    {
      id: 4,
      title: 'task4',
      description: 'this is task 4',
      isCompleted: false,
    },
    {
      id: 5,
      title: 'task5',
      description: 'this is task 5',
      isCompleted: false,
    },
  ];

  /**
   * Removes a task from the list by its ID.
   * @param id The unique identifier of the task to delete.
   */
  onDelete(id: number) {
    this.tasks = this.tasks.filter((task) => task.id != id);
  }

  /**
   * Returns the current list of tasks.
   * @returns An array of task objects.
   */
  getTasks() {
    return this.tasks;
  }

  /**
   * Appends a new task to the collection.
   * @param task The task object to add.
   */
  addTask(task: TasksInterface) {
    this.tasks.push(task);
  }

  /**
   * Updates an existing task's details.
   * @param id The ID of the task to update.
   * @param task The new task data.
   */
  editTask(id: number, task: TasksInterface) {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return;
    this.tasks[idx] = task;
  }
  constructor(private http: HttpClient) {}

  /**
   * Testing of interseptor
   */
  interceptorTest() {
    this.http.get(interceptorAPI).subscribe((data) => {
      console.log(data);
    });
  }
}
