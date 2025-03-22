import { BrowserRouter, Route, Routes } from "react-router";
//import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Register />} /> */}
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
