
import React from 'react';
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  User, 
  Trash2, 
  LogIn,
  Sparkles,
  Zap,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sidebar as SidebarPrimitive, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  conversations: any[];
  currentConversation: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onSettingsOpen: () => void;
  onAuthOpen: () => void;
  isAuthenticated: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversation,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onSettingsOpen,
  onAuthOpen,
  isAuthenticated
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <SidebarPrimitive className="border-r border-studio-200 bg-gradient-to-b from-white to-studio-50/50 backdrop-blur-sm">
      <SidebarHeader className="p-4 border-b border-studio-200/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="w-8 h-8 bg-ai-gradient rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg gradient-text">AI Prompt Studio</h1>
            <p className="text-xs text-studio-500 flex items-center">
              <Crown className="w-3 h-3 mr-1" />
              Premium Experience
            </p>
          </div>
        </div>
        
        <Button 
          onClick={onNewConversation}
          className="w-full bg-ai-gradient hover:shadow-lg hover:scale-105 transition-all duration-300 group"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          New Conversation
        </Button>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-2">
        <ScrollArea className="h-full">
          <div className="space-y-1">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-studio-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs mt-1">Start a new chat to begin</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-studio-100/80 hover:shadow-md ${
                    currentConversation === conversation.id
                      ? 'bg-ai-accent-50 border border-ai-accent-200 shadow-sm'
                      : 'hover:bg-white/50'
                  }`}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-ai-accent-400 to-ai-accent-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-studio-800 truncate group-hover:text-ai-accent-700 transition-colors">
                        {conversation.title}
                      </h3>
                      <p className="text-xs text-studio-500 mt-1">
                        {formatDate(conversation.createdAt)}
                      </p>
                      {conversation.messages.length > 0 && (
                        <p className="text-xs text-studio-400 mt-1 truncate">
                          {conversation.messages[conversation.messages.length - 1]?.content?.substring(0, 50)}...
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 hover:bg-red-100 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-studio-200/50">
        <div className="space-y-2">
          {!isAuthenticated && (
            <Button
              variant="outline"
              onClick={onAuthOpen}
              className="w-full justify-start hover:bg-ai-accent-50 hover:border-ai-accent-300 transition-all duration-300 group"
            >
              <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Sign In
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={onSettingsOpen}
            className="w-full justify-start hover:bg-studio-100 transition-all duration-300 group"
          >
            <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Settings
          </Button>

          {isAuthenticated && (
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-ai-accent-50 to-transparent rounded-lg border border-ai-accent-100">
              <div className="w-8 h-8 bg-ai-gradient rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-studio-800">Premium User</p>
                <p className="text-xs text-studio-500 flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Unlimited Access
                </p>
              </div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
};