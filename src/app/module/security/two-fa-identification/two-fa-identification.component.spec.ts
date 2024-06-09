import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFaIdentificationComponent } from './two-fa-identification.component';

describe('TwoFaIdentificationComponent', () => {
  let component: TwoFaIdentificationComponent;
  let fixture: ComponentFixture<TwoFaIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoFaIdentificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFaIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
