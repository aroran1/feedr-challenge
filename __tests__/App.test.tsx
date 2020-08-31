import React from 'react';
import Enzyme, { mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'mobx-react';
import App from '../src/client/App';
import Header from '../src/client/components/common/header';
import Menu from '../src/client/components/menu/menu';
import MenuPreview from '../src/client/components/preview/menuPreview';
import {mockMenuStore, mockPreviewStore} from '../mockData/mockStoreData';

Enzyme.configure({ adapter: new Adapter() });

describe('App tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the component', () => {
    const wrapper = mount(<Provider menuStore={mockMenuStore} previewStore={mockPreviewStore}><App /></Provider>);
    expect(wrapper.find('.wrapper')).toHaveLength(1);
    expect(wrapper.find(Header).length).toEqual(1);
    expect(wrapper.find(Menu).length).toEqual(1);
    expect(wrapper.find(MenuPreview).length).toEqual(1);
  })
})