// helpers for auth
class Auth {
  // set the given token to storage
  static authenticateToken(token) {
    sessionStorage.setItem('token', token);
  }

  // checks if there is a token in storage
  static isUserAuthenticated() {
    return sessionStorage.getItem('token') !== null;
  }

  // logout
  static deauthenticateUser() {
    sessionStorage.removeItem('token');
  }

  // get the token from storage
  static getToken() {
    return sessionStorage.getItem('token');
  }
}

export default Auth;