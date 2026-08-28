import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';
import { DashboardPage } from './pages/Dashboard';
import { DatasetsPage } from './pages/DatasetsPage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { TeamPage } from './pages/TeamPage';
import { SystemStatusPage } from './pages/SystemStatusPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#060913]">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/system-status" element={<SystemStatusPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
export default App;
