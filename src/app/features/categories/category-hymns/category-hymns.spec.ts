import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryHymns } from './category-hymns';

describe('CategoryHymns', () => {
  let component: CategoryHymns;
  let fixture: ComponentFixture<CategoryHymns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryHymns],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryHymns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
