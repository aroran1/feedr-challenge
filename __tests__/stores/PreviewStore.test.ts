import PreviewStore from "../../src/client/stores/PreviewStore";

describe("PreviewStore", () => {
  describe("selectedItemsCount", () => {
    it("should return the selectedItemsCount", () => {
      const previewStore = new PreviewStore;
      previewStore.selectedItems = [
        {
          id: 10010,
          name: 'Pasta Salad Box',
          dietaries: ['ve', 'v', 'gf', 'df'],
        },
        {
          id: 10011,
          name: 'Tuna Salad Box',
          dietaries: [],
        },
        {
          id: 10012,
          name: 'Coconut Blondie with Dark Chocolate',
          dietaries: ['gf', 'v'],
        },
        {
          id: 10013,
          name: 'Cinnamon Swirl Muffin',
          dietaries: ['gf', 'df'],
        },
        {
          id: 10014,
          name: 'Apple, Date and Walnut Muffin',
          dietaries: ['df', 'gf', 'n!', 'v'],
        },
      ];
      expect(previewStore.selectedItemsCount).toEqual(5);
    });
  });

  describe("addItem", () => {
    const previewStore = new PreviewStore;
    const item1 = {
      id: 10010,
      name: 'Pasta Salad Box',
      dietaries: ['ve', 'v', 'gf', 'df']
    };
    const item2 = {
      id: 10014,
      name: 'Apple, Date and Walnut Muffin',
      dietaries: ['df', 'gf', 'n!', 'v'],
    };

    it('should add new item', () => {
      previewStore.addItem(item1);
      const spy = jest.spyOn(previewStore, 'updateDietaryRecord');
      expect(previewStore.selectedItems.length).toEqual(1);
    });

    it('should trigger updateDietaryRecord', () => {
      previewStore.addItem(item2);
      expect(previewStore.updateDietaryRecord).toHaveBeenCalledTimes(1);
      expect(previewStore.updateDietaryRecord).toHaveBeenCalledWith(item2.dietaries, 'add');
    });
  });

  describe("removeItem", () => {
    const item = {
      id: 10010,
      name: 'Pasta Salad Box',
      dietaries: ['ve', 'v', 'gf', 'df']
    };
    const previewStore = new PreviewStore;

    it('should remove new item', () => {
      previewStore.selectedItems = [item];
      previewStore.removeItem(item);
      const spy = jest.spyOn(previewStore, 'updateDietaryRecord');
      expect(previewStore.selectedItems.length).toEqual(0);
    });

    it('should trigger updateDietaryRecord', () => {
      previewStore.removeItem(item);
      expect(previewStore.updateDietaryRecord).toHaveBeenCalledTimes(1);
      expect(previewStore.updateDietaryRecord).toHaveBeenCalledWith(item.dietaries, 'remove');
    });
  });

  describe("updateDietaryRecord", () => {
    const previewStore = new PreviewStore;
    it('should add new dietary items', () => {
      const dietaries = ['ve', 'v', 'gf', 'df'];
      previewStore.updateDietaryRecord(dietaries, 'add');
      expect(previewStore.dietaryRecord).toEqual([['ve', 1], ['v', 1], ['gf', 1], ['df',1]]);
    });

    it('should increase the count for the repeated items', () => {
      const dietaries = ['v', 'gf'];
      previewStore.updateDietaryRecord(dietaries, 'add');
      expect(previewStore.dietaryRecord).toEqual([['ve', 1], ['v', 2], ['gf', 2], ['df',1]]);
    });

    it('should decrease the count for the removed items', () => {
      const dietaries = ['v', 'gf', 've'];
      previewStore.updateDietaryRecord(dietaries, 'remove');
      expect(previewStore.dietaryRecord).toEqual([['ve', 0], ['v', 1], ['gf', 1], ['df',1]]);
    });
  });
});