import "./App.scss";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page/HomePage";
import TransactionPage from "./pages/transaction-page/TransactionPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transaction/:acc" element={<TransactionPage />} />
      </Routes>
    </div>
  );
}

export default App;
