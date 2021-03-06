import { getData } from './Repository.js';
import { HTMLUtilities } from './HTMLUtilities.js';
import { selectionBar } from './selectionBar.js';

export class Courses {
    constructor(menu) {
        this.menu = menu;
        this.optionsClass = new SelectionBar();
        this.createOptions(menu.options);
    }

    createOptions({coursesOptions:{options,iconOption,titleOption}}) {
        this.optionsClass.createOptions(iconOption, titleOption, options);
    }

  createAvailableCards(cardsJSON) {
    const cards = cardsJSON.availableCourses.map(this.createCard);
    s5("otherCourses").insert(cards);
  }

  createCard(card) {
    return s5("<div>", { 'class': "availableCourseSquare" }).insert([
      s5("<img>", { src: `img/${card.image}` }),
      s5("<h3>").insert(document.createTextNode(card.name)),
      s5("<div>", { 'class': "courseData" }).insert([
        s5("<div>", { 'class': "value" }).insert([
          s5("<span>", { 'class': "fas fa-heart" }),
          document.createTextNode(card.likes),
        ]),
        s5("<div>", { 'class': "files" }).insert([
          s5("<span>", { 'class' : "fas fa-folder" }),
          document.createTextNode(card.comments),
        ]),
      ]),
    ]);
   }

    renderCourse(id){

        const accordion = document.createElement("aside");
        const contentContainer = document.createElement("section");
        accordion.classList.add("accordion");
        contentContainer.classList.add("contentCourse");
        contentContainer.id = "contentCourses";
        accordion.innerHTML = `<div class="accordionContainer">
        <div id="accordion"></div></div>`;
    main.appendChild(accordion);
    main.appendChild(contentContainer);

    const container = Sinco.get("accordion");
    const contentCourse = Sinco.get("contentCourses");
    let formSearch = s5("<form>",{'class': "searchContent"});
    let lesson = s5("<div>",{'id':"lessonContainer"});
    /*let formSearch = document.createElement("form");
    let lesson = document.createElement("div");
    lesson.id = "lessonContainer"; 
    formSearch.classList.add("searchContent");*/
    formSearch.innerHTML = `<span class="fas fa-search"></span>
        <input type="text" name="keyword">`;
    container.appendChild(formSearch);

        getData("./JSON/cursos.json").then((response) => {
            // const course = response.availableCourses[id];
            // console.log(response);
            // contentContainer.innerHTML = ` <h2>curso de ${course.name}</h2><nav id="lessonNav">
            // <a id="prevBtn" href="#"><i class="fas fa-chevron-left"></i> Leccion anterior</a>
            // <a id="nextBtn" href="#">Leccion siguiente <i class="fas fa-chevron-right"></i></nav>`;
            

      const prevBtn = Sinco.get("prevBtn");
      prevBtn.addEvent("click", function () {
        let activeItem = s5(".open");
        let arrowDown = s5(".down");
        let prev = activeItem.previousSibling;

        if (
          document.body.contains(activeItem) &&
          document.body.contains(arrowDown) &&
          document.body.contains(prev) &&
          prev.classList.contains("panel")
        ) {
          lesson.innerHTML = "";
          let lessonTitle = s5("<h1>", {'class': "lessonTitle"});
          /*let lessonTitle = document.createElement("h1");
          lessonTitle.classList.add("lessonTitle");*/
          lessonTitle.innerHTML = `${prev.innerText}`;
          lesson.appendChild(lessonTitle);
          activeItem.classList.remove("open");
          arrowDown.classList.remove("down");
          console.log({ "selected lesson": activeItem });
          console.log({ "prev lesson": prev });
          prev.classList.add("open");
          prev.firstChild.firstChild.classList.add("down");
          course.content.forEach((element) => {
            if (
              element.parent_id ==
              parseInt(prev.firstChild.getAttribute("data-index"))
            ) {
                let article = s5("<article>");
                let title = s5("<h2>");
                let paragraph = s5("<p>");
              /*let article = document.createElement("article");
              let title = document.createElement("h2");
              let paragraph = document.createElement("p");*/

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

      const nextBtn = Sinco.get("nextBtn");
      nextBtn.addEvent("click", function () {
        let activeItem = document.querySelector(".open");
        let arrowDown = document.querySelector(".down");
        let next = activeItem.nextSibling;

        if (
          document.body.contains(activeItem) &&
          document.body.contains(arrowDown) &&
          document.body.contains(next)
        ) {
          lesson.innerHTML = "";
          let lessonTitle = s5("<h1>",{class: "lessonTitle"});
         /* let lessonTitle = document.createElement("h1");
          lessonTitle.classList.add("lessonTitle");*/
          lessonTitle.innerHTML = `${next.innerText}`;
          lesson.appendChild(lessonTitle);
          activeItem.classList.remove("open");
          arrowDown.classList.remove("down");
          console.log({ "selected lesson": activeItem });
          console.log({ "next lesson": next });
          next.classList.add("open");
          next.firstChild.firstChild.classList.add("down");
          course.content.forEach((element) => {
            if (
              element.parent_id ==
              parseInt(next.firstChild.getAttribute("data-index"))
            ) {
                let article = s5("<article>");
                let title = s5("<h2>");
                let paragraph = s5("<p>");
              /*let article = document.createElement("article");
              let title = document.createElement("h2");
              let paragraph = document.createElement("p");*/

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

      const lessonNav = Sinco.get('lessonNav');
      course.content.forEach(function (item, index, array) {
        let div = s5("<div>");
        item.HTMLelement = div;
        div.setAttribute("data-index", item.item_id);

        if (item.parent_id == null) {
            let panelBody = s5("<div>",{'class': "tableBody"});
            let panel = s5("<div>",{'class': "panel"});
            let arr = s5("<img>",{src:"img/next.png", 'class': "arrow"});
         /* let panelBody = document.createElement("div");
          let panel = document.createElement("div");
          let arr = document.createElement("img");

                panel.classList.add("panel");
                panelBody.classList.add("tableBody");
                arr.src = "img/next.png";
                arr.classList.add("arrow");
                lessons.push(index);
                div.addEventListener("click", function () {
                lesson.innerHTML = "";
                let lessonTitle = document.createElement('h1');
                lessonTitle.classList.add('lessonTitle');
                lessonTitle.innerHTML = `${item.contentName}`;
                console.log(lessonTitle);
                lesson.appendChild(lessonTitle);
                let activeItems = document.getElementsByClassName("open");
                let arrDown = document.getElementsByClassName("down");
                if (activeItems.length > 0 && arrDown.length > 0) {
                    activeItems[0].classList.remove("open");
                    arrDown[0].classList.remove("down");
                }
                arr.classList.add("down");
                panel.classList.add("open");
                
                array.forEach((element) => {
                    if (element.parent_id == item.item_id) {
                    let article = document.createElement("article");
                    let title = document.createElement("h2");
                    let paragraph = document.createElement("p");
                    paragraph.innerHTML = `${element.paragraph}`;
                    title.innerHTML = `${element.contentName}`;
                    
                    if (element.contentName == "Objetivos") {
                        article.classList.add("goalsCourse");
                        article.id = `${element.contentName}`;
                    } else {
                        article.classList.add("contentCourseArticle");
                        article.id = `${element.contentName}`;
                    }
                    article.appendChild(title);
                    article.appendChild(paragraph);
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

                let cName = element.contentName.toLowerCase();
                if (cName.includes("objetivo")) {
                  article.classList.add("goalsCourse");
                  article.id = `${element.contentName}`;
                } else {
                  article.classList.add("contentCourseArticle");
                  article.id = `${element.contentName}`;
                }
                article.appendChild(title);
                article.appendChild(paragraph);
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
          let pIndex = array.findIndex((obj) => obj.item_id === item.parent_id);
          let parent = array[pIndex];
          let subDiv = s5("<div>");
          let subDivChild = s5("<p>", {'class': "accordionIndex"});
         /* let subDiv = document.createElement("div");
          let subDivChild = document.createElement("p");

          subDivChild.setAttribute("class", "accordionIndex");*/
          subDivChild.textContent = item.contentName;
          subDivChild.addEvent("click", function () {
            s5(item.contentName)
              .scrollIntoView({ behavior: "smooth" });
          });
          subDiv.appendChild(subDivChild);
          parent.HTMLelement.nextElementSibling.appendChild(subDiv);
        }
      });
    });
  }
}