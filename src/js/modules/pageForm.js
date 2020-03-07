// eslint-disable-next-line import/prefer-default-export
export class PageForm {
  constructor(router) {
    this.router = router;
    this.message = {
      add: 'Фото добавлено',
      error: 'Что-то пошло не так',
    };
  }

  initPageFormLocation() {
    this.modalWindow = document.querySelector('.modal-window');
    this.modalWindow.style.display = 'block';
  }

  // eslint-disable-next-line class-methods-use-this
  renderForm() {
    const main = document.querySelector('.modal-contant');
    main.innerHTML = `<div class="modal-top">
    <h3>Добавить фото</h3>
    </div>
    <div class="modal-main"></div>
    <div class="modal-form">
      <form enctype="multipart/form-data" id="image-form">
        <label for="comment">Добавьте комментарий</label>
        <input type="text" class="comm" id="comment">
        <label for="file">Выбирите фото</label>
        <input type="file" class="inputfile" name="image-file" id="file">
        <button type="submit" class="file-btn">Добавить</button>
        <div class="modal-message"></div>
      </form>
    </div>`;
  }

  // eslint-disable-next-line class-methods-use-this

  addImage() {
    const form = document.forms[0];
    const img = document.querySelector('.inputfile');
    const comment = document.querySelector('.comm');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const file = new FileReader();
      const selectedFile = img.files[0];

      file.onload = () => {
        this.saveImgage(file.result, comment.value);
      };

      file.readAsDataURL(selectedFile);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  saveImgage(image, comment) {
    fetch('http://localhost:3006/images/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ src: image, comm: comment }),
    })
      .then((data) => {
        console.log(data);
        document.querySelector('.modal-message').textContent = this.message.add;
      })
      .catch(() => document.querySelector('.modal-message').textContent = this.message.error);
  }
}
