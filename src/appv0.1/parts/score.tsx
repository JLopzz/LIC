import React from "react";
import { Form } from "react-bootstrap";

export default class ScoreStars extends React.Component<{
  setScore: (n: number) => void
}, {
  score: number
  showing: number
}> {
  liRef1 = React.createRef<HTMLLIElement>();
  liRef2 = React.createRef<HTMLLIElement>();
  liRef3 = React.createRef<HTMLLIElement>();
  liRef4 = React.createRef<HTMLLIElement>();
  liRef5 = React.createRef<HTMLLIElement>();

  constructor(props) {
    super(props);
    this.state = { score: 0, showing: 0 };

    this.resetScore = this.resetScore.bind(this);
    this.temporalFill = this.temporalFill.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  resetScore() {
    this.setState({ showing: this.state.score });
  }

  temporalFill(n: number) {
    this.setState({ showing: n });
  }

  setScore(n: number) {
    this.setState({ score: n, showing: n });
    this.props.setScore(n);
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="scoreStars">
          <ScoreStar filled={this.state.showing >= 1}
            onClick={() => this.setScore(1)}
            onMouseEnter={() => this.temporalFill(1)}
            onMouseLeave={this.resetScore}
          />
          <ScoreStar filled={this.state.showing >= 2}
            onClick={() => this.setScore(2)}
            onMouseEnter={() => this.temporalFill(2)}
            onMouseLeave={this.resetScore}
          />
          <ScoreStar filled={this.state.showing >= 3}
            onClick={() => this.setScore(3)}
            onMouseEnter={() => this.temporalFill(3)}
            onMouseLeave={this.resetScore}
          />
          <ScoreStar filled={this.state.showing >= 4}
            onClick={() => this.setScore(4)}
            onMouseEnter={() => this.temporalFill(4)}
            onMouseLeave={this.resetScore}
          />
          <ScoreStar filled={this.state.showing == 5}
            onClick={() => this.setScore(5)}
            onMouseEnter={() => this.temporalFill(5)}
            onMouseLeave={this.resetScore}
          />
        </Form.Group>
      </Form>
    );
  }
}

export class ScoreStar extends React.Component<{
  filled: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}> {
  render() {
    let { filled, onClick, onMouseEnter, onMouseLeave } = this.props;
    return (
      <li className="d-inline-block align-top bg-first"
        onClick={(onClick instanceof Function) ? onClick : void 0}
        onMouseEnter={(onMouseEnter instanceof Function) ? onMouseEnter : void 0}
        onMouseLeave={(onMouseLeave instanceof Function) ? onMouseLeave : void 0}
      >
        <img src={`../resources/score_star_${(filled) ? "full" : "empty"}.png`}
          width="30" height="30"
        />
      </li>
    );
  }
}
