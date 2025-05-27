
import React, { useState } from 'react';
import { X, User, Palette, Zap, Shield, Bell, Download, Upload, Trash2, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 16,
    autoSave: true,
    notifications: true,
    soundEffects: true,
    animationSpeed: 1,
    responseStyle: 'detailed',
    saveHistory: true,
    dataEncryption: true,
    autoLogout: false,
  });

  const { toast } = useToast();

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    localStorage.setItem('aiStudioSettings', JSON.stringify({ ...settings, [key]: value }));
  };

  const exportData = () => {
    const data = {
      conversations: JSON.parse(localStorage.getItem('conversations') || '[]'),
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-studio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    toast({
      title: "Data Exported Successfully! 📁",
      description: "Your conversations and settings have been saved.",
    });
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      toast({
        title: "Data Cleared",
        description: "All conversations and settings have been reset.",
        variant: "destructive"
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[500px] overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-ai-gradient rounded-lg flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <span className="gradient-text">Premium Settings</span>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8">
          {/* Appearance */}
          <Card className="p-6 border-studio-200">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="w-5 h-5 text-ai-accent-600" />
              <h3 className="font-semibold text-lg">Appearance</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="auto">Auto (System)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Font Size: {settings.fontSize}px</Label>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => updateSetting('fontSize', value)}
                  min={12}
                  max={24}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Animation Speed</Label>
                <Slider
                  value={[settings.animationSpeed]}
                  onValueChange={([value]) => updateSetting('animationSpeed', value)}
                  min={0.5}
                  max={2}
                  step={0.1}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>

          {/* AI Behavior */}
          <Card className="p-6 border-studio-200">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-5 h-5 text-ai-accent-600" />
              <h3 className="font-semibold text-lg">AI Behavior</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Response Style</Label>
                <Select value={settings.responseStyle} onValueChange={(value) => updateSetting('responseStyle', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6 border-studio-200">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-ai-accent-600" />
              <h3 className="font-semibold text-lg">Privacy & Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Save Conversation History</Label>
                  <p className="text-xs text-studio-500 mt-1">Store conversations locally</p>
                </div>
                <Switch
                  checked={settings.saveHistory}
                  onCheckedChange={(checked) => updateSetting('saveHistory', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Data Encryption</Label>
                  <p className="text-xs text-studio-500 mt-1">Encrypt stored data</p>
                </div>
                <Switch
                  checked={settings.dataEncryption}
                  onCheckedChange={(checked) => updateSetting('dataEncryption', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto Logout</Label>
                  <p className="text-xs text-studio-500 mt-1">Logout after inactivity</p>
                </div>
                <Switch
                  checked={settings.autoLogout}
                  onCheckedChange={(checked) => updateSetting('autoLogout', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 border-studio-200">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-5 h-5 text-ai-accent-600" />
              <h3 className="font-semibold text-lg">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Push Notifications</Label>
                  <p className="text-xs text-studio-500 mt-1">Get notified of responses</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Sound Effects</Label>
                  <p className="text-xs text-studio-500 mt-1">Audio feedback for actions</p>
                </div>
                <Switch
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto-Save</Label>
                  <p className="text-xs text-studio-500 mt-1">Automatically save conversations</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6 border-studio-200">
            <div className="flex items-center space-x-3 mb-4">
              <Download className="w-5 h-5 text-ai-accent-600" />
              <h3 className="font-semibold text-lg">Data Management</h3>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={exportData}
                variant="outline" 
                className="w-full justify-start"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>

              <Separator />

              <Button 
                onClick={clearAllData}
                variant="destructive" 
                className="w-full justify-start"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
