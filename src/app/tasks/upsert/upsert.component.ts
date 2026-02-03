import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataModifyService } from 'src/app/core/data.modify.service';
import { PayloadType, TasksInterface } from 'src/app/schema';

@Component({
  selector: 'app-upsert',
  templateUrl: './upsert.component.html',
  styleUrls: ['./upsert.component.css'],
})
export class UpsertComponent implements OnInit {
  /**
   * The title of the task being added or edited.
   */
  title: string = '';
  /**
   * The description of the task.
   */
  description: string = '';
  /**
   * The configurations recieved from the parent.
   * Contains the mode (add or edit) and initial data.
   */
  @Input() actionPayload!: PayloadType;
  /**
   * Emits an event when mode needs to close.
   */
  @Output() closeModalEvent = new EventEmitter();
  constructor(private dataService: DataModifyService) {}
  ngOnInit(): void {
    this.title = this.actionPayload.title;
    this.description = this.actionPayload.description;
    if (this.actionPayload.action == 'add') this.resetValues();
  }
  /**
   * Resets the form fields to empty strings.
   */
  resetValues() {
    this.title = '';
    this.description = '';
  }
  /**
   * Emits the close event to the parent component.
   */
  closeModal() {
    this.closeModalEvent.emit(false);
  }

  /**
   * Executed when then submit button is clicked
   * Handels both creation and updates based on the action type.
   * @param payload The current payload configuration.
   * @returns None
   */
  performAction(payload: PayloadType) {
    if (payload.action === 'add') {
      const tasks = this.dataService.getTasks();
      const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      const task: TasksInterface = {
        title: this.title,
        description: this.description,
        isCompleted: false,
        id,
      };
      this.dataService.addTask(task);
      this.resetValues();
    } else if (payload.action === 'edit') {
      if (!payload.id) return;
      const updatedTask: TasksInterface = {
        id: payload.id,
        title: this.title,
        description: this.description,
        isCompleted: false,
      };
      this.closeModal();
      this.dataService.editTask(payload.id, updatedTask);
      this.resetValues();
    }
  }
}
