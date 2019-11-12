import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import uuid from "uuid-random";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];

const schema = yup.object({
  titulo: yup.string().required(),
  estreno: yup.string().required()
    .test("dateFormat", "Invalid date", v => /^([0-9]{4}\-[0-9]{2}\-[0-9]{2})$/g.test(v)),
  exhibiendose: yup.bool(),
  sinopsis: yup.string().required(),
  trailer: yup.string().required(),
})

export default class FilmAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //let [year, month, day]: string[] = e.value.split("-");
  //this.setState({ estreno: new Date(parseInt(year), parseInt(month) - 1, parseInt(day)) })

  handleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <>
        <h1 className="mt-4">Ingresa un nuevo filme.</h1>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
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
            values,
            errors
          }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      type="text"
                      name="titulo"
                      value={values.titulo}
                      onChange={handleChange}
                      isInvalid={!!errors.titulo}
                    />
                    <Form.Control.Feedback type="invalid">{errors.titulo}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Fecha de estreno</Form.Label>
                    <Form.Control
                      type="date"
                      name="estreno"
                      value={values.estreno}
                      onChange={handleChange}
                      isInvalid={!!errors.estreno}
                    />
                    <Form.Control.Feedback type="invalid">{errors.estreno}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>¿Esta en exhibicion?</Form.Label>
                    <Form.Check
                      type="checkbox"
                      name="exhibiendose"
                      label="Exhibiendose"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Sinopsis</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="sinopsis"
                      value={values.sinopsis}
                      onChange={handleChange}
                      isInvalid={!!errors.sinopsis}
                    />
                    <Form.Control.Feedback type="invalid">{errors.sinopsis}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Trailer</Form.Label>
                    <Form.Control
                      type="text"
                      name="trailer"
                      value={values.trailer}
                      onChange={handleChange}
                      isInvalid={!!errors.trailer}
                    />
                    <Form.Control.Feedback type="invalid">{errors.trailer}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Portada</Form.Label>
                    <Form.Control
                      type="file"
                      name="portada"
                      accept={SUPPORTED_FORMATS.join(", ")}
                      onChange={handleChange}
                      isInvalid={!!errors.portada}
                    />
                    <Form.Control.Feedback type="invalid">{errors.portada}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Imagenes</Form.Label>
                    <Form.Control
                      type="file"
                      name="imagenes"
                      accept={SUPPORTED_FORMATS.join(", ")}
                      onChange={(e) => {
                        console.log(e.target.files);

                        for (const k in e.target.files) {
                          if (e.target.files.hasOwnProperty(k)) {
                            console.log(e.target.files[k]);
                            if (!SUPPORTED_FORMATS.includes(e.target.files[k].type))
                              handleChange
                          }
                        }

                        if (!errors.imagenes) values.imagenes = e.target.files;
                      }}
                      isInvalid={!!errors.imagenes}
                      multiple
                    />
                    <Form.Control.Feedback type="invalid">{errors.imagenes}</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Button type="submit">Submit</Button>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
