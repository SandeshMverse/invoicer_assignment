import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;