import "./App.css";
import Header from "./components/Header";
import Particle from "./components/Particles/Particle";
import Todos from "./components/Todos/Todos";

function App() {
  return (
    <>
      <Particle />
      <Header />
      <Todos />
    </>
  );
}

export default App;
