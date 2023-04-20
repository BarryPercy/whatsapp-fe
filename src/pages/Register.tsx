import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import "../css/Register.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/account`,
        { name, email, password }
      );
      if (response.status >= 200 && response.status <= 299) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <div className="whatsappLogo text-center">
              <i className="bi bi-whatsapp topLogo"></i>
              <div className="logoText">Whatsapp</div>
            </div>
            <Form onSubmit={registrationHandler}>
              <h5 className="text-center mt-4 mb-4">Create a New Account</h5>

              <Form.Group controlId="formPhoneNumber" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <hr />

              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <hr />

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <hr />
              <div className="text-center">
                <Button
                  variant="success"
                  type="submit"
                  className="registerButton"
                >
                  Sign Up
                </Button>
              </div>
            </Form>
            <main>
              <p className="one mt-4">
                <span>or sign up with</span>
              </p>
              <a href={`${process.env.REACT_APP_BACKEND}/users/auth/google`}>
                <i className="bi bi-google signUpLogo mx-3"></i>
              </a>
              <i className="bi bi-facebook signUpLogo mx-3"></i>
              <i className="bi bi-instagram signUpLogo mx-3"></i>
            </main>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
