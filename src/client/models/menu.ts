export interface MenuDataModal {
  items: MenuItemDataModel[]
}

export interface MenuItemDataModel {
  id: number,
  name: string,
  dietaries: string[],
}