'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '+251911234567'; // Replace with actual number
  const message = encodeURIComponent("Hello! I'm interested in Emu Furniture products.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 animate-bounce"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}