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

        

        const main = document.getElementById("contentContainer");
        main.innerHTML = "";

        const accordion = document.createElement("aside");
        const contentContainer = document.createElement("section");
        contentContainer.classList.add("contentCourse");
        contentContainer.id = "contentCourses";
        accordion.classList.add("accordion");
        accordion.innerHTML = `<div class="accordionContainer">
        <div id="accordion"></div></div>`;
        main.appendChild(accordion);
        main.appendChild(contentContainer);

        let currentLesson;
        let lessons = [];

        const container = document.getElementById("accordion");
        const contentCourse = document.getElementById("contentCourses");
        let formSearch = document.createElement("form");
        let lesson = document.createElement("div");
        lesson.id = "lessonContainer";
        formSearch.classList.add("searchContent");
        formSearch.innerHTML = `<span class="fas fa-search"></span>
        <input type="text" name="keyword">`;
        container.appendChild(formSearch);

        getData("./JSON/cursos.json").then((response) => {
          const course = response.availableCourses[1];
          contentContainer.innerHTML = ` <h2>curso de ${course.name}</h2><nav id="lessonNav">
          <a id="prevBtn" href="#"><i class="fas fa-chevron-left"></i> Leccion anterior</a>
          <a id="nextBtn" href="#">Leccion siguiente <i class="fas fa-chevron-right"></i></nav>`;

          const prevBtn = document.getElementById("prevBtn");
          prevBtn.addEventListener("click", function () {
            let activeItem = document.querySelector(".open");
            let arrowDown = document.querySelector(".down");
            let prev = activeItem.previousSibling;

            if (document.body.contains(activeItem) && document.body.contains(arrowDown) && 
            document.body.contains(prev) && prev.classList.contains('panel')) {
                lesson.innerHTML = "";
                activeItem.classList.remove("open");
                arrowDown.classList.remove("down");
                console.log({'selected lesson' : activeItem});
                console.log({'prev lesson' : prev});
                prev.classList.add("open");
                prev.firstChild.firstChild.classList.add("down");
                course.content.forEach((element) =>{
                  if(element.parent_id == parseInt(prev.firstChild.getAttribute('data-index'))){
                    let article = document.createElement("article");
                    let title = document.createElement("h2");
                    let paragraph = document.createElement("p");

                    if(element.contentName == "Objetivos"){
                      article.classList.add("goalsCourse");
                      article.id = `${element.contentName}`;
                    }
                    else{
                      article.classList.add("contentCourseArticle");
                      article.id = `${element.contentName}`;
                    }
                    title.innerHTML = `${element.contentName}` ;
                    paragraph.innerHTML = `${element.paragraph}`;
                    article.appendChild(title);
                    article.appendChild(paragraph);
                    lesson.appendChild(article);
                    contentCourse.appendChild(lesson);
                  }
                });
            }
          });


          const nextBtn = document.getElementById("nextBtn");
          nextBtn.addEventListener("click", function () {
            let activeItem = document.querySelector(".open");
            let arrowDown = document.querySelector(".down");
            let next = activeItem.nextSibling;

            if (document.body.contains(activeItem) && document.body.contains(arrowDown) && document.body.contains(next)) {
              lesson.innerHTML = "";
              activeItem.classList.remove("open");
              arrowDown.classList.remove("down");
              console.log({'selected lesson':activeItem});
              console.log({'next lesson': next});
              next.classList.add("open");
              next.firstChild.firstChild.classList.add("down");
              course.content.forEach((element) => {
                if (element.parent_id == parseInt(next.firstChild.getAttribute('data-index'))) {
                  let article = document.createElement("article");
                  let title = document.createElement("h2");
                  let paragraph = document.createElement("p");
          
                  if (element.contentName == "Objetivos") {
                    article.classList.add("goalsCourse");
                    article.id = `${element.contentName}`;
                  } else {
                    article.classList.add("contentCourseArticle");
                    article.id = `${element.contentName}`;
                  }
                  title.innerHTML = `${element.contentName}`;
                  paragraph.innerHTML = `${element.paragraph}`;
                  article.appendChild(title);
                  article.appendChild(paragraph);
                  lesson.appendChild(article);
                  contentCourse.appendChild(lesson);
                }
              });
            }
          });

          const lessonNav = document.getElementById("lessonNav");
          let lessonTitle = document.createElement('h1');
          lessonTitle.classList.add('lessonTitle');
          lessonTitle.innerHTML = `${course.name}`;
          lesson.appendChild(lessonTitle);
          course.content.forEach(function (item, index, array) {
            let div = document.createElement("div");
            item.HTMLelement = div;
            div.setAttribute('data-index',item.item_id);

            if (item.parent_id == null) {
              let panelBody = document.createElement("div");
              let panel = document.createElement("div");
              let arr = document.createElement("img");

              panel.classList.add("panel");
              panelBody.classList.add("tableBody");
              arr.src = "img/next.png";
              arr.classList.add("arrow");
              lessons.push(index);
              div.addEventListener("click", function () {
                lesson.innerHTML = "";
                let activeItems = document.getElementsByClassName("open");
                let arrDown = document.getElementsByClassName("down");
                let article = document.createElement("article");
                if (activeItems.length > 0 && arrDown.length > 0) {
                  activeItems[0].classList.remove("open");
                  arrDown[0].classList.remove("down");
                }
                arr.classList.add("down");
                panel.classList.add("open");
                
                array.forEach((element) => {
                  if (element.parent_id == item.item_id) {
                    
                    let title = document.createElement("h2");
                    let paragraph = document.createElement("p");
                    paragraph.innerHTML = `${element.paragraph}`;
                    title.innerHTML = `${element.contentName}`;
                    article.appendChild(title);
                    article.appendChild(paragraph);
                    if (element.contentName == "Objetivos") {
                      article.classList.add("goalsCourse");
                      article.id = `${element.contentName}`;
                    } else {
                      article.classList.add("contentCourseArticle");
                      article.id = `${element.contentName}`;
                    }
                    lesson.appendChild(article);
                    contentCourse.appendChild(lesson);
                  }
                });
              });
              div.classList.add("tableHeader");
              div.innerHTML = `<span> ${item.contentName}</span>`;
              div.prepend(arr);
              panel.appendChild(div);
              panel.appendChild(panelBody);
              container.appendChild(panel);
            } else {
              let pIndex = array.findIndex(
                (obj) => obj.item_id === item.parent_id
              );
              let parent = array[pIndex];
              let subDiv = document.createElement("div");
              let subDivChild = document.createElement("p");

              subDivChild.setAttribute("class", "accordionIndex");
              subDivChild.textContent = item.contentName;
              subDivChild.addEventListener("click", function () {
                document
                  .getElementById(item.contentName)
                  .scrollIntoView({ behavior: "smooth" });
              });
              subDiv.appendChild(subDivChild);
              parent.HTMLelement.nextElementSibling.appendChild(subDiv);
            }
          });
        });
      });
  }
}
