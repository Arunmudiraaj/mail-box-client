import React from "react";
import { Col, Container, Row } from "react-bootstrap";
const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h4 className="mt-4">Get Started With Mail Box:</h4>

          <div className="p-2 mx-4">
            Mail Box is the best way to message your friends family. Message
            your near and dear ones and stay connected to them even if you are
            far away. Create an account now and start sending mails {":)"}{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
