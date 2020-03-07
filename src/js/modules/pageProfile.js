// eslint-disable-next-line import/prefer-default-export
export class PageProfile {
  constructor(router, error) {
    this.router = router;
    this.error = error;
    console.log(this.error);
  }

  renderProfilePage() {
    const page = document.querySelector('.profile');
    const profileLink = document.querySelector('.profil');

    profileLink.addEventListener('click', () => {
      window.history.pushState(null, null, '/profile/');
      this.router.render(decodeURI(location.pathname));
    });
    page.style.display = 'block';
  }

  // eslint-disable-next-line class-methods-use-this
  renderAllImg(images) {
    const profileTop = document.querySelector('.profile-top');
    const profileGallery = document.querySelector('.profile-gallery');

    const div = document.createElement('div');
    div.className = 'd-flex justify-content-between align-items-center';
    const template = `
        <div class="profile-photo">
        <img src="../src/assets/img/vadimpeshko.jpg" alt="">
        </div>
        <div class="profile-name">vadimpeshko</div>
        <div class="add-photo">
          <a href="/add-photo" class="add"><img src="/src/assets/img/photo-camera.svg" alt="photo-camera"></a>
        </div>`;
    div.innerHTML = template;
    profileTop.append(div);

    if (images.length) {
      images.forEach((item) => {
        const imge = new Image();
        imge.src = item.src;
        const div = document.createElement('div');
        div.className = 'gallery-photo';
        div.innerHTML = `<div class="remove-btn" data-index="${item.id}"></div>
        <img src="${imge.src}" class="img-cut" alt="photo1" data-id="${item.id}">`;
        profileGallery.append(div);
      });
    }

    profileGallery.addEventListener('click', (event) => {
      const click = event.target;
      if (click.classList.contains('img-cut')) {
        const index = click.dataset.id;
        window.history.pushState(null, null, `/photo/${index}`);
        this.router.render(decodeURI(location.pathname));
      }
    });
  }

  renderSinglePage(images) {
    const singlePage = document.querySelector('.single-photo');
    const previewLarge = document.querySelector('.preview-large');
    const index = location.pathname.split('/photo/')[1].trim();
    let isFind = false;

    if (images.length) {
      images.forEach((item) => {
        const imge = new Image();
        imge.src = item.src;
        if (Number(item.id) === Number(index)) {
          isFind = true;
          previewLarge.querySelector('img').setAttribute('src', `${imge.src}`);
          previewLarge.querySelector('.user-comm').textContent = `${item.comm}`;
        }
      });
    }

    if (isFind) {
      console.log(isFind);
      singlePage.style.display = 'block';
    } else {
      this.error.render404.bind(this.PageProfile);
    }
  }

  initSinglePage() {
    this.singlePage = document.querySelector('.single-photo');
    this.block = this.singlePage.style.display = 'block';

    this.singlePage.addEventListener('click', (event) => {
      if (this.block) {
        const click = event.target;
        if (click.classList.contains('close-photo') || click.classList.contains('overlay')) {
          history.pushState(null, null, '/profile/');
          this.router.render(decodeURI(location.pathname));
        }
      }
    });
  }
}
