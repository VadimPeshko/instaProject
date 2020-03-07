import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/styles.css';
import '../assets/styles/styles.scss';
import '../assets/img/heart.svg';
import '../assets/img/heart-red.svg';
import '../assets/img/garbage.svg';
import { PageRender } from './modules/pageRender';
import { Router } from './modules/router';
import { Like } from './modules/like';
import { PageProfile } from './modules/pageProfile';
import { PageForm } from './modules/pageForm';
import { RemovePhoto } from './modules/removePhoto';
import { AuthServices } from './modules/auth';
import { ErrorPage } from './modules/errorPage';

class App {
  constructor() {
    this.router = new Router();
    this.like = new Like();
    this.errorPage = new ErrorPage(this.router);
    this.authServices = new AuthServices(this.router);
    this.pageRender = new PageRender(this.router, this.like);
    this.pageForm = new PageForm(this.router);
    this.pageProfile = new PageProfile(this.router, this.errorPage);
    this.removePhoto = new RemovePhoto();
    this.getUser();
    this.getPosts();
    this.getImages();
    this.getForm();
    this.posts = [];
    this.imge = [];
  }

  // eslint-disable-next-line class-methods-use-this
  async getResourse(url) {
    
    this.spinner = document.getElementById('spinner');
    this.spinner.removeAttribute('hidden');

    const resp = await fetch(`http://localhost:3006/${url}`, {
      headers: {
        'Content-Type': 'Application/json',
      },
    });

    if (!resp.ok) {
      throw new Error(`Could not fetch ${url}; recevied ${resp.status}`);
    }

    if (resp.ok) {
      this.spinner.setAttribute('hidden', '');
    }

    // eslint-disable-next-line no-return-await
    return await resp.json();
  }

  async getUser() {
    const res = await this.getResourse('users');
    this.authServices.init(res);
  }

  async getPosts() {
    const res = await this.getResourse('posts');
    const images = await this.getResourse('images');
    this.pageRender.renderAllPosts(res);
    this.pageRender.renderProfilePosts(images);
    this.like.addLike();
    this.posts = res;
    this.initRouter();
    this.router.render(decodeURI(location.pathname));
  }

  async getImages() {
    const img = await this.getResourse('images');
    this.pageProfile.renderAllImg(img);
    this.imge = img;
    this.pageProfile.initSinglePage();
    this.removePhoto.deletePhoto();
    this.initRouter();
    this.router.render(decodeURI(location.pathname));
  }

  getForm() {
    this.pageForm.renderForm();
    this.pageForm.addImage();
    this.initRouter();
    this.router.render(decodeURI(location.pathname));
  }

  initRouter() {
    this.router.addRouter('login', this.authServices.renderAuthPage);
    this.router.addRouter('', this.pageRender.renderHomePage.bind(this.pageRender, this.posts, this.imge));
    this.router.addRouter('profile', this.pageProfile.renderProfilePage);
    this.router.addRouter('photo', this.pageProfile.renderSinglePage.bind(this.pageProfile, this.imge));
    this.router.addRouter('404', this.errorPage.renderErrorPage.bind(this.PageProfile));
    this.router.addRouter('add-photo', this.pageForm.initPageFormLocation);
  }
}

const app = new App();
