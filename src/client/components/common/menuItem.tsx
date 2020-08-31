import React from 'react';
import { MenuItemDataModel } from 'models/menu';

interface MenuItemProps {
  item: MenuItemDataModel;
  showRemoveAction?: boolean;
  itemClickItemHandler: (e, data) => void;
  removeBtnClickHandler?: (data) => void;
}

export const MenuItem: React.FC<MenuItemProps> = (
  {
    item,
    showRemoveAction = false,
    itemClickItemHandler,
    removeBtnClickHandler
  }) => {
  const { dietaries } = item;

  return (
    <li className="item" onClick={e => itemClickItemHandler(e, item)}>
      <h2>{item.name}</h2>
      {dietaries && dietaries.length > 0 && (
        <ul className="dietary-list">
          {
            dietaries.map((item, index) => {
              return (
              <li key={index}><span className="dietary">{item}</span></li>
              );
            })
          }
        </ul>
      )}
      {showRemoveAction && (
        <button className="remove-item" onClick={e => removeBtnClickHandler(item)}>x</button>
      )}
    </li>
  );
};