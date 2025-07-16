import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import WebAppGuard from './components/WebAppGuard';
import Layout from './components/Layout';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebAppGuard>
        <Layout />
      </WebAppGuard>
    </QueryClientProvider>
  );
} 