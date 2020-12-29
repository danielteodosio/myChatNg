import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBoxComponent } from './users-box.component';

describe('UsersBoxComponent', () => {
  let component: UsersBoxComponent;
  let fixture: ComponentFixture<UsersBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
