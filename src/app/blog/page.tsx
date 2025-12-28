'use client';

import { useState } from 'react';
import { 
  Calendar, Clock, User, Tag, ChevronRight, 
  Search, Filter, BookOpen, TrendingUp,
  Heart, MessageCircle, Share2, Eye,
  ArrowRight, Home, Sofa, Palette,
  Wrench, Award, Users, Leaf
} from 'lucide-react';
import Link from 'next/link';

type Language = 'en' | 'am';
type Category = 'all' | 'design' | 'tips' | 'materials' | 'sustainability' | 'news';

interface BlogPost {
  id: number;
  title: {
    en: string;
    am: string;
  };
  excerpt: {
    en: string;
    am: string;
  };
  content: {
    en: string;
    am: string;
  };
  author: string;
  date: string;
  readTime: number;
  category: Category;
  tags: string[];
  image: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  featured: boolean;
}

export default function BlogPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const t = (key: string, lang: Language = language) => {
    const translations: Record<string, Record<Language, string>> = {
      pageTitle: {
        en: "Emu Furniture Blog",
        am: "ኢሙ ፈርኒቸር ብሎግ"
      },
      pageSubtitle: {
        en: "Design Inspiration, Tips & Furniture Insights",
        am: "የዲዛይን መነሳሻ፣ ምክሮች እና የፈርኒቸር ግንዛቤዎች"
      },
      heroDescription: {
        en: "Discover the latest trends, expert advice, and behind-the-scenes stories from Ethiopian furniture craftsmanship.",
        am: "ከኢትዮጵያ የፈርኒቸር ጥበብ ስራ የቅርብ አዝማሚያዎችን፣ የባለሙያ ምክሮችን እና የጀርባ ትረካዎችን ያግኙ።"
      },
      featuredPosts: {
        en: "Featured Articles",
        am: "የተለዩ ጽሑፎች"
      },
      latestPosts: {
        en: "Latest Articles",
        am: "የቅርብ ጽሑፎች"
      },
      popularPosts: {
        en: "Most Popular",
        am: "በጣም ተወዳጅ"
      },
      searchPlaceholder: {
        en: "Search articles...",
        am: "ጽሑፎችን ይፈልጉ..."
      },
      categories: {
        en: "Categories",
        am: "ምድቦች"
      },
      readMore: {
        en: "Read More",
        am: "ተጨማሪ ያንብቡ"
      },
      minutesRead: {
        en: "min read",
        am: "ደቂቃ ንባብ"
      },
      allCategories: {
        en: "All Categories",
        am: "ሁሉም ምድቦች"
      },
      designInspiration: {
        en: "Design Inspiration",
        am: "የዲዛይን መነሳሻ"
      },
      careTips: {
        en: "Care & Tips",
        am: "እንክብካቤ እና ምክሮች"
      },
      materialsGuide: {
        en: "Materials Guide",
        am: "የቁሳቁስ መመሪያ"
      },
      sustainability: {
        en: "Sustainability",
        am: "አስቀድሞ ማስተዳደር"
      },
      companyNews: {
        en: "Company News",
        am: "የኩባንያ ዜና"
      },
      subscribeTitle: {
        en: "Stay Updated",
        am: "ዝመናዎችን ያግኙ"
      },
      subscribeText: {
        en: "Get furniture insights delivered to your inbox",
        am: "የፈርኒቸር ግንዛቤዎችን በኢሜልዎ ይቀበሉ"
      },
      subscribeButton: {
        en: "Subscribe",
        am: "ይመዝገቡ"
      },
      noResults: {
        en: "No articles found",
        am: "ምንም ጽሑፎች አልተገኙም"
      },
      trendingNow: {
        en: "Trending Now",
        am: "አሁን በስልጣኔ ላይ"
      },
      writtenBy: {
        en: "Written by",
        am: "የተጻፈው በ"
      }
    };
    return translations[key]?.[lang] || key;
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: {
        en: "Ethiopian Wood Types: Choosing the Right Timber for Your Furniture",
        am: "የኢትዮጵያ የእንጨት ዓይነቶች: ለፈርኒቸርዎ ትክክለኛውን እንጨት መምረጥ"
      },
      excerpt: {
        en: "Explore the unique characteristics of Ethiopian hardwoods like Wanza, Zigba, and Olive wood for durable furniture.",
        am: "ለረጅም ጊዜ የሚቆይ ፈርኒቸር ለማዘጋጀት የኢትዮጵያ ጠንካራ እንጨቶችን እንደ ዋንዛ፣ ዝግባ እና የወይራ እንጨት ልዩ ባህሪያትን ያስሱ።"
      },
      content: {
        en: "Ethiopia is blessed with diverse hardwood species that offer exceptional quality for furniture making...",
        am: "ኢትዮጵያ ለፈርኒቸር ማዘጋጀት ከፍተኛ ጥራት የሚሰጡ የተለያዩ የጠንካራ እንጨት ዝርያዎች ባሏ ናት..."
      },
      author: "Alemayehu Bekele",
      date: "2024-03-15",
      readTime: 8,
      category: 'materials',
      tags: ["wood", "sustainability", "craftsmanship"],
      image: "/api/placeholder/800/400",
      likes: 142,
      comments: 23,
      shares: 45,
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: {
        en: "Modern Ethiopian Living Room Design Trends 2024",
        am: "ዘመናዊ የኢትዮጵያ መኝታ ክፍል ዲዛይን አዝማሚያዎች 2024"
      },
      excerpt: {
        en: "Discover how to blend traditional Ethiopian elements with contemporary design in your living space.",
        am: "በመኝታ ክፍልዎ ውስጥ ባህላዊ ኢትዮጵያዊ አካላትን ከዘመናዊ ዲዛይን ጋር እንዴት እንደሚቀላቀሉ ይመልከቱ።"
      },
      content: {
        en: "The Ethiopian living room is evolving with beautiful blends of cultural heritage and modern aesthetics...",
        am: "የኢትዮጵያ መኝታ ክፍል ከባህላዊ ቅርስ እና ከዘመናዊ አስደሳችነት ጋር በሚገጣጠሙ ውብ ድብልቅ እየተሻሻለ ነው..."
      },
      author: "Sara Mohammed",
      date: "2024-03-10",
      readTime: 6,
      category: 'design',
      tags: ["interior design", "trends", "living room"],
      image: "/api/placeholder/800/400",
      likes: 89,
      comments: 15,
      shares: 32,
      views: 980,
      featured: true
    },
    {
      id: 3,
      title: {
        en: "5 Essential Tips for Maintaining Wooden Furniture",
        am: "የእንጨት ፈርኒቸርን ለመጠበቅ 5 አስፈላጊ ምክሮች"
      },
      excerpt: {
        en: "Learn how to preserve the beauty and longevity of your wooden furniture with proper care techniques.",
        am: "በትክክለኛ የእንክብካቤ ቴክኒኮች የእንጨት ፈርኒቸርዎን ውበት እና ረጅም ጊዜ ለመጠበቅ ይማሩ።"
      },
      content: {
        en: "Proper maintenance can extend the life of your wooden furniture by decades...",
        am: "ትክክለኛ እንክብካቤ የእንጨት ፈርኒቸርዎን ህይወት በዘመናት ሊያራዝም ይችላል..."
      },
      author: "Thomas Johnson",
      date: "2024-03-05",
      readTime: 5,
      category: 'tips',
      tags: ["maintenance", "wood care", "cleaning"],
      image: "/api/placeholder/800/400",
      likes: 156,
      comments: 28,
      shares: 67,
      views: 2100,
      featured: false
    },
   {
    id: 4,
    title: {
      en: "Sustainable Furniture: Our Commitment to Ethiopian Forests",
      am: "አስቀድሞ የሚቆይ ፈርኒቸር: ለኢትዮጵያ ደን ቁጥጥር ያለን ቃል ኪዳን"
    },
    excerpt: {
      en: "How Emu Furniture practices responsible sourcing and contributes to reforestation efforts.",
      am: "ኢሙ ፈርኒቸር ኃላፊነት ያለው ምንጭ እንዴት እንደሚለማመድ እና ለደን እንደገና ማተኮር ሥራ እንዴት እንደሚሰጥ አስተዋፅዖ።"
    },
    content: { // ADD THIS
      en: "At Emu Furniture, sustainability is at the core of everything we do. We partner with certified Ethiopian forestry programs to ensure all our wood comes from responsibly managed sources. For every tree used in our furniture, we plant three new ones through our reforestation initiatives across Ethiopia...",
      am: "በኢሙ ፈርኒቸር፣ አስቀድሞ ማስተዳደር በምንሠራቸው ሁሉ መሃል ነው። ከተረጋገጡ የኢትዮጵያ የደን አስተዳደር ፕሮግራሞች ጋር እንሰራለን እና ሁሉም እንጨታችን ከኃላፊነት ያለው አስተዳደር የሚመጣ መሆኑን እናረጋግጣለን። በፈርኒቸራችን ውስጥ ለሚጠቀም እያንዳንዱ ዛፍ ሶስት አዳዲስ ዛፎችን በመዝራት በመላው ኢትዮጵያ የምንሠራውን የደን እንደገና ማተኮር ዘመቻ እናደርጋለን..."
    },
    author: "Emu Sustainability Team",
    date: "2024-02-28",
    readTime: 7,
    category: 'sustainability',
    tags: ["eco-friendly", "reforestation", "ethical"],
    image: "/api/placeholder/800/400",
    likes: 203,
    comments: 42,
    shares: 89,
    views: 3450,
    featured: true
  },
  {
    id: 5,
    title: {
      en: "The Art of Hand-Carving in Ethiopian Furniture",
      am: "በኢትዮጵያ ፈርኒቸር ውስጥ የእጅ መቀነስ ጥበብ"
    },
    excerpt: {
      en: "A deep dive into the centuries-old tradition of hand-carving techniques passed down through generations.",
      am: "የዘመናት ባህላዊ የእጅ መቀነስ ቴክኒኮች በትውልድ የሚተላለፉትን ጥልቀት ያለው ጥናት።"
    },
    content: { // ADD THIS
      en: "Hand-carving is more than just a technique; it's a form of storytelling in Ethiopian furniture making. Our artisans spend years mastering the traditional tools and patterns that have been used for centuries. Each carved design carries cultural significance, from the intricate crosses symbolizing faith to the geometric patterns representing unity and community...",
      am: "የእጅ መቀነስ ከመደበኛ ቴክኒክ በላይ ነው፤ በኢትዮጵያ ፈርኒቸር ማዘጋጀት ውስጥ የታሪክ መተላለፊያ መልክ ነው። የኛ የጥበብ ሰዎች ለዘመናት የተጠቀሙባቸውን ባህላዊ መሳሪያዎች እና ስዕሎች በማዋቀር አመታት ያሳልፋሉ። እያንዳንዱ የተቀነሰ ዲዛይን ባህላዊ ትርጉም ይይዛል፣ ከሚዛን ያለው ስቅለት እምነትን እስከሚወክሉ ጂኦሜትሪክ ስዕሎች አንድነትን እና ማህበረሰብን እስከሚወክሉ ድረስ..."
    },
    author: "Yohannes Assefa",
    date: "2024-02-20",
    readTime: 10,
    category: 'design',
    tags: ["craftsmanship", "traditional", "artisan"],
    image: "/api/placeholder/800/400",
    likes: 178,
    comments: 31,
    shares: 56,
    views: 1890,
    featured: false
  },
  {
    id: 6,
    title: {
      en: "New Showroom Opening in Bole: What to Expect",
      am: "አዲስ ሽውራ በቦሌ መክፈት: ምን መጠበቅ እንዳለብዎ"
    },
    excerpt: {
      en: "Get a sneak peek at our newest showroom location and exclusive collections launching soon.",
      am: "ከቅርብ ጊዜ ወደሚጀመሩት የአዲሱ ሽውራ አድራሻ እና ልዩ ስብስቦቻችን ያለ እይታ ያግኙ።"
    },
    content: { // ADD THIS
      en: "We're excited to announce the opening of our new flagship showroom in Bole, Addis Ababa. This 8,000 sq ft space will feature our complete collection along with exclusive designs only available at this location. The showroom includes interactive design stations where customers can work with our designers to create custom furniture pieces...",
      am: "በቦሌ፣ አዲስ አበባ የሚገኘውን አዲስ ዋና ሽውራችንን መክፈታችንን በደስታ እናሳውቃለን። ይህ 8,000 ካሬ ጫማ ቦታ የሙሉ ስብስባችንን ከዚህ አድራሻ ብቻ የሚገኙ ልዩ ዲዛይኖች ጋር ያቀርባል። ሽውራው ደንበኞች ከዲዛይነሮቻችን ጋር በመሆን የግል ፈርኒቸር ክፍሎችን ለመፍጠር የሚችሉባቸው በይነመረብ የዲዛይን ጣቢያዎችን ያካትታል..."
    },
    author: "Emu News Team",
    date: "2024-02-15",
    readTime: 4,
    category: 'news',
    tags: ["showroom", "expansion", "new location"],
    image: "/api/placeholder/800/400",
    likes: 95,
    comments: 18,
    shares: 41,
    views: 1230,
    featured: false
  },
  {
    id: 7,
    title: {
      en: "Upholstery Fabrics Guide: From Cotton to Premium Leather",
      am: "የሽፋን ጨርቆች መመሪያ: ከጥጥ እስከ ላቅሶ ቆዳ"
    },
    excerpt: {
      en: "Choosing the right fabric for your furniture based on durability, comfort, and maintenance needs.",
      am: "በረጅም ጊዜ የሚቆይ፣ ምቾት እና እንክብካቤ ፍላጎቶች ላይ በመመርኮዝ ለፈርኒቸርዎ ትክክለኛውን ጨርቅ መምረጥ።"
    },
    content: { // ADD THIS
      en: "Selecting the perfect upholstery fabric is crucial for both aesthetics and functionality. Ethiopian cotton offers breathability and comfort, while premium leather provides durability and a luxurious feel. For families with children and pets, we recommend performance fabrics with stain-resistant treatments. Each material has its unique characteristics and maintenance requirements...",
      am: "ፍጹም የሽፋን ጨርቅን መምረጥ ለሁለቱም ለአስደሳችነት እና ለተግባራዊነት ወሳኝ ነው። የኢትዮጵያ ጥጥ አየር ማስገቢያ እና ምቾትን ይሰጣል፣ ላቅሶ ቆዳ ደግሞ ረጅም ጊዜ የሚቆይ እና ባለ ጥራት ስሜትን ይሰጣል። ለልጆች እና ለቤት እንስሳት ላሉት ቤተሰቦች፣ ከሚያሻሱ ማከሚያዎች ጋር የተሰሩ ብቃት ጨርቆችን እንመክራለን። እያንዳንዱ ቁሳቁስ የራሱ ልዩ ባህሪያት እና የእንክብካቤ መስፈርቶች አሉት..."
    },
    author: "Meron Tekle",
    date: "2024-02-10",
    readTime: 6,
    category: 'materials',
    tags: ["upholstery", "fabrics", "leather", "cotton"],
    image: "/api/placeholder/800/400",
    likes: 112,
    comments: 25,
    shares: 38,
    views: 1560,
    featured: false
  },
  {
    id: 8,
    title: {
      en: "Small Space Solutions: Furniture for Compact Ethiopian Homes",
      am: "ለትንሽ ቦታዎች መፍትሄዎች: ለአጥጋቢ ኢትዮጵያዊ ቤቶች ፈርኒቸር"
    },
    excerpt: {
      en: "Maximize your living area with smart furniture choices designed for smaller urban apartments.",
      am: "ለትናንሽ የከተማ አፓርታማዎች የተነደፉ ብልህ የፈርኒቸር ምርጫዎች የመኖሪያ ቦታዎን ከፍ ያድርጉ።"
    },
    content: { // ADD THIS
      en: "Urban living in Ethiopia often means making the most of limited space. Our multi-functional furniture pieces are designed specifically for compact homes. Convertible sofas that transform into beds, extendable dining tables, and wall-mounted storage solutions can dramatically increase your usable space. We also offer custom sizing to fit your exact room dimensions...",
      am: "በኢትዮጵያ የከተማ መኖሪያ ብዙውን ጊዜ የተወሰነ ቦታን በሙሉ መጠቀም ማለት ነው። የኛ ብዙ ተግባራዊ የፈርኒቸር ክፍሎች ለአጥጋቢ ቤቶች በተለይ የተነደፉ ናቸው። ወደ አልጋዎች የሚቀየሩ ተቀያያሪ ሶፋዎች፣ ሊዘረጉ የሚችሉ የምግብ ቤት ጠረጴዛዎች እና በግድግዳ ላይ የሚሰቀሉ የማከማቻ መፍትሄዎች የሚጠቀሙባቸውን ቦታዎች በእጅጉ ሊጨምሩ ይችላሉ። እንዲሁም በትክክለኛ የክፍል ልኬቶችዎ ለማስገባት ብጁ መጠን እናቀርባለን..."
    },
    author: "Amina Hussein",
    date: "2024-02-05",
    readTime: 5,
    category: 'design',
    tags: ["small spaces", "apartment living", "space saving"],
    image: "/api/placeholder/800/400",
    likes: 134,
    comments: 22,
    shares: 47,
    views: 1780,
    featured: false
  },
  ];

  const categories = [
    { id: 'all', icon: BookOpen, label: t('allCategories'), count: blogPosts.length },
    { id: 'design', icon: Palette, label: t('designInspiration'), count: blogPosts.filter(p => p.category === 'design').length },
    { id: 'tips', icon: Wrench, label: t('careTips'), count: blogPosts.filter(p => p.category === 'tips').length },
    { id: 'materials', icon: Sofa, label: t('materialsGuide'), count: blogPosts.filter(p => p.category === 'materials').length },
    { id: 'sustainability', icon: Leaf, label: t('sustainability'), count: blogPosts.filter(p => p.category === 'sustainability').length },
    { id: 'news', icon: Award, label: t('companyNews'), count: blogPosts.filter(p => p.category === 'news').length },
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  const popularPosts = [...blogPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'am') {
      const ethiopianMonths = [
        'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታህሳስ', 
        'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 
        'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'
      ];
      const day = date.getDate();
      const month = ethiopianMonths[date.getMonth()];
      const year = date.getFullYear() - 8; // Convert to Ethiopian year
      return `${month} ${day}, ${year}`;
    }
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Filter className="w-5 h-5 text-amber-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                    {t('featuredPosts')}
                  </h2>
                  <div className="flex items-center text-amber-600 dark:text-amber-500">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{t('trendingNow')}</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <article key={post.id} className="group">
                      <Link href={`/blog/${post.id}`} className="block">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                          {/* Image */}
                          <div className="relative h-48 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute top-4 left-4">
                              <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {categories.find(c => c.id === post.category)?.label}
                              </span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <h3 className="text-xl font-bold line-clamp-2">
                                {post.title[language]}
                              </h3>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-1" />
                                  <span>{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>{formatDate(post.date)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{post.readTime} {t('minutesRead')}</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                              {post.excerpt[language]}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <Heart className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{post.likes}</span>
                                </div>
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{post.comments}</span>
                                </div>
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <Eye className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{post.views}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-amber-600 dark:text-amber-500 font-semibold">
                                {t('readMore')}
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Latest Posts */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {t('latestPosts')}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredPosts.length} {language === 'am' ? 'ጽሑፎች' : 'articles'}
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="group">
                      <Link href={`/blog/${post.id}`} className="block">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 md:flex">
                          {/* Image */}
                          <div className="md:w-48 lg:w-56 flex-shrink-0">
                            <div className="h-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-gray-700 dark:to-gray-800 p-6 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-amber-600 dark:text-amber-500 mb-2">
                                  {post.category === 'design' && <Palette className="w-12 h-12 mx-auto" />}
                                  {post.category === 'tips' && <Wrench className="w-12 h-12 mx-auto" />}
                                  {post.category === 'materials' && <Sofa className="w-12 h-12 mx-auto" />}
                                  {post.category === 'sustainability' && <Leaf className="w-12 h-12 mx-auto" />}
                                  {post.category === 'news' && <Award className="w-12 h-12 mx-auto" />}
                                </div>
                                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                                  {new Date(post.date).getDate()}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 uppercase">
                                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short' })}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 p-6">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-semibold">
                                {categories.find(c => c.id === post.category)?.label}
                              </span>
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                              {post.title[language]}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                              {post.excerpt[language]}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <User className="w-4 h-4 mr-1" />
                                  <span>{t('writtenBy')} {post.author}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{post.readTime} {t('minutesRead')}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <Heart className="w-4 h-4 mr-1" />
                                  <span className="text-sm">{post.likes}</span>
                                </div>
                                <div className="flex items-center text-amber-600 dark:text-amber-500 font-semibold">
                                  {t('readMore')}
                                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {t('noResults')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'am' 
                      ? 'የፈለጉትን ጽሑፍ ማግኘት አልቻልንም። እባክዎ የተለየ ፍለጋ ይሞክሩ።'
                      : "We couldn't find any articles matching your search. Please try a different query."}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    {language === 'am' ? 'ሁሉንም ጽሑፎች አሳይ' : 'Show All Articles'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
                  {t('categories')}
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id as Category)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-amber-600 text-white'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <category.icon className={`w-4 h-4 mr-3 ${
                          selectedCategory === category.id ? 'text-white' : 'text-amber-600'
                        }`} />
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedCategory === category.id
                          ? 'bg-white/20'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-amber-600" />
                  {t('popularPosts')}
                </h3>
                <div className="space-y-6">
                  {popularPosts.map((post, index) => (
                    <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-amber-700 dark:text-amber-500 font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors line-clamp-2">
                            {post.title[language]}
                          </h4>
                          <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <Eye className="w-4 h-4 mr-1" />
                            <span>{post.views} {language === 'am' ? 'እይታዎች' : 'views'}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Subscribe */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">{t('subscribeTitle')}</h3>
                <p className="text-amber-100 mb-6">
                  {t('subscribeText')}
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder={language === 'am' ? 'የኢሜል አድራሻዎ' : 'Your email address'}
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-amber-700 hover:bg-amber-50 py-3 rounded-lg font-semibold transition-colors">
                    {t('subscribeButton')}
                  </button>
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-amber-600" />
                  {language === 'am' ? 'ታጎች' : 'Popular Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 12).map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author Spotlight */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mt-8 text-white">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-2xl font-bold">
                    EB
                  </div>
                  <h4 className="font-bold text-lg mb-2">Alemayehu Bekele</h4>
                  <p className="text-amber-200 text-sm mb-4">
                    {language === 'am' ? 'የፈርኒቸር ዲዛይነር እና የቦሎግ ጸሐፊ' : 'Furniture Designer & Blog Writer'}
                  </p>
                  <p className="text-gray-300 text-sm mb-6">
                    {language === 'am' 
                      ? 'ከ15 ዓመት በላይ ልምድ ያለኝ የባሕላዊ ኢትዮጵያዊ የፈርኒቸር ዲዛይነር።'
                      : 'Traditional Ethiopian furniture designer with 15+ years experience.'}
                  </p>
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    {language === 'am' ? 'ሁሉንም ጽሑፎች' : 'View All Articles'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-700 to-amber-600 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'am' 
                ? 'የፈርኒቸር ጥበብን ከፈተና ያንብቡ' 
                : 'Read More About Furniture Craftsmanship'}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {language === 'am' 
                ? 'በየወሩ አዲስ ጽሑፎች፣ የዲዛይን ሀሳቦች እና የባለሙያ ምክሮችን ይቀበሉ።'
                : 'Receive new articles, design ideas, and expert tips every month.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === 'am' ? 'የኢሜል አድራሻዎ' : 'Your email address'}
                className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors whitespace-nowrap">
                {t('subscribeButton')}
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mt-8 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
            <Home className="w-4 h-4 inline mr-2" />
            {language === 'am' ? 'መነሻ' : 'Home'}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-semibold text-amber-600 dark:text-amber-500">
            {t('pageTitle')}
          </span>
        </div>
      </div>
    </div>
  );
}