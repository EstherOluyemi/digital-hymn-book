import { TestBed } from '@angular/core/testing';
import { Hymn } from '../models/hymn.model';

describe('Hymn', () => {
  let service: Hymn;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hymn.author);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

