import React from 'react';

interface HeaderProps {
  selectedItemsCount: number;
  dietaryRecord: any[];
}

const Header: React.FC<HeaderProps> = ({selectedItemsCount, dietaryRecord}: HeaderProps) => {
  return (
    <header>
      <div className="menu-summary">
        <div className="container">
          <div className="row">
            <div className="col-6 menu-summary-left">
              <span className="selected-items-count">{selectedItemsCount} items</span>
            </div>
            <div className="col-6 menu-summary-right">
              {dietaryRecord && dietaryRecord.length > 0 && (
                <ul className="dietary-record-list">
                  {
                    dietaryRecord.map((item) => {
                      return (<li key={`${item[0]}-${item[1]}`}>{item[1]}x <span className="dietary">{item[0]}</span></li>);
                    })
                  }
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;