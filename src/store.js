import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  addItemToCart(item) {
    const itemInCart = this.state.cart.cartItems.findIndex((cartItem) => cartItem.code === item.code);
    if (itemInCart === -1) {
      this.setState({
        ...this.state,
        cart: {
          cartItems: [...this.state.cart.cartItems, {...item, quantity: 1}],
          cartSummary: {
            ...this.state.cart.cartSummary,
            amount: this.state.cart.cartSummary.amount + 1,
            totalPrice: this.state.cart.cartSummary.totalPrice + item.price
          }
        }
      });
      return;
    }
    const newCartItems = this.state.cart.cartItems.map((cartItem) => {
      if (cartItem.code === item.code) {
        return {...cartItem, quantity: cartItem.quantity + 1}
      }
      return cartItem;
    });
    this.setState({
      ...this.state,
      cart: {
        cartItems: newCartItems,
        cartSummary: {
          ...this.state.cart.cartSummary,
          totalPrice: this.state.cart.cartSummary.totalPrice + item.price
        }
      }
    });
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  deleteItemFromCart(item) {
    const currentItem = this.state.cart.cartItems.find((cartItem) => cartItem.code === item.code);
    this.setState({
      ...this.state,
      cart: {
        cartItems: this.state.cart.cartItems.filter((cartItem) => cartItem.code !== item.code),
        cartSummary: {
          ...this.state.cart.cartSummary,
          amount: this.state.cart.cartSummary.amount - 1,
          totalPrice: this.state.cart.cartSummary.totalPrice - currentItem.price * currentItem.quantity
        }
      }
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
