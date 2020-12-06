import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../../../api/interfaces/Note';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  public noteForm: FormGroup;
  public get title(): AbstractControl { return this.noteForm.get('title'); }
  public get text(): AbstractControl { return this.noteForm.get('text'); }

  constructor(
    @Inject(MAT_DIALOG_DATA) public note: Note,
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {

  }

  public submit = (): void => {
    if (this.noteForm.invalid) return;
    else this.closeDialog(this.getEntity());
  }

  public closeDialog = (result: Note): void => {
    this.dialogRef.close(result);
  }

  private getEntity = (): Note => {
    const note = this.note;
    note.noteText = this.text.value;
    note.noteTitle = this.title.value;
    return note;
  }

  private buildForm = (): void => {
    this.noteForm = this.formBuilder.group({
      title: [this.note.noteTitle || '', [
        Validators.required,
      ]],

      text: [this.note.noteText || '', [
        Validators.required,
      ]]
    });
  }

}
