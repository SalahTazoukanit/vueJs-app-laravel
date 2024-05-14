
export function isLoggedIn() {

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    return token !== null ;
}