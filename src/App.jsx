import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Access } from "./pages/Access";
import { Toaster } from "sonner";
import { Service } from "./pages/adm/Service";
import { AdmLayout } from "./layout/AdmLayout";
import { Availability } from "./pages/adm/Availability";
import { Settings } from "./pages/adm/Settings"
import { Dashboard } from "./pages/adm/Dashboard";
import {Appointment} from "./pages/adm/Appointment";

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route path="/login" element={<Access />} />
          <Route path="/register" element={<Access />} />
          <Route path="/" element={<Home />} />

          <Route element={<AdmLayout />}>
            <Route path="/adm/dashboard" element={<Dashboard/>} />
            <Route path="/adm/appointments" element={<Appointment />} />
            <Route path="/adm/services" element={<Service />} />
            <Route path="/adm/availability" element={<Availability />} />
            <Route path="/adm/settings" element={<Settings/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
