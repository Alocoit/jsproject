export default class Cart {
  constructor() {}

  addToCart(id, name, price, type, dataOd = null, dataDo = null) {
    let cart;
    if (!localStorage["cart"]) cart = [];
    else cart = JSON.parse(localStorage["cart"]);
    if (!(cart instanceof Array)) cart = [];
    if (!!cart.length) {
      if (cart.find((item) => item.id === id && item.type === type)) {
        cart.map((item) => {
          if (item.id === id) {
            item.amount++;
          }
        });
      } else {
        if (dataOd && dataDo) {
          cart.push({
            id,
            name,
            price,
            amount: 1,
            dataOd,
            dataDo,
            type: "room",
          });
        } else {
          cart.push({ id, name, price, amount: 1, type: "treatment" });
        }
      }
    } else {
      if (dataOd && dataDo) {
        cart.push({ id, name, price, amount: 1, dataOd, dataDo, type: "room" });
      } else {
        cart.push({ id, name, price, amount: 1, type: "treatment" });
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.getCartCount();
  }

  getCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart?.length) {
      return 0;
    }
    return cart
      .map((item) => item.amount)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  getCartItems() {
    const listaZakupow = document.getElementById("listaZakupow");
    listaZakupow.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.map((item) =>
      this.createShoppingCartItem(
        item.id,
        item.name,
        item.price,
        item.amount,
        item.type
      )
    );
    listaZakupow.append(...cart);
    cart.forEach((button) => {
      button.onclick = (event) => {
        this.deleteItem(
          button.getAttribute("data-id"),
          button.getAttribute("data-type")
        );
      };
    });
  }

  createShoppingCartItem(id, name, price, amount, type) {
    const item = document.createElement("item");
    item.classList =
      "row p-4 d-flex justify-content-center align-items-center text-center";
    item.setAttribute("data-id", id);
    item.setAttribute("data-type", type);
    item.innerHTML = `
        <div class="col-4">${name}</div>
        <div class="col-2">${price}</div>
        <div class="col-2">${amount}</div>
        <div class="col-4" style="cursor: pointer;" id="delete-item-${id}">
          <button class="btn btn-danger btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
          </button> 
        </div>
        `;
    return item;
  }

  deleteItem(id, type) {
    console.log(id, type);
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((item) => {
      if (item.id != id) {
        return item;
      } else {
        if (item.type != type) {
          return item;
        } else {
          return;
        }
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart-value").innerHTML = this.getCartCount();
    this.getCartItems();
  }
}
