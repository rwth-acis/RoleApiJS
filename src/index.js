// var XMLHttp = require('xmlhttprequest').XMLHttpRequest;
// eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiMjQyYzQwODQtM
// zUzYS00ODVkLTlkM2MtODBmNTVhZDczZTIwIl0sImlzcyI6Imh0dHBzOlwvXC9h
// cGkubGVhcm5pbmctbGF5ZXJzLmV1XC9vXC9vYXV0aDJcLyIsImV4cCI6MTUwMj
// k3OTE4MSwiaWF0IjoxNTAyOTc1NTgxLCJqdGkiOiIyZTkyNWQ4ZS1lYWQ2LTRkZWE
// tOGQ2Mi1mODhjNWFjZjY5MmEifQ.u3LOCZtmL0sdTjxLZYrc_StZbdVW91SB-5GX2XS
// tAsLb-E1GcOjC6beIrHdeWtEXYohWbh3IOx10MEeT6Pog-yrOsVhETpwxlbAYkF
// gV8uAm44EYSGOh0TTcj5y43T-FqLIyT8MxZSOkUNa4oIDOhFITQQqxzI5eQrlMO
// F6tPSg
var axios = require('axios');

export default class RoleApiJS {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  cmpWidget(a, b) {
    if (a['y'] === b['y']) {
      if (a['x'] === b['x']) {
        return 0;
      }
      return (a['x'] < b['x'] ? -1 : 1);
    }
    return (a['y'] < b['y'] ? -1 : 1);
  }

  login() {
    const instance = axios.create({
      headers: {'access_token': this.token}
    });

    instance.get(this.url + 'o/oauth2/authorizeImplicit?userinfo_endpoint=https://api.learning-layers.eu/o/oauth2/userinfo')
      .then(function (response) {
        this.cookie = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
        return true;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  }

  loginCookie() {

  }

  getStringBetween(string, start, end) {

  }

  createSpace(name) {

  }

  joinSpace(name) {

  }

  addActivityToSpace(space, name) {

  }

  setActivityName(activity, name) {

  }

  removeActivityFromSpace(activity) {

  }

  addWidgetToSpace(space, activity, widgetUrl) {

  }

  removeWidgetFromSpace(widget) {

  }

  setWidgetMetaData(widgetUrl, title, description) {

  }

  moveWidgets(space, activity, widgets) {

  }
}

