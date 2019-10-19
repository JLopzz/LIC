function cargarFilmes(id, exhibiendose) {
  let f = new Filmes({
    exhibiendose: !!exhibiendose,
    limit: 5
  });

  window.addEventListener('load', async function () {
    let store = new Storage();
    await f.get();

    for (const filme of f.filmes) {
      let path = await store.getPortada(filme.portada[0]);

      document.getElementById(id).appendChild(
        document.newElement('div', {}, [
          document.newElement('a', { href: `./informacion.html?filme=${filme.id}` }, [
            document.newElement('img', { src: path, alt: filme.titulo })
          ])
        ])
      );
    }

  });
}
