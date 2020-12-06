import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../api/services/communication/note.service';
import {Note} from '../../api/interfaces/Note';
import {MatDialog} from '@angular/material/dialog';
import {NoteDialogComponent} from './dialogs/note-dialog/note-dialog.component';
import {ThemeService} from '../../api/services/misc/theme.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  isStylish: boolean;

  public noteList: Note[] = [];

  constructor(
    public noteService: NoteService,
    private dialog: MatDialog,
    public themeService: ThemeService
  ) {
    this.isStylish = this.themeService.getActiveTheme().stylish;
  }

  ngOnInit(): void {
    this.queryNotes();
  }

  public openNote = (note: Note) => {
    this.dialog.open(NoteDialogComponent, {data: note || {}}).afterClosed().subscribe(result => {
      if (note && note.uid) {
        this.noteService.modifyNote(result);
      } else {
        this.noteService.saveNote(result).then(this.queryNotes.bind(this));
      }
    });
  }

  private queryNotes = (): void => {
    this.noteList = [];
    this.noteService.getNoteList().subscribe(notes => {
      notes.forEach(doc => {
        const newNote = {} as Note;
        Object.keys(doc.data()).forEach( key => {
          newNote[key] = doc.data()[key];
          newNote.uid = doc.id;
        });
        this.noteList = [...this.noteList, newNote];
      });
    });

  }

}
