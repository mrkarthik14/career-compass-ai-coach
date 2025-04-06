
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

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

  const handleSendMessage = () => {
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

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(newMessage),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    // Simple response logic - in a real app this would connect to an API
    if (message.toLowerCase().includes("skill") || message.toLowerCase().includes("learn")) {
      return "Based on your profile and career goals, I recommend focusing on developing your skills in data analysis and project management. Would you like some learning resources?";
    } else if (message.toLowerCase().includes("job") || message.toLowerCase().includes("career")) {
      return "Looking at your experience, you might be a good fit for roles like Product Analyst, Junior Data Scientist, or Business Intelligence Specialist. Would you like me to explain any of these career paths in more detail?";
    } else if (message.toLowerCase().includes("interview")) {
      return "I'd be happy to help you prepare for interviews! Would you like to do a mock interview for a specific role, or would you prefer general interview tips?";
    } else {
      return "I'm here to help with your career development! You can ask me about skill recommendations, learning resources, career paths, or even request a mock interview.";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[400px] border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-mentor-purple text-white px-4 py-3">
        <h3 className="font-medium">AI Mentor Chat</h3>
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
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
