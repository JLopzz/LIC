import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Container } from "react-bootstrap";
import uuid from "uuid-random";

class Content extends React.Component<{
  location: any
  prefixedFile: string
  def: React.ComponentClass
  pages: {
    [key: string]: React.ComponentClass
  }
}> {
  constructor(props: any) {
    super(props);
    this.state = { selected: Object.keys(props.pages)[0] }
  }

  render() {
    let { location, prefixedFile, def, pages } = this.props;

    return (
      <TransitionGroup className="transitionWindow">
        <CSSTransition classNames="window"
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
        >
          <Container fluid>
            <Switch location={location}>
              {Object.keys(pages).map((route, i) => {
                let page = pages[route];

                return <Route exact
                  key={uuid()}
                  path={`${prefixedFile}${route}`}
                  component={page}
                />;
              })}

              <Route path={prefixedFile} component={def} />
            </Switch>
          </Container>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(Content);
