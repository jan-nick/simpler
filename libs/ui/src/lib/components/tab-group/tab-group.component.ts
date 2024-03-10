/* eslint-disable @angular-eslint/no-output-native */
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { merge } from 'rxjs';
import { TabComponent, TabSelect } from '../tab/tab.component';

@Component({
  selector: 'simpler-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent
  implements AfterViewInit, AfterContentInit, OnChanges
{
  @Output() select = new EventEmitter<TabSelect>();

  @Input() value = '';

  selectedTab!: TabComponent | undefined;
  selectedTabIndex!: number | undefined;

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterViewInit(): void {
    this.initExclusiveTabSelect();
  }

  ngAfterContentInit(): void {
    this.initSelectedTab();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, previousValue, firstChange } = changes['value'];

    if (!firstChange && currentValue !== previousValue) {
      this.selectTab(currentValue);
    }
  }

  selectTab(tabValue: string) {
    const tab = this.findTab(tabValue);

    tab?.selectTab();

    return tab;
  }

  indexOfTab(tabValue: string) {
    return this.tabs?.map(({ value }) => value).indexOf(tabValue);
  }

  findTab(tabValue: string) {
    return this.tabs?.find(({ value }) => value === tabValue);
  }

  private initSelectedTab() {
    this.selectedTab = this.findTab(this.value);
    this.selectedTabIndex = this.indexOfTab(this.value);

    if (this.selectedTab) {
      this.selectedTab.selected = true;
    }
  }

  private initExclusiveTabSelect() {
    const tabsSelect$ = merge(
      ...this.tabs.map((tab) => tab['select'].asObservable())
    );

    tabsSelect$.subscribe((event) => {
      this.value = event.source.value;
      this.selectedTab = event.source;

      this.selectedTabIndex = this.indexOfTab(event.source.value);

      this.select.emit(event);

      this.unselectOtherTabs(event.source.value);
    });
  }

  private unselectOtherTabs(tabValue: string) {
    const otherTabs = this.tabs.filter(
      ({ selected, value }) => selected && value !== tabValue
    );

    otherTabs.forEach((tab) => (tab.selected = false));
  }
}
