import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'New York, NY',
    rating: 5,
    text: "The most beautiful ring I've ever seen! The team at Luxe Diamonds helped me find exactly what I was looking for. The craftsmanship is absolutely exceptional.",
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    rating: 5,
    text: 'Outstanding service from start to finish. They guided me through every step of choosing the perfect engagement ring. My fiancée absolutely loves it!',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    rating: 5,
    text: 'The custom design process was incredible. They brought my vision to life perfectly. The attention to detail and quality is unmatched.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Chicago, IL',
    rating: 5,
    text: 'Exceptional experience. The diamond quality is remarkable and the setting is flawless. Worth every penny for such a special moment.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
];

const bestsellers = [
  {
    id: 1,
    name: 'Classic Solitaire',
    price: '$12,500',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
    description: '1.5ct Round Brilliant Diamond, Platinum Setting',
  },
  {
    id: 2,
    name: 'Vintage Halo',
    price: '$18,900',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
    description: '2ct Cushion Cut Diamond, Rose Gold Halo',
  },
  {
    id: 3,
    name: 'Modern Emerald',
    price: '$22,750',
    image:
      'https://images.unsplash.com/photo-1596944946094-0f47c48df3e4?w=300&h=300&fit=crop',
    description: '1.8ct Emerald Cut Diamond, White Gold',
  },
  {
    id: 4,
    name: 'Three Stone Legacy',
    price: '$15,400',
    image:
      'https://images.unsplash.com/photo-1588444650733-de72c75ad2d6?w=300&h=300&fit=crop',
    description: '1ct Center with 0.5ct Side Stones, Platinum',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--card))]">
      <div className="container mx-auto px-6">
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-luxury-serif text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))]">
              What Our Clients Say
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-lg max-w-2xl mx-auto">
              Every ring tells a story. Here are some stories from our happy
              couples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="card-luxury p-6 text-center space-y-4 transition-all duration-300 hover:shadow-xl hover:scale-105 dark:bg-[hsl(var(--card))] "
              >
                <div className="relative">
                  <Quote className="w-8 h-8 text-[hsl(var(--secondary))] mx-auto mb-4 opacity-80" />
                </div>

                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[hsl(var(--lead-text))] text-[hsl(var(--lead-text))] transition-transform hover:scale-110"
                    />
                  ))}
                </div>

                <p className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-sm leading-relaxed dark:text-gray-300 italic">
                  "{testimonial.text}"
                </p>

                <div className="pt-4 border-t border-[hsl(var(--border))] dark:border-slate-600">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mx-auto mb-3 object-cover border-2 border-[hsl(var(--secondary))] shadow-md"
                  />
                  <h4 className="font-luxury-sans font-semibold text-[hsl(var(--primary))] dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs font-luxury-sans dark:text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bestsellers */}
        <div>
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-luxury-serif text-4xl lg:text-5xl font-bold text-[hsl(var(--primary))]">
              Designer's Choice Collection
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-lg max-w-2xl mx-auto">
              Our most sought-after designs, handpicked by our master jewelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((ring) => (
              <Card
                key={ring.id}
                className="card-luxury overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:border dark:border-slate-700"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800">
                  <img
                    src={ring.image}
                    alt={ring.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-luxury-serif text-xl font-semibold text-[hsl(var(--primary))] dark:text-white">
                      {ring.name}
                    </h3>
                    <span className="font-luxury-sans font-bold text-[hsl(var(--secondary-rich))] dark:text-yellow-400 whitespace-nowrap">
                      {ring.price}
                    </span>
                  </div>

                  <p className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-sm dark:text-gray-300">
                    {ring.description}
                  </p>

                  <div className="pt-4">
                    <button className="w-full text-[hsl(var(--primary))] dark:text-white font-luxury-sans text-sm font-medium hover:text-[hsl(var(--secondary-rich))] dark:hover:text-yellow-400 transition-colors hover:underline">
                      View Details →
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
