import "./App.css";
import { CurrencyConverter } from "./components/CurrencyConverter/index.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency App</h1>
      </header>
      <CurrencyConverter />
    </div>
  );
}

export default App;
