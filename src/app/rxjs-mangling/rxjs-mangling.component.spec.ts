import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsManglingComponent } from './rxjs-mangling.component';

describe('RxjsManglingComponent', () => {
  let component: RxjsManglingComponent;
  let fixture: ComponentFixture<RxjsManglingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsManglingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsManglingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
