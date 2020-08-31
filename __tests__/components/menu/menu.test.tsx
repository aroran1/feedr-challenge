import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Menu from '../../../src/client/components/menu/Menu';
import { MenuItem } from '../../../src/client/components/common/menuItem';
import {mockMenuStore, mockPreviewStore} from '../../../mockData/mockStoreData';

Enzyme.configure({ adapter: new Adapter() });

const mockProps = {
  menuList: [
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
    }
  ],
  menuStore: mockMenuStore,
  previewStore: mockPreviewStore
};

const event = {
  preventDefault: jest.fn()
};

describe('Menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the component', () => {
    const wrapper = shallow(<Menu {...mockProps} />).dive();
    expect(wrapper.find('.form-control')).toHaveLength(1);
    expect(wrapper.find('.item-picker')).toHaveLength(1);
    expect(wrapper.find(MenuItem)).toHaveLength(3);
  });

  it('should NOT show any preview items if no list props is passed', () => {
    delete mockProps.menuList;
    const wrapper = shallow(<Menu {...mockProps} />).dive();
    expect(wrapper.find('.item-picker')).toHaveLength(0);
    expect(wrapper.find(MenuItem)).toHaveLength(0);
  });
  
  describe('handleItemClick', () => {
    it('should trigger addItem method on PreviewStore', () => {
      const item = {
        id: 10010,
        name: 'Pasta Salad Box',
        dietaries: ['ve', 'v', 'gf', 'df'],
      };
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = shallow(<Menu {...mockProps} />);
      const spyAddItem = jest.spyOn(mockProps.previewStore, 'addItem');
      wrapper.dive().instance().handleItemClick(event, item);
      expect(spyAddItem).toHaveBeenCalledTimes(1);
      expect(spyAddItem).toHaveBeenCalledWith(item);
    });
  });

  describe('handleInputChange', () => {
    it('should update state', () => {
      const wrapper = shallow(<Menu {...mockProps} />).dive();
      const input = wrapper.find('.form-control');
      const instance = wrapper.instance();
      expect(instance.state.value).toBe('');
      input.simulate('change', { target: { value: 'Knock, knock' } });
      expect(instance.state.value).toBe('Knock, knock');
      // expect(wrapper.instance().handleFilterList).toHaveBeenCalledTimes(1);
    });
  });
  // TODO
  // describe('handleFilterList', () => {});
});