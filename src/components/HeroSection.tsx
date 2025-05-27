
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, Brain, MessageCircle, Stars, ChevronDown, Play, Mic, Image, Code, Calculator, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  onGetStarted: () => void;
  onAuthOpen: () => void;
  isAuthenticated: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onAuthOpen,
  isAuthenticated
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const texts = [
    'Write creative stories',
    'Solve complex problems', 
    'Generate stunning code',
    'Create amazing content',
    'Analyze data insights',
    'Build your next project'
  ];

  useEffect(() => {
    if (!isTyping) return;

    const text = texts[currentIndex];
    if (currentText.length < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(text.slice(0, currentText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentText('');
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          setIsTyping(true);
        }, 2000);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentIndex, isTyping]);

  const features = [
    {
      icon: Brain,
      title: "Advanced AI",
      description: "Powered by cutting-edge language models for intelligent conversations"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant responses with optimized performance and reliability"
    },
    {
      icon: MessageCircle,
      title: "Natural Chat",
      description: "Conversational AI that understands context and nuance"
    }
  ];

  const promptExamples = [
    {
      icon: Code,
      text: "Write a Python function to sort data",
      category: "Coding"
    },
    {
      icon: Calculator,
      text: "Explain quantum computing concepts",
      category: "Science"
    },
    {
      icon: Image,
      text: "Create a marketing strategy",
      category: "Business"
    },
    {
      icon: Globe,
      text: "Plan a trip to Japan",
      category: "Travel"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Prompt Studio
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              <Stars className="w-3 h-3 mr-1" />
              Premium AI
            </Badge>
            {!isAuthenticated && (
              <Button variant="outline" onClick={onAuthOpen} className="border-blue-200 hover:bg-blue-50">
                Sign In
              </Button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 px-6 pt-16 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2 text-sm font-medium mb-6">
                🚀 Next-Generation AI Chat Interface
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Chat with AI
              </span>
              <br />
              <span className="text-gray-900">like never before</span>
            </h1>
            
            <div className="h-16 mb-8 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  {currentText}
                </span>
                <span className="animate-pulse text-blue-600">|</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Start Chatting
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-4 text-lg font-semibold group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center mb-16">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-blue-600">10M+</div>
                <div className="text-gray-600">Conversations</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-purple-600">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-pink-600">50+</div>
                <div className="text-gray-600">Languages</div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-white/50 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Prompt Examples */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Try these prompts</h2>
            <p className="text-xl text-gray-600 mb-12">Get started with these popular conversation starters</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {promptExamples.map((example, index) => (
                <Card key={index} className="p-6 bg-white/60 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 group">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <example.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <Badge variant="secondary" className="text-xs mb-2 bg-blue-50 text-blue-700">
                        {example.category}
                      </Badge>
                      <p className="text-gray-700 font-medium">{example.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
              <h2 className="text-4xl font-bold mb-4">Ready to experience the future?</h2>
              <p className="text-xl mb-8 opacity-90">Join millions of users who trust AI Prompt Studio for their daily AI needs</p>
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
};
