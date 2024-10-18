// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Container/Homepage";
import Signup from "./Container/Signup";
// import Content from "./Container/Content";
import VideoComponent from './Container/VideoComponent';
import Hindi from './Container/Hindi';
import Spanish from "./Container/Spanish";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage /> 
                <br /> 
                <br /> 
                <br /> 
                <br />
                {/* <Content /> */}
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/video" element={ <VideoComponent />} />
          <Route path="/hindi" element={<Hindi />} />
          <Route path="/english" element={<Homepage />} />
          <Route path="/spanish" element={<Spanish />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
