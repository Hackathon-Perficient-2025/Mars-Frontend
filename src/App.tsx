import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from '@/components/layout';
import { ErrorBoundary } from '@/components/common';
import { Dashboard, Inventory, ResupplyRequests, Analytics, Settings, Vehicles } from '@/pages';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout isConnected={true}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/resupply" element={<ResupplyRequests />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </MainLayout>
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
