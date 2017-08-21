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

    if (name === undefined || name === '') {
      return Promise.reject(new Error('Space name empty'));
    }

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
    // return this.login()
    // .then((res) => axios.get(this.url + 
    // 'user/:;predicate=http%3A%2F%2Fpurl.org%2Fopenapp%2Finfo',{jar: cookieJar, withCredentials: true}))
  }

  addActivityToSpace(space, name) {
    var $scope = this;
    var location;

    return this.login()
      .then((res) => axios.post(this.url +
        `spaces/${space}/:;predicate=http%3A%2F%2Fpurl.org%2Frole%2Fterms%2Factivity`,
      null, {jar: cookieJar, withCredentials: true}))
      .then((response) => {
        if (response.status === 200) {
          location = response.request.path;
          location = location.substring(1, location.length);
          $scope.setActivityName(location, name);
          return Promise.resolve(location);
        }
        return Promise.reject(new Error('Could not add activity'));
      });
  }

  setActivityName(activity, name) {
    cookieJar.setCookie(tough.Cookie.parse('layouts=%7B%7D;'), this.url, function (err, cookie) {
      console.log(err);
    });

    return this.login()
      .then((res) => axios.put(this.url + activity +
        '/:;predicate=http%3A%2F%2Fpurl.org%2Fopenapp%2Fmetadata',
      {'': {'http://purl.org/dc/terms/title': [{'value': `${name}`, 'type': 'literal'}]}},
      {jar: cookieJar, withCredentials: true}))
      .then((response) => {
        if (response.status === 200) {
          return Promise.resolve(true);
        }
        return Promise.reject(new Error('Could not name activity'));
      });
  }

  removeActivityFromSpace(activity) {
    cookieJar.setCookie(tough.Cookie.parse('layouts=%7B%7D;'), this.url, function (err, cookie) {
      console.log(err);
    });

    return this.login()
      .then((res) => axios.delete(this.url + activity, {jar: cookieJar, withCredentials: true}))
      .then((response => {
        if (response.status === 200) {
          return true;
        }
        return false;
      }));
  }

  addWidgetToSpace(space, activity, widgetUrl) {
    var uri = this.url + `spaces/${space}/:;` +
      encodeURI('http://www.w3.org/1999/02/22-rdf-syntax-ns#type') + '=' +
      encodeURI('http://purl.org/role/terms/OpenSocialGadget') + ';' +
      encodeURI('http://www.w3.org/2000/01/rdf-schema#seeAlso'), + '=' +
      encodeURI(widgetUrl) + ';';
    
    if (activity.length > 3) {
      uri += encodeURI('http://purl.org/role/terms/activity') + '=' + encodeURI(activity) + ';';
    }
    uri += encodeURI('predicate') + '=' + encodeURI('http://purl.org/role/terms/tool');

    return this.login()
      .then((res) => axios.post(uri, null, {jar: cookieJar, withCredentials: true}))
      .then((response) => {
        if (response.status === 201) {
          location = response.request.path;
          location = location.substring(1, location.length);
          $scope.setActivityName(location, name);
          return Promise.resolve(location);
        }
        return Promise.reject(new Error('Could not add widget'));
      })

  }

  removeWidgetFromSpace(widget) {

  }

  setWidgetMetaData(widgetUrl, title, description) {

  }

  moveWidgets(space, activity, widgets) {

  }
}

