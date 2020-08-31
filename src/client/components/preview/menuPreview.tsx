import React from 'react';
import { inject, observer } from 'mobx-react';
import { MenuItemDataModel } from 'models/menu';
import PreviewStore from '../../stores/PreviewStore';
import { MenuItem } from '../common/menuItem';

interface MenuPreviewProps {
  list: MenuItemDataModel[];
  previewStore?: PreviewStore;
}

@inject('previewStore')
@observer
export default class MenuPreview extends React.Component<MenuPreviewProps> {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleRemoveBtnClick = this.handleRemoveBtnClick.bind(this);
  }
  
  public handleItemClick(e, item) {
    e.preventDefault();
  }

  public handleRemoveBtnClick(item) {
    const { previewStore } = this.props; 
    previewStore.removeItem(item);
  }

  public render() {
    const { list } = this.props;
    return (
      <>
        <h2>Menu Preview</h2>
        {list && list.length > 0 && (
          <ul className="menu-preview">
            {
              list.map(item => {
              return (
                <MenuItem
                  key={item.id}
                  item={item}
                  showRemoveAction={true}
                  itemClickItemHandler={this.handleItemClick}
                  removeBtnClickHandler={this.handleRemoveBtnClick}
                />);
              })
            }
          </ul>
        )}
      </>
    );
  }
};
