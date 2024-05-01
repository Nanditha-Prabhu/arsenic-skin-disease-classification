import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "../components/Navbar"
import Home from "../components/Home"
// import SignUp from "../components/SignUp"
// import SignIn from "../components/SignIn"
// import Footer from "../components/Footer"
// import UploadData from '../components/UploadData';
// import AccessData from '../components/AccessData';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
  // {
  //   path: "/SignIn",
  //   element: (
  //     <>
  //       <Navbar />
  //       <SignIn />
  //       <Footer />
  //     </>
  //   ),
  // },
  // {
  //   path: "/SignUp",
  //   element: (
  //     <>
  //       <Navbar />
  //       <SignUp />
  //       <Footer />
  //     </>
  //   ),
  // },
  // {
  //   path: "/Access_Data",
  //   element: (
  //     <>
  //       <Navbar />
  //       <AccessData/>
  //       <Footer />
  //     </>
  //   ),
  // },
  // {
  //   path: "/Upload_Data",
  //   element: (
  //     <>
  //       <Navbar />
  //       <UploadData/>
  //       <Footer />
  //     </>
  //   ),
  // },
  // {
  //   path: "/Privacy_Regulations",
  //   element: (
  //     <>
  //       <Navbar />
  //       <Footer />
  //     </>
  //   ),
  // },
  
]);

export default function App() {
  return <RouterProvider router={router} />;
}
