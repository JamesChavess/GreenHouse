import { getData } from "./Repository.js";
import { HTMLUtilities } from "./HTMLUtilities.js";
import { SelectionBar } from "./selectionBar.js";

export class NavMenu {
  constructor() {
    this.utilities = new HTMLUtilities();
  }

  init() {
    this.container = s5('<ul>', {'id': "links"}).insertTo(s5("navMenu"));

    getData("./JSON/menu.json").then((response) => {
      this.createOptions(response);
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
        const selectionBar = new SelectionBar(menu);
        selectionBar.createOptions();

        let current = s5("li.menu-link");

        current.forEach((value, index) => {
          value.classList.remove("active");
        });

        e.currentTarget.classList.add("active");

      
        const container = document.getElementById("accordion");
        container.innerHTML = "";
        
        getData("./JSON/cursos.json").then((response) => {
          const javaScript = response.availableCourses[1].content;
          javaScript.forEach(function (item, index, array) {
            let div = document.createElement('div');
            let panel = document.createElement('div');
            let arr = document.createElement('img');
            item.HTMLelement = div;
            
            if (item.parent_id == null) {
                console.log(item);
                let panelBody = document.createElement('div');
                panel.setAttribute('class','panel');
                panel.addEventListener("click", function(e) {
                  
                });
                panelBody.setAttribute('class','tableBody');
                arr.src = 'img/next.png';
                arr.setAttribute('class','arrow');
                // const div = docuemnt.createElement('div');
                div.setAttribute('class','tableHeader');
                div.innerHTML = `<span> ${item.contentName}</span>`;
                div.prepend(arr);
                panel.appendChild(div);
                panel.appendChild(panelBody);
                container.appendChild(panel);
            }else {
              let pIndex = array.findIndex(obj => obj.item_id === item.parent_id);
              let parent = array[pIndex];
              let subDiv = document.createElement('div');
              let link = document.createElement('a');
              link.addEventListener('click',function(e){
                e.preventDefault();
                panel.classList.toggle("open");
                arr.classList.toggle("down");
                console.log(`anchor ${item.contentName} clicked`);
              });
              link.href = `#${item.contentName}`;
              link.setAttribute('class','accordionIndex');
              link.innerHTML = `${item.contentName}`;
              subDiv.appendChild(link);
              //subDiv.innerHTML = `<a href="#" class="accordionIndex" >${item.contentName}</a>`;
              parent.HTMLelement.nextElementSibling.appendChild(subDiv);
            }
          });
        });
      });
  }
}


