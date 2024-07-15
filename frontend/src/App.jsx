import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import Upload from '../components/Upload';
import Footer from "../components/Footer"
import FindDermatologists from '../components/FindDermatologists';
import { SignIn } from '../components/SignIn';
// import SignUp from "../components/SignUp"
// import SignIn from "../components/SignIn"
// import UploadData from '../components/UploadData';
// import AccessData from '../components/AccessData';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar/>
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/upload",
    element: (
      <>
        <Navbar />
        <Upload />
        <Footer />
      </>
    ),
  },
  {
    path: "/find-dermatologists",
    element: (
      <>
        <Navbar />
        <FindDermatologists />
        <Footer />
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <Navbar />
        <SignIn />
        <Footer />
      </>
    ),
  },
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
