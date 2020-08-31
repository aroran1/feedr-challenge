import 'babel-polyfill';
import MenuStore from "../../src/client/stores/MenuStore";
import MenuService from '../../src/client/services/MenuService';

const menuService = new MenuService;

describe("MenuStore", () => {
  describe("getMenuItems", () => {
    it("fetch successfully", () => {
      const items = [{
        id: 10010,
        name: 'Pasta Salad Box',
        dietaries: ['ve', 'v', 'gf', 'df']
      }];
      menuService.fetchItems = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(items),
        })
      );
      const menuStore = new MenuStore(menuService);
      menuStore.getMenuItems().then(data => {
        expect(menuStore.menuItems.length).toEqual(1);
        expect(menuStore.menuItems).toEqual(items);
        expect(menuStore.isLoaded).toEqual(true);
      });
    });

    it("fetche failed", () => {
      menuService.fetchItems = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.reject('Random failure'),
        })
      );
      const menuStore = new MenuStore(menuService);
      menuStore.getMenuItems().then(() => {
        expect(menuStore.menuItems.length).toEqual(0);
        expect(menuStore.menuItems).toEqual([]);
        expect(menuStore.isLoaded).toEqual(false);
      });
    });
  });
});