/**
 * Advenced creation of HTMLNodes
 */
document.newElement = (type, attr, childs) => {
  let name = Object.trueType(type) == "string" ? type : "div";
  let attrs = {}, childrens = [];

  if (!!attr) {
    if (Object.trueType(attr) == "object") {
      attrs = attr;
      if (!!childs && Array.isArray(childs)) childrens = childs;
      else if (!!childs) childrens = [childs];
    }
    else if (Array.isArray(attr)) childrens = attr;
    else childrens = [attr];
  }

  let res = document.createElement(name);

  for (const a in attrs) {
    if (attrs.hasOwnProperty(a)) {
      if (a.slice(0, 2) == "on") res.addEventListener(a.slice(2), attrs[a]);
      res[a] = attrs[a];
    }
  }

  for (const c of childrens) {
    if (Object.trueType(c, "string")) res.appendChild(document.createTextNode(c));
    else {
      //console.log(c);
      res.appendChild(c);
    }
  }

  return res;
}

/**
 * Date formatter
 */
Date.prototype.format = function (str) {
  if (!Object.trueType(str, "string")) return this.toString();

  let labelDay = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  let labelMonth = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let res = new String(str).toString();
  res = res.replace("dd", this.getDate());
  res = res.replace("DD", labelDay[this.getDay()]);
  res = res.replace("mm", this.getMonth() + 1);
  res = res.replace("MM", labelMonth[this.getMonth()]);
  res = res.replace("yyyy", this.getFullYear());

  return res;
}

/**
 * Return the trueType of a value
 */
Object.trueType = function (obj, type) {
  let res = "";
  if (obj === null) res = "null";
  else if (obj === undefined) res = "undefined";
  else res = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

  if (!!type) return res === type;
  return res;
}

/**
 * Check fields in a object
 */
Object.check = function (obj, fields) {
  if (Object.trueType(obj) != "object") return false;
  if (!Array.isArray(fields)) return false;

  fields.forEach(f => {
    if (Object.trueType(f) != "string") return false;
    if (!obj.hasOwnProperty(f)) return false;
  });

  return true;
}

// -------------------------------------------------------------------

//firebase.storage().ref("/path/to/ref").getDownloadURL().then(() => { });
function Storage() {
  store = firebase.storage();

  this.getPortada = async (name) => {
    try {
      return await store.ref(`/filmes/portada/${name}`).getDownloadURL();
    } catch (e) {
      console.log("Not found ref: ", e);
      return "not found";
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
  if (Object.trueType(id) != "string") throw new Error("Filme 'id' should be string.");
  this.id = id;

  this.loaded = Object.check(args, ["exhibiendose", "titulo", "estreno", "sinopsis", "trailer", "portada"]);

  if (this.loaded) {
    this.exhibiendose = args.exhibiendose;
    this.titulo = args.titulo;
    this.estreno = args.estreno.toDate();
    this.sinopsis = args.sinopsis;
    this.trailer = args.trailer;
    this.portada = args.portada;
  }

  this.get = async () => {
    try {
      let snap = await firebase.firestore().collection("peliculas").doc(this.id).get();

      if (!snap.exists) throw new Error("document doesn't exists");
      let data = snap.data();

      this.exhibiendose = data.exhibiendose;
      this.titulo = data.titulo;
      this.estreno = data.estreno.toDate();
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
  this.filters.startAt = !isNaN(parseInt(filters.startAt)) ? parseInt(filters.startAt) : 0;
  this.filters.limit = !isNaN(parseInt(filters.limit)) ? parseInt(filters.limit) : 10;
  this.filters.exhibiendose = (filters.exhibiendose !== undefined) ? !!filters.exhibiendose : null; /* null: cualquiera, true: si, false: no */

  this.get = async () => {
    let col = firebase.firestore().collection("peliculas");
    let promise = col;

    if (this.filters.exhibiendose !== null) promise = promise.where("exhibiendose", "==", !!this.filters.exhibiendose)

    this.filmes = [];
    try {
      let snaps = await promise.orderBy("estreno", "asc").startAt(this.filters.startAt).limit(this.filters.limit).get();

      snaps.docs.forEach(snap => {
        this.filmes.push(new Filme(snap.id, snap.data()));
      });

    } catch (e) {
      console.log("Error getting Filmes: ", e);
    }
  }
}


/*
document.addEventListener("DOMContentLoaded", function () {
  let db = firebase.firestore();
  db.collection("peliculas").get()
    .then(col => {
      console.log(col);
    })
    .catch(e => { console.log(e); });
});
*/
