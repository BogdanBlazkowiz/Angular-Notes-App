import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteComponent } from "./note/note.component";
import { ApiService } from './api.service';
import { NewNoteComponent } from "./new-note/new-note.component";
import { BigNoteComponent } from './big-note/big-note.component';

type Note = {
  _id: string,
  title: string,
  description: string,
  __v: number
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NoteComponent, NewNoteComponent, BigNoteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'note-front';
  bigNote = { title: "", desc: "", id: "" };
  notes: any;
  notes1: Note[] = [{__v:0, title:"", description:"", _id:""}];
  notes2: Note[] = [{__v:0, title:"", description:"", _id:""}];
  reloadData = () => {
    this.apiService.getMessage().subscribe(data => {
      this.notes = data;
      this.notes1 = []
      this.notes2 = []
      for (let i = 0; i < this.notes.length; i++) {
        console.log(this.notes[i])
        if (i%2 === 0) {
          this.notes1.push(this.notes[i])
        }
        else {
          this.notes2.push(this.notes[i])
        }
      }
    });
  }
  constructor(private apiService: ApiService) { };
  ngOnInit() {
    this.reloadData()
  }
  getZIndex(index: number): number {
    return this.notes.length - index;
  }
  onNewNoteCreation = () => {
    this.reloadData()
  }
  clickedANote = (data: number) => {
    let noteInfo = this.notes[data]
    this.bigNote = { title: noteInfo.title, desc: noteInfo.description, id: noteInfo._id };
  }
}
