import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import {
  trigger, state, style, animate, transition
} from "@angular/animations"

@Component({
  selector: 'app-note',
  standalone: true,
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  animations: [
    trigger("hoverShown", [
      state("up",
        style({
          marginBottom: "-13px",
          background: "rgba(251,42,142,1)"
        })
      ),
      state("down",
        style({
          marginBottom: "-20px",
          background: "rgba(251,63,251,1)",

        })
      ),
      transition("up <=> down", [animate("0.5s ease-in-out")])
    ])
  ]
})
export class NoteComponent {
  @Input() title: string = "";
  @Input() zIndex: number = 0;
  isShown = "down";
  @HostBinding("style.zIndex") get setZIndex() {
    return this.zIndex;
  };
  @HostBinding("@hoverShown") get animationState() {
    return this.isShown;
  };
  @Output() buttonClicked: EventEmitter<number> = new EventEmitter<number>();
  @HostListener("click") hasBeenClicked() {
    this.buttonClicked.emit(this.zIndex);
  };
  @HostListener("mouseenter") toggleShowEnter() {
    this.isShown = (this.isShown === "down") ? "up" : "down";
  };
  @HostListener("mouseleave") toggleShowLeave() {
    this.isShown = (this.isShown === "down") ? "up" : "down";
  };
}
