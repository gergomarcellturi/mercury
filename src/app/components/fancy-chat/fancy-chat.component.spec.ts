import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyChatComponent } from './fancy-chat.component';

describe('FancyChatComponent', () => {
  let component: FancyChatComponent;
  let fixture: ComponentFixture<FancyChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
