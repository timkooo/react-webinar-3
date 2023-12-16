import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      user: {},
      authStatus: false,
      error: null,
      waiting: true,
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
        error: null,
        waiting: false,
      }, 'Пользователь авторизован'),
      localStorage.setItem('x-token', json.result.token);
      localStorage.setItem('user-id', json.result.user._id);
    };
    if (json.error) {
      this.setState({
        ...this.getState(),
        user: {},
        authStatus: false,
        error: `В процессе авторизации возникла ошибка: ${json.error.message}`,
        waiting: false
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
        error: null,
        waiting: false
      }, 'Пользователь вышел')
    };
    if (json.error) {
      this.setState({
        ...this.getState(),
        user: {},
        authStatus: false,
        error: `В процессе авторизации возникла ошибка: ${json.error.message}`,
        waiting: false
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
    console.log('222222222222');
    if (!token || !userId) {
      this.setState({
        ...this.getState(),
        authStatus: false,
        waiting: false
      }, 'Требуется повторная авторизация');
    };
    if (token && userId) {
      console.log('111111111111');
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
          error: null,
          waiting: false
        }, 'Пользователь авторизован'),
        localStorage.setItem('x-token', token);
        localStorage.setItem('user-id', json.result._id);
      };
      if (json.error) {
        this.setState({
          ...this.getState(),
          user: {},
          authStatus: false,
          error: `В процессе авторизации возникла ошибка: ${json.error.message}`,
          waiting: false
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