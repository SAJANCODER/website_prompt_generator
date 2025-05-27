
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Copy, RotateCcw, ThumbsUp, ThumbsDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PythonIntegration } from '@/components/PythonIntegration';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  currentConversation: string | null;
  conversations: any[];
  onUpdateConversation: (id: string, updates: any) => void;
  isAuthenticated: boolean;
  onAuthOpen: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentConversation,
  conversations,
  onUpdateConversation,
  isAuthenticated,
  onAuthOpen
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const currentConv = conversations.find(c => c.id === currentConversation);

  useEffect(() => {
    if (currentConv) {
      setMessages(currentConv.messages || []);
    } else {
      setMessages([]);
    }
  }, [currentConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isAuthenticated) {
      onAuthOpen();
      return;
    }

    if (!currentConversation) {
      toast({
        title: "No conversation selected",
        description: "Please start a new conversation first.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Update conversation title if it's the first message
    if (messages.length === 0) {
      const title = input.trim().substring(0, 50) + (input.length > 50 ? '...' : '');
      onUpdateConversation(currentConversation, { 
        title,
        messages: newMessages 
      });
    } else {
      onUpdateConversation(currentConversation, { messages: newMessages });
    }

    // Simulate AI response with typing effect
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      onUpdateConversation(currentConversation, { messages: finalMessages });
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      `I understand you're asking about "${userInput}". This is a premium AI response that analyzes your prompt with advanced algorithms. Based on the context and intent, here's my comprehensive analysis:

The key aspects to consider are:
• Context and relevance
• Innovative approaches
• Practical applications
• Future implications

This sophisticated response demonstrates the enhanced capabilities of AI Prompt Studio's premium interface.`,
      
      `Excellent question! Let me provide you with a detailed, premium-quality response about "${userInput}":

Your inquiry touches on several important dimensions:

1. **Core Analysis**: The fundamental aspects of your prompt
2. **Strategic Insights**: Advanced perspectives and considerations  
3. **Actionable Recommendations**: Practical next steps
4. **Future Outlook**: Long-term implications and opportunities

This response showcases the advanced reasoning capabilities built into our premium AI system.`,
      
      `Thank you for that thoughtful prompt about "${userInput}". Here's my comprehensive AI-generated response:

I've analyzed your request through multiple cognitive frameworks to provide maximum value:

🎯 **Primary Focus**: Direct response to your core question
🔍 **Deep Analysis**: Underlying patterns and connections
💡 **Creative Solutions**: Innovative approaches and alternatives
🚀 **Implementation**: Practical steps for moving forward

This demonstrates the sophisticated analysis capabilities of our premium AI Prompt Studio.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!currentConversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-ai-gradient rounded-3xl mx-auto flex items-center justify-center shadow-2xl animate-pulse-glow">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce" />
          </div>
          
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Welcome to AI Prompt Studio
          </h2>
          <p className="text-xl text-studio-600 mb-8 leading-relaxed">
            Experience the most advanced AI chat interface ever created. 
            Start a conversation to unlock premium AI capabilities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 hover-lift glass-effect border-studio-200">
              <Zap className="w-8 h-8 text-ai-accent-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-studio-600">Optimized for speed and responsiveness</p>
            </Card>
            
            <Card className="p-6 hover-lift glass-effect border-studio-200">
              <Bot className="w-8 h-8 text-ai-accent-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Advanced AI</h3>
              <p className="text-sm text-studio-600">Premium algorithms for better responses</p>
            </Card>
            
            <Card className="p-6 hover-lift glass-effect border-studio-200">
              <Sparkles className="w-8 h-8 text-ai-accent-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Beautiful UI</h3>
              <p className="text-sm text-studio-600">Designed for extended comfortable use</p>
            </Card>
          </div>

          <PythonIntegration />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-studio-200 bg-white/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ai-gradient rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-studio-800">AI Assistant</h3>
              <p className="text-sm text-studio-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Online & Ready
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-ai-accent-50 text-ai-accent-700 border-ai-accent-200">
              Premium Mode
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 message-animation ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 bg-ai-gradient rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-ai-gradient text-white'
                    : 'bg-white border border-studio-200 shadow-sm'
                } rounded-2xl p-4 group relative`}
              >
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                  <span className={`text-xs ${
                    message.role === 'user' ? 'text-white/70' : 'text-studio-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-studio-100"
                        onClick={() => copyToClipboard(message.content)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-studio-100"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-studio-100"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-10 h-10 bg-gradient-to-br from-studio-300 to-studio-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 message-animation">
              <div className="w-10 h-10 bg-ai-gradient rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-studio-200 shadow-sm rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-ai-accent-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-ai-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-ai-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm text-studio-500">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-studio-200 bg-white/50 backdrop-blur-sm p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything... Your premium AI assistant is ready to help!"
              className="pr-12 resize-none rounded-2xl border-studio-300 focus:border-ai-accent-500 focus:ring-ai-accent-500 bg-white/80 backdrop-blur-sm shadow-lg min-h-[60px] text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 bg-ai-gradient hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-studio-500">
            <div className="flex items-center space-x-4">
              <span>Press Enter to send, Shift+Enter for new line</span>
              {!isAuthenticated && (
                <Badge variant="outline" className="text-xs">
                  Sign in for unlimited access
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Premium AI</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
