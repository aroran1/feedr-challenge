import MenuService from '../services/MenuService';
import MenuStore from './MenuStore';
import PreviewStore from './PreviewStore';

const menuService = new MenuService();
const menuStore = new MenuStore(menuService);
const previewStore = new PreviewStore();

const RootStore = {
  menuStore,
  previewStore
}

export default RootStore;