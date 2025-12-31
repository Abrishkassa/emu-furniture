'use client';

import { useState, useEffect } from 'react';
import { 
  Sofa, Package, Clock, Phone, MapPin, 
  TrendingUp, Shield, Truck, Star,
  ChevronRight, CheckCircle, Users,
  Mail, Map
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
//import LanguageToggle from '@/components/LanguageToggle';
import WhatsAppButton from '@/components/WhatsAppButton';
import TrustBadges from '@/components/TrustBadges';
import Testimonials from '@/components/Testimonials';
import { translations } from '@/lib/translations';

type Language = 'en' | 'am';

interface Product {
  id: number;
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  price: number;
  currency: string;
  category: {
    en: string;
    am: string;
  };
  rating: number;
  isPopular: boolean;
  estimatedDelivery: string;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [products, setProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const t = (key: keyof typeof translations) => translations[key][language];

  useEffect(() => {
    // Mock data with Amharic translations
    const mockProducts: Product[] = [
      {
        id: 1,
        name: {
          en: "Traditional Ethiopian Sofa",
          am: "ባሕላዊ ኢትዮጵያዊ ሶፋ"
        },
        description: {
          en: "Hand-carved wooden sofa with premium fabric",
          am: "በእጅ የተጠረቀ የእንጨት ሶፋ ከልቅሶ ጨርቅ ጋር"
        },
        price: 25000,
        currency: "ETB",
        category: {
          en: "Sofa",
          am: "ሶፋ"
        },
        rating: 4.8,
        isPopular: true,
        estimatedDelivery: "7-10 days"
      },
      {
        id: 2,
        name: {
          en: "Modern Coffee Table",
          am: "ዘመናዊ የቡና ጠረጴዛ"
        },
        description: {
          en: "Glass and wood combination",
          am: "መስታወት እና እንጨት ጥምረት"
        },
        price: 8500,
        currency: "ETB",
        category: {
          en: "Table",
          am: "ጠረጴዛ"
        },
        rating: 4.5,
        isPopular: true,
        estimatedDelivery: "5-7 days"
      },
      {
        id: 3,
        name: {
          en: "Executive Office Chair",
          am: "የዳይሬክተር የቢሮ መቀመጫ"
        },
        description: {
          en: "Ergonomic design with leather upholstery",
          am: "ኤርጎኖሚክ ዲዛይን ከቆዳ ሽፋን ጋር"
        },
        price: 12000,
        currency: "ETB",
        category: {
          en: "Chair",
          am: "መቀመጫ"
        },
        rating: 4.9,
        isPopular: true,
        estimatedDelivery: "3-5 days"
      },
    ];

    setProducts(mockProducts);
    setPopularProducts(mockProducts.filter(p => p.isPopular));
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggle />
      
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-amber-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-100 transition-all duration-300 hover:scale-105 shadow-lg">
              {t('browseCollections')} <ChevronRight className="inline ml-2" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              {t('bookShowroomVisit')}
            </button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-amber-200">{t('happyCustomers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-amber-200">{t('designs')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-amber-200">{t('yearsExperience')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges language={language} />

      {/* Features */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {language === 'am' ? 'ለምን ኢሙ ፈርኒቸር እንመርጣለን?' : 'Why Choose Emu Furniture?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'am' 
              ? 'ባህላዊ ኢትዮጵያዊ የጥበብ ስራን ከዘመናዊ ዲዛይን መርሆዎች ጋር በማጣመር በዘመናት የሚቆይ ፈርኒቸር እንፈጥራለን።'
              : 'We combine traditional Ethiopian craftsmanship with modern design principles to create furniture that lasts generations.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Package className="w-10 h-10 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
              {language === 'am' ? 'በአዲስ አበባ ነጻ መላኪያ' : 'Free Delivery in Addis'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'am' ? 'ለ10,000 ብር ከላይ ትዕዛዝ። ማዋቀር ተካትቷል።' : 'For orders over 10,000 ETB. Assembly included.'}
            </p>
          </div>
          
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Clock className="w-10 h-10 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
              {language === 'am' ? 'በትእዛዝ ማዘጋጀት' : 'Custom Orders'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'am' ? 'በእርስዎ ፍላጎት የሚስማማ። 3D ዲዛይን ቅድመ እይታ ይገኛል።' : 'Tailored to your specifications. 3D design preview available.'}
            </p>
          </div>
          
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Sofa className="w-10 h-10 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
              {language === 'am' ? 'ሽውራን ይጎብኙ' : 'Showroom Visit'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'am' ? 'ጥራቱን በቀጥታ ይመልከቱ። የግል እይታ ይዘዙ።' : 'Experience the quality firsthand. Book your private viewing.'}
            </p>
          </div>
        </div>

        {/* Popular Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {language === 'am' ? 'በጣም ተወዳጅ ምርቶች' : 'Most Popular Items'}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'am' ? 'በዚህ ወር ደንበኞች ተወዳጅ' : 'Customer favorites this month'}
              </p>
            </div>
            <button className="hidden sm:flex items-center text-amber-700 dark:text-amber-500 font-semibold hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
              {language === 'am' ? 'ሁሉንም ምርቶች ይመልከቱ' : 'View All Products'} <ChevronRight className="ml-2" />
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularProducts.map((product) => (
                <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-56 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <Sofa className="w-24 h-24 text-amber-700 dark:text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {language === 'am' ? 'ተወዳጅ' : 'Popular'}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-bold text-gray-800 dark:text-white">{product.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                        {product.name[language]}
                      </h3>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                        {product.category[language]}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {product.description[language]}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-500">
                          {product.price.toLocaleString()} {product.currency}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('estimatedDelivery')}: {product.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                    <WhatsAppButton 
                      productName={product.name[language]}
                      price={product.price}
                      isReserveButton={true}
                      language={language}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Process Section */}
        <div className="mb-16 bg-gradient-to-r from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            {language === 'am' ? 'የሥራ ሂደታችን' : 'How It Works'}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                step: "01", 
                title: language === 'am' ? "መምረጥ" : "Browse & Select", 
                desc: language === 'am' ? "ከስብስባችን ይምረጡ ወይም የግል ዲዛይን ይጠይቁ" : "Choose from our collection or request custom design" 
              },
              { 
                step: "02", 
                title: language === 'am' ? "ምክክር" : "Consultation", 
                desc: language === 'am' ? "ከባለሙያዎቻችን ጋር ነፃ የዲዛይን ምክክር" : "Free design consultation with our experts" 
              },
              { 
                step: "03", 
                title: language === 'am' ? "ምርት" : "Production", 
                desc: language === 'am' ? "በብቃት የተሰለጠኑ ኢትዮጵያዊ የጥበብ ሰዎች ይሠራሉ" : "Crafted by skilled Ethiopian artisans" 
              },
              { 
                step: "04", 
                title: language === 'am' ? "ማድረስ" : "Delivery & Setup", 
                desc: language === 'am' ? "ነጻ መላኪያ እና ባለሙያ ማዋቀር" : "Free delivery and professional assembly" 
              }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-3/4 w-full h-0.5 bg-amber-200 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <Testimonials language={language} />

        {/* Contact Section with Map */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                {t('visitShowroom')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {language === 'am' 
                  ? 'ጥራቱን እና የጥበብ ስራውን በቀጥታ ይመልከቱ። ሽውራችን በሳምንት 6 ቀናት ክፍት ሲሆን ባለሙያ አማካሪዎች ለማገልገልዎ ዝግጁ ናቸው።'
                  : 'Experience the quality and craftsmanship in person. Our showroom is open 6 days a week with expert consultants ready to help you.'}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-amber-700 dark:text-amber-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('location')}</p>
                    <p className="text-gray-600 dark:text-gray-300">Megenagna, Addis Ababa, Ethiopia</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'am' ? 'ከፍሪንድሺፕ ሆቴል አቅራቢያ' : 'Near Friendship Hotel'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-amber-700 dark:text-amber-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('openingHours')}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'am' ? 'ሰኞ - ቅዳሜ: 8:30 ጥዋት - 6:30 ማታ' : 'Monday - Saturday: 8:30 AM - 6:30 PM'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'am' ? 'እሁድ: 10:00 ጥዋት - 4:00 ማታ' : 'Sunday: 10:00 AM - 4:00 PM'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-amber-700 dark:text-amber-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('contactUs')}</p>
                    <p className="text-gray-600 dark:text-gray-300">+251 91 123 4567</p>
                    <p className="text-gray-600 dark:text-gray-300">info@emufurniture.com</p>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-amber-600 mr-2" />
                        <span className="text-sm">{language === 'am' ? 'የግል ምክር:' : 'For private consultation:'}</span>
                        <span className="ml-2 font-semibold">+251 92 987 6543</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-amber-600 mr-2" />
                        <span className="text-sm">{language === 'am' ? 'የግዥ ድጋፍ:' : 'Sales support:'}</span>
                        <span className="ml-2 font-semibold">sales@emufurniture.com</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <WhatsAppButton 
                        isReserveButton={false}
                        language={language}
                        className="w-full sm:w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  {t('bookShowroomVisit')}
                </button>
                <button className="ml-4 bg-transparent border-2 border-amber-600 text-amber-600 dark:border-amber-500 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  {language === 'am' ? 'ከጎናችን ባለሙያ ይደውሉ' : 'Call Our Expert'}
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Map Integration - Google Maps Embed */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl h-full min-h-[400px] overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="p-4 bg-amber-600 dark:bg-amber-700 text-white">
                    <h3 className="font-bold flex items-center">
                      <Map className="w-5 h-5 mr-2" />
                      {language === 'am' ? 'እኛን የሚያገኘን ቦታ' : 'Find Our Location'}
                    </h3>
                  </div>
                  
                  {/* Google Maps Embed */}
                  <div className="flex-grow relative">
                    <iframe
                      src="https://www.google.com/search?q=2FMP%2B954%2C+Hawassa&oq=2FMP%2B954%2C+Hawassa&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRigAdIBCDE2MzFqMGo3qAIIsAIB8QVb_8ZIAOGQ4vEFW__GSADhkOI&sourceid=chrome&ie=UTF-8"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                      title="Emu Furniture Location"
                    />
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {language === 'am' ? 'መመሪያዎች' : 'Get Directions'}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {language === 'am' ? 'ከአቶተ ዋንዛ ወደ ፉራ ሚወስደው አስፋልት 5 ደቂቃ እግረኛ' : '5 min walk from Atote wanza to fura'}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white text-sm rounded-lg transition-colors">
                        {language === 'am' ? 'አቅና' : 'Navigate'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-600 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'am' ? 'ዝመናዎችን ያግኙ' : 'Stay Updated'}
          </h2>
          <p className="mb-6 opacity-90">
            {language === 'am' 
              ? 'ለአዲስ ስብስቦች እና ልዩ ቅናሾች ቀደም ብለው ይድረሱ'
              : 'Get early access to new collections and exclusive offers'}
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder={language === 'am' ? 'የኢሜል አድራሻዎ' : 'Your email address'}
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
              {language === 'am' ? 'ይመዝገቡ' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Emu Furniture</h3>
              <p className="text-gray-400">
                {language === 'am' 
                  ? 'ባህላዊ ኢትዮጵያዊ ቅርስን በዘመናዊ ዲዛይን በመያዝ ልዩ ፈርኒቸር እንፈጥራለን።'
                  : 'Crafting exceptional furniture with Ethiopian heritage and modern design.'}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('quickLinks')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('collections')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('customOrders')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('showroom')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('aboutUs')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('support')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('contactUs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('faqs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('deliveryInfo')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('warranty')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('connect')}</h4>
              <p className="text-gray-400 mb-4">
                {language === 'am' ? 'ለመገለጥ እና ለዝመናዎች ይከተሉን' : 'Follow us for inspiration and updates'}
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Telegram'].map((social) => (
                  <a key={social} href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Emu Furniture. {language === 'am' ? 'ሁሉም መብቶች የተጠበቁ ናቸው።' : 'All rights reserved.'}</p>
            <p className="mt-2">{language === 'am' ? 'አዲስ አበባ፣ ኢትዮጵያ | በተ.ማ.ታ. ተመዝግበዋል' : 'Addis Ababa, Ethiopia | VAT Registered'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}