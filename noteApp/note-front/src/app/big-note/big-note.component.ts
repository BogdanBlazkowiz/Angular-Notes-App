import { Component, Input, OnChanges, HostBinding, Output, EventEmitter } from '@angular/core';
import {
  trigger, state, style, animate, transition
} from "@angular/animations"
import { ApiService } from '../api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-big-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './big-note.component.html',
  styleUrl: './big-note.component.scss',
  animations: [
    trigger("blurredTextAnimation", [
      state("blurry",
        style({
          opacity: 0
        })
      ),
      state("not-blurry",
        style({
        })
      ),
      transition("blurry => not-blurry", [animate("1s ease-in-out")])
    ])
  ]
})
export class BigNoteComponent implements OnChanges {
  @Input() noteData: { title: string, desc: string, id: string } = { title: "", desc: "", id: "" };
  buttonTitle: string = "Submit New Note";
  hasChangedAlready = false;
  isBlurred: string = "blurry";
  isEditing: boolean = false;
  @HostBinding("@blurredTextAnimation") get animationState() {
    return this.isBlurred;
  };
  async ngOnChanges() {
    if (this.hasChangedAlready) {
      this.buttonTitle = "Update Note"
      this.isEditing = true;
    }
    else {
      this.hasChangedAlready = true;
    }
    this.isBlurred = "blurry";
    await new Promise(f => setTimeout(f, 10));
    this.isBlurred = "not-blurry"
    this.titleControl.setValue(this.noteData.title)
    this.descriptionControl.setValue(this.noteData.desc)
  }
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
  handleFormClick(id: string, btnType: string) {
    if (id && btnType === "submit") {
      this.updateNote(id)
    }
    if (btnType === "delete" && id) {
      this.deleteNote(id)
      this.buttonTitle = "Submit New Note"
      this.noteData = {title: "", desc: "", id: ""}
    }
    if (btnType === "new") {
      this.buttonTitle = "Submit New Note"
      this.noteData = {title: "", desc: "", id: ""}
      this.isEditing = false;
    }
    if (!id && btnType === "submit") {
      this.submitNote()
    }
  }
  submitNote() {
    this.apiService.postMessage({ title: this.titleControl.value, description: this.descriptionControl.value }).subscribe(data => {
      console.log("received response")
      this.receivedData$.next(true)
    });

    this.titleControl.setValue(this.noteData.title)
    this.descriptionControl.setValue(this.noteData.desc)
    this.needsReload()
  }
  updateNote(id: string) {
    this.apiService.updateMessage({ title: this.titleControl.value, description: this.descriptionControl.value, id: id }).subscribe(data => {
      console.log("received response")
      this.receivedData$.next(true)
    });
    this.needsReload()
  }
  deleteNote(id: string) {
    this.apiService.deleteMessage(id).subscribe(data => {
      console.log("received response")
      this.receivedData$.next(true)
    });
    this.needsReload()
  }
}
