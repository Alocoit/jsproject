import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  imgMap = new Map([
    [
      1,
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ],
    [
      2,
      "https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ],
    [
      3,
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ],
    [
      4,
      "https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    ],
  ]);
  constructor() {
    super();
    this.setTitle("Pokoje");
  }

  async fetchRooms() {
    return fetch("http://localhost:3000/rooms")
      .then((response) => response.json())
      .then((rooms) => {
        return rooms
          .map((room) => {
            room.img = this.imgMap.get(room.id);
            return room;
          })
          .map((room, index) => this.createRoom(room, index));
      });
  }

  async getHtml() {
    const section = document.createElement("section");
    const articles = document.createElement("articles");
    section.innerHTML = `
        <h2>Pokoje</h2>
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
    articles.append(...(await this.fetchRooms()));
    articles.classList.add("row");
    return section.innerHTML;
  }

  createRoom(room, index) {
    const { id, name, beds, guests, price, img } = room;

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
                <div class="col-6"><p class="card-text d-flex align-items-center">Liczba łóżek: ${beds} <br>Liczba gości: ${guests}</p></div>
                <h5 class="col-6 d-flex align-items-center justify-content-end">${price.toFixed(
                  2
                )} zł</h5>
            </div>
            <div class="row">
            <div class="col-12 text-center mt-3">
            <button
              type="button"
              class="btn position-relative add-room"
              data-bs-toggle="modal"
              data-bs-target="#dodajPokoj"
              data-type="room"
               data-id="${id}" data-name="${name}" data-price="${price.toFixed(
      2
    )}"
            >
             Dodaj do koszyka
            </button>
            </div>
            </div>
          </div>
        </div>
        `;
    return article;
  }
}
