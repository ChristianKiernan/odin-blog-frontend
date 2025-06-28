import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex justify-center items-center bg-gray-500">
        <div className="w-full max-w-3xl mx-auto px-6 py-4">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}




