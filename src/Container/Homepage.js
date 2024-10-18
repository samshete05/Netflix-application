import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import video from '../Videos/nakhrewali.mp4';
import bg from "../Images/netflixg.jpg";

const Homepage = () => {
  const navigate = useNavigate();
  const [emailaddress, setemailaddress] = useState("");
  const [password, setpassword] = useState("");


  const handlelogin = async (event) => {
    event.preventDefault(); 
    let Data = {
      emailaddress: emailaddress,
      password: password,
    };
    // console.log(Data);
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailaddress, password }),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        alert("Login Failed.")
        return; 
      } else {
        localStorage.setItem('token',responseData.token)
        navigate('/video');
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    }
  };

  return (
    <div className="relative">
      <img
        className="absolute w-full object-cover z-0"
        src={bg} alt="Background"
      />
      <div className="absolute inset-0 bg-black opacity-30 z-10" /> {/* Overlay for opacity */}

      <nav className="relative z-20">
        <ul className="flex justify-between p-4">
          <li className="text-red-600 text-5xl font-bold ml-44">NETFLIX</li>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">Language</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/">English</Dropdown.Item>
              <Dropdown.Item href="/hindi">Hindi</Dropdown.Item>
              <Dropdown.Item href="/spanish">Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button className="bg-red-500 text-white p-3 py-2 rounded-none">
            <a href="/signup" className="text-white underline-offset-auto">SIGNUP</a>
          </button>
        </ul>
      </nav>
      <div className="relative text-center mt-44 z-20">
        <div className="text-5xl font-bold text-white uppercase">
          Unlimited movies, TV shows, and more
        </div>
        <br />
        <h4 className="text-2xl font-semibold text-white">
          Watch anywhere. Cancel anytime.
        </h4>
        <br />
        <h4 className="text-base font-semibold text-white">
          Ready to watch? Enter your email to create or restart your membership.
        </h4>
        <div className="mt-10 flex justify-center space-x-3">
          <Form.Floating className="mb-3">
            <Form.Control id="floatinginputCustom" type="email" placeholder="name@example.com" value={emailaddress} onChange={(e) => setemailaddress(e.target.value)} />
            <label htmlFor="floatingInputCustom">Email address</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control id="floatingInputCustom" type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
            <label htmlFor="floatingInputCustom">Password</label>
          </Form.Floating>
          <button className="bg-red-500 text-white p-2 rounded" onClick={handlelogin} type='submit'>
            Get Started >
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
