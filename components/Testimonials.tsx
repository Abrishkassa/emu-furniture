import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: {
    en: string;
    am: string;
  };
  content: {
    en: string;
    am: string;
  };
  rating: number;
}

interface TestimonialsProps {
  language?: 'en' | 'am';
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alemayehu Bekele",
    role: {
      en: "Interior Designer",
      am: "የውስጥ ዲዛይነር"
    },
    content: {
      en: "The quality of craftsmanship is exceptional. My clients are always impressed with Emu Furniture pieces.",
      am: "የጥበብ ስራው ጥራት አስገራሚ ነው። ደንበኞቼ ሁልጊዜ በኢሙ ፈርኒቸር ምርቶች ይገረማሉ።"
    },
    rating: 5
  },
  {
    id: 2,
    name: "Sara Mohammed",
    role: {
      en: "Homeowner",
      am: "የቤት ባለቤት"
    },
    content: {
      en: "Ordered a custom sofa and it exceeded my expectations. The team was professional and delivered on time.",
      am: "በትእዛዝ ሶፋ አዘዝኩት፣ ከተጠበቀው በላይ ነበር። ቡድኑ ባለሙያዎች ነበሩ እና በጊዜው አቅርበዋል።"
    },
    rating: 5
  },
  {
    id: 3,
    name: "Thomas Johnson",
    role: {
      en: "Hotel Manager",
      am: "የሆቴል አስተዳዳሪ"
    },
    content: {
      en: "Furnished our entire boutique hotel with Emu Furniture. The durability and design are perfect.",
      am: "ሙሉውን ቡቲክ ሆቴላችን በኢሙ ፈርኒቸር አበጋጅተነዋል። ዘላቂነቱ እና ዲዛይኑ ፍጹም ነው።"
    },
    rating: 4
  }
];

export default function Testimonials({ language = 'en' }: TestimonialsProps) {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Quote className="w-12 h-12 mx-auto mb-4 text-amber-600 dark:text-amber-500" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {language === 'am' ? 'ደንበኞቻችን ምን ይላሉ' : 'What Our Customers Say'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {language === 'am' 
              ? 'በመላው ኢትዮጵያ ያሉ በሺዎች የሚቆጠሩ ደስተኛ ደንበኞች ይሁኑ'
              : 'Join thousands of satisfied customers across Ethiopia'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
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
                "{testimonial.content[language]}"
              </p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-800 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}