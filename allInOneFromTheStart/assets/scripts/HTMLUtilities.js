class HTMLUtilities {

    constructor() {

    }

    insertComponent = container => el => {
        container.appendChild(el);
    }

    createIcon = (icon) => {
        const tagImage = document.createElement('img');
        tagImage.setAttribute('src', `img/${icon}`);
        tagImage.setAttribute('alt', 'logo');
        return tagImage;
    }
}

export { HTMLUtilities };


