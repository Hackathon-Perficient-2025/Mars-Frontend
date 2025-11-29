import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
  isConnected?: boolean;
}

export const MainLayout = ({ children, isConnected }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header isConnected={isConnected} />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 w-[calc(100%-16rem)] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
