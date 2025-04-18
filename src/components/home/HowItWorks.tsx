
import { Search, BarChart2, ShoppingBag, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Search Across Multiple Sites",
    description: "Our platform aggregates products from hundreds of trusted online retailers."
  },
  {
    icon: BarChart2,
    title: "Compare Prices Instantly",
    description: "See real-time price comparisons and find the best deals available."
  },
  {
    icon: TrendingUp, 
    title: "Track Price History",
    description: "View price trends over time to determine if now is the right time to buy."
  },
  {
    icon: ShoppingBag,
    title: "One-Click Checkout",
    description: "Purchase from any retailer through our seamless checkout process."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How CommerceCompass Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform simplifies online shopping by bringing together products from multiple 
            retailers, helping you find the best deals without the hassle.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-brand-100 to-accent2-100 mb-4">
                <feature.icon className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
