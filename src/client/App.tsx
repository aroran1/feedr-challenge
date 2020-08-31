import React from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import MenuStore from './stores/MenuStore';
import PreviewStore from './stores/PreviewStore';

import Header from './components/common/header';
import Menu from './components/menu/menu';
import MenuPreview from './components/preview/menuPreview';
import './App.css';

interface AppProps {
  menuStore?: MenuStore;
  previewStore?: PreviewStore;
}

@inject('menuStore', 'previewStore')
@observer
export default class App extends React.Component<AppProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.menuStore.getMenuItems();
  }

  public render() {
    const { menuStore, previewStore } = this.props; 
    const { menuItems } = menuStore;
    const { selectedItems, selectedItemsCount, dietaryRecord } = previewStore;

    return (
      <div className="wrapper">
        <Header selectedItemsCount={selectedItemsCount} dietaryRecord={dietaryRecord} />
        <div className="container menu-builder">
          <div className="row">
            <div className="col-4">
              <Menu menuList={toJS(menuItems)} />
            </div>
            <div className="col-8">
              <MenuPreview list={toJS(selectedItems)} />
            </div>
          </div>
        </div>
      </div>  
    );
  }
}