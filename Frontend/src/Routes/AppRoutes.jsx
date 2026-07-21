import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Events from "../Pages/Events";
import Admission from "../Pages/Admission";
import Contact from "../Pages/Contact";
import Login from "../Pages/Login";
import Signup from "../Pages/signup";
import ForgotPassword from "../Pages/ForgotPassword";
import FAQ from "../Pages/FAQ";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Terms from "../Pages/Terms";
import StudentPages from "../Pages/StudentPages";
import SessionDetails from "../Pages/SessionDetails";
import ApplicationForm from "../Pages/ApplicationForm";
import EnquiryForm from "../Pages/EnquiryForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/admission" element={<Admission />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/students" element={<StudentPages />} />
      <Route path="/sessions" element={<SessionDetails />} />
      <Route path="/application" element={<ApplicationForm />} />
      <Route path="/enquiry" element={<EnquiryForm />} />
    </Routes>
  );
}

export default AppRoutes;