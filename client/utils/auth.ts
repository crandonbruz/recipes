import decode from "jwt-decode";

export class AuthService {
  static login(idToken: string) {
    localStorage.setItem("id_token", idToken);
  }
  // get user data
  getProfile() {
    return decode(this.getToken() as string);
  }
  // check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  // get token from local storage
  getToken() {
    return localStorage.getItem("id_token");
  }
  // set token to local storage
  setToken(idToken: string) {
    localStorage.setItem("id_token", idToken);
  }
  // remove token from local storage
  logout() {
    localStorage.removeItem("id_token");
  }
}
