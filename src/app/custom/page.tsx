'use client';

import { useState } from 'react';
import { 
  Palette, Ruler, Truck, Shield, Clock, 
  CheckCircle, ChevronRight, MessageCircle,
  Sofa, Bed, Table, 
  Star, Users, Package
} from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

type Language = 'en' | 'am';

interface CustomOrderOption {
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
  features: {
    en: string[];
    am: string[];
  };
}

interface FurnitureCategory {
  id: number;
  name: {
    en: string;
    am: string;
  };
  icon: any;
  description: {
    en: string;
    am: string;
  };
}

export default function CustomOrdersPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'sofa',
    dimensions: '',
    material: '',
    color: '',
    budget: '',
    timeline: '',
    additionalNotes: ''
  });

  const t = (key: string, lang: Language = language) => {
    const translations: Record<string, Record<Language, string>> = {
      pageTitle: {
        en: "Custom Furniture Orders",
        am: "በትእዛዝ ፈርኒቸር ማዘጋጀት"
      },
      pageSubtitle: {
        en: "Bring Your Vision to Life with Ethiopian Craftsmanship",
        am: "ምርጫዎትን በኢትዮጵያዊ የጥበብ ስራ ወደ እውነት ያምጡ"
      },
      heroDescription: {
        en: "Create furniture that perfectly fits your space, style, and needs. Our artisans combine traditional Ethiopian techniques with modern design principles.",
        am: "በቦታዎ፣ በስልትዎ እና በፍላጎትዎ ሙሉ ለሙሉ የሚስማማ ፈርኒቸር ይፍጠሩ። የኛ የጥበብ ሰዎች ባህላዊ የኢትዮጵያ ቴክኒኮችን ከዘመናዊ ዲዛይን መርሆዎች ጋር ያጣምራሉ።"
      },
      howItWorks: {
        en: "How Custom Orders Work",
        am: "በትእዛዝ ስራዎች እንዴት ይሰራሉ"
      },
      categoriesTitle: {
        en: "What Would You Like to Customize?",
        am: "ምን መጠበቅ ትፈልጋለህ?"
      },
      optionsTitle: {
        en: "Customization Options",
        am: "ማበጀት አማራጮች"
      },
      formTitle: {
        en: "Request Your Custom Design",
        am: "የግል ዲዛይንዎን ይጠይቁ"
      },
      formSubtitle: {
        en: "Fill out the form below and our design team will contact you within 24 hours",
        am: "ከዚህ በታች ያለውን ቅጽ ይሙሉ እና የኛ ዲዛይን ቡድን በ24 ሰዓታት ውስጥ ያገኝዎታል"
      },
      testimonialsTitle: {
        en: "What Our Custom Order Clients Say",
        am: "በትእዛዝ የሚጠቅሙ ደንበኞቻችን ምን ይላሉ"
      },
      whyCustomTitle: {
        en: "Why Choose Custom Furniture?",
        am: "ለምን በትእዛዝ ፈርኒቸር መጠቀም?"
      }
    };
    return translations[key]?.[lang] || key;
  };

  const furnitureCategories: FurnitureCategory[] = [
    {
      id: 1,
      name: { en: "Sofas & Sectionals", am: "ሶፋዎች እና ክፍሎች" },
      icon: Sofa,
      description: { en: "Custom comfort seating for your living room", am: "ለመኝታ ክፍልዎ ብጁ ምቾት መቀመጫ" }
    },
    {
      id: 2,
      name: { en: "Beds & Bedroom Sets", am: "አልጋዎች እና የመኝታ ክፍል ስብስቦች" },
      icon: Bed,
      description: { en: "Personalized sleeping and storage solutions", am: "ብጁ የመተኛት እና የማከማቻ መፍትሄዎች" }
    },
    {
      id: 3,
      name: { en: "Chairs & Seating", am: "መቀመጫዎች" },
      icon: Sofa,
      description: { en: "Ergonomic sofas for home and office", am: "ለቤት እና ቢሮ ኤርጎኖሚክ መቀመጫዎች" }
    },
    {
      id: 4,
      name: { en: "Tables & Desks", am: "ጠረጴዛዎች እና ዴስኮች" },
      icon: Table,
      description: { en: "Custom tables for dining, work, and display", am: "ለምግብ ቤት፣ ሥራ እና ማሳያ ብጁ ጠረጴዛዎች" }
    },
    {
      id: 5,
      name: { en: "Storage & Wardrobes", am: "ማከማቻ እና የልብስ መደርደሪያዎች" },
      icon: Bed,
      description: { en: "Built-in storage solutions", am: "በተሰራ ማከማቻ መፍትሄዎች" }
    },
  ];

  const customOptions: CustomOrderOption[] = [
    {
      id: 1,
      icon: Ruler,
      title: { en: "Custom Dimensions", am: "ብጁ ልኬቶች" },
      description: { 
        en: "Perfect fit for your space",
        am: "ለቦታዎ ፍጹም ማመጣጠን"
      },
      features: {
        en: ["Exact size requirements", "Space optimization", "Professional measurement service"],
        am: ["ትክክለኛ መጠን መስፈርቶች", "ቦታ ማሻሻያ", "ባለሙያ የልኬት አገልግሎት"]
      }
    },
    {
      id: 2,
      icon: Palette,
      title: { en: "Material & Finish", am: "ቁሳቁስ እና ማጠናቀቂያ" },
      description: { 
        en: "Choose from premium materials",
        am: "ከላቅሶ ቁሳቁሶች ይምረጡ"
      },
      features: {
        en: ["Solid wood options", "Upholstery fabrics", "Finishes & stains", "Metal/glass accents"],
        am: ["ጠንካራ እንጨት አማራጮች", "ሽፋን ጨርቆች", "ማጠናቀቂያዎች", "ብረት/መስታወት ቅጥያዎች"]
      }
    },
    {
      id: 3,
      icon: Sofa,
      title: { en: "Design & Style", am: "ዲዛይን እና ስልት" },
      description: { 
        en: "Match your interior aesthetic",
        am: "ከውስጥ አስደሳችነትዎ ጋር ይጣጣማል"
      },
      features: {
        en: ["Modern contemporary", "Traditional Ethiopian", "Industrial", "Minimalist", "Transitional"],
        am: ["ዘመናዊ ዘመናዊ", "ባህላዊ ኢትዮጵያዊ", "ኢንዱስትሪያል", "ትንሽ", "ሽግግር"]
      }
    },
    {
      id: 4,
      icon: Package,
      title: { en: "Functionality", am: "ተግባራዊነት" },
      description: { 
        en: "Add features you need",
        am: "የሚፈልጉትን ባህሪዎች ያክሉ"
      },
      features: {
        en: ["Storage compartments", "Convertible designs", "Adjustable features", "Smart furniture"],
        am: ["የማከማቻ ክፍሎች", "ሊለወጡ የሚችሉ ዲዛይኖች", "ሊስተካከሉ የሚችሉ ባህሪዎች", "ማሰብ የሚችል ፈርኒቸር"]
      }
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Meron Tekle",
      role: language === 'am' ? "የፓርቲ ድህረ ገጽ ባለቤት" : "Penthouse Owner",
      content: language === 'am' 
        ? "ከፍተኛ ጥራት ያለው ብጁ ሶፋ አዘዝኩት። የኢሙ ቡድን ሁሉንም ዝርዝሮች በጥንቃቄ ተከትሎ ሥራውን በሚገባ አከናውኗል።" 
        : "Ordered a custom high-quality sofa. The Emu team paid attention to every detail and executed perfectly.",
      rating: 5
    },
    {
      id: 2,
      name: "Yohannes Assefa",
      role: language === 'am' ? "ሪስቶራንት ባለቤት" : "Restaurant Owner",
      content: language === 'am' 
        ? "ለሪስቶራንቶቼ ብጁ የምግብ ቤት ስብስቦች አዘዝኩ። ዘላቂነቱ እና ዲዛይኑ ከሚጠበቀው በላይ ነበር።" 
        : "Custom dining sets for my restaurants. The durability and design exceeded expectations.",
      rating: 5
    },
    {
      id: 3,
      name: "Amina Hussein",
      role: language === 'am' ? "የቤት አደራጅ" : "Home Organizer",
      content: language === 'am' 
        ? "በትንሽ መኝታ ክፍል ለሚመጥነው የብጁ የማከማቻ መፍትሄ እጅግ ደስተኛ ነኝ። ቦታውን በትክክል ይጠቀማል።" 
        : "Thrilled with the custom storage solution for a small bedroom. It uses the space perfectly.",
      rating: 5
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: language === 'am' ? "የ10 ዓመት ዋስትና" : "10-Year Warranty",
      description: language === 'am' 
        ? "በሁሉም ብጁ ምርቶቻችን ላይ የ10 ዓመት ዋስትና" 
        : "On all our custom pieces"
    },
    {
      icon: Clock,
      title: language === 'am' ? "6-8 ሳምንታት የማያልፍ የማቅረብ ጊዜ" : "6-8 Week Delivery",
      description: language === 'am' 
        ? "በአማካይ የማቅረብ ጊዜ" 
        : "Average production time"
    },
    {
      icon: Users,
      title: language === 'am' ? "ነፃ የዲዛይን ምክክር" : "Free Design Consultation",
      description: language === 'am' 
        ? "ከባለሙያ ዲዛይነሮች ጋር" 
        : "With expert designers"
    },
    {
      icon: Truck,
      title: language === 'am' ? "ነፃ መላኪያ እና ማዋቀር" : "Free Delivery & Assembly",
      description: language === 'am' 
        ? "በአዲስ አበባ" 
        : "In Addis Ababa"
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = language === 'am' 
      ? `ሰላም! በትእዛዝ ፈርኒቸር ጥያቄ አለኝ።
      ስም: ${formData.name}
      ስልክ: ${formData.phone}
      የቤት እቃ አይነት: ${formData.category}
      ልኬት: ${formData.dimensions}
      ቁሳቁስ: ${formData.material}
      ቀለም: ${formData.color}
      በጀት: ${formData.budget} ETB
      ጊዜ: ${formData.timeline}
      ተጨማሪ ማስታወሻ: ${formData.additionalNotes}
      እባክዎ ያነጋግሩኝ!`
      : `Hello! I have a custom furniture inquiry.
      Name: ${formData.name}
      Phone: ${formData.phone}
      Furniture Type: ${formData.category}
      Dimensions: ${formData.dimensions}
      Material: ${formData.material}
      Color: ${formData.color}
      Budget: ${formData.budget} ETB
      Timeline: ${formData.timeline}
      Additional Notes: ${formData.additionalNotes}
      Please contact me!`;
    
    const whatsappUrl = `https://wa.me/+251972590743?text=${encodeURIComponent(message)}`;
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
          </div>
        </div>
      </div>

      {/* Benefits Bar */}
      <div className="bg-amber-800 dark:bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <benefit.icon className="w-8 h-8 text-amber-300" />
                </div>
                <h3 className="font-bold text-lg">{benefit.title}</h3>
                <p className="text-sm text-amber-200">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4">
        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('howItWorks')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "01", title: language === 'am' ? "ምክክር" : "Consultation", desc: language === 'am' ? "ነፃ የዲዛይን ምክክር ያዙ" : "Book free design consultation" },
              { number: "02", title: language === 'am' ? "ዲዛይን" : "Design", desc: language === 'am' ? "3D እይታ እና የዋጋ ግምት ያግኙ" : "Receive 3D preview & quote" },
              { number: "03", title: language === 'am' ? "ምርት" : "Production", desc: language === 'am' ? "በልምድ ያለው የጥበብ ሰው ይሠራል" : "Crafted by experienced artisans" },
              { number: "04", title: language === 'am' ? "ማድረስ" : "Delivery", desc: language === 'am' ? "ነፃ መላኪያ እና ማዋቀር" : "Free delivery & assembly" },
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-3/4 w-full h-0.5 bg-amber-200 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('categoriesTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {furnitureCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white shadow-xl scale-[1.02]'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <category.icon className={`w-12 h-12 mb-4 ${
                    selectedCategory === category.id ? 'text-white' : 'text-amber-600'
                  }`} />
                  <h3 className="text-xl font-bold mb-2">
                    {category.name[language]}
                  </h3>
                  <p className={selectedCategory === category.id ? 'text-amber-100' : 'text-gray-600 dark:text-gray-300'}>
                    {category.description[language]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Customization Options */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('optionsTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {customOptions.map((option) => (
              <div
                key={option.id}
                className={`p-8 rounded-2xl transition-all duration-300 cursor-pointer ${
                  selectedOption === option.id
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-xl'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-lg'
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${
                    selectedOption === option.id ? 'bg-white/20' : 'bg-amber-100 dark:bg-gray-700'
                  }`}>
                    <option.icon className={`w-8 h-8 ${
                      selectedOption === option.id ? 'text-white' : 'text-amber-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {option.title[language]}
                    </h3>
                    <p className={selectedOption === option.id ? 'text-amber-100' : 'text-gray-600 dark:text-gray-300'}>
                      {option.description[language]}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {option.features[language].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className={`w-5 h-5 mr-3 ${
                        selectedOption === option.id ? 'text-amber-200' : 'text-amber-600'
                      }`} />
                      <span className={selectedOption === option.id ? 'text-amber-50' : 'text-gray-700 dark:text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-amber-700 to-amber-600 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">{t('formTitle')}</h2>
              <p className="text-lg opacity-90">{t('formSubtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ሙሉ ስም' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={language === 'am' ? '+251 91 234 5678' : '+251 91 234 5678'}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'የቤት እቃ አይነት' : 'Furniture Type'} *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="sofa">{language === 'am' ? 'ሶፋ' : 'Sofa'}</option>
                    <option value="bed">{language === 'am' ? 'አልጋ' : 'Bed'}</option>
                    <option value="chair">{language === 'am' ? 'መቀመጫ' : 'Chair'}</option>
                    <option value="table">{language === 'am' ? 'ጠረጴዛ' : 'Table'}</option>
                    <option value="wardrobe">{language === 'am' ? 'የልብስ መደርደሪያ' : 'Wardrobe'}</option>
                    <option value="other">{language === 'am' ? 'ሌላ' : 'Other'}</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'በጀት (ብር)' : 'Budget (ETB)'} *
                  </label>
                  <input
                    type="number"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={language === 'am' ? 'የሚፈልጉት በጀት' : 'Your budget range'}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ልኬቶች' : 'Dimensions'}
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={language === 'am' ? 'ርዝመት x ስፋት x ቁመት' : 'Length x Width x Height'}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ቁሳቁስ' : 'Material'}
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={language === 'am' ? 'ምን ዓይነት ቁሳቁስ?' : 'What material?'}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">
                    {language === 'am' ? 'ቀለም' : 'Color'}
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder={language === 'am' ? 'የተፈለገው ቀለም' : 'Preferred color'}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-semibold">
                  {language === 'am' ? 'የማስገኘት ጊዜ ፍላጎት' : 'Delivery Timeline'}
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">{language === 'am' ? 'የማስገኘት ጊዜ ይምረጡ' : 'Select timeline'}</option>
                  <option value="urgent">{language === 'am' ? 'አስቸኳይ (4 ሳምንታት ውስጥ)' : 'Urgent (within 4 weeks)'}</option>
                  <option value="6-8">{language === 'am' ? 'መደበኛ (6-8 ሳምንታት)' : 'Standard (6-8 weeks)'}</option>
                  <option value="10-12">{language === 'am' ? 'ምንም ችግር የለውም (10-12 ሳምንታት)' : 'Flexible (10-12 weeks)'}</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block mb-2 font-semibold">
                  {language === 'am' ? 'ተጨማሪ ማስታወሻዎች' : 'Additional Notes'}
                </label>
                <textarea
                  name="additionalNotes"
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={language === 'am' ? 'ማንኛውም ልዩ ፍላጎቶች ወይም ሀሳቦች...' : 'Any special requirements or ideas...'}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-white text-amber-700 hover:bg-amber-50 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3 mx-auto"
                >
                  <MessageCircle className="w-6 h-6" />
                  {language === 'am' ? 'በዋትስአፕ ይላኩ' : 'Submit via WhatsApp'}
                  <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-amber-200 mt-4 text-sm">
                  {language === 'am' 
                    ? 'ቅጹን ሲያስጠናቅቁ በዋትስአፕ ተከፍቶ መልእክቱ በራስ-ሰር ይሞላል።'
                    : 'Form will auto-fill and open WhatsApp when you submit.'}
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Why Custom Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {t('whyCustomTitle')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-amber-700 dark:text-amber-500">
                {language === 'am' ? 'የብጁ ፈርኒቸር ጥቅሞች' : 'Benefits of Custom Furniture'}
              </h3>
              <ul className="space-y-4">
                {[
                  language === 'am' ? 'ለቦታዎ ፍጹም ማመጣጠን' : 'Perfect fit for your space',
                  language === 'am' ? 'የእርስዎ የስልት ሀሳብ ይገለጣል' : 'Expresses your personal style',
                  language === 'am' ? 'በፍላጎትዎ የተነደፉ ተግባራዊ ባህሪዎች' : 'Functionality designed for your needs',
                  language === 'am' ? 'ከፍተኛ ጥራት ያለው ቁሳቁስ እና ስራ' : 'Higher quality materials & craftsmanship',
                  language === 'am' ? 'ረጅም ዘላቂነት' : 'Longer-lasting durability',
                  language === 'am' ? 'የእርስዎ ብቸኛ የሆነ የዋጋ ምንጭ' : 'Your unique statement piece'
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
                {language === 'am' ? 'ከተለመደው ግዢ የሚለየው' : 'How It Differs from Ready-Made'}
              </h3>
              <div className="space-y-6">
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">{language === 'am' ? 'ብጁ' : 'Custom'}</h4>
                  <ul className="text-sm space-y-1">
                    <li>✓ {language === 'am' ? 'በፍላጎትዎ ታዘጋጅ' : 'Made to your specifications'}</li>
                    <li>✓ {language === 'am' ? 'በከፍተኛ ጥራት የተሰራ' : 'Built with premium quality'}</li>
                    <li>✓ {language === 'am' ? 'ረጅም ዘላቂነት' : 'Long-term durability'}</li>
                  </ul>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">{language === 'am' ? 'ተለመደ' : 'Ready-Made'}</h4>
                  <ul className="text-sm space-y-1 opacity-80">
                    <li>• {language === 'am' ? 'ጅምር መጠኖች' : 'Standard sizes'}</li>
                    <li>• {language === 'am' ? 'የተጠበቀ ምርጫ' : 'Limited options'}</li>
                    <li>• {language === 'am' ? 'አጠቃላይ ጥራት' : 'Average quality'}</li>
                  </ul>
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
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-800 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            {language === 'am' 
              ? 'የእርስዎን የራስ የፈርኒቸር ህልም እናውራ!' 
              : "Let's Discuss Your Custom Furniture Vision!"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'am' 
              ? 'ባለሙያ ዲዛይነሮቻችን በግል ምክክር ለመያዝ ዝግጁ ናቸው።'
              : 'Our expert designers are ready for a personalized consultation.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSubmit}
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              {language === 'am' ? 'ወዲያውኑ ይደውሉ' : 'Start a Conversation'}
            </button>
            <a
              href="tel:+251911234567"
              className="bg-transparent border-2 border-amber-600 text-amber-600 dark:border-amber-500 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              {language === 'am' ? 'ይደውሉ: +251 91 123 4567' : 'Call: +251 91 123 4567'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}