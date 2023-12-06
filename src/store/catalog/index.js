import {ITEMS_PER_PAGE, codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      currentItem: null,
      pageCount: 0
    }
  }

  async load() {
    const response = await fetch(`/api/v1/articles?limit=${ITEMS_PER_PAGE}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pageCount: Math.ceil(json.result.count / ITEMS_PER_PAGE)
    }, 'Загружены товары из АПИ');
  }

  async loadItemsPack() {
    const response = await fetch(`/api/v1/articles?limit=${ITEMS_PER_PAGE}&skip=${(this.getState().currentPage - 1) * ITEMS_PER_PAGE}&fields=items(_id, title, price)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async loadItemById(id) {
    const response = await fetch(`api/v1/articles/${id}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentItem: json.result
    }, 'Загружены товары из АПИ');
  }

  resetCurrentItem() {
    this.setState({
      ...this.getState(),
      currentItem: null
    }, 'Загружены товары из АПИ');
  }

  setCurrentPage(pageNumber) {
    this.setState({
      ...this.getState(),
      currentPage: pageNumber
    })
  }
}

export default Catalog;
