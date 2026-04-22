import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <div className="pageWrapper">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

