import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import netflixImage from "../Images/netflixbg.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  
  const [emailaddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});


  const handleSubmit = async (event) => {
    event.preventDefault();

    const signupData = {
      emailaddress,
      password,
      useraddress: address,
      usercity: city,
      userpincode: pincode,
      userstate: state,
    };

    const validationErrors = {}; //set
    if (!emailaddress) validationErrors.emailaddress = "Email is required.";
    if (!password) validationErrors.password = "Password is required.";
    if (!address) validationErrors.useraddress = "Address is required.";
    if (!city) validationErrors.usercity = "City is required.";
    if (!state) validationErrors.userstate = "State is required.";
    if (!pincode) validationErrors.userpincode = "PinCode is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }

    console.log(signupData);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      
      const data = await response.json();
      console.log(data);

      if (data.status === "error") {
        setErrors({ emailaddress: data.error });
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  return (
    <div>
      <img
        src={netflixImage}
        alt="Background"
        className="absolute top-0 left-0 right-0 w-full h-full object-cover z-0"
      />
      <h2 className="text-red-600 z-10 relative text-5xl font-bold ml-44">NETFLIX</h2>

      <Form
        className="z-10 absolute bg-opacity-75 bg-zinc-900 px-16 py-12 ml-80 mt-36"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl relative text-white mb-9 font-bold">Sign Up</h2>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Control
              type="email"
              placeholder="example@gmail.com"
              name="email"
              required
              isInvalid={!!errors.emailaddress}
              onChange={(e) => {
                setEmailAddress(e.target.value);
                setErrors((prev) => ({ ...prev, emailaddress: null }));
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.emailaddress}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              isInvalid={!!errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: null }));
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Form.Control
          className="mt-4 py-2"
          placeholder="12, Main Street St"
          name="useraddress"
          required
          isInvalid={!!errors.useraddress}
          onChange={(e) => {
            setAddress(e.target.value);
            setErrors((prev) => ({ ...prev, useraddress: null }));
          }}
        />
        <Form.Control.Feedback type="invalid">{errors.useraddress}</Form.Control.Feedback>
        
        <Row>
          <Form.Group as={Col}>
            <Form.Control
              className="mt-4"
              placeholder="City"
              name="usercity"
              type="text"
              required
              isInvalid={!!errors.usercity}
              onChange={(e) => {
                setCity(e.target.value);
                setErrors((prev) => ({ ...prev, usercity: null }));
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.usercity}</Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col}>
            <Form.Select
              className="mt-4"
              name="userstate"
              required
              isInvalid={!!errors.userstate}
              onChange={(e) => {
                setState(e.target.value);
                setErrors((prev) => ({ ...prev, userstate: null }));
              }}
            >
              <option value="">Choose...</option>
              <option>Andhra Pradesh</option>
              <option>Chandigarh</option>
              <option>Delhi</option>
              <option>Gujarat</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Uttar Pradesh</option>
              <option>Maharashtra</option>
              <option>Rajasthan</option>
              <option>Madhya Pradesh</option>
              <option>Tamil Nadu</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.userstate}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Control
              className="mt-4"
              placeholder="PinCode"
              type="number"
              name="userpincode"
              required
              isInvalid={!!errors.userpincode}
              onChange={(e) => {
                setPincode(e.target.value);
                setErrors((prev) => ({ ...prev, userpincode: null }));
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.userpincode}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            className="mt-4 text-slate-50"
            label="Check me out"
          />
        </Form.Group>

        <div className="d-grid">
          <Button variant="danger" size="lg" type="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;

