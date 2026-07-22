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
import Instructors from "../Pages/Instructors";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ManageEvents from "../Pages/Admin/ManageEvents";
import ManageClasses from "../Pages/Admin/ManageClasses";
import ManageInstructors from "../Pages/Admin/ManageInstructors";
import ManageStudents from "../Pages/Admin/ManageStudents";
import ManageContent from "../Pages/Admin/ManageContent";
import ManageGallery from "../Pages/Admin/ManageGallery";
import ProtectedRoute from "../Components/ProtectedRoute";

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
      
      {/* Protected Student Routes */}
      <Route path="/students" element={
        <ProtectedRoute>
          <StudentPages />
        </ProtectedRoute>
      } />
      <Route path="/sessions" element={<SessionDetails />} />
      <Route path="/application" element={<ApplicationForm />} />
      <Route path="/enquiry" element={<EnquiryForm />} />
      <Route path="/instructors" element={<Instructors />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="Admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/students" element={
        <ProtectedRoute requiredRole="Admin">
          <ManageStudents />
        </ProtectedRoute>
      } />
      <Route path="/admin/events" element={
        <ProtectedRoute requiredRole="Admin">
          <ManageEvents />
        </ProtectedRoute>
      } />
      <Route path="/admin/classes" element={
        <ProtectedRoute requiredRole="Admin">
          <ManageClasses />
        </ProtectedRoute>
      } />
      <Route path="/admin/instructors" element={
        <ProtectedRoute requiredRole="Admin">
          <ManageInstructors />
        </ProtectedRoute>
      } />
      <Route path="/admin/content" element={
        <ProtectedRoute requiredRole="Admin">
          <ManageContent />
        </ProtectedRoute>
      } />
      <Route path="/admin/gallery" element={
        <ProtectedRoute requiredRole="Admin">
          <ManageGallery />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default AppRoutes;