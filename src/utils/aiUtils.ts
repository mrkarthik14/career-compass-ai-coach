
import { toast } from "@/hooks/use-toast";

type AIModelType = "local" | "chatgpt" | "claude";

interface AIRequestParams {
  userMessage: string;
  model: AIModelType;
}

export const sendMessageToAI = async ({ userMessage, model }: AIRequestParams): Promise<string> => {
  if (model === "local") {
    // Use local mock implementation for fallback
    return generateLocalResponse(userMessage);
  }

  try {
    // In a real implementation, this would be your backend endpoint
    const response = await fetch("/api/mentor-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage, model }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Different API responses have different structures
    if (model === "chatgpt") {
      return data.choices[0].message.content;
    } else if (model === "claude") {
      return data.content[0].text;
    }
    
    return "No response from AI model.";
  } catch (error) {
    console.error("Error calling AI API:", error);
    toast({
      title: "AI Connection Error",
      description: "Falling back to local responses. Check your connection.",
      variant: "destructive",
    });
    
    // Fallback to local implementation
    return generateLocalResponse(userMessage);
  }
};

// Local implementation for when API is not available
const generateLocalResponse = (message: string): string => {
  const lowerInput = message.toLowerCase();
    
  if (lowerInput.includes("learning path") || lowerInput.includes("how to learn") || lowerInput.includes("roadmap")) {
    return "I'd be happy to design a learning path for you! To create the most effective plan, I need to understand:\n\n1. What's your current skill level with this topic?\n2. What's your end goal or the specific project you want to build?\n3. How much time can you dedicate weekly?\n4. Do you prefer videos, reading, or hands-on projects?\n\nOnce I know these details, I can create a step-by-step learning path with resources and milestones.";
  }
  
  if (lowerInput.includes("project") || lowerInput.includes("portfolio")) {
    return "Building projects is a great way to solidify your skills! Based on your profile, here are some project ideas tailored to your current level:\n\n1. **Interactive Data Dashboard** - Build a visualization tool that pulls from public APIs\n2. **Personal Learning Tracker** - Create an app to monitor your progress and set goals\n3. **Industry-specific Tool** - Develop a solution for a real problem in your target field\n\nWould you like me to elaborate on any of these ideas or suggest something else?";
  }
  
  if (lowerInput.includes("interview") || lowerInput.includes("job")) {
    return "I can help you prepare for interviews in your field. Let's start with a mock interview session:\n\n**Question 1**: Tell me about a challenging project you worked on and how you approached it.\n\nAfter you respond, I'll provide feedback and we can continue with more questions tailored to your target role. I can also help you prepare your resume and portfolio to highlight your strengths.";
  }

  return "I'm here to help guide your learning and career journey. I can assist with creating personalized learning paths, suggesting portfolio projects, preparing for interviews, or setting achievable goals. What specific area would you like to focus on today?";
};
