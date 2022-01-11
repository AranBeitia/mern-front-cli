function postlocalStorage(user) {
    window.localStorage.setItem('currentUser', JSON.stringify(user));
}

function getlocalStorage() {
    const user = window.localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function removeLocalStorage() {
    window.localStorage.removeItem('currentUser');
}

export { postlocalStorage, getlocalStorage, removeLocalStorage };