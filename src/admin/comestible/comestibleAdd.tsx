import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import { Comestible, UploadFile, SUPPORTED_IMG_FORMATS } from "../../data";

const schema = yup.object({
  titulo: yup.string().required(),
  precio: yup.number().required().test("precioValue", "Invalid number", v => (v > 0)),
  descripcion: yup.string().required(),
  imagen: yup.mixed().required()
});

export default class ComestibleAdd extends React.Component<{}, {
  stateForm?: string | boolean
  stateImagen?: string | number
}> {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(values, formik) {
    this.setState({ stateForm: true });

    let { titulo, precio, descripcion, imagen } = values;
    let { stateImagen } = this.state;
    let imagenURL: string;

    //Send imagen
    if (typeof stateImagen === "string") imagenURL = stateImagen;
    else {
      try {
        let url = await UploadFile("comestibles/", imagen,
          state => this.setState({ stateImagen: state }));
        this.setState({ stateImagen: null });

        if (typeof url === "string") {
          imagenURL = url;
          this.setState({ stateImagen: url });
        }
      } catch (e) { console.log(e); }
    }

    if (typeof imagenURL !== "string") {
      this.setState({ stateForm: null });
      return;
    }

    try {
      let comestible = new Comestible(null, {
        titulo, precio, descripcion,
        imagen: imagenURL
      });

      let id = await comestible.push();
      this.setState({ stateForm: id });
    } catch (e) { console.log(e); }
  }

  render() {
    let { stateForm, stateImagen: stateImage } = this.state;
    let msgF = "Submit", msgI = "";

    if (stateForm === true) msgF = `(Procesing)`;
    if (typeof stateForm === "string") msgF = `Saved with id: ${stateForm}`;

    if (typeof stateImage === "string") msgI = "(Send it)";
    if (typeof stateImage === "number") msgI = `(Sending ${stateImage}%)`;

    return (
      <>
        <h1 className="mt-4">Ingresa un nuevo comestible</h1>
        <Formik
          validationSchema={schema}
          onSubmit={this.handleSubmit}
          initialValues={{
            titulo: "",
            precio: 0,
            descipcion: "",
            imagen: null
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
                  <Form.Group as={Col} md={2}>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      name="precio"
                      value={v.precio}
                      onChange={handleChange}
                      isInvalid={t.precio && !!er.precio}
                    />
                    <Form.Control.Feedback type="invalid">{er.precio}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={10}>
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
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="descripcion"
                      value={v.descripcion}
                      onChange={handleChange}
                      isInvalid={t.descripcion && !!er.descripcion}
                    />
                    <Form.Control.Feedback type="invalid">{er.descripcion}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Imagen {msgI}</Form.Label>
                    <Form.Control
                      type="file"
                      name="imagen"
                      accept={SUPPORTED_IMG_FORMATS.join(", ")}
                      onChange={e => {
                        if (!SUPPORTED_IMG_FORMATS.includes(e.target.files[0].type)) {
                          setFieldError("imagen", "Unsupported format");
                          return;
                        }

                        setFieldError("imagen", "");
                        v.imagen = e.target.files[0];
                      }}
                      isInvalid={t.imagen && !!er.imagen}
                      disabled={!!this.state.stateImagen}
                    />
                    <Form.Control.Feedback type="invalid">{er.imagen}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Button type="submit" disabled={!!this.state.stateForm}>
                    {msgF}
                  </Button>
                  {(typeof this.state.stateForm !== "string") ? void 0 :
                    <LinkContainer to="../comestibles/add" exact>
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
