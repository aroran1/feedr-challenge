import { observable, action, runInAction, toJS } from 'mobx';
import { MenuItemDataModel } from 'models/menu';

export default class MenuStore {
  constructor(private menuService){
    this.menuService = menuService;
  }

  @observable isLoaded: boolean = false;
  @observable menuItems: MenuItemDataModel[] = [];

  @action
  public async getMenuItems():Promise<any> {
    await this.menuService.fetchItems()
    .then(data => {
      runInAction(() => {
        this.isLoaded = true;
        this.menuItems = toJS(data.items);
        return Promise.resolve(data);
      })
    })
    .catch(error => {
      runInAction(() => {
        console.log(error);
        this.isLoaded = false;
        return Promise.reject(error);
      })
    });
  }
}