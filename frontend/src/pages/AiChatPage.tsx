import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AiChatPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm Lumina AI. How can I help you learn something new today? You can ask me to explain a concept, summarize an article, or test your knowledge.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const aiResponse = {
      sender: "ai",
      text: `That's an excellent question about "${input}". Based on the content in Lumina, here's a summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.`,
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="flex flex-col h-[75vh]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="w-6 h-6 mr-2" />
            Lumina AI Chat
          </CardTitle>
          <CardDescription>Your personal AI-powered learning assistant.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto pr-2 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && (
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                <p>{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </CardContent>
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your content..."
            />
            <Button onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AiChatPage;
