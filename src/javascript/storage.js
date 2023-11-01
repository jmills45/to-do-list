function populateStorage(item, value) {
    localStorage.setItem(item, JSON.stringify(value));
}

function readStorage(item) {
    return JSON.parse(localStorage.getItem(item));
}
