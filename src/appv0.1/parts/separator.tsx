import React from "react";
import Row from "react-bootstrap/Row";
import "./separator.scss";

export default class Separator extends React.Component<{
  title: string
}> {
  render() {
    return (
      <Row className="justify-content-center separator">
        <h2 className="text-center text-second mt-4">{this.props.title}</h2>
        <hr />
      </Row>
    );
  }
}
