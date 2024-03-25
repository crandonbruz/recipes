declare module "jwt-decode" {
  interface DecodedToken {
    exp: number;
    [key: string]: any;
  }

  function decode(token: string): DecodedToken;

  export default decode;
}
