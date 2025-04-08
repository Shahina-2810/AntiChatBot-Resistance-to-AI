
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, ShieldAlert, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from '@/components/ui/GlassCard';
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { analyzeQuery, generateResponse, ChatMessage } from '@/services/botDetectionService';

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm the Dynamic Bot Shield assistant. I can provide real-time information about educational institutions like RVRJC and VVIT. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Create new user message
    const newUserMessage: ChatMessage = {
      id: uuidv4(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Analyze the query in real-time
    setTimeout(() => {
      // Analyze the query for bot detection
      const analysis = analyzeQuery(newUserMessage.content);
      
      // Generate appropriate response based on analysis
      const responseContent = generateResponse(newUserMessage.content, analysis);
      
      // Create bot response message
      const botMessage: ChatMessage = {
        id: uuidv4(),
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
        blocked: analysis.blocked
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
      
      // Show a toast notification if the query was blocked
      if (analysis.blocked) {
        toast.warning("Suspicious activity detected", {
          description: `Bot Score: ${analysis.score}/100. ${analysis.reason}`,
          icon: <ShieldAlert className="h-5 w-5" />,
        });
      }
    }, 1000); // Simulate processing time
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getExampleQueries = () => {
    const examples = [
      "Tell me about RVRJC's faculty",
      "What are the placement statistics at VVIT?",
      "Information about KITS Guntur", // This will be blocked
      "Tell me about the departments at RVRJC",
      "What cultural activities are offered at VVIT?"
    ];
    return examples;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <GlassCard className="flex flex-col h-full">
        <div className="flex items-center gap-2 border-b pb-4 mb-4">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Intelligent Bot Shield Chat</h2>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-1">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser 
                    ? 'bg-primary text-primary-foreground' 
                    : message.blocked 
                      ? 'bg-destructive/10 border border-destructive/20 text-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {message.blocked && (
                  <div className="flex items-center gap-2 mb-2 text-destructive font-medium">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Access Blocked</span>
                  </div>
                )}
                <div className="whitespace-pre-line">{message.content}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {getExampleQueries().map((query, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(query);
                  }}
                  className="text-xs px-3 py-1.5 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2 mt-auto">
          <Textarea
            placeholder="Ask about RVRJC, VVIT, or try KITS Guntur (will be blocked)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="resize-none"
            rows={2}
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
