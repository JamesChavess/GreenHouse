import { getData } from './Repository.js';
import { HTMLUtilities } from './HTMLUtilities.js';
import { SelectionBar } from './selectionBar.js';

export class Courses {
    constructor(menu) {
        this.menu = menu;
        this.SelectionBar = new SelectionBar(menu);
        this.HTMLUtilities = new HTMLUtilities();
    }

    mainPage(){
        console.log('courses main page');
        console.log(this.menu);
        const main = document.getElementById("contentContainer");
        main.innerHTML = "";
        this.createCourseOptions();
        /*let img = document.createElement('img');
        img.classList.add("mainPage");
        if(this.menu.mainPage){
            img.src =  `${this.menu.mainPage}`;
            main.appendChild(img);
        }*/
    }

    createCourseOptions() {
        this.SelectionBar.createOptions();
        const _this = this;
        const options = this.menu.options.map(function(option){
            console.log(this);
            const tagA = document.createElement("a");
            tagA.setAttribute("href", "#");
            tagA.setAttribute("class", "option-name");
            tagA.setAttribute("data-index", `${option.option_id}`);
            tagA.innerHTML = option.optionName;
            tagA.addEventListener("click", function(e){
                let index = e.target.dataset.index;
                let current = document.querySelectorAll(".option-name.selected");
                current.forEach((value, index) => {
                    value.classList.remove("selected");
                });
                e.target.classList.add("selected");
                console.log({"option index: ": index});
                _this.renderCourse(index-1);
            });
            return tagA;
        });
        options[0].classList.add("selected");
        options[0].click();
        const nav = document.querySelector('#optionsContainer');
        const containerOptions = this.HTMLUtilities.insertComponent(nav);
        options.forEach(containerOptions);
    }

    initAvailableCards() {
        getData('./JSON/cursos.json').then((response) => { this.createAvailableCards(response) });
    }

    createAvailableCards(cardsJSON) {
        const cards = cardsJSON.availableCourses.map(this.createCard);
        s5("otherCourses").insert(cards);
    }
    
    createCard(card) {
        return s5('<div>',{'class':"availableCourseSquare"})
                .insert([
                    s5('<img>', {'src':`img/${card.image}`}),
                    s5('<h3>').insert(document.createTextNode(card.name)),
                    s5('<div>', {'class':'courseData'})
                        .insert([
                            s5('<div>',{'class':'value'})
                                .insert([
                                    s5('<span>',{'class':'fas fa-heart'}),
                                    document.createTextNode(card.likes)
                                ]),
                            s5('<div>', {'class':'files'})
                                .insert([
                                    s5('<span>',{'class':'fas fa-folder'}),
                                    document.createTextNode(card.comments)
                                ])
                        ])
                ]);
    }

    renderCourse(id){
        const main = document.getElementById('contentContainer');
        main.innerHTML = "";
        const accordion = document.createElement("aside");
        const contentContainer = document.createElement("section");
        accordion.classList.add("accordion");
        contentContainer.classList.add("contentCourse");
        contentContainer.id = "contentCourses";
        accordion.innerHTML = `<div class="accordionContainer">
        <div id="accordion"></div></div>`;
        main.appendChild(accordion);
        main.appendChild(contentContainer);

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
            const course = response.availableCourses[id];
            console.log(response);
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
                let lessonTitle = document.createElement('h1');
                lessonTitle.classList.add('lessonTitle');
                lessonTitle.innerHTML = `${prev.innerText}`;
                lesson.appendChild(lessonTitle);
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
                let lessonTitle = document.createElement('h1');
                lessonTitle.classList.add('lessonTitle');
                lessonTitle.innerHTML = `${next.innerText}`;
                lesson.appendChild(lessonTitle);
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
    }
}