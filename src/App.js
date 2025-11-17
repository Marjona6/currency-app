import { Container } from "@mui/material";
import "./App.css";
import { CurrencyTable } from "./components/Table/index.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency App</h1>
      </header>
      <Container maxWidth="lg" className="App-container">
        <CurrencyTable />
      </Container>
    </div>
  );
}

export default App;
