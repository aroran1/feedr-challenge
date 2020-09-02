import React from 'react';
import { inject, observer } from 'mobx-react';
import { MenuItemDataModel } from 'models/menu';
import MenuStore from '../../stores/MenuStore';
import PreviewStore from '../../stores/PreviewStore';
import { MenuItem } from '../common/menuItem';

interface MenuProps {
  menuList: MenuItemDataModel[];
  menuStore?: MenuStore;
  previewStore?: PreviewStore;
}

interface MenuState {
  value: string;
  list: MenuItemDataModel[];
}

@inject('menuStore', 'previewStore')
@observer
export default class Menu extends React.Component<MenuProps, MenuState> {
  private inputUpdate = null;
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFilterList = this.handleFilterList.bind(this);

    this.state = {
      value: '',
      list: this.props.menuList
    };
  }

  public componentDidUpdate(prevProps) {
    if (this.props.menuList !== prevProps.menuList) {
      this.setState({
        list: this.props.menuList
      })
    }
  }

  public componentWillUnmount() {
    clearTimeout(this.inputUpdate);
  }

  public handleInputChange(e){
    this.setState({
      value: e.target.value
    })

    this.inputUpdate = setTimeout(() => {
      this.handleFilterList();
    }, 500);
  }

  public handleFilterList() {
    const { value } = this.state;
    const { menuList } = this.props;
    this.setState({
      list: value === '' ? menuList : menuList.filter(item => item.name.toLowerCase().includes((value).toLowerCase()))
    });
  }

  public handleItemClick(e, item) {
    e.preventDefault();
    const { previewStore } = this.props; 
    previewStore.addItem(item);
  }

  public render() {
    const { list } = this.state;

    return (
      <>
        <div className="filters">
          <input className="form-control" placeholder="Name" onChange={this.handleInputChange} />
        </div>
        {list && list.length > 0 && (
          <ul className="item-picker">
            {
              list.map(item => {
                return (<MenuItem key={item.id} item={item} itemClickItemHandler={this.handleItemClick} />);
              })
            }
          </ul>
        )}
      </>
    );
  }
};