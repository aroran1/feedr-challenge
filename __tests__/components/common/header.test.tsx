import React from 'react';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../../src/client/components/common/header'

Enzyme.configure({ adapter: new Adapter() });

const mockProps = {
  selectedItemsCount: 3,
  dietaryRecord: [
    ["v", 1],
    ["ve", 2]
  ]
};

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the component', () => {
    const wrapper = shallow(<Header {...mockProps} />);
    expect(wrapper.find('.menu-summary')).toHaveLength(1);
  });
  
  describe('selectedItemsCount prop', () => {
    it('should show selectedItemsCount', () => {
      const wrapper = shallow(<Header {...mockProps} />);
      expect(wrapper.find('.selected-items-count')).toHaveLength(1);
    });
  });

  describe('dietaryRecord prop', () => {
    it('should NOT show if no dietaryRecord props is passed', () => {
      const wrapper = shallow(<Header {...mockProps.selectedItemsCount} />);
      expect(wrapper.find('.dietary-record-list')).toHaveLength(0);
    });

    it('should show dietaryRecord', () => {
      const wrapper = shallow(<Header {...mockProps} />);
      expect(wrapper.find('.dietary-record-list')).toHaveLength(1);
      expect(wrapper.find('.dietary')).toHaveLength(2);
    });
  });
});