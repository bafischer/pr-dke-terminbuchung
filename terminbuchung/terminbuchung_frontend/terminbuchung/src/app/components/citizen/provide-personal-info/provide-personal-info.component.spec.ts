import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidePersonalInfoComponent } from './provide-personal-info.component';

describe('AddPersonComponent', () => {
  let component: ProvidePersonalInfoComponent;
  let fixture: ComponentFixture<ProvidePersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidePersonalInfoComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProvidePersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
