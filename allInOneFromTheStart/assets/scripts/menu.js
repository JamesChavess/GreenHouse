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
        const contentCourse = document.getElementById("contentCourses");
        container.innerHTML = "";
        contentCourse.innerHTML = "";
        let formSearch = document.createElement('form');
        formSearch.classList.add('searchContent');
        formSearch.innerHTML = `<span class="fas fa-search"></span>
        <input type="text" name="keyword">`;
        container.appendChild(formSearch);
        
        getData("./JSON/cursos.json").then((response) => {
          const javaScript = response.availableCourses[1].content;
          javaScript.forEach(function (item, index, array) {
            let div = document.createElement('div');
            item.HTMLelement = div;
            
            if (item.parent_id == null) {
                let panelBody = document.createElement('div');
                let panel = document.createElement('div');
                let arr = document.createElement('img');
                panel.classList.add('panel');
                
                panelBody.classList.add('tableBody');
                arr.src = 'img/next.png';
                arr.classList.add('arrow');
                div.addEventListener("click", function() {
                  arr.classList.toggle('down');
                  panel.classList.toggle('open');
                });
                div.classList.add('tableHeader');
                div.innerHTML = `<span> ${item.contentName}</span>`;
                div.prepend(arr);
                panel.appendChild(div);
                panel.appendChild(panelBody);
                container.appendChild(panel);
            }else {
              let article = document.createElement('article');
              let title = document.createElement('h2');
              let paragraph = document.createElement('p');
              paragraph.innerHTML = `${item.paragraph}`;
              title.innerHTML = `${item.contentName}`;
              article.appendChild(title);
              article.appendChild(paragraph);
              if(item.contentName =="Objetivos"){
                article.classList.add('goalsCourse');
                article.id = `${item.contentName}` ;
              }else{
                article.classList.add('contentCourseArticle');
                article.id = `${item.contentName}` ;

              }
              contentCourse.appendChild(article);
              let pIndex = array.findIndex(obj => obj.item_id === item.parent_id);
              let parent = array[pIndex];
              let subDiv = document.createElement('div');
              let subDivChild = document.createElement('p');
              subDivChild.setAttribute('class', 'accordionIndex');
              subDivChild.textContent = item.contentName;
              subDivChild.addEventListener('click', function() {
                document.getElementById(item.contentName).scrollIntoView({behavior: 'smooth' });
              });
              subDiv.appendChild(subDivChild);
              parent.HTMLelement.nextElementSibling.appendChild(subDiv);
            }
          });
        });
    });
  }
}




