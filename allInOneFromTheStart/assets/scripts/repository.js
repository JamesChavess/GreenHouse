function getData(url, callback) {
    return fetch(url).then((response) => response.json())
}

export { getData }