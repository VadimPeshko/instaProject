// eslint-disable-next-line import/prefer-default-export
export class AuthServices {
  constructor(router) {
    this.btn = document.querySelector('.signin');
    // this.init();
    this.router = router;
    this.user = [];
  }

  init(users) {
    const userName = document.querySelector('#name');
    const userPass = document.querySelector('#pass');
    this.user = users;

    this.btn.addEventListener('click', (event) => {
      event.preventDefault();
      if (userName.value && userPass.value) {
        this.user = this.user.filter((item) => item.login === userName.value && item.pass === userPass.value);
        if (this.user.length === 1) {
          sessionStorage.setItem('login', true);
          history.pushState(null, null, '/');
          this.router.render(decodeURI(location.pathname));
        } else {
          this.renderMsg('Проверьте логин или пароль!');
        }
      } else {
        this.renderMsg('Заполните поля');
      }
    });
  }

  renderMsg(name) {
    const msg = document.querySelector('.msg');
    msg.innerText = name;
  }

  renderAuthPage() {
    const reg = document.querySelector('.register');
    reg.style.display = 'block';
  }
}
