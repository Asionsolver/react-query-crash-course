import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
const AppLayout = () => {
  return (
    <div className="min-h-screen w-screen bg-[#030711] text-white">
      <main className="flex grow flex-col font-epilogue">
        <Header />
            <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;