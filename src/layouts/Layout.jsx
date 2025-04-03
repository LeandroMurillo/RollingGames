import { Outlet } from 'react-router';
import Navbar from '../components/CustomNavbar';
import Footer from '../components/Footer';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
