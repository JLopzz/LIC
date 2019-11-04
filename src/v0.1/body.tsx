import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Container from "react-bootstrap/Container";

class Body extends React.Component<{
  location: any
  pages: {
    [key: string]: [string, React.ComponentClass]
  }
}> {
  constructor(props: any) {
    super(props);
    this.state = { selected: Object.keys(props.pages)[0] }
  }

  render() {
    let location = this.props.location;

    return (
      <section className="bg-first">
        <TransitionGroup className="transitionWindow">
          <CSSTransition key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="window"
          >
            <Container fluid={true} id="container">
              <Switch location={location}>
                {Object.keys(this.props.pages).map((key, i) => {
                  let [route, page] = this.props.pages[key];

                  if (i === 0)
                    return <Route key={key} path={route} component={page} exact />;
                  return <Route key={key} path={route} component={page} />;
                })}
              </Switch>
            </Container>
          </CSSTransition>
        </TransitionGroup>
      </section>
    );
  }
}

export default withRouter(Body);
