import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit eventKeyUp on keyup', () => {
    spyOn(component.eventKeyUp, 'emit');

    const input = fixture.debugElement.query(By.css('input'));
    const event = new KeyboardEvent('keyup', { bubbles: true });
    
    input.nativeElement.dispatchEvent(event);

    expect(component.eventKeyUp.emit).toHaveBeenCalled();
  });

  it('should emit the correct value on keyup', () => {
    spyOn(component.eventKeyUp, 'emit');

    const input = fixture.debugElement.query(By.css('input'));
    const testValue = 'Spiderman';

    input.nativeElement.value = testValue;
    const event = new KeyboardEvent('keyup', { bubbles: true });
    
    input.nativeElement.dispatchEvent(event);

    expect(component.eventKeyUp.emit).toHaveBeenCalledWith(testValue);
  });
});
