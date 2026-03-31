import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }: any) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container-fluid mt-3 px-2">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
