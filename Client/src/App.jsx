/* This is container for home landing page */
import { TodoProvider } from "./context/todoContext";
import Home from "./pages/home";

export default function App() {
  return (
    <TodoProvider>
      <div className="container py-4">
        <Home />
      </div>
    </TodoProvider>
  );
}
