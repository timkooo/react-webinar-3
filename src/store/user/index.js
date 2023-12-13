import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      user: {},
      authStatus: false,
      error: null
    };
  }

  async login(loginData) {

    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    const json = await response.json();
    if (json.result) {
      this.setState({
        ...this.getState(),
        user: json.result.user,
        authStatus: true,
        error: null
      }, 'Пользователь авторизован'),
      localStorage.setItem('x-token', json.result.token);
      localStorage.setItem('user-id', json.result.user._id);
    };
    if (json.error) {
      this.setState({
        ...this.getState(),
        user: {},
        authStatus: false,
        error: `В процессе авторизации возникла ошибка: ${json.error.message}`
      }, 'Ошибка авторизации'),
      localStorage.removeItem('x-token');
      localStorage.removeItem('user-id');
      setTimeout(() => this.setState({
        ...this.getState(),
        error: null
      }), 6000)
    }
  }

  async logout() {
    const token = localStorage.getItem('x-token');
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token' : token,
      }
    });
    localStorage.removeItem('x-token');
    localStorage.removeItem('user-id');
    const json = await response.json();
    if (json.result) {
      this.setState({
        ...this.getState(),
        user: {},
        authStatus: false,
        error: null
      }, 'Пользователь вышел')
    };
    if (json.error) {
      this.setState({
        ...this.getState(),
        user: {},
        authStatus: false,
        error: `В процессе авторизации возникла ошибка: ${json.error.message}`
      }, 'Ошибка авторизации'),
      setTimeout(() => this.setState({
        ...this.getState(),
        error: null
      }), 6000)
    }
  }

  async checkAuth() {
    const token = localStorage.getItem('x-token');
    const userId = localStorage.getItem('user-id');
    if (!token || !userId) {
      this.setState({
        ...this.getState(),
        authStatus: false,
        error: 'Вы не авторизованы, введите логин и пароль'
      }, 'Требуется повторная авторизация');
      setTimeout(() => this.setState({
        ...this.getState(),
        error: null
      }), 6000)
    };
    if (token && userId) {
      const response = await fetch(`/api/v1/users/${userId}`, {
          headers: {
            'X-Token' : token,
          },
        });
      const json = await response.json();
      if (json.result) {
        this.setState({
          ...this.getState(),
          user: json.result,
          authStatus: true,
          error: null
        }, 'Пользователь авторизован'),
        localStorage.setItem('x-token', token);
        localStorage.setItem('user-id', json.result._id);
      };
      if (json.error) {
        this.setState({
          ...this.getState(),
          user: {},
          authStatus: false,
          error: `В процессе авторизации возникла ошибка: ${json.error.message}`
        }, 'Ошибка авторизации'),
        localStorage.removeItem('x-token');
        localStorage.removeItem('user-id');
        setTimeout(() => this.setState({
          ...this.getState(),
          error: null
        }), 6000)
      }
    }
  }
}

export default UserState;