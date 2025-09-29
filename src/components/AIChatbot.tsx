import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  AlertTriangle,
  Lightbulb,
  Heart,
  Wheat,
  MapPin,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: 'health' | 'agriculture' | 'weather' | 'general';
}

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'नमस्ते! I\'m your AirScan AI assistant. Ask me about air quality, health advice, crop recommendations, or weather forecasts in your preferred language.',
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🏴' },
    { code: 'te', name: 'తెలుగు', flag: '🏴' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'mr', name: 'मराठी', flag: '🏴' }
  ];

  const quickQuestions = [
    { text: 'Is it safe to go outside today?', icon: <Heart className="h-3 w-3" />, category: 'health' },
    { text: 'Best time to spray crops?', icon: <Wheat className="h-3 w-3" />, category: 'agriculture' },
    { text: 'Air quality in my area', icon: <MapPin className="h-3 w-3" />, category: 'weather' },
    { text: 'Weekly forecast summary', icon: <Clock className="h-3 w-3" />, category: 'weather' }
  ];

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'health': return <Heart className="h-3 w-3 text-red-400" />;
      case 'agriculture': return <Wheat className="h-3 w-3 text-green-400" />;
      case 'weather': return <MapPin className="h-3 w-3 text-blue-400" />;
      default: return <Lightbulb className="h-3 w-3 text-yellow-400" />;
    }
  };

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = '';
      let category: Message['category'] = 'general';

      // Simple keyword-based responses (in production, this would be an AI API call)
      if (userMessage.toLowerCase().includes('safe') || userMessage.toLowerCase().includes('outside')) {
        botResponse = `Based on current AQI of 89 (Moderate), it's generally safe for outdoor activities. However, sensitive individuals should consider wearing masks during heavy exercise. Air quality is expected to improve by evening.`;
        category = 'health';
      } else if (userMessage.toLowerCase().includes('crop') || userMessage.toLowerCase().includes('spray')) {
        botResponse = `Optimal spraying time: Early morning (5-8 AM) when AQI is typically lower. Current wind speed of 12 km/h is suitable. Avoid spraying during high pollution hours (10 AM - 4 PM).`;
        category = 'agriculture';
      } else if (userMessage.toLowerCase().includes('air quality') || userMessage.toLowerCase().includes('pollution')) {
        botResponse = `Current air quality in Delhi: AQI 89 (Moderate). PM2.5: 35.2 μg/m³, PM10: 58.1 μg/m³. Expected to improve to 'Good' category by tomorrow morning due to favorable wind patterns.`;
        category = 'weather';
      } else if (userMessage.toLowerCase().includes('forecast') || userMessage.toLowerCase().includes('weekly')) {
        botResponse = `7-Day Outlook: 3 Good days, 3 Moderate days, 1 Unhealthy for Sensitive day. Best outdoor activity days: Tuesday & Wednesday. Air quality alert expected on Friday due to dust storm predictions.`;
        category = 'weather';
      } else {
        botResponse = `I can help you with air quality information, health advice, crop recommendations, and weather forecasts. Try asking: "Is it safe to exercise outdoors?" or "Best farming conditions this week?"`;
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
        category
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(inputMessage);
    setInputMessage('');
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setInputMessage('Is the air quality good for jogging today?');
        setIsListening(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <Button 
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-cosmic animate-pulse-glow z-50"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-satellite border border-primary/30 shadow-cosmic z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 animate-pulse-glow">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">AirScan AI Assistant</h3>
            <p className="text-xs opacity-80">Multilingual Air Quality Expert</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle}>×</Button>
      </div>

      {/* Language Selector */}
      <div className="p-2 border-b border-border/30">
        <div className="flex gap-1 overflow-x-auto">
          {languages.map(lang => (
            <Button
              key={lang.code}
              variant={selectedLanguage === lang.code ? "default" : "ghost"}
              size="sm"
              className="text-xs whitespace-nowrap"
              onClick={() => setSelectedLanguage(lang.code)}
            >
              {lang.flag} {lang.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="p-1 rounded-full bg-primary/20 h-fit">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 border border-border/30'
                }`}
              >
                {message.type === 'bot' && message.category && (
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(message.category)}
                    <Badge variant="secondary" className="text-xs">
                      {message.category}
                    </Badge>
                  </div>
                )}
                <p>{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="p-1 rounded-full bg-accent/20 h-fit">
                  <User className="h-4 w-4 text-accent" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="p-1 rounded-full bg-primary/20 h-fit">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted/50 border border-border/30 p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="p-2 border-t border-border/30">
          <p className="text-xs opacity-80 mb-2">Quick Questions:</p>
          <div className="grid grid-cols-2 gap-1">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-auto p-2 justify-start"
                onClick={() => setInputMessage(question.text)}
              >
                {question.icon}
                <span className="ml-1 truncate">{question.text}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about air quality, health, or crops..."
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${
                isListening ? 'text-red-500 animate-pulse' : ''
              }`}
              onClick={handleVoiceToggle}
            >
              {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
            </Button>
          </div>
          <Button onClick={handleSendMessage} size="sm" disabled={!inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 flex items-center gap-2 text-xs text-red-500">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Listening... Speak your question
          </div>
        )}
        
        <div className="mt-2 flex items-center justify-between text-xs opacity-60">
          <span>Powered by AirScan AI</span>
          <Badge variant="outline" className="text-xs">
            <AlertTriangle className="h-2 w-2 mr-1" />
            Beta
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default AIChatbot;