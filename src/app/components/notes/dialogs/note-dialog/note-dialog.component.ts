import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../../../api/interfaces/Note';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    ) { }

  ngOnInit(): void {

  }

  public closeDialog = (result: Note): void => {
    this.dialogRef.close(result);
}

}
