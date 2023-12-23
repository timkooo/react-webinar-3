import translate from './translate';

class I18n {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.lang = 'ru';
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  getLang() {
    return this.lang;
  }

  setLang() {
    return (newLang) => {
      this.lang = newLang;
      for (const listener of this.listeners) listener(this.lang);
    }
  }

  t() {
    return (text, number) => translate(this.lang, text, number);
  }
  // t() {
  //   return (text, number) => translate(this.lang, text, number);
  // }
}

export default I18n;