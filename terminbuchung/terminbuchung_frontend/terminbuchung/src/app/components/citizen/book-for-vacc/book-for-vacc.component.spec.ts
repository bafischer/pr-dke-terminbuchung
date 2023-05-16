import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookForVaccComponent } from './book-for-vacc.component';

describe('BookForVaccComponent', () => {
  let component: BookForVaccComponent;
  let fixture: ComponentFixture<BookForVaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookForVaccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookForVaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
