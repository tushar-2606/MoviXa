import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBooking from "./pages/MyBooking";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer"
import { Toaster }  from 'react-hot-toast';

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetails />} />
        <Route path="/Movies/:id/:date" element={<SeatLayout />} />
        <Route path="/MyBooking" element={<MyBooking />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
       {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
