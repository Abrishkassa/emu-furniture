'use client';

import { useState } from 'react';
import { 
  MapPin, Clock, Phone, Calendar, Users, 
  Car, Wifi, Coffee, Shield, Star,
  ChevronRight, CheckCircle, MessageCircle,
  Maximize, Map, Navigation, Camera,
  Heart, Share2, Bookmark
} from 'lucide-react';

type Language = 'en' | 'am';

interface ShowroomFeature {
  id: number;
  icon: any;
  title: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
}

interface Testimonial {
  id: number;
  name: string;
  date: string;
  content: {
    en: string;
    am: string;
  };
  rating: number;
}

export default function ShowroomPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [visitorInfo, setVisitorInfo] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '1',
    specialRequirements: ''
  });

  const t = (key: string, lang: Language = language) => {
    const translations: Record<string, Record<Language, string>> = {
      pageTitle: {
        en: "Emu Furniture Showroom",
        am: "እሙ ፈርኒቸር ሽውራ"
      },
      pageSubtitle: {
        en: "Experience Quality & Craftsmanship Firsthand",
        am: "ጥራትን እና የጥበብ ስራን በቀጥታ ይመልከቱ"
      },
      heroDescription: {
        en: "Visit our flagship showroom in Hawassa to touch, feel, and experience our furniture collections. Meet our experts and get personalized design advice.",
        am: "በሃዋሳ የምንገኝበትን ዋና ሽውራችንን ጎብኙ እና ፈርኒቸር ስብስቦቻችንን ይንኩ፣ ይንኩ እና ይለማመዱ። ባለሙያዎቻችንን ያግኙ እና የግል የዲዛይን ምክር ያግኙ።"
      },
      locationTitle: {
        en: "Our Showroom Location",
        am: "የሽውራችን አድራሻ"
      },
      hoursTitle: {
        en: "Opening Hours",
        am: "የስራ ሰዓት"
      },
      featuresTitle: {
        en: "Showroom Features",
        am: "የሽውራችን ባህሪዎች"
      },
      bookingTitle: {
        en: "Book Your Visit",
        am: "ጉብኝትዎን ይዘዙ"
      },
      bookingSubtitle: {
        en: "Schedule a private tour with our design experts",
        am: "ከዲዛይን ባለሙያዎቻችን ጋር የግል ጉብኝት ይዘዙ"
      },
      testimonialsTitle: {
        en: "Visitor Experiences",
        am: "የጎብኚዎች ልምዶች"
      },
      whyVisitTitle: {
        en: "Why Visit Our Showroom?",
        am: "ለምን ሽውራችንን መጎብኘት ያስፈልጋል?"
      },
      directionsTitle: {
        en: "How to Find Us",
        am: "እንዴት መገኘት እንደሚቻል"
      },
      safetyTitle: {
        en: "Health & Safety",
        am: "ጤና እና ደህንነት"
      }
    };
    return translations[key]?.[lang] || key;
  };

  const showroomFeatures: ShowroomFeature[] = [
    {
      id: 1,
      icon: Maximize,
      title: { en: "Spacious Display", am: "ሰፊ ማሳያ" },
      description: { 
        en: "Over 5000 sq ft of furniture displays",
        am: "ከ5000 ካሬ ጫማ በላይ የፈርኒቸር ማሳያዎች"
      }
    },
    {
      id: 2,
      icon: Users,
      title: { en: "Expert Consultants", am: "ባለሙያ አማካሪዎች" },
      description: { 
        en: "Certified interior designers on staff",
        am: "ባለትዳር የተረጋገጡ የውስጥ ዲዛይነሮች"
      }
    },
    {
      id: 3,
      icon: Coffee,
      title: { en: "Complimentary Refreshments", am: "ነፃ እርጥብ መጠጦች" },
      description: { 
        en: "Ethiopian coffee & tea service",
        am: "የኢትዮጵያ ቡና እና ሻይ አገልግሎት"
      }
    },
    {
      id: 4,
      icon: Wifi,
      title: { en: "Free WiFi", am: "ነፃ ዋይፋይ" },
      description: { 
        en: "High-speed internet access",
        am: "ከፍተኛ ፍጥነት ያለው የበይነመረብ መዳረሻ"
      }
    },
    {
      id: 5,
      icon: Car,
      title: { en: "Ample Parking", am: "በቂ የመኪና ማቆሚያ" },
      description: { 
        en: "Secure parking for visitors",
        am: "ለጎብኚዎች አስተማማኝ የመኪና ማቆሚያ"
      }
    },
    {
      id: 6,
      icon: Camera,
      title: { en: "Photo-Friendly", am: "ለፎቶግራፍ ተስማሚ" },
      description: { 
        en: "Perfect lighting for photos",
        am: "ለፎቶግራፎች ፍጹም መብራት"
      }
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Daniel Mekonnen",
      date: "March 15, 2024",
      content: {
        en: "The showroom experience was exceptional! Seeing the furniture in person made all the difference. The consultants were incredibly helpful.",
        am: "የሽውራው ልምድ አስደናቂ ነበር! ፈርኒቸሩን በቀጥታ ማየት ሁሉንም ለውጥ አድርጎታል። አማካሪዎቹ እጅግ በጣም ጠቃሚ ነበሩ።"
      },
      rating: 5
    },
    {
      id: 2,
      name: "Hana Girma",
      date: "February 28, 2024",
      content: {
        en: "Took my family for a weekend visit. The kids loved it, and we got amazing design ideas for our new home.",
        am: "ቤተሰቤን ለሳምንት መጨረሻ ጉብኝት ወስዸዋለሁ። ልጆቹ ወደዱት፣ እናም ለአዲስ ቤታችን አስደናቂ የዲዛይን ሀሳቦችን አግኝተናል።"
      },
      rating: 5
    },
    {
      id: 3,
      name: "Samuel Bekele",
      date: "January 10, 2024",
      content: {
        en: "As an interior designer, I bring my clients here. The quality is evident when you see it up close.",
        am: "እንደ የውስጥ ዲዛይነር፣ ደንበኞቼን እዚህ አምጣለሁ። ጥራቱ በቅርብ ሲያዩ ግልጽ ነው።"
      },
      rating: 5
    },
  ];

  const safetyMeasures = [
    {
      icon: Shield,
      title: language === 'am' ? "ተቀናጃ ማሰራጫዎች" : "Sanitized Surfaces",
      description: language === 'am' 
        ? "ሁሉም ማሰራጫዎች በየቀኑ ይጸዳሉ" 
        : "All surfaces cleaned daily"
    },
    {
      icon: Users,
      title: language === 'am' ? "የተገደበ አቅም" : "Limited Capacity",
      description: language === 'am' 
        ? "የጎብኚ ብዛት ለማስተናገድ" 
        : "Visitor numbers managed"
    },
    {
      icon: Car,
      title: language === 'am' ? "ነፃ የመኪና ማቆሚያ" : "Free Parking",
      description: language === 'am' 
        ? "ደህንነቱ የተጠበቀ" 
        : "Secure parking available"
    },
  ];

  const availableTimes = [
    "09:00 AM", "10:30 AM", "12:00 PM", 
    "02:00 PM", "03:30 PM", "05:00 PM"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVisitorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = language === 'am' 
      ? `ሰላም! ለሽውራ ጉብኝት መዝግብ እፈልጋለሁ።
      ስም: ${visitorInfo.name}
      ስልክ: ${visitorInfo.phone}
      የመዝገብ ቀን: ${selectedDate}
      ሰዓት: ${selectedTime}
      የጎብኚዎች ብዛት: ${visitorInfo.guests}
      ልዩ ፍላጎቶች: ${visitorInfo.specialRequirements}
      እባክዎ ያረጋግጡ!`
      : `Hello! I'd like to book a showroom visit.
      Name: ${visitorInfo.name}
      Phone: ${visitorInfo.phone}
      Date: ${selectedDate}
      Time: ${selectedTime}
      Number of guests: ${visitorInfo.guests}
      Special requirements: ${visitorInfo.specialRequirements}
      Please confirm!`;
    
    const whatsappUrl = `https://wa.me/+251911234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {t('pageTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('pageSubtitle')}
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#booking"
                className="bg-white text-amber-900 hover:bg-amber-100 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {language === 'am' ? 'ጉብኝት ይዘዙ' : 'Book a Visit'}
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#location"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Map className="w-5 h-5" />
                {language === 'am' ? 'አቅጣጫ ያግኙ' : 'Get Directions'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-amber-800 dark:bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">5,000+</div>
              <div className="text-amber-200">
                {language === 'am' ? 'ካሬ ጫማ' : 'Square Feet'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-amber-200">
                {language === 'am' ? 'ማሳያ አይነቶች' : 'Display Pieces'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10+</div>
              <div className="text-amber-200">
                {language === 'am' ? 'የዲዛይን ምድቦች' : 'Design Categories'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-amber-200">
                {language === 'am' ? 'ዕለታዊ ጎብኚዎች' : 'Daily Visitors'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* Location & Hours */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Location */}
          <div id="location">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
              {t('locationTitle')}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-start mb-6">
                <MapPin className="w-8 h-8 text-amber-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    Emu Furniture Showroom
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Atote, Hawassa, Ethiopia
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {language === 'am' ? 'ከአመን ካፈ አቅራቢያ' : 'Near Amen Cafe Hawassa'}
                  </p>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden h-64 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.573710286464!2d38.77183407564615!3d9.022219488247652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f0f8e1c21f%3A0x40e59d6592e8edbd!2sMegenagna%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Emu Furniture Showroom Location"
                />
              </div>

              <div className="space-y-4">
                <a
                  href="https://maps.google.com/?q=Emu+Furniture+Atote+Hawassa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  <Navigation className="w-5 h-5" />
                  {language === 'am' ? 'በ Google Maps አቅጣጫ ያግኙ' : 'Get Directions on Google Maps'}
                </a>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:+251972590743"
                    className="flex items-center justify-center gap-2 border-2 border-amber-600 text-amber-600 dark:border-amber-500 dark:text-amber-500 py-2 rounded-lg font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {language === 'am' ? 'ይደውሉ' : 'Call'}
                  </a>
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(
                        language === 'am' 
                          ? 'ሰላም! የሽውራ አቅጣጫ እፈልጋለሁ።' 
                          : 'Hello! I need directions to your showroom.'
                      );
                      window.open(`https://wa.me/+251972590743?text=${message}`, '_blank');
                    }}
                    className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Safety */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
              {t('hoursTitle')}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-amber-600 mr-4" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {language === 'am' ? 'ሰኞ - ቅዳሜ' : 'Monday - Saturday'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">8:30 AM - 6:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-amber-600 mr-4" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {language === 'am' ? 'እሁድ' : 'Sunday'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-amber-600 mr-4" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {language === 'am' ? 'ልዩ ማስተናገዶች' : 'Special Appointments'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'am' ? 'ከሰዓት በኋላ ይደረጋል' : 'Available after hours'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Measures */}
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {t('safetyTitle')}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {safetyMeasures.map((measure, index) => (
                <div key={index} className="bg-amber-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                  <measure.icon className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                  <h4 className="font-bold text-sm text-gray-800 dark:text-white mb-1">
                    {measure.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {measure.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Showroom Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('featuresTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showroomFeatures.map((feature) => (
              <div key={feature.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 mr-4">
                    <feature.icon className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {feature.title[language]}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div id="booking" className="mb-20">
          <div className="bg-gradient-to-r from-amber-700 to-amber-600 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">{t('bookingTitle')}</h2>
              <p className="text-lg opacity-90">{t('bookingSubtitle')}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ሙሉ ስም' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={visitorInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={language === 'am' ? 'የእርስዎ ስም' : 'Your name'}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ስልክ ቁጥር' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={visitorInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="+251 91 234 5678"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ቀን' : 'Date'} *
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ሰዓት' : 'Time'} *
                  </label>
                  <select
                    required
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">{language === 'am' ? 'ሰዓት ይምረጡ' : 'Select time'}</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'የጎብኚዎች ብዛት' : 'Number of Guests'} *
                  </label>
                  <select
                    name="guests"
                    required
                    value={visitorInfo.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="1">1 {language === 'am' ? 'ሰው' : 'person'}</option>
                    <option value="2">2 {language === 'am' ? 'ሰዎች' : 'people'}</option>
                    <option value="3">3 {language === 'am' ? 'ሰዎች' : 'people'}</option>
                    <option value="4">4 {language === 'am' ? 'ሰዎች' : 'people'}</option>
                    <option value="5+">5+ {language === 'am' ? 'ሰዎች' : 'people'}</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ኢሜይል (አማራጭ)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={visitorInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block mb-2 font-semibold">
                  {language === 'am' ? 'ልዩ ፍላጎቶች' : 'Special Requirements'}
                </label>
                <textarea
                  name="specialRequirements"
                  rows={3}
                  value={visitorInfo.specialRequirements}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={language === 'am' 
                    ? 'ማንኛውም ልዩ ፍላጎቶች፣ የአካል ጉዳዮች፣ ወይም የተለየ ፍላጎት...' 
                    : 'Any special needs, accessibility requirements, or specific interests...'
                  }
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-white text-amber-700 hover:bg-amber-50 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3 mx-auto"
                >
                  <Calendar className="w-6 h-6" />
                  {language === 'am' ? 'ጉብኝት ያስይዙ' : 'Confirm Booking'}
                  <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-amber-200 mt-4 text-sm">
                  {language === 'am' 
                    ? 'ቅጹን ሲያስጠናቅቁ የዋትስአፕ መልእክት ተከፍቶ መልእክቱ በራስ-ሰር ይሞላል።'
                    : 'Form will auto-fill and open WhatsApp when you submit.'}
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Why Visit */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('whyVisitTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-amber-700 dark:text-amber-500">
                {language === 'am' ? 'የጎብኝት ጥቅሞች' : 'Benefits of Visiting'}
              </h3>
              <ul className="space-y-4">
                {[
                  language === 'am' ? 'ጥራቱን በቀጥታ ይመልከቱ' : 'See quality firsthand',
                  language === 'am' ? 'ቁሳቁስ እና ማጠናቀቂያ ይንኩ' : 'Feel materials & finishes',
                  language === 'am' ? 'በቦታ ላይ የዲዛይን ምክር ያግኙ' : 'Get on-site design advice',
                  language === 'am' ? 'ከባለሙያዎች ጋር ያወያዩ' : 'Consult with experts',
                  language === 'am' ? 'በትክክለኛ መጠን ይመልከቱ' : 'View pieces at true scale',
                  language === 'am' ? 'የግል ማስተናገድ' : 'Personalized attention'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-amber-600 to-amber-500 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">
                {language === 'am' ? 'የጉብኝት አይነቶች' : 'Types of Visits'}
              </h3>
              <div className="space-y-6">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">🌟 {language === 'am' ? 'የግል ጉብኝት' : 'Private Tour'}</h4>
                  <p className="text-sm">
                    {language === 'am' 
                      ? 'ከዲዛይን ባለሙያ ጋር ለ1-2 ሰዓት የግል አቅጣጫ' 
                      : '1-2 hour private guidance with design expert'}
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">👨‍👩‍👧‍👦 {language === 'am' ? 'ቤተሰብ ጉብኝት' : 'Family Visit'}</h4>
                  <p className="text-sm">
                    {language === 'am' 
                      ? 'ቤተሰብ ወይም ወዳጅ ጋር ለነፃ መጎብኘት' 
                      : 'Free browsing with family or friends'}
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">💼 {language === 'am' ? 'ንግድ ጉብኝት' : 'Business Visit'}</h4>
                  <p className="text-sm">
                    {language === 'am' 
                      ? 'ለሆቴል፣ ኩባንያ ወይም ሪስቶራንት ለግዥ' 
                      : 'For hotels, companies, or restaurant procurement'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('testimonialsTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-700 dark:text-amber-500 font-bold text-lg mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.content[language]}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Directions */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('directionsTitle')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                  {language === 'am' ? 'ከተለያዩ ቦታዎች' : 'From Different Locations'}
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-amber-600 dark:text-amber-500 mb-2">
                      🚗 {language === 'am' ? 'ከቦሌ በመኪና' : 'From Piassa by Car'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'am' 
                        ? '15-20 ደቂቃ (ከቦሌ ወደ መገናኛ በሞላ ከዛ ወደ መገናኛ)'
                        : '15-20 minutes (Take Piassa to Atote road)'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-600 dark:text-amber-500 mb-2">
                      🚌 {language === 'am' ? 'በህዝብ ትራንስፖርት' : 'By Public Transport'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'am' 
                        ? 'ከመገናኛ ባቡር ጣቢያ 5 ደቂቃ እግረኛ'
                        : '5 min walk from Atote bus station'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-600 dark:text-amber-500 mb-2">
                      🚕 {language === 'am' ? 'በታክሲ' : 'By Taxi'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'am' 
                        ? '"ኢሙ ፈርኒቸር ሽውራ መገናኛ" ብለው ይንገሩ'
                        : 'Tell driver "Emu Furniture Showroom Atote"'}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                  {language === 'am' ? 'አጋር መስፈርቶች' : 'Nearby Amenities'}
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: '🅿️', text: language === 'am' ? 'ነፃ የመኪና ማቆሚያ' : 'Free parking available' },
                    { icon: '🏨', text: language === 'am' ? 'ከፍሪንድሺፕ ሆቴል አቅራቢያ' : 'Near Amen Cafe Hawassa' },
                    { icon: '☕', text: language === 'am' ? 'በርካታ ካፌዎች አጠገብ' : 'Multiple cafes nearby' },
                    { icon: '🛒', text: language === 'am' ? 'ከሱቆች እና ማርኬቶች አቅራቢያ' : 'Close to shops & markets' },
                  ].map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-2xl mr-3">{amenity.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{amenity.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            {language === 'am' 
              ? 'ዛሬ በምንም ነገር አይቆዩ!' 
              : "Don't Wait to Experience Excellence!"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'am' 
              ? 'ለዛሬው ጉብኝትዎን ያስይዙ ወይም በደወል የበለጠ መረጃ ያግኙ።'
              : 'Book your visit today or call for more information.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#booking"
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              {language === 'am' ? 'ወዲያውኑ ያስይዙ' : 'Book Now'}
            </a>
            <a
              href="tel:+251911234567"
              className="bg-transparent border-2 border-amber-600 text-amber-600 dark:border-amber-500 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              {language === 'am' ? 'ይደውሉ: +251 91 123 4567' : 'Call: +251 91 123 4567'}
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-6">
            {language === 'am' 
              ? 'ለግል የንግድ ጉብኝቶች እና የቡድን ቅናሾች፣ እባክዎ ያነጋግሩን።'
              : 'For corporate visits and group discounts, please contact us.'}
          </p>
        </div>
      </div>
    </div>
  );
}