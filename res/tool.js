document.tool = {
  get: (selector /* css selector */) => document.querySelector(selector),
  getById(id /* id */) {
    let res = this.get(`#${id}`);

    /* Si se obtiene un Array se envia solo el primer objeto */
    if (res[0]) return res[0];
    return res;
  },

  /* Decoding URL */
  decodeURL(url) {
    let str = url.split('?');
    let vars = null;
    if (str[1] && str[1].length > 0) {
      vars = {};
      str[1].split('&').forEach(s => {
        let t = s.split('=');
        vars[t[0]] = t[1];
      });
    }
    return { url: str[0], var: vars };
  }
};
