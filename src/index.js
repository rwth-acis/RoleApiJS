// var XMLHttp = require('xmlhttprequest').XMLHttpRequest;
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

  testRequest() {
    axios.get('http://example.com/')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  login() {

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

