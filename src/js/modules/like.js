// eslint-disable-next-line import/prefer-default-export
export class Like {
  constructor() {
    this.likeList = this.getLikeFromLocalStorage();
  }

  toggleLike(id, elem) {
    if (this.likeList.includes(id)) {
      this.likeList.splice(this.likeList.indexOf(id), 1);
      elem.classList.remove('heart-red');
    } else {
      this.likeList.push(id);
      elem.classList.add('heart-red');
    }
    localStorage.setItem('like', JSON.stringify(this.likeList));
  }

  isLike() {
    const { target } = event;
    if (target.classList.contains('posts-like')) {
      this.toggleLike(target.dataset.index, target);
    }
  }

  addLike() {
    this.postsWrapper = document.querySelectorAll('.posts-wrapper');
    this.postsWrapper.forEach((elem) => {
      elem.addEventListener('click', () => {
        this.isLike();
      });
    });
  }

  getLikeFromLocalStorage() {
    return JSON.parse(localStorage.getItem('like') || '[]');
  }
}
