
import React, { useState } from 'react';
import { Code, Play, Terminal, FileCode, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const PythonIntegration: React.FC = () => {
  const [pythonCode, setPythonCode] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const samplePromptGenerator = `
# AI Prompt Generator
def generate_prompt(topic, style="professional", length="medium"):
    """
    Generate AI prompts for various topics and styles
    """
    styles = {
        "professional": "Please provide a comprehensive analysis of",
        "creative": "Imagine and describe in detail",
        "technical": "Explain the technical aspects of",
        "educational": "Teach me about"
    }
    
    lengths = {
        "short": "in 2-3 sentences",
        "medium": "in a detailed paragraph",
        "long": "with examples and comprehensive details"
    }
    
    base_prompt = styles.get(style, styles["professional"])
    length_modifier = lengths.get(length, lengths["medium"])
    
    prompt = f"{base_prompt} {topic}, {length_modifier}."
    
    return {
        "prompt": prompt,
        "topic": topic,
        "style": style,
        "length": length,
        "generated_at": "2024-01-01T00:00:00Z"
    }

# Example usage
result = generate_prompt("artificial intelligence", "creative", "long")
print(f"Generated Prompt: {result['prompt']}")
`;

  const executeCode = async () => {
    if (!pythonCode.trim()) {
      toast({
        title: "No code to execute",
        description: "Please enter some Python code first.",
        variant: "destructive"
      });
      return;
    }

    setIsExecuting(true);
    
    // Simulate Python execution
    setTimeout(() => {
      // Mock response for prompt generation
      if (pythonCode.includes('generate_prompt')) {
        setResult(`✅ Code executed successfully!

Generated Prompt: Imagine and describe in detail artificial intelligence, with examples and comprehensive details.

Output:
{
  "prompt": "Imagine and describe in detail artificial intelligence, with examples and comprehensive details.",
  "topic": "artificial intelligence", 
  "style": "creative",
  "length": "long",
  "generated_at": "2024-01-01T00:00:00Z"
}

Execution time: 0.45s
Memory usage: 12.3 MB`);
      } else {
        setResult(`✅ Python code executed successfully!

Your custom prompt generation logic has been processed.
Ready to integrate with the AI chat interface.

Execution time: 0.32s
Memory usage: 8.7 MB`);
      }
      
      setIsExecuting(false);
      
      toast({
        title: "Code Executed! 🐍",
        description: "Your Python prompt generator is ready.",
      });
    }, 2000);
  };

  const loadSample = () => {
    setPythonCode(samplePromptGenerator);
    toast({
      title: "Sample Loaded! 📝",
      description: "Ready-to-use prompt generator code loaded.",
    });
  };

  return (
    <Card className="p-6 border-ai-accent-200 bg-gradient-to-br from-ai-accent-50 to-white">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <Code className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg gradient-text">Python Integration</h3>
          <p className="text-sm text-studio-600">Connect your custom prompt generator</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
              <Terminal className="w-3 h-3 mr-1" />
              Python Ready
            </Badge>
            <Badge variant="outline" className="text-ai-accent-700 border-ai-accent-200">
              Advanced Integration
            </Badge>
          </div>
          
          <Button
            onClick={loadSample}
            variant="outline"
            size="sm"
            className="hover:bg-ai-accent-50"
          >
            <FileCode className="w-4 h-4 mr-2" />
            Load Sample
          </Button>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-studio-700">
            Your Python Prompt Generator Code:
          </label>
          <Textarea
            value={pythonCode}
            onChange={(e) => setPythonCode(e.target.value)}
            placeholder="# Paste your Python prompt generator code here
# Example: def generate_prompt(topic, style):
#     return f'Generate content about {topic} in {style} style'"
            className="font-mono text-sm min-h-[200px] bg-studio-50 border-studio-300"
          />
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={executeCode}
            disabled={isExecuting}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:shadow-lg transition-all duration-300"
          >
            {isExecuting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Executing...</span>
              </div>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Execute Code
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-studio-900 text-green-400 rounded-lg font-mono text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="font-semibold">Execution Result:</span>
            </div>
            <pre className="whitespace-pre-wrap text-xs leading-relaxed">
              {result}
            </pre>
          </div>
        )}

        <div className="bg-ai-accent-50 border border-ai-accent-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-ai-accent-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-ai-accent-800 mb-1">Integration Ready</h4>
              <p className="text-sm text-ai-accent-700">
                Your Python code will be seamlessly integrated with the AI chat interface. 
                Generated prompts will appear directly in conversations with enhanced formatting and context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
