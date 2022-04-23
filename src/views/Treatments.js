import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  areaMap = new Map([
    ["back", "plecy"],
    ["face", "twarz"],
    ["legs", "nogi"],
    ["hands", "ręce"],
    ["body", "ciało"],
  ]);
  imgAreaMap = new Map([
    [
      "back",
      "https://images.pexels.com/photos/5888099/pexels-photo-5888099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    [
      "face",
      "https://images.pexels.com/photos/6663361/pexels-photo-6663361.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    [
      "legs",
      "https://images.pexels.com/photos/5240640/pexels-photo-5240640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    [
      "hands",
      "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
    [
      "body",
      "https://images.pexels.com/photos/3768926/pexels-photo-3768926.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ],
  ]);

  constructor() {
    super();
    this.setTitle("Zabiegi");
  }

  async fetchTreatments() {
    return fetch("http://localhost:3000/treatments")
      .then((response) => response.json())
      .then((treatments) => {
        return treatments
          .map((treatment) => {
            treatment.img = this.imgAreaMap.get(treatment.area);
            treatment.area = this.areaMap.get(treatment.area);
            return treatment;
          })
          .map((treatment) => this.createTreatment(treatment));
      });
  }

  async getHtml() {
    const section = document.createElement("section");
    const articles = document.createElement("articles");
    section.innerHTML = `
        <h2>Zabiegi</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type 
        specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in 
        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including 
        versions of Lorem Ipsum.</p>
        <p id='Loading'> Ładowanie... </p>
        `;
    section.querySelector("#Loading").remove();
    section.append(articles);
    articles.append(...(await this.fetchTreatments()));
    articles.classList.add("row");
    return section.innerHTML;
  }

  createTreatment(treatment) {
    const { id, name, area, time, price, img } = treatment;

    const article = document.createElement("article");

    article.style.margin = "8.5 rem";
    article.style.padding = "5 rem";
    article.classList.add("col-sm-12", "col-md-6", "col-lg-4", "mb-4");
    article.innerHTML = `
        <div class="card">
          <img src="${img}" class="card-img-top" alt="...">
          <div class="card-body"> 
            <h5 class="card-title">${name}</h5>
            <div class="card-text row">
                <div class="col-6"><p class="card-text d-flex align-items-center">Część ciała: ${area} <br>Czas: ${time} minut</p></div>
                <h5 class="col-6 d-flex align-items-center justify-content-end">${price.toFixed(
                  2
                )} zł</h5>
            </div>
            <div class="row">
            <div class="col-12 text-center mt-3">
                <button type="button" class="btn btn-primary add-to-cart-btn" data-type="treatment" data-id="${id}" data-name="${name}" data-price="${price.toFixed(
      2
    )}">Dodaj do koszyka</button>
            </div>
            </div>
          </div>
        </div>
        `;
    return article;
  }
}
