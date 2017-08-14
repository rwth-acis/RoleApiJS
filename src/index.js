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

}
