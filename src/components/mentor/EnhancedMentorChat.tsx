
import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const EnhancedMentorChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [userMood, setUserMood] = useState<string>("neutral");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // System welcome message on first load
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content: "Hello! I'm your AI career mentor. I can help you with learning paths, career guidance, mock interviews, and project ideas. What would you like to focus on today?",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Detect user mood from input text
    const detectedMood = detectMood(input);
    setUserMood(detectedMood);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response with mentor prompt blueprint behavior
    setTimeout(() => {
      const responseContent = generateEnhancedMentorResponse(input, detectedMood);
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateEnhancedMentorResponse = (userInput: string, mood: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Enhanced pattern matching based on blueprint capabilities and user mood
    if (lowerInput.includes("learning path") || lowerInput.includes("roadmap") || lowerInput.includes("how to learn")) {
      if (mood === "struggling") {
        return "I can see you're having a hard time finding direction. Let's create a more structured learning path that won't feel overwhelming. Can you tell me:\n\n1. What specific area are you interested in?\n2. How much time can you realistically commit each week?\n3. What learning format keeps you most engaged (videos, reading, hands-on)?\n\nRemember, steady progress beats sporadic intensity. Let's build something that fits your life.";
      } else {
        return "I'd be happy to design a learning path for you! To create the most effective roadmap, I need to understand:\n\n1. What's your current skill level in this area?\n2. What's your end goal or the specific position you're targeting?\n3. How much time can you dedicate weekly?\n4. Do you prefer videos, reading, interactive courses, or hands-on projects?\n\nOnce I know these details, I can create a phase-by-phase roadmap with resources, timelines, and milestone projects.";
      }
    }
    
    if (lowerInput.includes("project") || lowerInput.includes("portfolio")) {
      if (mood === "motivated") {
        return "I love your enthusiasm! Let's channel that energy into projects that will really showcase your skills. Based on your profile, here are some project ideas tailored to help you stand out:\n\n1. **Interactive Data Dashboard** - Build a visualization tool with real-time data feeds\n2. **AI-Powered Content Generator** - Create a tool that leverages NLP for specific content needs\n3. **Full-stack E-commerce Platform** - Design and implement a complete shopping experience\n\nWhich one resonates most with your interests and goals? I can help you break down the implementation steps and tech stack for any of these.";
      } else {
        return "Building projects is an excellent way to demonstrate your skills to potential employers. Based on your profile, here are some project ideas tailored to your current level:\n\n1. **Interactive Data Dashboard** - Build a visualization tool that pulls from public APIs\n2. **Personal Learning Tracker** - Create an app to monitor your progress and set goals\n3. **Industry-specific Tool** - Develop a solution for a real problem in your target field\n\nWould you like me to elaborate on any of these ideas or suggest something more specific to your skills and interests?";
      }
    }
    
    if (lowerInput.includes("interview") || lowerInput.includes("job")) {
      return "I can help you prepare for interviews in your field. Let's start with a mock interview session:\n\n**Question 1**: Tell me about a challenging project you worked on and how you approached it.\n\nAfter you respond, I'll provide feedback on your answer's structure, content, and impact. We can also practice behavioral questions, technical problems, and domain-specific scenarios. Would you like to focus on a particular role or interview type?";
    }

    if (lowerInput.includes("goal") || lowerInput.includes("plan")) {
      if (mood === "burnout") {
        return "I understand you're feeling overwhelmed. Let's take a step back and create a more sustainable plan that incorporates proper rest and recovery:\n\n1. **This Week**: What's the smallest, most manageable step you can take?\n2. **Recovery Plan**: Let's schedule specific downtime for your wellbeing\n3. **Motivation Reset**: What initially inspired you to pursue this path?\n\nSometimes slowing down actually helps you move faster in the long run. Would you like to discuss strategies for preventing burnout while making consistent progress?";
      } else {
        return "Setting clear goals is essential for progress. Let's break down your objectives:\n\n1. **This Week**: What's one skill you can focus on mastering?\n2. **This Month**: What small project can you complete?\n3. **This Quarter**: What major milestone do you want to reach?\n\nRemember that consistency matters more than intensity. I recommend the 'small steps daily' approach to build momentum. Would you like to set up a weekly check-in to track your progress?";
      }
    }
    
    if (lowerInput.includes("stuck") || lowerInput.includes("lost") || lowerInput.includes("confused") || lowerInput.includes("help")) {
      return "I understand feeling stuck can be frustrating. Let's take a step back and break things down:\n\n1. What specific part are you struggling with?\n2. What have you tried so far?\n3. What resources have you been using?\n\nSometimes, a short break or switching to a different learning approach can help overcome these obstacles. Would you like me to suggest some alternative learning strategies or resources for your current challenge?";
    }
    
    if (lowerInput.includes("motivation") || lowerInput.includes("tired") || lowerInput.includes("burnout")) {
      return "It's completely normal to experience dips in motivation or feel burnout when learning challenging topics. Remember that learning is a marathon, not a sprint. Here are some strategies that might help:\n\n1. Take a short break to recharge\n2. Revisit your 'why' - what inspired you to start this journey?\n3. Try a completely different format (video instead of text, or vice versa)\n4. Work on a small, enjoyable project that gives you a quick win\n\nWould it help to adjust your learning plan to include more variety or shorter study sessions?";
    }
    
    // Default response with personalization prompt based on mood
    if (mood === "struggling") {
      return "I notice you might be facing some challenges. I'm here to help you navigate through them. I can assist with creating manageable learning paths, suggesting approachable projects, preparing for interviews, or setting realistic goals. What specific area would you like support with right now?";
    } else if (mood === "motivated") {
      return "I can feel your enthusiasm! I'm here to help channel that energy effectively. I can help with creating intensive learning paths, suggesting challenging portfolio projects, preparing for competitive interviews, or setting ambitious but achievable goals. What would you like to focus that motivation on today?";
    } else if (mood === "burnout") {
      return "I sense you might be experiencing some fatigue or overwhelm. That's completely normal in learning journeys. I can help you create a more sustainable plan, suggest enjoyable projects that reignite your passion, or develop better learning habits. What would feel most supportive right now?";
    } else {
      return "I'm here to help guide your learning and career journey. I can assist with creating personalized learning paths, suggesting portfolio projects, preparing for interviews, or setting achievable goals. What specific area would you like to focus on today? And if you don't mind sharing, what's your preferred learning style (videos, reading, hands-on projects)?";
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      // Check if browser supports speech recognition
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak clearly into your microphone.",
        });
        
        // Simulate voice transcription (would connect to Gemini in production)
        setTimeout(() => {
          const simulatedTranscripts = [
            "I need help creating a learning plan for data science",
            "Can you suggest some project ideas for a backend developer portfolio?",
            "I'm feeling stuck with my current learning path",
            "Help me prepare for a software engineering interview"
          ];
          
          const randomTranscript = simulatedTranscripts[Math.floor(Math.random() * simulatedTranscripts.length)];
          setTranscript(randomTranscript);
          setInput(randomTranscript);
          setIsListening(false);
          
          toast({
            title: "Transcript Ready",
            description: "Voice input captured successfully.",
          });
        }, 3000);
      } else {
        toast({
          title: "Speech Recognition Not Available",
          description: "Your browser doesn't support speech recognition.",
          variant: "destructive",
        });
      }
    } else {
      setIsListening(false);
      setTranscript("");
      toast({
        title: "Listening Stopped",
        description: "Voice capture canceled.",
      });
    }
  };

  const detectMood = (text: string): string => {
    // This would be powered by Gemini in production to analyze emotional tone
    const lowerText = text.toLowerCase();
    if (lowerText.includes("stuck") || lowerText.includes("confused") || lowerText.includes("difficult") || lowerText.includes("hard")) {
      return "struggling";
    } else if (lowerText.includes("excited") || lowerText.includes("interested") || lowerText.includes("want to learn")) {
      return "motivated";
    } else if (lowerText.includes("tired") || lowerText.includes("overwhelmed") || lowerText.includes("too much") || lowerText.includes("burnout")) {
      return "burnout";
    }
    return "neutral";
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header text="AI Mentor" />
        <div className="flex-1 overflow-hidden flex flex-col p-6 bg-gray-50">
          <div className="flex-1 overflow-auto mb-4 max-w-4xl mx-auto w-full">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "assistant"
                        ? "bg-white border border-gray-200"
                        : "bg-mentor-purple text-white"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-mentor-lightPurple flex items-center justify-center text-white text-xs font-bold mr-2">
                          A
                        </div>
                        <span className="font-medium text-sm">AI Mentor</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <Card className="max-w-4xl mx-auto w-full">
            <CardContent className="p-4">
              {userMood !== "neutral" && (
                <div className="mb-2 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                  <p className="font-medium">Current mood detected: {userMood}</p>
                  <p className="text-xs text-gray-500">Responses will be tailored to your current state.</p>
                </div>
              )}
              {transcript && (
                <div className="mb-2 p-2 bg-gray-100 rounded-md text-sm text-gray-700">
                  <p className="font-medium">Transcript:</p>
                  <p>{transcript}</p>
                </div>
              )}
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your AI mentor for guidance..."
                  className="min-h-[80px] flex-1"
                  disabled={isLoading || isListening}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleListening}
                  className={isListening ? "bg-red-100" : ""}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading || isListening}
                  className="gap-2"
                >
                  {isLoading ? "Thinking..." : "Send"}
                  {!isLoading && <Send size={16} />}
                </Button>
              </div>
              {isListening && (
                <div className="mt-3 text-center">
                  <div className="inline-block">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-1 h-8 bg-mentor-purple rounded-full animate-pulse"></div>
                      <div className="w-1 h-12 bg-mentor-purple rounded-full animate-pulse delay-75"></div>
                      <div className="w-1 h-6 bg-mentor-purple rounded-full animate-pulse delay-150"></div>
                      <div className="w-1 h-10 bg-mentor-purple rounded-full animate-pulse delay-300"></div>
                      <div className="w-1 h-4 bg-mentor-purple rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Listening...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMentorChat;
