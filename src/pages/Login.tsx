import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
//import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserInfo } from "../redux/actions";
import { access } from "fs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("email and password", email, password);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/login`,
        { email, password }
      );
      if (response.status >= 200 && response.status <= 299) {
        navigate("/main");
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.token)
        );
        const accessToken = JSON.parse(
          localStorage.getItem("accessToken")!.toString()
        );
        dispatch(setUserInfo(accessToken));
        navigate("/main");
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
            <Form onSubmit={loginHandler}>
              <h5 className="text-center mt-4 mb-4">Log in</h5>

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
                  Login
                </Button>
              </div>
            </Form>
            <main>
              <p className="one mt-4">
                <span>or login with</span>
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

export default Login;
