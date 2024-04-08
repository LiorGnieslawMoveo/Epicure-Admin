import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenricModalComponent } from './genric-modal.component';

describe('GenricModalComponent', () => {
  let component: GenricModalComponent;
  let fixture: ComponentFixture<GenricModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenricModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenricModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
