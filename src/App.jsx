import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  </div>
);

export default App;
