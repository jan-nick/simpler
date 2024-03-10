import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';

export class ListScrollEnd {
  source!: ListComponent;
  value!: boolean;
}

@Component({
  selector: 'simpler-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnChanges {
  @Input()
  get scroll(): boolean {
    return this._scroll;
  }
  set scroll(value: BooleanInput) {
    this._scroll = coerceBooleanProperty(value);
  }
  private _scroll = false;

  @Input()
  get bottomOffset(): number {
    return this._bottomOffset;
  }
  set bottomOffset(value: NumberInput) {
    this._bottomOffset = coerceNumberProperty(value);
  }
  private _bottomOffset = 0;

  @Input()
  get scrollEndOffset(): number {
    return this._scrollEndOffset;
  }
  set scrollEndOffset(value: NumberInput) {
    this._scrollEndOffset = coerceNumberProperty(value);
  }
  private _scrollEndOffset = 100;

  @Output() scrollEnd = new EventEmitter<ListScrollEnd>();

  @ViewChild('scrollEndAnchor')
  private readonly scrollEndAnchor!: ElementRef<HTMLDivElement>;

  private scrollEndObserver!: IntersectionObserver;

  ngAfterViewInit() {
    this.initScrollEndObserver();
  }

  ngOnChanges() {
    if (this.scrollEndAnchor) {
      this.initScrollEndObserver();
    }
  }

  private initScrollEndObserver() {
    this.scrollEndObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const event = new ListScrollEnd();

        event.source = this;
        event.value = true;

        this.scrollEnd.emit(event);
      }
    });

    if (this.scroll) {
      this.scrollEndObserver.observe(this.scrollEndAnchor.nativeElement);
    } else {
      this.scrollEndObserver.disconnect();
    }
  }
}
