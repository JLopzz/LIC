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
  },

  /* Funciones */
  filter({
    data = [],
    init = 0,
    quantity = 6,
    filter = () => true,
  } = {}) {
    // Condiciones de variables necesarias
    if (!Array.isArray(data) || data.length < 1) return [];
    if (init < 0 || quantity < 1 || quantity > 20) return [];

    let res = [], valid = data.filter(filter);

    for (let i = init; i < valid.length && i < init + quantity; i++) {
      res = [...res, valid[i]];
    }

    return res;
  },

  constructCards() {
    
  }
};
