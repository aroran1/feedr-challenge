import { observable, action, computed, toJS } from 'mobx';
import { MenuItemDataModel } from 'models/menu';


export default class PreviewStore {
  @observable selectedItems: MenuItemDataModel[] = [];
  @observable dietaryRecordMap = new Map();
  @observable dietaryRecord = [];

  @computed
  public get selectedItemsCount(): number {
    return this.selectedItems.length;
  }

  @action
  public addItem(item: MenuItemDataModel) {
    let index = -1;

    this.selectedItems.forEach((a, i) => {
      if(this.selectedItems[i].id === item.id) {
        index = i;
      }
    });
  
    if(index > -1) {
      this.selectedItems[index] = item;
    } else {
      this.selectedItems.push(item)
      this.updateDietaryRecord(item.dietaries, 'add');
    }
  }

  @action removeItem(item: MenuItemDataModel) {
    this.selectedItems = this.selectedItems.filter(a => a.id !== item.id);
    this.updateDietaryRecord(item.dietaries, 'remove');
  }

  @action
  public updateDietaryRecord(dietaries, action: string) {
    dietaries.forEach(item => {
      if(this.dietaryRecordMap.has(item)){
        let count = this.dietaryRecordMap.get(item);
        count = action === 'add' ? count+1 : count-1;
        this.dietaryRecordMap.set(item, count);
      } else {
        this.dietaryRecordMap.set(item, 1)
      }
    })

    this.dietaryRecord = toJS(Array.from(this.dietaryRecordMap));
  }
}