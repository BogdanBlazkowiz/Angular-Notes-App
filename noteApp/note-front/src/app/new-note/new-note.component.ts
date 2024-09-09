import { Component, Output, EventEmitter } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../api.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.scss'
})
export class NewNoteComponent {
  titleControl = new FormControl('');
  descriptionControl = new FormControl("");
  private receivedData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();
  needsReload() {
    this.buttonClicked.emit();
  }

  ngOnInit() {
    // Subscribe to the value and watch for changes
    this.receivedData$.subscribe((value: any) => {
      if (value === true) {
        this.needsReload(); // Trigger action when value equals true
        this.receivedData$.next(false);
      }
    });
  }

  constructor(private apiService: ApiService) { };
  submitNote() {
    this.apiService.postMessage({title: this.titleControl.value, description: this.descriptionControl.value}).subscribe(data => {
      console.log("received response")
      this.receivedData$.next(true)
    });
    this.needsReload()
  }
}
