import Dashboard from "../views/Dashboard.js";
import Treatments from "../views/Treatments";
import Rooms from "../views/Rooms";
import Cart from "../cart/Cart.js";
import Summary from "../views/Summary.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/zabiegi", view: Treatments },
    { path: "/pokoje", view: Rooms },
    { path: "/podsumowanie", view: Summary },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));
  document.querySelector("#app").innerHTML = await view.getHtml();
  Array.prototype.slice
    .call(document.getElementsByClassName("add-to-cart-btn"))
    .forEach((button) => {
      button.onclick = (event) => {
        Cart.prototype.addToCart(
          button.getAttribute("data-id"),
          button.getAttribute("data-name"),
          button.getAttribute("data-price"),
          "treatment"
        );
        document.getElementById("cart-value").innerHTML =
          Cart.prototype.getCartCount();
      };
    });
  document.getElementById("cart-value").innerHTML =
    Cart.prototype.getCartCount();

  Array.prototype.slice
    .call(document.getElementsByClassName("add-room"))
    .forEach((button) => {
      button.onclick = (event) => {
        document.getElementById(
          "wybranyPokoj"
        ).innerHTML = `<h5 class="text-center">
          ${button.getAttribute("data-name")},
          ${button.getAttribute("data-price")} zł/doba</h5>`;
        const przycisk = document.getElementById("dodajPokojDoKoszyka");
        przycisk.setAttribute("data-price", button.getAttribute("data-price"));
        przycisk.setAttribute("data-name", button.getAttribute("data-name"));
        przycisk.setAttribute("data-id", button.getAttribute("data-id"));
      };
    });

  document.getElementById("dodajPokojDoKoszyka").onclick = (event) => {
    const przycisk = document.getElementById("dodajPokojDoKoszyka");
    const dataOd = $("#from")[0].value;
    const dataDo = $("#to")[0].value;
    Cart.prototype.addToCart(
      przycisk.getAttribute("data-id"),
      przycisk.getAttribute("data-name"),
      przycisk.getAttribute("data-price"),
      "room",
      dataOd,
      dataDo
    );
    document.getElementById("cart-value").innerHTML =
      Cart.prototype.getCartCount();
  };
};
const shoppingCart = document.getElementById("cart");

shoppingCart.addEventListener("shown.bs.modal", function () {
  Cart.prototype.getCartItems();
});

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
