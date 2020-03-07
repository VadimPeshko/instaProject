// eslint-disable-next-line import/prefer-default-export
export class ErrorPage {
  constructor(router) {
    this.router = router;
  }

  render404() {
    this.page = document.querySelector('.error');
    this.page.style.display = 'block';
    window.history.pushState(null, null, '/404');
    this.router.render(decodeURI(location.pathname));
  }

  renderErrorPage() {
    const error = document.querySelector('.page-wrap');
    error.innerHTML = `<div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 text-center">
        <span class="display-1 d-block">404</span>
        <div class="mb-4 lead">The page you are looking for was not found.</div>
        <a href="/" class="btn btn-link">Back to Home</a>
      </div>
    </div>
  </div>`;
  }
}
