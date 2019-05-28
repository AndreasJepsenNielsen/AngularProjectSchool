import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalIndexComponent } from './portal-index.component';

describe('PortalIndexComponent', () => {
  let component: PortalIndexComponent;
  let fixture: ComponentFixture<PortalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
