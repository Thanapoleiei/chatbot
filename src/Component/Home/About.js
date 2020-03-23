import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../Home/Home.css";
import Navigators from "../Navigators/Navigators";

class About extends Component {
  render() {
    return (
      <div className="about">
        <Navigators />
        <Container>
          <Row>
            <Col className="text-cont-about">
              <h1 className="comming">Coming Soon..</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default About;
