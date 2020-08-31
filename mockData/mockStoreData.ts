
export const mockMenuStore = {
  isLoaded: true,
  menuItems: [
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
  ],
  menuService: {
    fetchItems: jest.fn()
  },
  getMenuItems: jest.fn()
};

export const mockPreviewStore = {
  dietaryRecord: [],
  dietaryRecordMap: new Map(),
  selectedItems: [],
  selectedItemsCount: 0,
  addItem: jest.fn(),
  updateDietaryRecord: jest.fn(),
  removeItem: jest.fn()
};