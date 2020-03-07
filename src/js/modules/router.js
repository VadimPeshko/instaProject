// eslint-disable-next-line import/prefer-default-export
export class Router {
  constructor() {
    this.routes = {
      404: () => {
        console.log('Not Found');
      },
    };
    this.mainContentPages = document.querySelectorAll('.main .page');
    console.log(this.mainContentPages);
    window.addEventListener('popstate', () => {
      this.render(decodeURI(window.location.pathname));
    });
  }

  addRouter(router, action) {
    this.routes[router] = action;
  }

  isAuth() {
    return sessionStorage.getItem('login');
  }

  render(url) {
    [...this.mainContentPages].forEach((page) => {
      page.style.display = 'none';
    });
    if (this.isAuth()) {
      console.log(url);
      let temp = url.split('/')[1];

      if (temp === 'login') {
        temp = '';
        history.pushState(null, null, '/');
      }
      this.routes[temp] ? this.routes[temp]() : this.routes['404']();
    } else {
      history.pushState(null, null, '/login');
      // eslint-disable-next-line dot-notation
      this.routes['login']();
    }
  }
}
