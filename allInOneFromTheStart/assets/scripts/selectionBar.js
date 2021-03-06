import { HTMLUtilities } from "./HTMLUtilities.js";

class SelectionBar {
  constructor(menu) {
    this.menu = menu;
    this.utilities = new HTMLUtilities();
  }

  createOptions() {
    const header = document.querySelector('#header');
    header.innerHTML = "";
    const parentContainer = this.utilities.insertComponent(header)

    const div = document.createElement("div");
    div.classList.add("title");
    const containerTitle = this.utilities.insertComponent(div);

    const imgHTML = this.utilities.createIcon(this.menu.icon);
    containerTitle(imgHTML);

    const titleTag = document.createElement("h1");
    titleTag.textContent = this.menu.title;
    containerTitle(titleTag);

    const options = this.menu.options.map(this.createOptionLinks);
    options[0].classList.add("selected");
    
    const nav = document.createElement("options");
    nav.classList.add("options");
    const containerOptions = this.utilities.insertComponent(nav);
    options.forEach(containerOptions);

    header.classList.add('header');
    parentContainer(div);
    parentContainer(nav);
  }

  createOptionLinks(option) {
    const tagA = document.createElement("a");
    tagA.setAttribute("href", "#");
    tagA.setAttribute("class", "option-name");
    tagA.innerHTML = option.optionName;
    tagA.addEventListener("click", function(){
      let current = document.querySelectorAll(".options .option-name");

      current.forEach((value, index) => {
          value.classList.remove("selected");
      });

      this.classList.add("selected");
    });
    return tagA;
  }
}

export { SelectionBar };
