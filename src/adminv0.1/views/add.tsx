import React from "react";
import { Form, Row, Button, InputGroup } from "react-bootstrap";
import uuid from "uuid-random";

type ExtendInput<T> = {
  [k in keyof T]: T[k]
} & {
  id: string
  label: string
  help?: string

  valid?: boolean
  check?: (id: string, value: any) => void
}

type inputSelect = ExtendInput<{
  type: "select"
  options: string[]
}>
type inputFile = ExtendInput<{
  type: "file"
  multiple?: boolean
  accept?: string
}>
type inputCheckbox = ExtendInput<{
  type: "checkbox"
}>
type inputRadio = ExtendInput<{
  type: "radio"
  options: string[]
}>
type inputText = ExtendInput<{
  type: "text" | string
}>

type Inputs = inputSelect | inputFile | inputCheckbox | inputRadio | inputText;

export default class AddView extends React.Component<{
  title: string
  fields: Array<Inputs>
  submit?: (values: { [field: string]: any }) => boolean
}> {
  private Fields: Array<[string, React.RefObject<HTMLInputElement | HTMLTextAreaElement>]>

  constructor(props) {
    super(props);
    this.checkValue = this.checkValue.bind(this);
    this.send = this.send.bind(this);
  }

  checkValue(id: string, t: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) {
    let field = this.props.fields.find(f => f.id === id);

    if (field.check instanceof Function)
      field.check(id, t.value);
  }

  send() {
    let values = {};

    this.props.fields.forEach(f => {
      let ref = this.Fields.find(fi => fi[0] === f.id);

      if (f.type === "file") values[f.id] = ref[1].current;

      values[f.id] = ref[1].current.value;
    });

    console.log(values);

    if (this.props.submit)
      this.props.submit(values);
  }

  render() {
    this.Fields = [];
    let { title, fields } = this.props;

    return (
      <>
        <h1 className="mt-4">{title}</h1>
        <Form>
          {fields.map(f => {
            let {
              id, type, label, help,
              valid = true,
              check
            } = f;

            /**
             * Return FileInput
             */

            let ref = React.createRef<HTMLInputElement>();
            this.Fields.push([id, ref]);

            let { multiple, accept } = (f as inputFile);

            if (type === "file") {
              return (
                <div key={uuid()} className="form-group row">
                  <label htmlFor={`inputfile${id}`}
                    className="col-form-label col-sm-2" children={label} />
                  <input type={type} id={`inputfile${id}`} ref={ref}
                    multiple={(multiple) ? multiple : false}
                    accept={(accept) ? accept : "*"}
                  />
                </div>
              );
            }

            /**
             * Return CheckboxInput
             */

            if (type === "checkbox")
              return (
                <div key={uuid()} className="form-group row">
                  <div className="form-check">
                    <input type={type} id={`cb${id}`} ref={ref} className="form-check-input" />
                    <label htmlFor={`cb${id}`}
                      className="form-check-label" children={label} />
                  </div>
                </div>
              );

            /**
             * Return general
             */

            return (
              <div key={uuid()} className="form-group row">
                <label htmlFor={`input${id}`}
                  className="col-form-label col-sm-2" children={label} />
                <input type={type} id={`input${id}`} ref={ref}
                  className="form-control col-sm-10"
                  onBlur={e => this.checkValue(id, e.target)} />
              </div>
            );
          })}
          <Button type="button" onClick={this.send}>Submit</Button>
        </Form>
      </>
    );
  }
}
