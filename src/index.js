// var XMLHttp = require('xmlhttprequest').XMLHttpRequest;
var axios = require('axios');

const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

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

    // TODO: make endpoint configurable
    var login = instance.get(this.url +
      'o/oauth2/authorizeImplicit?userinfo_endpoint=https://www.googleapis.com/oauth2/v3/userinfo', {jar: cookieJar})
      .then(function (response) {
        return true;
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(new Error('Was not able to log in'));
      });

    return login;
  }

  getStringBetween(string, start, end) {

  }

  createSpace(name) {
    var arr = ['openapp.ns.rdf=http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      'openapp.ns.rdfs=http://www.w3.org/2000/01/rdf-schema#',
      'openapp.ns.dcterms=http://purl.org/dc/terms/',
      'openapp.rdf.predicate=http://purl.org/role/terms/space',
      'openapp.rdf.type=http://purl.org/role/terms/Space',
      'openapp.rdfs.label=' + name];
    var data = arr.join('&');
    var $scope = this;

    return this.login()
      .then((res) => axios.post(this.url + 'spaces', data, {jar: cookieJar, withCredentials: true}))
      .then((response) => {
        if (response.status === 200 || response.status === 500) {
          console.log('Created space');
          return Promise.resolve($scope.url + 'spaces/' + name);
        }
        return Promise.reject(new Error('Could not create space'));
      });
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

