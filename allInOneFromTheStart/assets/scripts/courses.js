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
}

