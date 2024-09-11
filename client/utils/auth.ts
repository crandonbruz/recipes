import decode from "jwt-decode";

export class AuthService {
  static login(idToken: string) {
    localStorage.setItem("token", idToken);
  }
  // get user data
  static getProfile() {
    return decode(AuthService.getToken() as string);
  }
  // check if user is logged in
  static loggedIn() {
    const token = AuthService.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  // check if token is expired
  static isTokenExpired(token: string) {
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
  static getToken() {
    return localStorage.getItem("token");
  }
  // set token to local storage
  static setToken(idToken: string) {
    localStorage.setItem("token", idToken);
  }
  // remove token from local storage
  static logout() {
    localStorage.removeItem("token");
  }
}
