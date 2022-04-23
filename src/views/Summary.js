import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Podsumowanie");
  }

  async getHtml() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const items = cart.map((item) => this.createItem(item));
    const section = document.createElement("section");
    section.innerHTML = `
    <h3>Podsumowanie</h3>`;
    const articles = document.createElement("articles");
    section.append(articles);
    articles.append(...items);
    articles.classList.add("row");
    return section.innerHTML;
  }

  createItem(item) {
    const { id, name, price, type, amount, dataOd, dataDo } = item;
    const article = document.createElement("article");
    article.style.margin = "8.5 rem";
    article.style.padding = "5 rem";
    article.classList.add("col-sm-12", "col-md-6", "col-lg-6", "mb-4");
    if (type === "room") {
      article.innerHTML = `
        <div class="card">
          <div class="card-body"> 
            <h5 class="card-title text-center">${name}</h5>
            <div class="card-text row">
                <h5 class="col-6 d-flex align-items-center justify-content-center">${amount}x</h5>
                <h5 class="col-6 d-flex align-items-center justify-content-center">${price} zł</h5>
                <h4 class="col-12 d-flex align-items-center justify-content-center">Data pobytu</h4>
                <h5 class="col-12 d-flex align-items-center justify-content-center">${dataOd} - ${dataDo}</h5>
            </div>
          </div>
        </div>
        `;
    } else {
      article.innerHTML = `
        <div class="card">
          <div class="card-body"> 
            <h5 class="card-title text-center">${name}</h5>
            <div class="card-text row">
                <h5 class="col-6 d-flex align-items-center justify-content-center">${amount}x</h5>
                <h5 class="col-6 d-flex align-items-center justify-content-center">${price} zł</h5>
            </div>
          </div>
        </div>
        `;
    }
    return article;
  }
}
