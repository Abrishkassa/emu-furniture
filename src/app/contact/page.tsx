'use client';

import { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, MessageCircle, 
  Send, CheckCircle, AlertCircle, User, 
  Home, ChevronRight, Building, Globe,
  Facebook, Instagram, Twitter, Youtube,
  Truck, Shield, Package, HeadphonesIcon
} from 'lucide-react';

type Language = 'en' | 'am';
type ContactMethod = 'whatsapp' | 'phone' | 'email';

interface Department {
  id: number;
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  contact: {
    phone: string;
    email: string;
    hours: string;
  };
}

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeContactMethod, setActiveContactMethod] = useState<ContactMethod>('whatsapp');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const t = (key: string, lang: Language = language) => {
    const translations: Record<string, Record<Language, string>> = {
      pageTitle: {
        en: "Contact Emu Furniture",
        am: "ኢሙ ፈርኒቸር አግኙ"
      },
      pageSubtitle: {
        en: "We're Here to Help with Your Furniture Needs",
        am: "ለፈርኒቸር ፍላጎትዎ እዚህ ላገለግልዎ ዝግጁ ነን"
      },
      heroDescription: {
        en: "Get in touch with our team for inquiries, support, or to schedule a showroom visit. We're available through multiple channels for your convenience.",
        am: "ለመጠየቅ፣ ለድጋፍ ወይም ሽውራ ለመጎብኘት ከቡድናችን ጋር ያገናኙ። ለመገበያየትዎ በበርካታ መንገዶች አገልግሎት እንሰጣለን።"
      },
      contactMethods: {
        en: "Quick Contact Methods",
        am: "ፈጣን የመገናኛ ዘዴዎች"
      },
      contactForm: {
        en: "Send Us a Message",
        am: "መልእክት ይላኩልን"
      },
      ourLocation: {
        en: "Our Location",
        am: "አድራሻችን"
      },
      departments: {
        en: "Contact Departments",
        am: "የመገናኛ ክፍሎች"
      },
      businessHours: {
        en: "Business Hours",
        am: "የስራ ሰዓት"
      },
      emergencyContact: {
        en: "Emergency Contact",
        am: "አስቸኳይ አግኝነት"
      },
      followUs: {
        en: "Follow Us",
        am: "አገናኙን"
      },
      formSuccess: {
        en: "Message sent successfully! We'll contact you within 24 hours.",
        am: "መልእክትዎ በተሳካ ሁኔታ ተልኳል! በ24 ሰዓታት ውስጥ እንገናኝዎታለን።"
      },
      formError: {
        en: "Something went wrong. Please try again or contact us directly.",
        am: "ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ ወይም በቀጥታ ያግኙን።"
      },
      nameLabel: {
        en: "Full Name",
        am: "ሙሉ ስም"
      },
      emailLabel: {
        en: "Email Address",
        am: "የኢሜል አድራሻ"
      },
      phoneLabel: {
        en: "Phone Number",
        am: "ስልክ ቁጥር"
      },
      subjectLabel: {
        en: "Subject",
        am: "ርዕስ"
      },
      messageLabel: {
        en: "Message",
        am: "መልእክት"
      },
      departmentLabel: {
        en: "Department",
        am: "ክፍል"
      },
      sendMessage: {
        en: "Send Message",
        am: "መልእክት ይላኩ"
      },
      viaWhatsApp: {
        en: "via WhatsApp",
        am: "በዋትስአፕ"
      },
      viaPhone: {
        en: "via Phone Call",
        am: "በስልክ ጥሪ"
      },
      viaEmail: {
        en: "via Email",
        am: "በኢሜል"
      },
      generalInquiry: {
        en: "General Inquiry",
        am: "አጠቃላይ መጠየቅ"
      },
      salesInquiry: {
        en: "Sales Inquiry",
        am: "የግዥ መጠየቅ"
      },
      supportRequest: {
        en: "Customer Support",
        am: "የደንበኛ ድጋፍ"
      },
      customOrder: {
        en: "Custom Order",
        am: "በትእዛዝ ማዘጋጀት"
      },
      showroomVisit: {
        en: "Showroom Visit",
        am: "ሽውራ ጉብኝት"
      }
    };
    return translations[key]?.[lang] || key;
  };

  const departments: Department[] = [
    {
      id: 1,
      name: {
        en: "Sales & Orders",
        am: "ሽያጭ እና ትእዛዝ"
      },
      description: {
        en: "For product inquiries, pricing, and new orders",
        am: "ለምርት መጠየቅ፣ ዋጋ እና አዲስ ትዕዛዝ"
      },
      contact: {
        phone: "+251 91 123 4567",
        email: "sales@emufurniture.com",
        hours: language === 'am' ? '8:30 ጥዋት - 6:30 ማታ' : '8:30 AM - 6:30 PM'
      }
    },
    {
      id: 2,
      name: {
        en: "Customer Support",
        am: "የደንበኛ ድጋፍ"
      },
      description: {
        en: "For after-sales service, warranties, and support",
        am: "ለከሽያጭ አገልግሎት፣ ዋስትና እና ድጋፍ"
      },
      contact: {
        phone: "+251 92 987 6543",
        email: "support@emufurniture.com",
        hours: language === 'am' ? 'ሁልጊዜ' : '24/7'
      }
    },
    {
      id: 3,
      name: {
        en: "Custom Orders",
        am: "በትእዛዝ ማዘጋጀት"
      },
      description: {
        en: "For custom furniture design and specifications",
        am: "ለብጁ ፈርኒቸር ዲዛይን እና ዝርዝሮች"
      },
      contact: {
        phone: "+251 93 456 7890",
        email: "custom@emufurniture.com",
        hours: language === 'am' ? 'ሰኞ - ቅዳሜ' : 'Mon - Sat'
      }
    },
    {
      id: 4,
      name: {
        en: "Showroom & Visits",
        am: "ሽውራ እና ጉብኝት"
      },
      description: {
        en: "For showroom appointments and private tours",
        am: "ለሽውራ ቀጠሮዎች እና የግል ጉብኝቶች"
      },
      contact: {
        phone: "+251 94 321 0987",
        email: "showroom@emufurniture.com",
        hours: language === 'am' ? 'ሁሉም ቀናት' : 'All Days'
      }
    },
  ];

  const contactMethods = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: language === 'am' ? 'በዋትስአፕ' : 'WhatsApp',
      description: language === 'am' ? 'ፈጣን ምላሽ' : 'Quick response',
      color: 'bg-green-600 hover:bg-green-700',
      action: () => {
        const message = encodeURIComponent(
          language === 'am' 
            ? `ሰላም! ስለ ኢሙ ፈርኒቸር መረጃ እፈልጋለሁ። ስም: ${formData.name}`
            : `Hello! I'm interested in Emu Furniture. Name: ${formData.name}`
        );
        window.open(`https://wa.me/+251911234567?text=${message}`, '_blank');
      }
    },
    {
      id: 'phone',
      icon: Phone,
      title: language === 'am' ? 'ስልክ' : 'Phone',
      description: language === 'am' ? 'በቀጥታ ይደውሉ' : 'Direct call',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => {
        window.location.href = 'tel:+251911234567';
      }
    },
    {
      id: 'email',
      icon: Mail,
      title: language === 'am' ? 'ኢሜል' : 'Email',
      description: language === 'am' ? 'ዝርዝር መልእክት' : 'Detailed message',
      color: 'bg-amber-600 hover:bg-amber-700',
      action: () => {
        const subject = encodeURIComponent(formData.subject || t('generalInquiry'));
        const body = encodeURIComponent(
          `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        window.location.href = `mailto:info@emufurniture.com?subject=${subject}&body=${body}`;
      }
    },
  ];

  const subjectOptions = [
    { value: 'general', label: t('generalInquiry') },
    { value: 'sales', label: t('salesInquiry') },
    { value: 'support', label: t('supportRequest') },
    { value: 'custom', label: t('customOrder') },
    { value: 'showroom', label: t('showroomVisit') },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If using WhatsApp method
      if (activeContactMethod === 'whatsapp') {
        const message = encodeURIComponent(
          language === 'am' 
            ? `ሰላም! ከኢሙ ፈርኒቸር መጠየቅ አለኝ።
            ስም: ${formData.name}
            ስልክ: ${formData.phone}
            ኢሜል: ${formData.email}
            ርዕስ: ${formData.subject}
            መልእክት: ${formData.message}
            እባክዎ ያነጋግሩኝ!`
            : `Hello! I have an inquiry for Emu Furniture.
            Name: ${formData.name}
            Phone: ${formData.phone}
            Email: ${formData.email}
            Subject: ${formData.subject}
            Message: ${formData.message}
            Please contact me!`
        );
        window.open(`https://wa.me/+251911234567?text=${message}`, '_blank');
      }
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: 'general'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
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

      {/* Quick Contact Methods */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setActiveContactMethod(method.id as ContactMethod);
                if (formData.name) {
                  method.action();
                }
              }}
              className={`${method.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex flex-col items-center text-center">
                <method.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="opacity-90">{method.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 mr-4">
                  <Send className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {t('contactForm')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'am' 
                      ? 'ቅጹን ይሙሉ እና በፍጥነት እንመልስልዎታለን'
                      : 'Fill out the form and we\'ll get back to you quickly'}
                  </p>
                </div>
              </div>

              {/* Form Status Messages */}
              {formStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  {t('formSuccess')}
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-3" />
                  {t('formError')}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      {t('nameLabel')} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder={language === 'am' ? 'የእርስዎ ስም' : 'Your name'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      {t('phoneLabel')} *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="+251 91 234 5678"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    {t('emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      {t('subjectLabel')} *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">{language === 'am' ? 'ርዕስ ይምረጡ' : 'Select subject'}</option>
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                      {t('departmentLabel')}
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="general">{language === 'am' ? 'አጠቃላይ' : 'General'}</option>
                      <option value="sales">{language === 'am' ? 'ሽያጭ' : 'Sales'}</option>
                      <option value="support">{language === 'am' ? 'ድጋፍ' : 'Support'}</option>
                      <option value="custom">{language === 'am' ? 'ብጁ' : 'Custom'}</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    {t('messageLabel')} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder={language === 'am' 
                      ? 'መልእክትዎን እዚህ ይጻፉ...'
                      : 'Write your message here...'
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {language === 'am' ? 'በመላክ ላይ...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('sendMessage')} {t(`via${activeContactMethod.charAt(0).toUpperCase() + activeContactMethod.slice(1)}` as 'viaWhatsApp' | 'viaPhone' | 'viaEmail')}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                        department: 'general'
                      });
                    }}
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {language === 'am' ? 'አጽዳ' : 'Clear'}
                  </button>
                </div>
              </form>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3" />
                {t('emergencyContact')}
              </h3>
              <p className="mb-4 text-red-100">
                {language === 'am' 
                  ? 'ለአስቸኳይ ጉዳዮች እና የጉዳት ሪፖርቶች'
                  : 'For urgent matters and damage reports'}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">+251 90 111 2222</div>
                  <div className="text-sm text-red-200">{language === 'am' ? '24/7 ይጠራ' : 'Call 24/7'}</div>
                </div>
                <a
                  href="tel:+251901112222"
                  className="bg-white text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {language === 'am' ? 'ይደውሉ' : 'Call Now'}
                </a>
              </div>
            </div>
          </div>

          {/* Location & Departments */}
          <div>
            {/* Location */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 mr-4">
                  <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {t('ourLocation')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'am' ? 'ዋና ሽውራ እና መምሪያ ቢሮ' : 'Main Showroom & Headquarters'}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Building className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                      Emu Furniture Headquarters
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Megenagna, Addis Ababa, Ethiopia
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'am' ? 'ከፍሪንድሺፕ ሆቴል አቅራቢያ' : 'Near Friendship Hotel'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                      {t('businessHours')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'am' ? 'ሰኞ - ቅዳሜ: 8:30 ጥዋት - 6:30 ማታ' : 'Monday - Saturday: 8:30 AM - 6:30 PM'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'am' ? 'እሁድ: 10:00 ጥዋት - 4:00 ማታ' : 'Sunday: 10:00 AM - 4:00 PM'}
                    </p>
                  </div>
                </div>

                {/* Google Map */}
                <div className="rounded-xl overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.573710286464!2d38.77183407564615!3d9.022219488247652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f0f8e1c21f%3A0x40e59d6592e8edbd!2sMegenagna%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
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

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://maps.google.com/?q=Emu+Furniture+Megenagna+Addis+Ababa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    {language === 'am' ? 'አቅጣጫ' : 'Directions'}
                  </a>
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(
                        language === 'am' 
                          ? 'ሰላም! የሽውራ አቅጣጫ እፈልጋለሁ።'
                          : 'Hello! I need directions to your showroom.'
                      );
                      window.open(`https://wa.me/+251911234567?text=${message}`, '_blank');
                    }}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
                {t('departments')}
              </h2>
              <div className="space-y-6">
                {departments.map((dept) => (
                  <div key={dept.id} className="border-l-4 border-amber-500 pl-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {dept.name[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {dept.description[language]}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-700 dark:text-gray-400">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{dept.contact.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-700 dark:text-gray-400">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{dept.contact.email}</span>
                      </div>
                      <div className="flex items-center text-gray-700 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{dept.contact.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-r from-amber-700 to-amber-600 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {t('followUs')}
              </h2>
              <div className="flex justify-center space-x-6 mb-6">
                {[
                  { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
                  { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
                  { icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-400' },
                  { icon: Youtube, label: 'YouTube', color: 'hover:bg-red-600' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:scale-110 transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
              <p className="text-center text-amber-200">
                {language === 'am' 
                  ? 'ለአዝማሚያዎች፣ ለአዲስ ምርቶች እና ለልዩ ቅናሾች'
                  : 'For trends, new products, and exclusive offers'}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            {language === 'am' ? 'ለምን እንደሚታረኩን' : 'Why Customers Trust Us'}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: language === 'am' ? "10 ዓመት ዋስትና" : "10-Year Warranty",
                description: language === 'am' ? "በሁሉም ምርቶቻችን" : "On all our products"
              },
              {
                icon: Truck,
                title: language === 'am' ? "ነፃ መላኪያ" : "Free Delivery",
                description: language === 'am' ? "በአዲስ አበባ" : "In Addis Ababa"
              },
              {
                icon: HeadphonesIcon,
                title: language === 'am' ? "24/7 ድጋፍ" : "24/7 Support",
                description: language === 'am' ? "ሁልጊዜ አገልግሎት" : "Always available"
              },
              {
                icon: Package,
                title: language === 'am' ? "ነፃ ማዋቀር" : "Free Assembly",
                description: language === 'am' ? "በቦታ ላይ አገልግሎት" : "On-site service"
              },
            ].map((badge, index) => (
              <div key={index} className="text-center">
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

        {/* FAQ Section */}
        <div className="mt-20 bg-gradient-to-r from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            {language === 'am' ? 'ተደጋግሟል ጥያቄዎች' : 'Frequently Asked Questions'}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: language === 'am' 
                  ? 'የመላኪያ ጊዜ ምን ያህል ይፈጅሃል?' 
                  : 'How long does delivery take?',
                a: language === 'am' 
                  ? 'በአዲስ አበባ ከ3-5 የስራ ቀናት፣ ከከተማ ውጭ ከ7-14 የስራ ቀናት። በትእዛዝ ምርቶች ከ6-8 ሳምንታት።' 
                  : 'In Addis Ababa: 3-5 business days. Outside city: 7-14 business days. Custom orders: 6-8 weeks.'
              },
              {
                q: language === 'am' 
                  ? 'የክፍያ አማራጮች ምንድን ናቸው?' 
                  : 'What payment methods do you accept?',
                a: language === 'am' 
                  ? 'በጥሬ ገንዘብ፣ በባንክ ማስተላለፊያ፣ በቼክ፣ በክሬዲት ካርድ (በሚመጡ) እና በክፍል ክፍያ እንቀበላለን።' 
                  : 'We accept cash, bank transfer, check, credit cards (coming soon), and installment payments.'
              },
              {
                q: language === 'am' 
                  ? 'ሽውራን መጎብኘት አለብኝ?' 
                  : 'Do I need to visit the showroom?',
                a: language === 'am' 
                  ? 'አያስፈልግም፣ ነገር ግን ከመግዛትዎ በፊት ቁሳቁስን እና ጥራትን በቀጥታ ለማየት እንመክራለን። በዋትስአፕ የቪድዮ ጉብኝት ማድረግ እንችላለን።' 
                  : 'Not required, but we recommend seeing materials and quality in person before purchasing. We can do video tours via WhatsApp.'
              },
              {
                q: language === 'am' 
                  ? 'በትእዛዝ ፈርኒቸር ማዘጋጀት ይቻላል?' 
                  : 'Can I get custom furniture made?',
                a: language === 'am' 
                  ? 'አዎ! በትእዛዝ ፈርኒቸር ማዘጋጀት ዋናው አገልግሎታችን ነው። በርእሰ ጉዳይ አማካሪዎቻችን ነፃ ምክር ይሰጡዎታል።' 
                  : 'Yes! Custom furniture is our specialty. Our expert consultants provide free consultation.'
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            {language === 'am' 
              ? 'አሁን በምንም ነገር አይቆዩ!' 
              : "Don't Wait to Get in Touch!"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'am' 
              ? 'ለነፃ ምክር፣ የዋጋ ግምት ወይም ሽውራ ለመጎብኘት ይደውሉ።'
              : 'Call now for free consultation, pricing estimate, or to schedule a showroom visit.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+251911234567"
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              +251 91 123 4567
            </a>
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  language === 'am' 
                    ? 'ሰላም! ለነፃ ምክር እፈልጋለሁ።'
                    : 'Hello! I would like a free consultation.'
                );
                window.open(`https://wa.me/+251911234567?text=${message}`, '_blank');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp Chat
            </button>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mt-12 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <a href="/" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors flex items-center">
            <Home className="w-4 h-4 inline mr-2" />
            {language === 'am' ? 'መነሻ' : 'Home'}
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-semibold text-amber-600 dark:text-amber-500">
            {t('pageTitle')}
          </span>
        </div>
      </div>
    </div>
  );
}