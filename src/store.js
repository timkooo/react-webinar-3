/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.lastItem = this.getLastItem(this.state.list);
    this.listeners = []; // Слушатели изменений состояния
  }

  getLastItem(list) {
    const sortedList = [...list].sort((itemA, itemB) => {
      if (itemA.code < itemB.code) {
        return -1;
      }
      if (itemA.code > itemB.code) {
        return 1;
      }
      return 0;
    });
    return sortedList[sortedList.length - 1].code;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.state.lastItem + 1, title: 'Новая запись'}],
      lastItem: this.state.lastItem + 1
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, evt) {
    evt.stopPropagation();
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const currentItem = this.state.list.find(item => item.code === code);
    currentItem.selected = !currentItem.selected;
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = currentItem.selected;
          if (item.selected) {
            item.count ? item.count += 1 : item.count = 1;
          }
        };
        if (item.code !== code && currentItem.selected) {
          item.selected = !currentItem.selected;
        }
        return item;
      })
    })
  }
}

export default Store;
