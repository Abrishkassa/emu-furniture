'use client';

import { useState } from 'react';
import {
  Heart, Award, Users, TrendingUp, Star,
  ChevronRight, MapPin, Clock, Phone, Mail,
  CheckCircle, Target, Shield, Truck, PenTool,
  Eye, Ruler, Palette, Sparkles, Crown,
  Quote, TreePine, Compass, Mountain, Gem,
  BadgeCheck, Medal, GraduationCap, Lightbulb,
  HandHeart, Wrench, Hammer, Drill, Brush,
  Rocket, Globe, Layers, Leaf
} from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

type Language = 'en' | 'am';

interface Milestone {
  year: string;
  title: { en: string; am: string };
  description: { en: string; am: string };
  icon: any;
}

interface Value {
  id: number;
  icon: any;
  title: { en: string; am: string };
  description: { en: string; am: string };
}

interface TeamMember {
  name: { en: string; am: string };
  role: { en: string; am: string };
  description: { en: string; am: string };
  icon: any;
}

interface Vision {
  title: { en: string; am: string };
  description: { en: string; am: string };
  initiatives: { en: string[]; am: string[] };
  icon: any;
}

export default function ProfilePage() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'journey' | 'craft' | 'values' | 'vision'>('journey');

  const t = (en: string, am: string) => language === 'en' ? en : am;

  // 🏆 30+ Years Journey
  const milestones: Milestone[] = [
    {
      year: "1990",
      title: { 
        en: "The Beginning in Negelle Borena", 
        am: "ጅምር በነገሌ ቦረና" 
      },
      description: { 
        en: "A master carpenter's dream begins. One workshop, one craftsman, one vision: to create furniture that outlives generations.", 
        am: "የአንድ ዋና አናጺ ህልም ጀመረ። አንድ ዎርክሾፕ፣ አንድ የጥበብ ሰው፣ አንድ ራዕይ።" 
      },
      icon: Mountain
    },
    {
      year: "1992",
      title: { 
        en: "First Signature Collection", 
        am: "የመጀመሪያ የፊርማ ስብስብ" 
      },
      description: { 
        en: "Our first complete furniture collection that blended Borana heritage with contemporary Ethiopian living.", 
        am: "የቦረና ባህል እና ዘመናዊ የኢትዮጵያ ኑሮን ያጣመረ የመጀመሪያ የቤት እቃ ስብስብ።" 
      },
      icon: Crown
    },
    {
      year: "1994",
      title: { 
        en: "The Move to Hawassa", 
        am: "ወደ ሃዋሳ ሽግግር" 
      },
      description: { 
        en: "A pivotal moment. Relocating our craft to Hawassa opened new horizons and brought our furniture to more Ethiopian homes.", 
        am: "ወሳኝ ጊዜ። ወደ ሃዋሳ መሸጋገር አዲስ አድማስ ከፈተ እና የቤት እቃዎቻችንን ለብዙ የኢትዮጵያ ቤቶች አቀረበ።" 
      },
      icon: Compass
    },
    {
      year: "2002",
      title: { 
        en: "20 Years of Trust", 
        am: "20 ዓመታት የመተማመን" 
      },
      description: { 
        en: "Two decades in business. Our first generation of clients became family, and their children now furnish their homes with Emu.", 
        am: "ሁለት አስርት ዓመታት በንግድ። የመጀመሪያዎቹ ደንበኞች ቤተሰብ ሆኑ፣ አሁን ልጆቻቸው ቤታቸውን በኢሙ ያስጌጣሉ።" 
      },
      icon: Medal
    },
    {
      year: "2010",
      title: { 
        en: "Design Excellence Recognition", 
        am: "የዲዛይን ልህቀት እውቅና" 
      },
      description: { 
        en: "Our founder recognized as Senior Master Designer. Every piece personally reviewed before leaving the workshop.", 
        am: "መስራችችን እንደ ከፍተኛ ዋና ዲዛይነር እውቅና አገኙ። እያንዳንዱ እቃ ከዎርክሾፕ ከመውጣቱ በፊት በግል ይመረመራል።" 
      },
      icon: Award
    },
    {
      year: "2018",
      title: { 
        en: "30+ Years & Beyond", 
        am: "ከ30+ ዓመታት በላይ" 
      },
      description: { 
        en: "Three decades of Ethiopian craftsmanship. Now reaching clients across the nation through our digital doors.", 
        am: "ሶስት አስርት ዓመታት የኢትዮጵያ የጥበብ ስራ። አሁን በዲጂታል በሮቻችን በመላ ሀገሪቱ ደንበኞችን እናገኛለን።" 
      },
      icon: Sparkles
    }
  ];

  //  Core Values & Quality Criteria
  const values: Value[] = [
    {
      id: 1,
      icon: Heart,
      title: { 
        en: "Trust First, Quality Always", 
        am: "መተማመን መጀመሪያ፣ ጥራት ሁልጊዜ" 
      },
      description: { 
        en: "Trust isn't just our value—it's our foundation. We believe without client trust, true quality is impossible. This is why families have stayed with us for 20+ years.", 
        am: "መተማመን እሴታችን ብቻ አይደለም—መሰረታችን ነው። ያለ ደንበኛ መተማመን እውነተኛ ጥራት እንደማይገኝ እናምናለን። ለዚህ ነው ቤተሰቦች ከ20+ ዓመታት በላይ ከኛ ጋር የቆዩት።" 
      }
    },
    {
      id: 2,
      icon: Eye,
      title: { 
        en: "Founder's Eye: Every Detail Matters", 
        am: "የመስራች እይታ፡ እያንዳንዱ ዝርዝር አስፈላጊ ነው" 
      },
      description: { 
        en: "Our founder, a 30+ year master designer, personally inspects every piece—from initial sketch to final finish. No detail escapes his trained eye.", 
        am: "መስራችችን፣ የ30+ ዓመት ዋና ዲዛይነር፣ እያንዳንዱን እቃ ከመጀመሪያ ንድፍ እስከ መጨረሻ አጨራረስ በግል ይመረምራል። ምንም ዝርዝር ከሰለጠነ እይታው አያመልጥም።" 
      }
    },
    {
      id: 3,
      icon: Gem,
      title: { 
        en: "Silent Luxury, Loud Quality", 
        am: "ጸጥታ ያለው ውበት፣ ጮሆ የሚሰማ ጥራት" 
      },
      description: { 
        en: "We don't shout. Our furniture speaks through its silence—clean lines, flawless finishes, and presence that transforms spaces without demanding attention.", 
        am: "አንጮህም። የቤት እቃዎቻችን በዝምታቸው ይናገራሉ—ንጹህ መስመሮች፣ ከውድቀት ነጻ የሆነ አጨራረስ፣ እና ቦታን የሚለውጥ መኖር።" 
      }
    },
    {
      id: 4,
      icon: Hammer,
      title: { 
        en: "One Piece, One Obsession", 
        am: "አንድ እቃ፣ አንድ ከፍተኛ ትኩረት" 
      },
      description: { 
        en: "We never think twice about quality. Each piece receives undivided attention, as if it's the only piece we'll ever make. Because for our client, it is.", 
        am: "ስለ ጥራት ሁለት ጊዜ አናስብም። እያንዳንዱ እቃ ልዩ ትኩረት ያገኛል፣ ልክ እንደምንሠራው ብቸኛ እቃ። ምክንያቱም ለደንበኛችን፣ እሱ ብቻ ነው።" 
      }
    },
    {
      id: 5,
      icon: GraduationCap,
      title: { 
        en: "Beyond Sales: Furniture Consultancy", 
        am: "ከሽያጭ ባለፈ፡ የቤት እቃ ማማከር" 
      },
      description: { 
        en: "We educate. We advise. Even if you don't buy from us, we share our 30+ years of knowledge about furniture quality, materials, and standards. Because good furniture should exist everywhere.", 
        am: "እናስተምራለን። እንመክራለን። ከኛ ባትገዙም፣ ስለ ቤት እቃ ጥራት፣ ቁሳቁስ እና መስፈርት የ30+ ዓመት እውቀታችንን እናካፍላለን።" 
      }
    },
    {
      id: 6,
      icon: Truck,
      title: { 
        en: "Anywhere in Ethiopia", 
        am: "በመላ ኢትዮጵያ" 
      },
      description: { 
        en: "From Addis to Adama, Ziway to Hawassa. A phone call or message connects you to our craft. Delivery within one month for most custom orders.", 
        am: "ከአዲስ አበባ እስከ ጅጅጋ፣ ባህር ዳር እስከ ሞያሌ። አንድ ጥሪ ወይም መልእክት ከጥበብ ስራችን ጋር ያገናኝዎታል። ለአብዛኞቹ ብጁ ትዕዛዞች በአንድ ወር ጊዜ ውስጥ ማድረስ።" 
      }
    }
  ];

  // 👑 The Master & His Team
  const founder = {
    name: { en: "Mr. Mengistu", am: "አለማየሁ ደስታ" },
    title: { en: "Founder & Senior Master Designer", am: "መስራች እና ከፍተኛ ዋና ዲዛይነር" },
    experience: "30+ Years",
    philosophy: {
      en: "I don't design furniture. I design how families will live, love, and grow around it. Every curve, every joint, every finish—it all matters because it becomes part of someone's life.",
      am: "የቤት እቃ ብቻ አልነድፍም። ቤተሰቦች እንዴት እንደሚኖሩ፣ እንደሚዋደዱ እና በዙሪያው እንደሚያድጉ እነድፋለሁ። እያንዳንዱ ኩርባ፣ እያንዳንዱ መጋጠሚያ፣ እያንዳንዱ አጨራረስ—ሁሉም አስፈላጊ ነው።"
    }
  };

  const team: TeamMember[] = [
    {
      name: { en: "Mrs. Emu", am: "emu" },
      role: { en: "Owner", am: "ዋና የቤት እቃ ኢንጂነር" },
      description: { 
        en: "20+ years translating dreams into technical drawings. Every measurement is verified twice.", 
        am: "ከ15+ ዓመታት በላይ ህልሞችን ወደ ቴክኒካል ንድፍ በመቀየር። እያንዳንዱ ልኬት ሁለት ጊዜ ይረጋገጣል።" 
      },
      icon: Ruler
    },
    {
      name: { en: "Mr. Melkamu", am: "melkamu" },
      role: { en: "Supervisor", am: "ዋና አጠናቃቂ" },
      description: { 
        en: "The man who controls quality. Specializes in quality control and customer satisfaction that reveal the the quality of our company", 
        am: "እንጨትን የሚያወድስ ሰው። የኢትዮጵያ እንጨት ነፍስ የሚያሳዩ የተፈጥሮ ዘይት አጨራረሶች ላይ የተካነ።" 
      },
      icon: Brush
    },
    {
      name: { en: "Yoni", am: "yoni" },
      role: { en: "Client Experience & Packaging", am: "የደንበኛ ልምድ እና መተማመን" },
      description: { 
        en: " client relationships. He remembers your preferences, your home, and what you loved last time.", 
        am: "ከ20+ ዓመታት በላይ የደንበኛ ግንኙነት። ምርጫዎችዎን፣ ቤትዎን፣ እና ባለፈው ጊዜ የወደዱትን ታስታውሳለች።" 
      },
      icon: HandHeart
    }
  ];

  // 🤝 20+ Year Partners
  const clientPartners = [
    {
      name: "Haile Family",
      since: "2003",
      quote: {
        en: "Emu furnished our first home. Now our daughter's first apartment has Emu pieces. That's not just loyalty—that's family.",
        am: "ኢሙ የመጀመሪያ ቤታችንን አስጌጠ። አሁን የልጃችን የመጀመሪያ አፓርታማ የኢሙ ዕቃዎች አሉት። ይህ ታማኝነት ብቻ አይደለም—ቤተሰብ ነው።"
      }
    },
    {
      name: "Hawassa University",
      since: "2010",
      quote: {
        en: "15 years of furnishing our faculty offices. They still look timeless. That's quality.",
        am: "15 ዓመታት የፋኩልቲ ቢሮዎቻችንን ሲያስጌጡ ቆይተዋል። አሁንም ዘመናቸውን ያልጠበቁ ይመስላሉ። ይህ ነው ጥራት።"
      }
    }
  ];

  // 🚀 Future Vision: 2025 & Beyond
  const futureVision: Vision = {
    title: {
      en: "Emu Furniture: The Next Chapter",
      am: "ኢሙ ፈርኒቸር፡ ቀጣዩ ምዕራፍ"
    },
    description: {
      en: "Three decades have built our foundation. The next thirty will build our legacy. We are expanding not just our workshop, but our impact on Ethiopian design, craftsmanship, and sustainability.",
      am: "ሶስት አስርት ዓመታት መሰረታችንን ገንብተዋል። ቀጣዮቹ ሰላሳ ደግሞ ቅርሳችንን ይገነባሉ። ዎርክሾፓችንን ብቻ ሳይሆን በኢትዮጵያ ዲዛይን፣ የጥበብ ስራ እና ዘላቂነት ላይ ያለንን ተፅእኖ እያስፋፋን ነው።"
    },
    initiatives: {
      en: [
        "Emu Design Academy: Training the next generation of Ethiopian furniture craftsmen",
        "Hawassa Furniture Hub: A dedicated space for design exhibitions and client consultations",
        "Sustainable Forestry Partnership: Sourcing ethically grown Ethiopian timber",
        "Digital Showroom: Virtual 3D consultations for clients worldwide",
        "Signature Collections: Annual limited-edition releases celebrating Ethiopian heritage",
        "Restoration & Conservation Program: Preserving antique Ethiopian furniture for future generations"
      ],
      am: [
        "የኢሙ ዲዛይን አካዳሚ፡ ቀጣዩን የኢትዮጵያ የቤት እቃ የጥበብ ሰዎች ትውልድ ማሰልጠን",
        "የሃዋሳ የቤት እቃ ማዕከል፡ ለዲዛይን ኤግዚቢሽን እና ለደንበኛ ምክክር የተዘጋጀ ቦታ",
        "ዘላቂ የደን ልማት አጋርነት፡ በስነምግባር የተመረተ የኢትዮጵያ እንጨት ማምረት",
        "ዲጂታል ማሳያ ቤት፡ በዓለም ዙሪያ ላሉ ደንበኞች ቨርቹዋል 3D ምክክር",
        "የፊርማ ስብስቦች፡ የኢትዮጵያን ባህል የሚያከብሩ አመታዊ ውስን እትም ምርቶች",
        "የእድሳት እና ጥበቃ ፕሮግራም፡ ጥንታዊ የኢትዮጵያ የቤት እቃዎችን ለቀጣይ ትውልዶች መጠበቅ"
      ]
    },
    icon: Rocket
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* Hero Section - The Journey Visual */}
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-amber-500 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto py-20 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center border-2 border-white/30">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center border-2 border-white/30">
                    <Mountain className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-800 flex items-center justify-center border-2 border-white/30">
                    <Compass className="w-6 h-6" />
                  </div>
                </div>
                <span className="text-amber-200 font-semibold tracking-wider">
                  {t('EST. 1996', 'ከ1996 ጀምሮ')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold">
                <span className="block">{t('30+ Years', 'ከ30+ ዓመታት')}</span>
                <span className="block text-amber-300 text-3xl md:text-4xl mt-2">
                  {t('From Negelle Borena to Your Home', 'ከነገሌ ቦረና እስከ ቤትዎ')}
                </span>
              </h1>
              
              <p className="text-xl text-amber-50 leading-relaxed">
                {t(
                  'Three decades of Ethiopian furniture craftsmanship. Born in the highlands of Borena, raised in Hawassa, now serving families across the nation.',
                  'ሶስት አስርት ዓመታት የኢትዮጵያ የቤት እቃ የጥበብ ስራ። በቦረና ተወለደ፣ በሃዋሳ ተመረመረ፣ አሁን በመላ ሀገሪቱ ቤተሰቦችን ያገለግላል።'
                )}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <WhatsAppButton 
                  isReserveButton={false}
                  language={language}
                  className="bg-white text-amber-900 hover:bg-amber-50 px-8 py-4 rounded-lg font-semibold shadow-xl flex items-center justify-center gap-2"
                />
                <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {t('Visit Our Showroom', 'ማሳያ ቤታችንን ይጎብኙ')}
                </button>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-amber-300">30+</div>
                  <div className="text-sm text-amber-100 mt-1">{t('Years', 'ዓመታት')}</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-amber-300">20+</div>
                  <div className="text-sm text-amber-100 mt-1">{t('Year Clients', 'ዓመት ደንበኞች')}</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-amber-300">100%</div>
                  <div className="text-sm text-amber-100 mt-1">{t('Founder Inspected', 'በመስራች ተፈትሸዋል')}</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl font-bold text-amber-300">🌍</div>
                  <div className="text-sm text-amber-100 mt-1">{t('Nationwide', 'በመላ ሀገሪቱ')}</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3 text-amber-100">
                  <BadgeCheck className="w-6 h-6 text-amber-300 flex-shrink-0" />
                  <p className="text-sm italic">
                    {t(
                      '"Trust is not earned in a day. It is built piece by piece, year after year, home after home."',
                      '"መተማመን በአንድ ቀን አይገኝም። እንደ እቃ፣ እንደ ዓመት፣ እንደ ቤት ይገነባል።"'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>
      </div>
      
      {/* Navigation Tabs for Story Sections */}
      <div className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center space-x-1 md:space-x-4 py-4">
            {[
              { id: 'journey', label: t('The Journey', 'ጉዞው'), icon: Compass },
              { id: 'craft', label: t('The Craft', 'ጥበቡ'), icon: Hammer },
              { id: 'values', label: t('Our Values', 'እሴቶቻችን'), icon: Heart },
              { id: 'vision', label: t('Future Vision', 'የወደፊት ራዕይ'), icon: Rocket }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4">
        
        {/* ============ TAB 1: THE 30+ YEAR JOURNEY ============ */}
        {activeTab === 'journey' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-semibold mb-4">
                {t('From One Workshop to National Legacy', 'ከአንድ ዎርክሾፕ ወደ ብሔራዊ ቅርስ')}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {t('30+ Years of', 'ከ30+ ዓመታት')}{' '}
                <span className="text-amber-700 dark:text-amber-500">{t('Ethiopian Soul', 'የኢትዮጵያ ነፍስ')}</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t(
                  'What began as a single craftsman in Negelle Borena has become a trusted name in Ethiopian furniture. Every step of this journey was carved with patience, integrity, and an obsession with quality.',
                  'በነገሌ ቦረና እንደ አንድ አናጺ የጀመረው አሁን በኢትዮጵያ የቤት እቃ ስራ ታማኝ ስም ሆኗል። እያንዳንዱ እርምጃ በትዕግስት፣ በታማኝነት እና በጥራት ላይ ባለ ከፍተኛ ትኩረት ተቀርጿል።'
                )}
              </p>
            </div>
            
            <div className="relative mb-20">
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-300 via-amber-600 to-amber-300 rounded-full"></div>
              
              <div className="space-y-12 md:space-y-0">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-center mb-12 md:mb-0`}>
                    <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-amber-600 border-4 border-white dark:border-gray-900 shadow-lg z-10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <milestone.icon className="w-6 h-6 text-amber-700 dark:text-amber-500" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-amber-700 dark:text-amber-500">{milestone.year}</span>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{milestone.title[language]}</h3>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {milestone.description[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-700 to-amber-600 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-white mb-20">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 flex justify-center">
                  <div className="relative">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-amber-500/30 flex items-center justify-center border-4 border-white/50">
                      <Crown className="w-20 h-20 md:w-24 md:h-24 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-white text-amber-800 px-4 py-2 rounded-full font-bold shadow-lg">
                      30+ {t('Years', 'ዓመታት')}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <BadgeCheck className="w-6 h-6 text-amber-300" />
                    <span className="text-amber-200 font-semibold uppercase tracking-wider text-sm">
                      {t('THE MASTER HIMSELF', 'እራሱ ዋና ዲዛይነር')}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{founder.name[language]}</h3>
                  <p className="text-xl text-amber-100 mb-6">{founder.title[language]}</p>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-2 w-10 h-10 text-amber-300/30" />
                    <p className="text-lg md:text-xl italic pl-6 border-l-4 border-amber-400">
                      "{founder.philosophy[language]}"
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{t('Personally inspects every piece', 'እያንዳንዱን እቃ በግል ይፈትሻል')}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                      <PenTool className="w-4 h-4" />
                      <span className="text-sm">{t('Original designs only', 'የመጀመሪያ ዲዛይኖች ብቻ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  {t('20+ Years Together', 'ከ20+ ዓመታት አብረን')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {t(
                    'When you choose Emu, you do not just become a customer. You become family. For life.',
                    'ኢሙን ስትመርጡ ደንበኛ ብቻ አይሆኑም። ቤተሰብ ይሆናሉ። ለህይወት ዘመናችሁ።'
                  )}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {clientPartners.map((partner, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-8 border-amber-600">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="w-8 h-8 text-amber-600" />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{partner.name}</h3>
                        <p className="text-sm text-amber-700 dark:text-amber-500">{t('Since', 'ከ')} {partner.since}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic text-lg">"{partner.quote[language]}"</p>
                    <div className="mt-4 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* ============ TAB 2: THE CRAFT & QUALITY ============ */}
        {activeTab === 'craft' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-semibold mb-4">
                {t('Where Quality Lives', 'ጥራት የሚኖርበት')}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {t('We Never Think Twice', 'ሁለት ጊዜ አናስብም')}{' '}
                <span className="text-amber-700 dark:text-amber-500">{t('About Quality', 'ስለ ጥራት')}</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t(
                  'Every curve. Every joint. Every finish. Each piece receives the same attention as if it were the only one we will ever make.',
                  'እያንዳንዱ ኩርባ። እያንዳንዱ መጋጠሚያ። እያንዳንዱ አጨራረስ። እያንዳንዱ እቃ ልክ እንደምንሠራው ብቸኛ እቃ ተመሳሳይ ትኩረት ያገኛል።'
                )}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-amber-700 dark:text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {t('The Emu Quality Standard', 'የኢሙ ጥራት መስፈርት')}
                </h3>
                <ul className="space-y-4">
                  {[
                    { 
                      en: "100% solid Ethiopian timber—no composites, no shortcuts", 
                      am: "100% ጠንካራ የኢትዮጵያ እንጨት—ምንም ቅይጥ፣ ምንም አቋራጭ መንገድ" 
                    },
                    { 
                      en: "Hand-finished, never rushed. Some pieces take weeks to perfect.", 
                      am: "በእጅ የሚጠናቀቅ፣ ፍጥነት የለም። አንዳንድ እቃዎች ፍጹም ለመሆን ሳምንታት ይወስዳሉ።" 
                    },
                    { 
                      en: "Triple-inspection process: craftsman → lead engineer → founder", 
                      am: "ሶስት እጥፍ ፍተሻ፡ አናጺ → ዋና ኢንጂነር → መስራች" 
                    },
                    { 
                      en: "Silent luxury: designs that speak through presence, not noise", 
                      am: "ጸጥታ ያለው ውበት፡ በመኖር እንጂ በጩኸት የማይናገሩ ዲዛይኖች" 
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 dark:from-amber-800 dark:to-amber-900 p-8 rounded-2xl shadow-lg text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                  <Gem className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {t('Silent Luxury', 'ጸጥታ ያለው ውበት')}
                </h3>
                <p className="text-lg text-amber-100 mb-6">
                  {t(
                    'We do not create furniture that screams for attention. We create pieces that earn it—through flawless joinery, perfect proportions, and finishes that reveal their beauty slowly, over years of use.',
                    'ትኩረት የሚጮሁ የቤት እቃዎችን አንሠራም። ትኩረትን የሚስቡ እቃዎችን እንፈጥራለን—ከውድቀት ነጻ በሆነ መጋጠሚያ፣ ፍጹም በሆነ መጠን፣ እና ውበታቸውን ቀስ ብለው በሚገልጡ አጨራረሶች።'
                  )}
                </p>
                <div className="border-t border-white/30 pt-6 mt-6">
                  <div className="flex items-center gap-3">
                    <Medal className="w-8 h-8 text-amber-300" />
                    <div>
                      <p className="font-bold">{t('30+ Years of Design Excellence', 'ከ30+ ዓመታት የዲዛይን ልህቀት')}</p>
                      <p className="text-sm text-amber-200">{t('Founder-led design since day one', 'ከመጀመሪያ ቀን ጀምሮ በመስራች የሚመራ ዲዛይን')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
                {t('The Hands Behind the Craft', 'ከጥበቡ በስተጀርባ ያሉ እጆች')}
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <member.icon className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{member.name[language]}</h4>
                      <p className="text-amber-700 dark:text-amber-500 font-semibold mb-3">{member.role[language]}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{member.description[language]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-amber-200 dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                    <span className="text-amber-700 dark:text-amber-500 font-semibold">
                      {t('BEYOND SALES', 'ከሽያጭ ባለፈ')}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    {t('Free Furniture Consultancy', 'ነፃ የቤት እቃ ማማከር')}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {t(
                      'You do not have to buy from us to learn from us. We offer free consultations on furniture quality, materials, and standards—because we believe better furniture should exist in every Ethiopian home.',
                      'ከኛ መግዛት የለብዎትም ከኛ ለመማር። ስለ ቤት እቃ ጥራት፣ ቁሳቁስ እና መስፈርት ነፃ ምክክር እንሰጣለን—ምክንያቱም በእያንዳንዱ የኢትዮጵያ ቤት ውስጥ የተሻለ የቤት እቃ መኖር አለበት ብለን እናምናለን።'
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      {t('Book a Consultation', 'ምክክር ይያዙ')}
                    </button>
                    <WhatsAppButton 
                      isReserveButton={false}
                      language={language}
                      className="bg-transparent border-2 border-amber-600 text-amber-600 dark:text-amber-500 dark:border-amber-500 hover:bg-amber-50 px-6 py-3 rounded-lg font-semibold"
                    />
                  </div>
                </div>
                <div className="bg-amber-50 dark:bg-gray-700 p-8 rounded-2xl">
                  <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-4">
                    {t('We advise on:', 'በሚከተሉት ላይ እንመክራለን፦')}
                  </h4>
                  <ul className="space-y-3">
                    {[
                      t('Wood species & durability', 'የእንጨት ዝርያ እና ዘላቂነት'),
                      t('Joinery techniques', 'የመጋጠሚያ ዘዴዎች'),
                      t('Finish types & maintenance', 'የአጨራረስ አይነቶች እና እንክብካቤ'),
                      t('Space planning & proportions', 'የቦታ አመቻቻል እና መጠን'),
                      t('Investment vs. cost analysis', 'የኢንቨስትመንት እና ወጪ ትንተና')
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ============ TAB 3: OUR VALUES & TRUST ============ */}
        {activeTab === 'values' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-semibold mb-4">
                {t('The Foundation', 'መሰረቱ')}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {t('Trust is the', 'መተማመን ነው')}{' '}
                <span className="text-amber-700 dark:text-amber-500">{t('Only Currency', 'ብቸኛ ምንዛሬ')}</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t(
                  'Without trust, quality is impossible. This belief has kept families with us for over two decades.',
                  'ያለ መተማመን፣ ጥራት አይገኝም። ይህ እምነት ቤተሰቦችን ከሁለት አስርት ዓመታት በላይ ከኛ ጋር አቆይቷል።'
                )}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {values.map((value) => (
                <div key={value.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6 group-hover:bg-amber-600 dark:group-hover:bg-amber-700 transition-colors">
                    <value.icon className="w-8 h-8 text-amber-700 dark:text-amber-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {value.title[language]}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description[language]}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-amber-700 to-amber-600 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-white mb-20">
              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  {t('20+ Years of Trust', 'ከ20+ ዓመታት መተማመን')}
                </h3>
                <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                  {t(
                    'Our first customers are still our customers. They have become family, partners, and our greatest ambassadors.',
                    'የመጀመሪያዎቹ ደንበኞቻችን አሁንም ደንበኞቻችን ናቸው። ቤተሰብ፣ አጋሮች፣ እና ታላላቅ አምባሳደሮቻችን ሆነዋል።'
                  )}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: "20+", label: t('Year Partners', 'ዓመት አጋሮች') },
                  { number: "1,500+", label: t('Homes Furnished', 'ቤቶች ተሠርተዋል') },
                  { number: "100%", label: t('Founder Approved', 'በመስራች ተቀባይነት አግኝቷል') },
                  { number: "ET", label: t('Ethiopian Owned', 'የኢትዮጵያ ባለቤትነት') }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-3xl md:text-4xl font-bold text-amber-300 mb-2">{stat.number}</div>
                    <div className="text-sm text-amber-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-amber-200 dark:border-gray-700">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    {t('Anywhere in Ethiopia', 'በመላ ኢትዮጵያ')}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {t(
                      'A phone call. A WhatsApp message. A DM on Instagram. That is all it takes to bring Emu craftsmanship to your door, anywhere in the country.',
                      'አንድ ጥሪ። አንድ የዋትስአፕ መልእክት። አንድ ዲኤም በኢንስታግራም። ያ ብቻ ነው የኢሙን የጥበብ ስራ ወደ ቤትዎ ለማምጣት፣ በሀገሪቱ ውስጥ ባሉ ማናቸውም ቦታዎች።'
                    )}
                  </p>
                  
                  <div className="bg-amber-50 dark:bg-gray-700 p-6 rounded-xl mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-6 h-6 text-amber-700 dark:text-amber-500" />
                      <h4 className="font-bold text-gray-800 dark:text-white">
                        {t('Delivery Timeline', 'የማድረስ ጊዜ')}
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t(
                        'Most custom orders are delivered within one month. Timeline depends on project complexity and current orders, but we believe quality takes the time it needs.',
                        'አብዛኞቹ ብጁ ትዕዛዞች በአንድ ወር ጊዜ ውስጥ ይደርሳሉ። የጊዜ ሰሌዳው በፕሮጀክቱ ውስብስብነት እና አሁን ባሉ ትዕዛዞች ላይ የሚወሰን ቢሆንም፣ ጥራት የሚፈልገውን ጊዜ ይወስዳል ብለን እናምናለን።'
                      )}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      {t('Call Us: +251 99 344 9447', 'ይደውሉልን፦ +251 99 344 9447')}
                    </button>
                    <WhatsAppButton 
                      isReserveButton={false}
                      language={language}
                      className="bg-transparent border-2 border-amber-600 text-amber-600 dark:text-amber-500 dark:border-amber-500 hover:bg-amber-50 px-6 py-3 rounded-lg font-semibold"
                    />
                  </div>
                </div>
                
                <div className="order-1 md:order-2 flex justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-amber-500 to-amber-700 rounded-3xl rotate-6 transform hover:rotate-3 transition-transform shadow-2xl flex items-center justify-center">
                      <div className="text-center p-8 text-white">
                        <MapPin className="w-16 h-16 mx-auto mb-4" />
                        <div className="text-xl font-bold mt-2">{t('Hawassa', 'ሃዋሳ')}</div>
                        <div className="text-amber-200 mt-2">{t('Serving the Nation', 'ሀገሪቱን በማገልገል ላይ')}</div>
                      </div>
                    </div>
                    <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                      <Truck className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ============ TAB 4: FUTURE VISION ============ */}
        {activeTab === 'vision' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-semibold mb-4">
                {t('2025 & Beyond', '2025 እና በላይ')}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                {t('Building the', 'መገንባት')}{' '}
                <span className="text-amber-700 dark:text-amber-500">{t('Next Generation', 'ቀጣዩን ትውልድ')}</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {futureVision.description[language]}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-amber-800 to-amber-700 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 text-white mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  {futureVision.title[language]}
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {futureVision.initiatives[language].map((initiative, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/10 p-5 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-white">{initiative}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 grid md:grid-cols-3 gap-6 border-t border-white/30 pt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300 mb-2">2025</div>
                  <p className="text-amber-100">{t('Emu Design Academy Launch', 'የኢሙ ዲዛይን አካዳሚ መክፈቻ')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300 mb-2">2026</div>
                  <p className="text-amber-100">{t('Hawassa Furniture Hub Opening', 'የሃዋሳ የቤት እቃ ማዕከል መክፈቻ')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300 mb-2">2027</div>
                  <p className="text-amber-100">{t('First Sustainable Forestry Harvest', 'የመጀመሪያ ዘላቂ የደን ልማት ምርት')}</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-amber-700 dark:text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {t('Legacy Through Education', 'በትምህርት የሚተላለፍ ቅርስ')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(
                    'The Emu Design Academy will train 100+ new furniture craftsmen over the next decade. Our master artisans will pass down techniques refined over 30 years to the next generation of Ethiopian furniture makers.',
                    'የኢሙ ዲዛይን አካዳሚ በሚቀጥሉት አስር ዓመታት ከ100 በላይ አዳዲስ የቤት እቃ የጥበብ ሰዎችን ያሰለጥናል። ዋና የጥበብ ሰዎቻችን ለ30+ ዓመታት የተጠሩ ቴክኒኮችን ለሚቀጥለው የኢትዮጵያ የቤት እቃ ሰሪዎች ትውልድ ያስተላልፋሉ።'
                  )}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-amber-700 dark:text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {t('Sustainability Commitment', 'የዘላቂነት ቃል ኪዳን')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(
                    'By 2030, 100% of our timber will come from ethically managed Ethiopian forests. We are partnering with local communities to ensure our craft serves both people and the environment for centuries to come.',
                    'በ2030፣ 100% የሚሆነው እንጨታችን በስነምግባር ከሚመሩ የኢትዮጵያ ደኖች ይመጣል። ጥበባችን ለሚቀጥሉት መቶ ዘመናት ማህበረሰብን እና አካባቢን የሚጠቅም መሆኑን ለማረጋገጥ ከአካባቢው ማህበረሰቦች ጋር አጋርነት እየፈጠርን ነው።'
                  )}
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border-l-8 border-amber-600">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {t('A Message from Our Founder', 'ከመስራቻችን መልእክት')}
              </h3>
              <div className="relative">
                <Quote className="absolute -top-4 -left-2 w-10 h-10 text-amber-300/30" />
                <p className="text-xl italic text-gray-700 dark:text-gray-300 pl-6 border-l-4 border-amber-600">
                  {t(
                    'I built this company with my own hands. Now I want to build the next generation of Ethiopian master craftsmen. Our future is not just in the furniture we make today, but in the hands we train and the forests we preserve for tomorrow.',
                    'ይህንን ኩባንያ በገዛ እጆቼ ገንብቼዋለሁ። አሁን ደግሞ ቀጣዩን የኢትዮጵያ ዋና የጥበብ ሰዎች ትውልድ መገንባት እፈልጋለሁ። የወደፊታችን ዛሬ በምንሠራው የቤት እቃ ብቻ ሳይሆን፣ በምናሰለጥናቸው እጆች እና ለነገ በምንጠብቃቸው ደኖች ላይ ነው።'
                  )}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">{founder.name[language]}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{founder.title[language]}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* CTA Section - Same across all tabs */}
        <div className="mt-20 text-center bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 border border-amber-200 dark:border-gray-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            {t(
              'Become Part of Our 30+ Year Story',
              'የኛ ከ30+ ዓመት ታሪክ አካል ይሁኑ'
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t(
              'Whether you are ready to order or just want to learn about quality furniture, we are here for you.',
              'ለማዘዝ ዝግጁም ይሁኑ ወይም ስለ ጥራት ያለው ቤት እቃ ለመማር ብቻ፣ እኛ ለእርስዎ እዚህ ነን።'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton 
              isReserveButton={true}
              language={language}
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            />
            <a
              href="tel:+251993449447"
              className="bg-transparent border-2 border-amber-600 text-amber-600 dark:border-amber-500 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              {t('Call Our Master Designer', 'ለዋና ዲዛይነር ይደውሉ')}
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            {t(
              'Showroom: Atote, Hawassa (Near Amen Cafe) | Mon-Sat: 8:30 AM - 6:30 PM',
              'ማሳያ ቤት፡ አቶተ፣ ሃዋሳ (ከአመን ካፌ አቅራቢያ) | ሰኞ-ቅዳሜ፡ 8:30 ጥዋት - 6:30 ማታ'
            )}
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}