import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstGraphComponent } from './my-first-graph.component';

describe('MyFirstGraphComponent', () => {
  let component: MyFirstGraphComponent;
  let fixture: ComponentFixture<MyFirstGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFirstGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFirstGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
