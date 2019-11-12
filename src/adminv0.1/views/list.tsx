import React from "react";
import { Table } from "react-bootstrap";
import uuid from "uuid-random";

export type Normalize<C extends {}, T> = {
  [K in keyof C]: T
}
export type Extend<A extends []> = {
  [K in keyof A]: string
}

export default class ListTable extends React.Component<{
  title: string
  columns: string[]
  data: Array<Array<string>>
}> {
  render() {
    let { title, columns, data } = this.props;

    return (
      <>
        <h1>{title}</h1>
        <Table striped bordered>
          <thead>
            <tr>
              {columns.map(col => <th key={uuid()}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map(row => {
              let tds = [];
              for (const field in row) {
                if (row.hasOwnProperty(field)) {
                  tds.push(row[field]);
                }
              }

              return (
                <tr key={uuid()} >
                  {tds.map(f => <td key={uuid()}>{f}</td>)}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              {columns.map(col => <th key={uuid()}>{col}</th>)}
            </tr>
          </tfoot>
        </Table>
      </>
    );
  }
}
