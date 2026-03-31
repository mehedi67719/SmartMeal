'use client';

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface AlertNotificationProps {
  alert: { type: string; message: string } | null;
}

export default function AlertNotification({ alert }: AlertNotificationProps) {
  if (!alert) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 animate-slide-in ${
      alert.type === 'success' 
        ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
        : 'bg-gradient-to-r from-red-500 to-rose-500'
    } text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm border border-white/20`}>
      {alert.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
      <span className="text-sm font-medium">{alert.message}</span>
    </div>
  );
}