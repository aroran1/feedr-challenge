import { MenuDataModal } from 'models/menu';

export default class MenuService {
  public async fetchItems(method: string = 'GET'):Promise<MenuDataModal> {
    const url = '/api/items';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    let response = await fetch('/api/items', {method, headers});
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    
    throw new Error(`ERROR: Fetching ${url} data failed with ${response.status} error code.`);
  }
}

