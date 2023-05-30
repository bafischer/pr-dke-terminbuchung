import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookForMedicComponent } from './book-for-medic.component';

describe('BookForMedicComponent', () => {
  let component: BookForMedicComponent;
  let fixture: ComponentFixture<BookForMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookForMedicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookForMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
