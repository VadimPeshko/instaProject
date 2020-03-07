// eslint-disable-next-line import/prefer-default-export
export class RemovePhoto {
  constructor() {
    this.Api = 'http://localhost:3006/';
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteResourse(id) {
    const resp = await fetch(`${this.Api}images/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      },
    });

    if (!resp.ok) {
      throw new Error(`Could not fetch ${url}; recevied ${resp.status}`);
    }

    return await resp.json();
  }

  async removePhoto(elemId) {
    await this.deleteResourse(elemId);
  }

  deletePhoto() {
    const remove = document.querySelectorAll('.remove-btn');
    remove.forEach((element) => {
      element.addEventListener('click', () => {
        this.removePhoto(element.dataset.index);
      });
    });
  }
}
