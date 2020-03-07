// eslint-disable-next-line import/prefer-default-export
export class PageRender {
  constructor(router, like) {
    this.router = router;
    this.like = like;
  }

  // eslint-disable-next-line class-methods-use-this
  renderHomePage(posts, img) {
    const page = document.querySelector('.posts');
    const allPosts = document.querySelectorAll('.posts-wrapper');

    [...allPosts].forEach((element) => {
      element.style.display = 'none';
    });

    [...allPosts].forEach((element) => {
      posts.forEach((item) => {
        if (Number(element.dataset.id) === Number(item.id)) {
          element.style.display = 'block';
        }
      });
    });

    [...allPosts].forEach((element) => {
      img.forEach((item) => {
        if (Number(element.dataset.id) === Number(item.id)) {
          element.style.display = 'block';
        }
      });
    });
    page.style.display = 'block';
  }

  // eslint-disable-next-line class-methods-use-this
  renderAllPosts(data) {
    const post = document.querySelector('.posts');
    data.forEach((element) => {
      const div = document.createElement('div');
      div.className = 'posts-wrapper mb-5';
      div.setAttribute('data-id', element.id);
      const template = `<div class="posts-profile d-flex align-items-center">
        <div class="posts-border">
          <img
            src="${element.img.profile}"
            alt="">
        </div>
        <div class="name">${element.name}</div>
      </div>
      <div class="posts-photo">
        <img
          src="${element.img.main}"
          alt="">
      </div>
      <div class="posts-desc">${element.description}</div>
      <div class="posts-like heart ${this.like.likeList.includes(element.id) ? 'heart-red' : ''}" data-index="${element.id}">
      </div>`;
      div.innerHTML = template;
      post.append(div);
    });
  }

  renderProfilePosts(images) {
    const post = document.querySelector('.posts');
    images.forEach((item) => {
      const imge = new Image();
      imge.src = item.src;
      const div = document.createElement('div');
      div.className = 'posts-wrapper mb-5';
      div.setAttribute('data-id', item.id);
      const template = `<div class="posts-profile d-flex align-items-center">
        <div class="posts-border">
          <img src="../src/assets/img/vadimpeshko.jpg" alt="">
        </div>
        <div class="name">vadimpeshko</div>
      </div>
      <div class="posts-photo">
        <img
          src="${imge.src}"
          alt="">
      </div>
      <div class="posts-desc">${item.comm}</div>
      <div class="posts-like heart ${this.like.likeList.includes(item.id) ? 'heart-red' : ''}" data-index="${item.id}">
      </div>`;
      div.innerHTML = template;
      post.prepend(div);
    });
  }
}
