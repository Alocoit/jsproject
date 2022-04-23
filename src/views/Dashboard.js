import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return `
            <h1>Welcome back, Dom</h1>
            <p>
               Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
            </p>
            <div class="row">
               <div class="col-6">
                  <a class="nav-link" href="/zabiegi" data-link>
                     <div class="card">
                        <img src="https://images.pexels.com/photos/5888099/pexels-photo-5888099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="card-img-top" alt="...">
                        <div class="card-body">
                           <h5 class="card-title text-center">Zabiegi</h5>
                        </div>
                     </div>
                  </a>
               </div>
               <div class="col-6">
                  <a class="nav-link" href="/pokoje" data-link>
                     <div class="card">
                        <img src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" class="card-img-top" alt="...">
                        <div class="card-body">
                           <h5 class="card-title text-center">Pokoje</h5>
                        </div>
                     </div>
                  </a>
               </div>
            </div>
            </div>
        `;
  }
}
