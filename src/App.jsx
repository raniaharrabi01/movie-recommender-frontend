import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext'; 

export default function App() {
  return (
    <div className="min-h-screen">
     <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}
