import { getData } from "./Repository.js";
import { HTMLUtilities } from "./HTMLUtilities.js";
import { SelectionBar } from "./selectionBar.js";

export class NavMenu {
  constructor() {
    this.utilities = new HTMLUtilities();
  }

  init() {
    this.container = s5("<ul>", { id: "links" }).insertTo(s5("navMenu"));

    getData("./JSON/menu.json").then((response) => {
      this.createOptions(response);
      console.log(response);
    });
  }

  createOptions(options) {
    this.container.innerHTML = "";
    const funcionInsertarMenu = this.utilities.insertComponent(this.container);

    options.links.forEach((option) => {
      funcionInsertarMenu(this.createMenu(option)),
      addEventListener("click", ()=>{ 
        getData("./JSON/cursos.json").then((response) => {
          let courses = response.availableCourses[1];
          courses.content.forEach(function(course){
            console.log({"course":course});
            //const courses = response.availableCourses[i]; 
          });
        //let chosenOption = courses.filter(function(course) { return courses.name === links.options.name;});
          
        //   contentContainer.innerHTML = ` <h2>curso de ${chosenOption.name}</h2><nav id="lessonNav">
        //  <a id="prevBtn" href="#"><i class="fas fa-chevron-left"></i> Leccion anterior</a>
        //  <a id="nextBtn" href="#">Leccion siguiente <i class="fas fa-chevron-right"></i></nav>`;
      });
    });
  });}


  createMenu(menu) {
    return s5("<li>", { class: "menu-link", "data-option": menu.title })
      .insert([
        s5("<img>", { src: `img/${menu.icon}`, alt: "logo" }),
        s5("<span>").insert(document.createTextNode(menu.title)),
    ])
    .addEvent("click", (e) => {
      const selectionBar = new SelectionBar(menu);
      selectionBar.createOptions();

      let current = s5("li.menu-link");

      current.forEach((value, index) => {
        value.classList.remove("active");
      });
      e.currentTarget.classList.add("active");

      document.getElementById('welcome').style.display = "none";
      const main = document.getElementById("contentContainer");
      main.innerHTML = "";
      //main.innerHTML = `${e.currentTarget.dataset.option}`;
      let img = document.createElement('img');
      img.classList.add("mainPage");
      if(menu.mainPage){
        img.src =  `${menu.mainPage}`;
        main.appendChild(img);
      }
    });
  }
}


