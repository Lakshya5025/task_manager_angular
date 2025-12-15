import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataModifyService } from 'src/app/core/data.modify.service';
import { PayloadType, TasksInterface } from 'src/app/schema';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  /**
   *Stores the data to be passed to the upsert(add/edit) form.
   *Initialized with empty values.
   */
  payload: PayloadType = { title: '', description: '' };
  /**
   * Controls the visibility of the uspert modal.
   * True implies the user is adding or editing a task.
   */
  public isUpsert: boolean = false;

  constructor(
    private router: Router,
    private dataModify: DataModifyService,
    private authService: AuthService
  ) {}

  /**
   * Local list of tasks to display in the view.
   */
  tasks: TasksInterface[] = [];

  /**
   * Revoves a task by its id and refreshes the local list.
   * @param id The unique identifier of the task to remove.
   */
  onDelete(id: number) {
    this.dataModify.onDelete(id);
    this.tasks = this.dataModify.getTasks();
    this.dataModify.interceptorTest();
  }
  /**
   * Manages the paload for editing a specific task and opens the upsert view.
   * @param id The id of the task to edit.
   */
  onEdit(id: number) {
    this.isUpsert = true;
    this.payload.id = id;
    this.payload.action = 'edit';
    const foundTask = this.tasks.find((task) => task.id === id);
    if (foundTask) {
      this.payload.title = foundTask.title;
      this.payload.description = foundTask.description;
    }
  }
  /**
   * Manages the payload for creating a new task and opens the upsert view.
   */
  onAddTask() {
    this.isUpsert = true;
    this.payload.action = 'add';
  }
  /**
   * Logs the user out and redirects to the login page.
   */
  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  /**
   * Fetches the initial list of tasks.
   */
  ngOnInit() {
    this.tasks = this.dataModify.getTasks();
  }
}
