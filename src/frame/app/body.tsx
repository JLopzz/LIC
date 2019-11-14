import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Container from "react-bootstrap/Container";
import uuid from "uuid-random";

class Body extends React.Component<{
  location: any
  def: React.ComponentClass
  pages: {
    [key: string]: React.ComponentClass
  }
}> {
  render() {
    let { location, def, pages } = this.props;

    return (
      <section className="bg-first pb-3">
        <TransitionGroup className="transitionWindow">
          <CSSTransition key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="window"
          >
            <Container fluid id="container">
              <Switch location={location}>
                {Object.keys(pages).map((route, i) => {
                  let page = pages[route];

                  return <Route exact
                    key={uuid()}
                    path={route}
                    component={page}
                  />;
                })}

                <Route path="/" component={def} />
              </Switch>
            </Container>
          </CSSTransition>
        </TransitionGroup>
      </section>
    );
  }
}

export default withRouter(Body);
