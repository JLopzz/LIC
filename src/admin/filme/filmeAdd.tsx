import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import * as firebase from "firebase/app";
import { Filme, UploadFile, SUPPORTED_IMG_FORMATS } from "../../data";

const schema = yup.object({
  titulo: yup.string().required(),
  estreno: yup.string().required()
    .test("dateFormat", "Invalid date", v => /^([0-9]{4}\-[0-9]{2}\-[0-9]{2})$/g.test(v)),
  exhibiendose: yup.bool(),
  sinopsis: yup.string().required(),
  trailer: yup.string().required(),
  portada: yup.mixed().required(),
  imagenes: yup.mixed().required()
});

export default class FilmAdd extends React.Component<{}, {
  stateForm?: string | boolean
  statePortada?: string | number
  stateImagenes?: string[] | number
}> {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(values, formik) {
    this.setState({ stateForm: true });

    let { titulo, estreno, exhibiendose, sinopsis, trailer, portada, imagenes } = values;
    let { statePortada, stateImagenes } = this.state;
    let portadaURL: string, imagenesURL: string[];

    // Send images first
    if (typeof statePortada === "string") portadaURL = statePortada;
    else {
      try {
        let url = await UploadFile("filmes/portada/", portada, state => this.setState({ statePortada: state }));
        this.setState({ statePortada: null });

        if (typeof url === "string") {
          portadaURL = url;
          this.setState({ statePortada: url });
        }
      } catch (e) { console.log(e); }
    }

    if (Array.isArray(stateImagenes)) imagenesURL = stateImagenes;
    else {
      this.setState({ stateImagenes: 0 });
      imagenesURL = [];

      for (const k in imagenes) {
        if (imagenes.hasOwnProperty(k)) {
          try {
            let url = await UploadFile("filmes/img/", imagenes[k]);
            this.setState({ stateImagenes: null });

            if (typeof url === "string") {
              imagenesURL.push(url);
              this.setState({ stateImagenes: parseInt(k) + 1 });
            }
          } catch (e) { console.log(e); }
        }
      }

      this.setState({ stateImagenes: imagenesURL });
    }

    if (typeof portadaURL !== "string" || !Array.isArray(imagenesURL) || typeof imagenesURL[0] !== "string") {
      this.setState({ stateForm: null });
      return;
    }

    // Second send the file info
    let [year, month, day]: string[] = estreno.split("-");

    try {
      let filme = new Filme(null, {
        titulo, exhibiendose, sinopsis, trailer,
        portada: portadaURL,
        imagenes: imagenesURL,
        estreno: firebase.firestore.Timestamp.fromDate(new Date(parseInt(year), parseInt(month), parseInt(day))),
      });

      let id = await filme.push();
      this.setState({ stateForm: id });
    } catch (e) { console.log(e); }

    // end cycle
    formik.setSubmitting(false);
  }

  render() {
    let { stateForm, statePortada, stateImagenes } = this.state;
    let msgF = "Submit", msgP = "", msgI = "";

    if (stateForm === true) msgF = `(Procesing)`;
    if (typeof stateForm === "string") msgF = `Saved with id: ${stateForm}`;

    if (typeof statePortada === "string") msgP = "(Send it)";
    if (typeof statePortada === "number") msgP = `(Sending ${statePortada}%)`;

    if (Array.isArray(stateImagenes)) msgI = "(Send it)";
    if (typeof stateImagenes === "number") msgI = `(Sending #${stateImagenes})`;

    return (
      <>
        <h1 className="mt-4">Ingresa un nuevo filme</h1>
        <Formik
          validationSchema={schema}
          onSubmit={this.handleSubmit}
          initialValues={{
            titulo: "",
            estreno: "",
            exhibiendose: false,
            sinopsis: "",
            trailer: "",
            portada: null,
            imagenes: null
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldError,
            touched: t,
            values: v,
            errors: er
          }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      type="text"
                      name="titulo"
                      value={v.titulo}
                      onChange={handleChange}
                      isInvalid={t.titulo && !!er.titulo}
                    />
                    <Form.Control.Feedback type="invalid">{er.titulo}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label>Fecha de estreno</Form.Label>
                    <Form.Control
                      type="date"
                      name="estreno"
                      value={v.estreno}
                      onChange={handleChange}
                      isInvalid={t.estreno && !!er.estreno}
                    />
                    <Form.Control.Feedback type="invalid">{er.estreno}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label>¿Esta en exhibicion?</Form.Label>
                    <Form.Check
                      type="checkbox"
                      name="exhibiendose"
                      label="Exhibiendose"
                      feedback={er.exhibiendose}
                      onChange={e => {
                        v.exhibiendose = e.target.checked;
                      }}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Sinopsis</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="sinopsis"
                      value={v.sinopsis}
                      onChange={handleChange}
                      isInvalid={t.sinopsis && !!er.sinopsis}
                    />
                    <Form.Control.Feedback type="invalid">{er.sinopsis}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Trailer</Form.Label>
                    <Form.Control
                      type="text"
                      name="trailer"
                      value={v.trailer}
                      onChange={handleChange}
                      isInvalid={t.trailer && !!er.trailer}
                    />
                    <Form.Control.Feedback type="invalid">{er.trailer}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Portada {msgP}</Form.Label>
                    <Form.Control
                      type="file"
                      name="portada"
                      accept={SUPPORTED_IMG_FORMATS.join(", ")}
                      onChange={e => {
                        if (!SUPPORTED_IMG_FORMATS.includes(e.target.files[0].type)) {
                          setFieldError("portada", "Unsupported format");
                          return;
                        }

                        setFieldError("portada", "");
                        v.portada = e.target.files[0];
                      }}
                      isInvalid={t.portada && !!er.portada}
                      disabled={!!this.state.statePortada}
                    />
                    <Form.Control.Feedback type="invalid">{er.portada}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Imagenes {msgI}</Form.Label>
                    <Form.Control
                      type="file"
                      name="imagenes"
                      accept={SUPPORTED_IMG_FORMATS.join(", ")}
                      onChange={e => {
                        for (const k in e.target.files) {
                          if (e.target.files.hasOwnProperty(k)) {
                            if (!SUPPORTED_IMG_FORMATS.includes(e.target.files[k].type)) {
                              setFieldError("imagenes", "Unsupported format");
                              return;
                            }
                          }
                        }

                        setFieldError("imagenes", "");
                        v.imagenes = e.target.files;
                      }}
                      isInvalid={t.imagenes && !!er.imagenes}
                      disabled={!!this.state.stateImagenes}
                      multiple
                    />
                    <Form.Control.Feedback type="invalid">{er.imagenes}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Button type="submit" disabled={!!this.state.stateForm}>{msgF}</Button>
                  {(typeof this.state.stateForm !== "string") ? void 0 :
                    <LinkContainer to="../filmes/add" exact>
                      <Button type="button" className="ml-5">
                        Ingresar otro
                      </Button>
                    </LinkContainer>
                  }
                </Form.Row>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
