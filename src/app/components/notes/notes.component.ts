import {Component, Input, OnInit} from '@angular/core';
import {NoteService} from '../../api/services/communication/note.service';
import {Note} from '../../api/interfaces/Note';
import {MatDialog} from '@angular/material/dialog';
import {NoteDialogComponent} from './dialogs/note-dialog/note-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() isStylish: boolean;

  public noteList: Note[];

  constructor(
    public noteService: NoteService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.queryNotes();
  }

  public openNote = (note: Note) => {
    this.dialog.open(NoteDialogComponent, {data: note}).afterClosed().subscribe(result => {
      if (result && !note) {
        this.noteService.saveNote(note);
      }
    });
  }

  private queryNotes = (): void => {
    this.noteService.getNoteList().subscribe(notes => {
      this.noteList = notes;
      console.log(notes);
    });
  }

}
