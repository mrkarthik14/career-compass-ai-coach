
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, ArrowLeft, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import { toast } from "@/components/ui/use-toast";

interface InterviewViewProps {
  sessionType: string;
  questions: string[];
  jobRole: string;
  onEnd: () => void;
}

const InterviewView = ({ sessionType, questions, jobRole, onEnd }: InterviewViewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [ratings, setRatings] = useState<number[]>(Array(questions.length).fill(0));
  const [feedback, setFeedback] = useState<string[]>(Array(questions.length).fill(""));
  const [isAnswering, setIsAnswering] = useState(false);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");
  const [isMicOn, setIsMicOn] = useState(sessionType === "voice");
  const [isVideoOn, setIsVideoOn] = useState(sessionType === "video");
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set up interviewer avatar video (simulation)
    if (videoRef.current) {
      // This would be replaced with a real video feed in production
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        const drawAvatar = () => {
          ctx.fillStyle = '#8b5cf6'; // Mentor purple
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
          ctx.font = '30px Arial';
          ctx.fillText('AI Interviewer', canvas.width/2 - 80, canvas.height/2);
          
          // Animate slightly to make it seem alive
          ctx.fillStyle = 'rgba(255,255,255,0.1)';
          const time = Date.now() / 1000;
          const size = Math.sin(time * 2) * 20 + 100;
          ctx.beginPath();
          ctx.arc(canvas.width/2, canvas.height/2 + 50, size, 0, Math.PI * 2);
          ctx.fill();
        };
        
        const interval = setInterval(drawAvatar, 100);
        
        try {
          // @ts-ignore - This is a hack to create a fake video stream
          videoRef.current.srcObject = canvas.captureStream(30);
        } catch (error) {
          console.error("Browser doesn't support canvas.captureStream()", error);
        }
        
        return () => clearInterval(interval);
      }
    }
  }, []);
  
  useEffect(() => {
    // Set up user's video if in video mode
    if (sessionType === "video" && localVideoRef.current) {
      try {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
          })
          .catch(err => {
            console.error("Error accessing camera:", err);
            toast({
              title: "Camera access denied",
              description: "Please allow camera access to use video interview mode",
              variant: "destructive"
            });
          });
      } catch (error) {
        console.error("Error setting up video:", error);
      }
    }
    
    return () => {
      // Clean up video streams
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [sessionType]);

  const handleStartAnswering = () => {
    setIsAnswering(true);
    
    if (sessionType === "voice") {
      // Simulate voice recording
      toast({
        title: "Voice recording started",
        description: "Speak your answer. Recording will end automatically after a pause.",
      });
      
      // Simulate voice recording ending after 10 seconds
      setTimeout(() => {
        handleFinishAnswer();
      }, 10000);
    }
  };
  
  const handleFinishAnswer = () => {
    setIsAnswering(false);
    setIsProcessingAnswer(true);
    
    // Process the answer (simulate AI evaluation)
    setTimeout(() => {
      const newAnswers = [...answers];
      
      if (sessionType === "text") {
        newAnswers[currentQuestionIndex] = textAnswer;
      } else {
        // Simulate a generated answer from voice/video
        newAnswers[currentQuestionIndex] = "I believe my background in data analysis and my experience with SQL and Python make me a strong candidate for this role. I'm particularly interested in how your company uses data to drive product decisions.";
      }
      
      setAnswers(newAnswers);
      
      // Generate a rating between 6 and 9
      const rating = Math.floor(Math.random() * 4) + 6;
      const newRatings = [...ratings];
      newRatings[currentQuestionIndex] = rating;
      setRatings(newRatings);
      
      // Generate feedback
      const feedbackOptions = [
        "Great answer! You provided specific examples and demonstrated your knowledge well.",
        "Good response. Consider adding more specifics about your past experience to strengthen your answer.",
        "Solid answer. To improve, try connecting your skills more directly to the company's needs.",
        "Nice response. You could enhance it by quantifying your achievements with specific metrics."
      ];
      
      const newFeedback = [...feedback];
      newFeedback[currentQuestionIndex] = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
      setFeedback(newFeedback);
      
      setIsProcessingAnswer(false);
      setTextAnswer("");
      
      // Move to next question or end interview if done
      if (currentQuestionIndex >= questions.length - 1) {
        setIsInterviewComplete(true);
      }
    }, 2000);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsInterviewComplete(true);
    }
  };
  
  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    toast({
      title: isMicOn ? "Microphone turned off" : "Microphone turned on",
      duration: 1500,
    });
  };
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Camera turned off" : "Camera turned on",
      duration: 1500,
    });
  };
  
  if (isInterviewComplete) {
    return (
      <div className="flex flex-col h-screen">
        <Header text={`Interview Results: ${jobRole}`} />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Interview Complete</h2>
            
            <div className="mb-6">
              <p className="text-lg mb-2">Overall Performance</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-mentor-purple h-4 rounded-full" 
                  style={{ width: `${(ratings.reduce((a, b) => a + b, 0) / (ratings.length * 10)) * 100}%` }}
                ></div>
              </div>
              <p className="text-right text-sm mt-1">
                {Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10}/10
              </p>
            </div>
            
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <p className="font-semibold">{index + 1}. {question}</p>
                  <div className="mt-2 bg-gray-50 p-3 rounded">
                    <p className="italic text-gray-700">{answers[index] || "No answer provided"}</p>
                  </div>
                  {ratings[index] > 0 && (
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-mentor-purple flex items-center justify-center text-white font-bold">
                          {ratings[index]}
                        </div>
                        <p className="ml-2 text-sm text-gray-700">/10</p>
                      </div>
                      <p className="text-sm text-gray-700 ml-4">{feedback[index]}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={onEnd}
                className="flex items-center"
              >
                <ArrowLeft size={16} className="mr-2" /> Return to Resources
              </Button>
              <Button>Download Interview Report</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header text={`Mock Interview: ${jobRole}`} />
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Main interview area */}
        <div className="flex-1 flex flex-col max-h-full p-4">
          <div className="flex-1 overflow-auto">
            <div className="max-w-3xl mx-auto">
              {/* Current question */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-xl font-medium mb-4">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                <p className="text-lg">{questions[currentQuestionIndex]}</p>
              </div>
              
              {/* Answer area */}
              {!answers[currentQuestionIndex] ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  {isAnswering ? (
                    sessionType === "text" ? (
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Type your answer here..."
                          className="w-full min-h-[150px]"
                          value={textAnswer}
                          onChange={(e) => setTextAnswer(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleFinishAnswer}
                            className="flex items-center"
                          >
                            <Send size={16} className="mr-2" /> Submit Answer
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="animate-pulse flex flex-col items-center">
                          {sessionType === "voice" ? (
                            <Mic className="h-16 w-16 text-mentor-purple mb-4" />
                          ) : (
                            <Video className="h-16 w-16 text-mentor-purple mb-4" />
                          )}
                          <p className="text-lg">
                            {sessionType === "voice" 
                              ? "Recording your answer... Speak clearly." 
                              : "Recording your answer... Speak clearly and maintain eye contact."}
                          </p>
                        </div>
                        <Button 
                          onClick={handleFinishAnswer}
                          className="mt-8"
                        >
                          Finish Answer
                        </Button>
                      </div>
                    )
                  ) : isProcessingAnswer ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mentor-purple"></div>
                      <p className="mt-4 text-lg">Analyzing your answer...</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Button
                        size="lg"
                        onClick={handleStartAnswering}
                      >
                        Start Answering
                      </Button>
                      <p className="mt-4 text-gray-500 text-sm">
                        {sessionType === "text" 
                          ? "You'll be able to type your answer" 
                          : sessionType === "voice"
                            ? "Your microphone will be used to record your answer" 
                            : "Your camera and microphone will be used to record your answer"}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium mb-2">Your Answer:</h3>
                    <p className="text-gray-700">{answers[currentQuestionIndex]}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Feedback:</h3>
                      <div className="flex items-center">
                        <span className="mr-2">Rating:</span>
                        <div className="w-8 h-8 rounded-full bg-mentor-purple flex items-center justify-center text-white font-bold">
                          {ratings[currentQuestionIndex]}
                        </div>
                        <span className="ml-1">/10</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{feedback[currentQuestionIndex]}</p>
                    
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleNextQuestion}>
                        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Video sidebar (only in video mode) */}
        {sessionType === "video" && (
          <div className="w-full md:w-64 lg:w-80 bg-gray-900 p-4 flex flex-col">
            <div className="relative mb-4 bg-black rounded-lg overflow-hidden aspect-video">
              <video 
                ref={videoRef} 
                autoPlay 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Interviewer
              </div>
            </div>
            
            <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
              <video 
                ref={localVideoRef} 
                autoPlay 
                muted 
                className={`w-full h-full object-cover ${isVideoOn ? 'opacity-100' : 'opacity-0'}`}
              />
              {!isVideoOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                You
              </div>
            </div>
            
            <div className="mt-4 flex justify-around">
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${!isMicOn ? 'bg-red-100 text-red-500' : ''}`}
                onClick={toggleMic}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${!isVideoOn ? 'bg-red-100 text-red-500' : ''}`}
                onClick={toggleVideo}
              >
                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-red-100 text-red-500"
                onClick={onEnd}
              >
                <ArrowLeft size={20} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewView;
