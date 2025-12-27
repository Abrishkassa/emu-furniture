import { Shield, Truck, CreditCard, HeadphonesIcon } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure & encrypted payments"
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free delivery in Addis Ababa"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay in installments available"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Always here to help you"
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Why Customers Trust Us
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