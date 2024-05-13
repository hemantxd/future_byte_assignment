import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { Create } from "./pages/Create";
import { SingleResume } from "./pages/SingleResume";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="home/resume/:id" element={<SingleResume />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App