import { decodeJwt } from "jose";

export class AuthService {
  static login(idToken: string, username: string) {
    localStorage.setItem("token", idToken);
    localStorage.setItem("username", username);
  }
  // get user data
  static getProfile() {
    const token = AuthService.getToken();
    if (!token) {
      return null;
    }
    try {
      return decodeJwt(token); // Decode the token using jose
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  // get username from local storage to show username when logged in
  static getUsername() {
    return localStorage.getItem("username");
  }
  // check if user is logged in
  static loggedIn() {
    const token = AuthService.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  // check if token is expired
  static isTokenExpired(token: string) {
    try {
      const decoded = decodeJwt(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp && decoded.exp < currentTime;
    } catch (err) {
      console.error("Error checking token expiration:", err);
      return true;
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
    localStorage.removeItem("username");
  }
}
