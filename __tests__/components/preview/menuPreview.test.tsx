import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MenuPreview from '../../../src/client/components/preview/MenuPreview';
import { MenuItem } from '../../../src/client/components/common/menuItem';
import { mockPreviewStore } from '../../../mockData/mockStoreData';

Enzyme.configure({ adapter: new Adapter() });

const mockProps = {
  list: [
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
  ],
  previewStore: mockPreviewStore
};

const event = {
  preventDefault: jest.fn()
};

describe('MenuPreview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the component', () => {
    const wrapper = shallow(<MenuPreview {...mockProps} />).dive();
    expect(wrapper.find('.menu-preview')).toHaveLength(1);
    expect(wrapper.find(MenuItem)).toHaveLength(3);
  });

  it('should NOT show any preview items if no list props is passed', () => {
    delete mockProps.list;
    const wrapper = shallow(<MenuPreview {...mockProps} />).dive();
    expect(wrapper.find('.menu-preview')).toHaveLength(0);
    expect(wrapper.find(MenuItem)).toHaveLength(0);
  });
  
  describe('handleItemClick', () => {
    it('should trigger event.preventDefault', () => {
      const wrapper = shallow(<MenuPreview {...mockProps} />);
      wrapper.dive().instance().handleItemClick(event);
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleRemoveBtnClick', () => {
    it('should trigger removeItem on PreviewStore', () => {
      const item = {
        id: 10010,
        name: 'Pasta Salad Box',
        dietaries: ['ve', 'v', 'gf', 'df'],
      };
      const wrapper = shallow(<MenuPreview {...mockProps} />);
      const spyRemoveItem = jest.spyOn(mockProps.previewStore, 'removeItem');
      wrapper.dive().instance().handleRemoveBtnClick(item);
      expect(spyRemoveItem).toHaveBeenCalledTimes(1);
      expect(spyRemoveItem).toHaveBeenCalledWith(item);
    });
  });
});