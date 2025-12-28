'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface WhatsAppButtonProps {
  productName?: string;
  price?: number;
  isReserveButton?: boolean;
  language?: 'en' | 'am';
  className?: string;
}

export default function WhatsAppButton({ 
  productName, 
  price, 
  isReserveButton = false,
  language = 'en',
  className = ""
}: WhatsAppButtonProps) {
  
  const whatsappNumber = '+251972590743'; // Replace with actual number
  
  const createMessage = () => {
    if (productName && price) {
      if (language === 'am') {
        return `ሰላም! ስለ "${productName}" ፈርኒቸር መረጃ እፈልጋለሁ። ዋጋ: ${price.toLocaleString()} ብር። እባክዎ ይተውልኝ!`;
      }
      return `Hello! I'm interested in the "${productName}" furniture. Price: ${price.toLocaleString()} ETB. Please contact me!`;
    }
    
    if (isReserveButton) {
      if (language === 'am') {
        return "ሰላም! ስለ ኢሙ ፈርኒቸር ምርቶች መረጃ እፈልጋለሁ። እባክዎ ያነጋግሩኝ!";
      }
      return "Hello! I'm interested in Emu Furniture products. Please contact me!";
    }
    
    // Default message for floating button
    if (language === 'am') {
      return "ሰላም! ስለ ኢሙ ፈርኒቸር ምርቶች መረጃ እፈልጋለሁ።";
    }
    return "Hello! I'm interested in Emu Furniture products.";
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isReserveButton) {
      e.preventDefault();
      const message = encodeURIComponent(createMessage());
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (isReserveButton) {
    // For reserve buttons on product cards
    return (
      <button
        onClick={handleClick}
        className={`${className} w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
      >
        <div className="flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          {language === 'am' ? 'በዋትስአፕ ያስይዙ' : 'Reserve Now'}
        </div>
      </button>
    );
  }

  // For floating WhatsApp button
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(createMessage())}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 animate-bounce"
      title={language === 'am' ? 'በዋትስአፕ ያነጋግሩ' : 'Chat on WhatsApp'}
    >
      <MessageCircle size={28} />
    </a>
  );
}