'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productName?: string;
  price?: number;
  className?: string;
  isReserveButton?: boolean;
  language?: 'en' | 'am';
}

export default function WhatsAppButton({ 
  productName, 
  price, 
  className = "",
  isReserveButton = false,
  language = 'en'
}: WhatsAppButtonProps) {
  
  const phoneNumber = "+251911234567"; // Your WhatsApp number
  
  const createMessage = () => {
    if (productName && price) {
      if (language === 'am') {
        return `ሰላም! ስለ "${productName}" ፈርኒቸር መረጃ እፈልጋለሁ። ዋጋ: ${price.toLocaleString()} ብር። እባክዎ ይተውልኝ!`;
      }
      return `Hello! I'm interested in the "${productName}" furniture. Price: ${price.toLocaleString()} ETB. Please contact me!`;
    }
    
    if (language === 'am') {
      return "ሰላም! ስለ ኢሙ ፈርኒቸር ምርቶች መረጃ እፈልጋለሁ። እባክዎ ያነጋግሩኝ!";
    }
    return "Hello! I'm interested in Emu Furniture products. Please contact me!";
  };

  const handleClick = () => {
    const message = encodeURIComponent(createMessage());
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2`}
    >
      <MessageCircle className="w-5 h-5" />
      {isReserveButton ? (
        language === 'am' ? 'በዋትስአፕ ያስይዙ' : 'Reserve via WhatsApp'
      ) : (
        language === 'am' ? 'በዋትስአፕ ያነጋግሩ' : 'Chat on WhatsApp'
      )}
    </button>
  );
}