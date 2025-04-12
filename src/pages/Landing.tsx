
import { ArrowRight, Brain, BookOpen, MessageSquare, LineChart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-mentor-purple to-mentor-pink py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white font-display font-bold text-2xl">CareerCompass</div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-white text-mentor-purple hover:bg-white/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Main Hero */}
        <section className="bg-gradient-to-b from-mentor-purple to-mentor-purple/90 py-16 md:py-24 text-white px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                  Accelerate Your Career with AI-Powered Guidance
                </h1>
                <p className="text-lg md:text-xl text-white/80">
                  CareerCompass helps you navigate your professional journey with personalized learning paths, skill analysis, and expert mentorship.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="bg-white text-mentor-purple hover:bg-white/90 w-full sm:w-auto">
                      Get Started Free <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                      Login to Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
                  alt="Professional using CareerCompass" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Your AI Career Growth Partner
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Personalized guidance to help you grow professionally and reach your career goals
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Brain} 
                title="Skills Analysis" 
                description="Get detailed insights on your current skills and discover areas for improvement to stay competitive in your field."
              />
              <FeatureCard 
                icon={LineChart} 
                title="Career Progression" 
                description="Visualize your career path and get recommendations on how to advance to your desired role or industry."
              />
              <FeatureCard 
                icon={MessageSquare} 
                title="AI Mentor Chat" 
                description="Ask questions, get advice, and receive personalized guidance from our AI mentor anytime."
              />
              <FeatureCard 
                icon={User} 
                title="Mock Interviews" 
                description="Practice with AI-powered mock interviews featuring video and voice sessions with real-time feedback."
              />
              <FeatureCard 
                icon={BookOpen} 
                title="Learning Resources" 
                description="Access curated learning materials and courses tailored to your career goals and skill gaps."
              />
              <FeatureCard 
                icon={ArrowRight} 
                title="Weekly Goals" 
                description="Set and track weekly learning goals to maintain consistent progress in your professional development."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how CareerCompass has helped professionals advance their careers
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="CareerCompass helped me identify my skill gaps and create a learning plan that led to a promotion within 6 months." 
                name="Sarah J."
                role="Product Manager"
              />
              <TestimonialCard 
                quote="The mock interviews were incredibly helpful. I felt confident in my real interviews and landed my dream job!" 
                name="Michael T."
                role="Software Engineer"
              />
              <TestimonialCard 
                quote="I changed careers after 10 years, and CareerCompass guided me through every step of the transition." 
                name="Rachel K."
                role="Data Analyst"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-mentor-purple text-white px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Start Your Career Growth Journey Today
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are accelerating their careers with personalized AI guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-mentor-purple hover:bg-white/90 w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display font-bold text-xl mb-4">CareerCompass</h3>
              <p className="text-gray-400">Your AI-powered career growth partner</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} CareerCompass. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper components
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-mentor-purple/10 flex items-center justify-center mb-4">
        <Icon size={24} className="text-mentor-purple" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ 
  quote, 
  name, 
  role 
}: { 
  quote: string; 
  name: string; 
  role: string;
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
      <div className="text-mentor-purple mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 11L8 17H5L8 11V7H12V11H10ZM18 11L16 17H13L16 11V7H20V11H18Z" fill="currentColor" />
        </svg>
      </div>
      <p className="mb-4 text-gray-700">{quote}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default Landing;
