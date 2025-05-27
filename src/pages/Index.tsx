
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatInterface } from '@/components/ChatInterface';
import { SettingsPanel } from '@/components/SettingsPanel';
import { AuthModal } from '@/components/AuthModal';
import { HeroSection } from '@/components/HeroSection';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMainInterface, setShowMainInterface] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadConversations();
    }
  }, []);

  const loadConversations = () => {
    const saved = localStorage.getItem('conversations');
    if (saved) {
      setConversations(JSON.parse(saved));
    }
  };

  const handleAuth = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      setIsAuthOpen(false);
      loadConversations();
      setShowMainInterface(true);
      toast({
        title: "Welcome to AI Prompt Studio! 🎉",
        description: "Your premium AI chat experience begins now.",
      });
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setShowMainInterface(true);
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleNewConversation = () => {
    const newId = `conversation-${Date.now()}`;
    const newConversation = {
      id: newId,
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString()
    };
    
    const updated = [newConversation, ...conversations];
    setConversations(updated);
    setCurrentConversation(newId);
    localStorage.setItem('conversations', JSON.stringify(updated));
    setShowMainInterface(true);
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversation(id);
    setShowMainInterface(true);
  };

  const handleDeleteConversation = (id: string) => {
    const updated = conversations.filter(conv => conv.id !== id);
    setConversations(updated);
    localStorage.setItem('conversations', JSON.stringify(updated));
    
    if (currentConversation === id) {
      setCurrentConversation(null);
    }
  };

  const updateConversation = (id: string, updates: any) => {
    const updated = conversations.map(conv => 
      conv.id === id ? { ...conv, ...updates } : conv
    );
    setConversations(updated);
    localStorage.setItem('conversations', JSON.stringify(updated));
  };

  if (!showMainInterface) {
    return (
      <>
        <HeroSection 
          onGetStarted={handleGetStarted}
          onAuthOpen={() => setIsAuthOpen(true)}
          isAuthenticated={isAuthenticated}
        />
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuth={handleAuth}
        />
        <Toaster />
      </>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-studio-50 via-white to-ai-accent-50">
        <div className="absolute inset-0 bg-gradient-to-br from-ai-accent-500/5 via-transparent to-gradient-end/5 pointer-events-none" />
        
        <Sidebar
          conversations={conversations}
          currentConversation={currentConversation}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
          onSettingsOpen={() => setIsSettingsOpen(true)}
          onAuthOpen={() => setIsAuthOpen(true)}
          isAuthenticated={isAuthenticated}
          onBackToHome={() => setShowMainInterface(false)}
        />
        
        <main className="flex-1 flex flex-col relative z-10">
          <ChatInterface
            currentConversation={currentConversation}
            conversations={conversations}
            onUpdateConversation={updateConversation}
            isAuthenticated={isAuthenticated}
            onAuthOpen={() => setIsAuthOpen(true)}
          />
        </main>

        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onAuth={handleAuth}
        />

        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default Index;
