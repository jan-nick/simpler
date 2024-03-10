import { TabGroupComponent } from './tab-group.component';

import { createHostFactory, Spectator } from '@ngneat/spectator/jest';
import { TabComponent, TabSelect } from '../tab/tab.component';
import { MockComponent } from 'ng-mocks';

describe('TabGroupComponent', () => {
  let spectator: Spectator<TabGroupComponent>;
  let component: TabGroupComponent;

  const createHost = createHostFactory({
    component: TabGroupComponent,
    declarations: [MockComponent(TabComponent)],
  });

  beforeEach(() => {
    spectator = createHost(
      `
      <simpler-tab-group value="tab1">
        <simpler-tab label="tab1 label" value="tab1"></simpler-tab>
        <simpler-tab label="tab2 label" value="tab2"></simpler-tab>
        <simpler-tab label="tab3 label" value="tab3"></simpler-tab>
      </simpler-tab-group>`
    );
    component = spectator.component;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('tab button', () => {
    it('should have same number of buttons as number of tabs', () => {
      const tabButtons = spectator.queryAll('.simpler-tab-button');

      expect(tabButtons).toHaveLength(3);
    });

    it('should contain tab label', () => {
      const [tabButton1, tabButton2] = spectator.queryAll(
        '.simpler-tab-button'
      );

      expect(tabButton1).toHaveText('tab1 label');
      expect(tabButton2).toHaveText('tab2 label');
    });

    it('should call selectTab on click', () => {
      jest.spyOn(component, 'selectTab');

      const tab2 = spectator.queryAll(TabComponent)[1];
      const tabButton2 = spectator.queryAll('.simpler-tab-button')[1];

      tabButton2.dispatchEvent(new Event('click'));

      expect(component.selectTab).toBeCalledTimes(1);
      expect(component.selectTab).toBeCalledWith(tab2.value);
    });

    it('should add a css class simpler-tab-button-selected', () => {
      component.value = 'tab2';
      spectator.detectChanges();

      const [tabButton1, tabButton2] = spectator.queryAll(
        '.simpler-tab-button'
      );

      expect(tabButton1).not.toHaveClass('simpler-tab-button-selected');
      expect(tabButton2).toHaveClass('simpler-tab-button-selected');
    });
  });

  describe('selected indicator', () => {
    it('should be hidden when no tab is selected', () => {
      component.selectedTab = undefined;
      spectator.detectChanges();

      const selectedIndicator = spectator.query(
        '.simpler-tab-selected-indicator'
      );

      expect(selectedIndicator).toHaveAttribute('hidden');
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call initExclusiveTabSelect', () => {
      jest.spyOn(component as any, 'initExclusiveTabSelect');

      component.ngAfterViewInit();

      expect(component['initExclusiveTabSelect']).toBeCalledTimes(1);
    });
  });

  describe('ngAfterContentInit', () => {
    it('should call initSelectedTab', () => {
      jest.spyOn(component as any, 'initSelectedTab');

      component.ngAfterContentInit();

      expect(component['initSelectedTab']).toBeCalledTimes(1);
    });
  });

  describe('ngOnChanges', () => {
    it('should call selectTab with current value if value has changed', () => {
      jest.spyOn(component, 'selectTab');

      spectator.setInput({ value: 'tab group value' });
      spectator.detectChanges();

      expect(component.selectTab).toBeCalledTimes(1);
      expect(component.selectTab).toBeCalledWith('tab group value');
    });
  });

  describe('selectTab', () => {
    it('shoud call selectTab (TabComponent) with passed value', () => {
      const tab2 = spectator.queryAll(TabComponent)[1];

      jest.spyOn(tab2, 'selectTab');

      const result = component.selectTab('tab2');

      expect(tab2?.selectTab).toBeCalledTimes(1);
      expect(result?.value).toBe('tab2');
    });
  });

  describe('indexOfTab', () => {
    it('should return index of tab with passed value', () => {
      const result1 = component.indexOfTab('tab1');

      expect(result1).toBe(0);

      const result2 = component.indexOfTab('tab2');

      expect(result2).toBe(1);
    });
  });

  describe('findTab', () => {
    it('should return tab with passed value', () => {
      const result1 = component.findTab('tab1');

      expect(result1?.value).toBe('tab1');

      const result2 = component.findTab('tab2');

      expect(result2?.value).toBe('tab2');
    });
  });

  describe('initSelectedTab', () => {
    it('should set selectedTab', () => {
      component.value = '';
      component['initSelectedTab']();

      expect(component.selectedTab).toBeUndefined();

      component.value = 'tab1';
      component['initSelectedTab']();

      expect(component.selectedTab?.value).toBe('tab1');
      expect(component.selectedTab?.selected).toBeTruthy();
    });

    it('should set selectedTabIndex', () => {
      component.value = '';
      component['initSelectedTab']();

      expect(component.selectedTabIndex).toBe(-1);

      component.value = 'tab1';
      component['initSelectedTab']();

      expect(component.selectedTabIndex).toBe(0);
    });
  });

  describe('initExclusiveTabSelect', () => {
    let tab: TabComponent;
    let selectEvent: TabSelect;

    beforeEach(() => {
      jest.spyOn(component.select, 'emit');
      jest.spyOn(component as any, 'unselectOtherTabs');

      component['initExclusiveTabSelect']();

      tab = spectator.queryAll(TabComponent)[1];

      selectEvent = new TabSelect();
      selectEvent.source = tab;
      selectEvent.selected = true;

      tab?.select.emit(selectEvent);
    });

    it('should set value when tab is selected', () => {
      expect(component.value).toBe(tab.value);
    });

    it('should set selectedTab when tab is selected', () => {
      expect(component.selectedTab?.value).toBe(tab.value);
    });

    it('should set selectedTabIndex when tab is selected', () => {
      expect(component.selectedTabIndex).toBe(1);
    });

    it('should emit select event when tab is selected', () => {
      expect(component.select.emit).toBeCalledTimes(2);
      expect(component.select.emit).toBeCalledWith(selectEvent);
    });

    it('should call unselectOtherTabs when tab is selected', () => {
      expect(component['unselectOtherTabs']).toBeCalledTimes(2);
      expect(component['unselectOtherTabs']).toBeCalledWith(tab.value);
    });
  });

  describe('unselectOtherTabs', () => {
    it('should unselect each tab not having the passed value', () => {
      const [tab1, tab2, tab3] = spectator.queryAll(TabComponent);

      tab1.selected = true;

      component['unselectOtherTabs']('tab1');

      expect(tab2.selected).toBeFalsy();
      expect(tab3.selected).toBeFalsy();
    });
  });
});
