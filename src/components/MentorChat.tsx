
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sendMessageToAI } from "@/utils/aiUtils";

type AIModelType = "local" | "chatgpt" | "claude";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your AI career mentor. What can I help you with today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

const MentorChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModelType>("local");
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      // Get response from AI using our utility
      const aiResponse = await sendMessageToAI({
        userMessage: newMessage,
        model: selectedModel
      });
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive"
      });
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[400px] border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-mentor-purple text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">AI Mentor Chat</h3>
        <div className="flex items-center">
          <span className="text-xs mr-2 text-white/80">Model:</span>
          <Select
            value={selectedModel}
            onValueChange={(value) => setSelectedModel(value as AIModelType)}
          >
            <SelectTrigger className="h-7 w-24 text-xs bg-white/10 border-white/20">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="chatgpt">ChatGPT</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user"
                  ? "bg-mentor-purple text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === "user" ? "text-white/60" : "text-gray-500"
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} size="icon" disabled={isLoading || !newMessage.trim()}>
            {isLoading ? 
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : 
              <Send size={18} />
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
