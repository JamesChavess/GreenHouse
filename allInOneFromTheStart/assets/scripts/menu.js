import { getData } from "./Repository.js";
import { HTMLUtilities } from "./HTMLUtilities.js";
import { SelectionBar } from "./selectionBar.js";
import { Courses } from './courses.js';


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
      funcionInsertarMenu(this.createMenu(option));
    });
  }


  createMenu(menu) {
    return s5("<li>", { class: "menu-link", "data-option": menu.title })
      .insert([
        s5("<img>", { src: `img/${menu.icon}`, alt: "logo" }),
        s5("<span>").insert(document.createTextNode(menu.title)),
    ])
    .addEvent("click", (e) => {
      let currentOption = e.currentTarget.dataset.option;
      console.log(currentOption);
      /*const selectionBar = new SelectionBar(menu);
      selectionBar.createOptions();*/
      let current = s5("li.menu-link");
      current.forEach((value, index) => {
        value.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      Sinco.get('welcome').style.display = "none";
      switch (currentOption) {
        case "Cursos":
          console.log('cursos selected');
          this.Courses = new Courses(menu);
          this.Courses.mainPage();
          break;
          
        case "Katas":
          console.log('katas selected');
          break;
          
        default:
          break;
      }
     
    });
  }
}


