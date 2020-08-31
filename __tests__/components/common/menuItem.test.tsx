import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MenuItem } from '../../../src/client/components/common/menuItem';

Enzyme.configure({ adapter: new Adapter() });

const mockProps = {
  item: {
      id: 10010,
      name: 'Pasta Salad Box',
      dietaries: ['ve', 'v', 'gf', 'df'],
  },
  showRemoveAction: false,
  itemClickItemHandler: jest.fn(),
  removeBtnClickHandler: jest.fn()
};

const event = {
  preventDefault: jest.fn()
};

describe('MenuItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the component', () => {
    const wrapper = shallow(<MenuItem {...mockProps} />);
    expect(wrapper.find('.item')).toHaveLength(1);
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('.dietary')).toHaveLength(4);
  });

  it('should NOT show if no dietaries props is passed', () => {
    delete mockProps.item.dietaries;
    const wrapper = shallow(<MenuItem {...mockProps} showRemoveAction={true}  />);
    expect(wrapper.find('.dietary-list')).toHaveLength(0);
  });
  
  describe('Sidebar', () => {
    it('should not show remove button', () => {
      const wrapper = shallow(<MenuItem {...mockProps} />);
      expect(wrapper.find('.remove-item')).toHaveLength(0);
    });

    it('should trigger itemClickItemHandler', () => {
      const wrapper = shallow(<MenuItem {...mockProps} />);
      wrapper.simulate('click');
      expect(mockProps.itemClickItemHandler).toHaveBeenCalledTimes(1);
      // expect(mockProps.itemClickItemHandler).toHaveBeenCalledWith(event, mockProps.item);
    });
  });

  describe('Menu Preview', () => {
    it('should show remove button', () => {
      const wrapper = shallow(<MenuItem {...mockProps} showRemoveAction={true} />);
      expect(wrapper.find('.remove-item')).toHaveLength(1);
    });

    it('should trigger itemClickItemHandler', () => {
      const wrapper = shallow(<MenuItem {...mockProps} />);
      wrapper.simulate('click');
      expect(mockProps.itemClickItemHandler).toHaveBeenCalledTimes(1);
    });

    it('should trigger removeBtnClickHandler', () => {
      const wrapper = shallow(<MenuItem {...mockProps} showRemoveAction={true}  />);
      const removeButton = wrapper.find('.remove-item');
      removeButton.simulate('click');
      expect(mockProps.removeBtnClickHandler).toHaveBeenCalledTimes(1);
      expect(mockProps.removeBtnClickHandler).toHaveBeenCalledWith(mockProps.item);
    });
  });
});