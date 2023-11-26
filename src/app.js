import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const getRepeatCount = (count) => {
    const lastDigit = count % 10;
    const twoLastDigits = count % 100;
    if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(twoLastDigits)) {
      return `| Выделяли ${count} раза`;
    }
    return `| Выделяли ${count} раз`; 
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>{item.title}{item.count ? getRepeatCount(item.count) : ''}</div>
                <div className='Item-actions'>
                  <button onClick={(evt) => store.deleteItem(item.code, evt)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
