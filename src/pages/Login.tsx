import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
//import "./Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { loginUser } from "../redux/actions";
import { useDispatch } from "react-redux";

const Login = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
 const loginHandler = (e: React.SyntheticEvent) => {
  e.preventDefault()
  dispatch(loginUser({name, email, password}))
 }
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

              <Form.Group controlId="formPhoneNumber" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your name" value={name} onChange={(e)=> setName(e.target.value)}  />
              </Form.Group>

              <hr />

              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}  />
              </Form.Group>

              <hr />

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="mb-3"
                  value={password} onChange={(e)=> setPassword(e.target.value)} 
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
            <p className="one mt-4"><span>or login with</span></p>
            <a href={`${process.env.REACT_APP_BE_URL}/users/auth/google`}><i className="bi bi-google signUpLogo mx-3"></i></a>
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
