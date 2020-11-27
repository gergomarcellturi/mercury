import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() isStylish: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
