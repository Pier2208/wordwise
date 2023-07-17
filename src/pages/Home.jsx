import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div>
      <Nav />
      <h1>worldwise</h1>
      <Link to="app">Go to the app</Link>
    </div>
  );
}
