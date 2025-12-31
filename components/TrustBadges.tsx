import { Shield, Truck, CreditCard, HeadphonesIcon } from 'lucide-react';

interface TrustBadgesProps {
  language?: 'en' | 'am';
}

export default function TrustBadges({ language = 'en' }: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      title: language === 'am' ? "አስተማማኝ ክፍያ" : "Secure Payment",
      description: language === 'am' ? "100% አስተማማኝ እና ምስጢራዊ ክፍያዎች" : "100% secure & encrypted payments"
    },
    {
      icon: Truck,
      title: language === 'am' ? "ነጻ መላኪያ" : "Free Delivery",
      description: language === 'am' ? "በሃዋሳ ነጻ መላኪያ" : "Free delivery in Hawassa"
    },
    {
      icon: CreditCard,
      title: language === 'am' ? "ልዩ የክፍያ አማራጮች" : "Flexible Payment",
      description: language === 'am' ? "በክፍል ክፍያ ይገኛል" : "Pay in installments available"
    },
    {
      icon: HeadphonesIcon,
      title: language === 'am' ? "ሁልጊዜ ድጋፍ" : "24/7 Support",
      description: language === 'am' ? "ሁልጊዜ እዚህ ለማገልገልዎ" : "Always here to help you"
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          {language === 'am' ? 'ደንበኞች ለምን እንደሚታረኩን' : 'Why Customers Trust Us'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="text-center p-4">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white dark:bg-gray-800 shadow-md">
                <badge.icon className="w-8 h-8 text-amber-700 dark:text-amber-500" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}