
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="px-4 py-12 bg-gradient-to-r from-brand-50 to-accent2-50 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mt-8 lg:mt-0 space-y-6">
            <h1 className="text-4xl font-bold sm:text-5xl xl:text-6xl tracking-tight">
              Find the best deals across the web
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent2-600">
                All in one place
              </span>
            </h1>
            <p className="text-lg text-gray-600 md:text-xl max-w-lg">
              CommerceCompass aggregates products from top e-commerce sites, 
              comparing prices and finding the best deals so you don't have to.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-brand-600 to-accent2-600 hover:from-brand-700 hover:to-accent2-700">
                <Link to="/products">
                  Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-lg shadow-xl overflow-hidden bg-white">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Online shopping" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-semibold">Real-time price updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
