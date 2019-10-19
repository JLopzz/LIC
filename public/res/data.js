/**
 * Advenced creation of HTMLNodes
 */
document.newElement = (type, attr, childs) => {
  type = Object.trueType(type) == 'string' ? type : 'div';
  attr = Object.trueType(attr) == 'object' ? attr : {};
  childs = Object.trueType(childs) == 'array' ? childs : [];

  let res = document.createElement(type);

  for (const a in attr) {
    if (attr.hasOwnProperty(a)) res[a] = attr[a];
  }

  for (const c of childs) res.appendChild(c);

  return res;
}

/**
 * Return the trueType of a value
 */
Object.trueType = obj => {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';

  return Object.prototype.toString.call(obj).split(/[\[\] ]/)[2].toLowerCase();
}

/**
 * Check fields in a object
 */
Object.check = function (obj, fields) {
  if (Object.trueType(obj) != 'object') return false;
  if (!Array.isArray(fields)) return false;

  fields.forEach(f => {
    if (Object.trueType(f) != 'string') return false;
    if (!obj.hasOwnProperty(f)) return false;
  });

  return true;
}

// -------------------------------------------------------------------

//firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
function Storage() {
  store = firebase.storage();

  this.getPortada = async (name) => {
    try {
      return await store.ref(`/filmes/portada/${name}`).getDownloadURL();
    } catch (e) {
      console.log('Not found ref: ', e);
      return 'not found';
    }
  }
}

// -------------------------------------------------------------------

/**
 * Peliculas con datos validos
 * @param {string} id Cadena de llave valida
 * @param {Object} args Objeto conteniendo campos pre-definidos
 */

function Filme(id, args) {
  if (Object.trueType(id) != 'string') throw new Error("Filme 'id' should be string.");
  this.id = id;

  this.loaded = Object.check(args, ['exhibiendose', 'titulo', 'sinopsis', 'trailer', 'portada']);

  if (this.loaded) {
    this.exhibiendose = args.exhibiendose;
    this.titulo = args.titulo;
    this.sinopsis = args.sinopsis;
    this.trailer = args.trailer;
    this.portada = args.portada;
  }

  this.get = async () => {
    try {
      let snap = await firebase.firestore().collection('peliculas').doc(this.id).get();

      if (!snap.exists) throw new Error("document doesn't exists");
      let data = snap.data();

      this.exhibiendose = data.exhibiendose;
      this.titulo = data.titulo;
      this.sinopsis = data.sinopsis;
      this.trailer = data.trailer;
      this.portada = data.portada;
      this.loaded = true;
    } catch (e) {
      console.log("Error getting Filme: ", e);
      this.loaded = false;
    }
  }
}

/**
 * falta implementar orderby y startindex usando fecha de estreno
 */

function Filmes(filters) {
  this.filmes = [];
  this.filters = {};
  this.filters.limit = isNaN(parseInt(filters.limit)) ? parseInt(filters.limit) : 10;
  this.filters.exhibiendose = (filters.exhibiendose !== undefined) ? !!filters.exhibiendose : null; /* null: cualquiera, true: si, false: no */

  this.get = async () => {
    let col = firebase.firestore().collection('peliculas');
    let promise = col;

    if (this.filters.exhibiendose !== null) promise = promise.where("exhibiendose", "==", !!this.filters.exhibiendose)

    this.filmes = [];

    try {
      let snaps = await promise.limit(this.filters.limit).get();

      snaps.docs.forEach(snap => {
        this.filmes.push(new Filme(snap.id, snap.data()));
      });

    } catch (e) {
      console.log("Error getting Filmes: ", e);
    }
  }
}


/*
document.addEventListener('DOMContentLoaded', function () {
  let db = firebase.firestore();
  db.collection('peliculas').get()
    .then(col => {
      console.log(col);
    })
    .catch(e => { console.log(e); });
});
*/
