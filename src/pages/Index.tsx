import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HeartIcon } from "lucide-react";

const Index = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<{ percentage: number; relationship: string } | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setProgress(result.percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [result]);

  const calculateLove = () => {
    setProgress(0);
    
    const combinedNames = (name1 + name2).toLowerCase();
    let sum = 0;
    for (let i = 0; i < combinedNames.length; i++) {
      sum += combinedNames.charCodeAt(i);
    }
    const percentage = sum % 101;

    // Expanded relationship types based on percentage ranges
    let relationship = "";
    if (percentage >= 90) {
      relationship = "Soulmates 💫";
    } else if (percentage >= 80) {
      relationship = "True Love 💑";
    } else if (percentage >= 70) {
      relationship = "Marriage Material 💍";
    } else if (percentage >= 60) {
      relationship = "Deep Affection 💝";
    } else if (percentage >= 50) {
      relationship = "Best Friends Forever 🤝";
    } else if (percentage >= 40) {
      relationship = "Close Friends 👥";
    } else if (percentage >= 30) {
      relationship = "Siblings at Heart 👫";
    } else if (percentage >= 20) {
      relationship = "Friendly Acquaintances 🌟";
    } else if (percentage >= 10) {
      relationship = "Complicated 🤔";
    } else {
      relationship = "Rivals 🔥";
    }

    setResult({ percentage, relationship });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 animate-gradient-xy flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/80">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-2">
            <HeartIcon className="text-red-500" />
            Love Calculator
            <HeartIcon className="text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter first name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="border-pink-200"
            />
            <Input
              placeholder="Enter second name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="border-pink-200"
            />
          </div>
          
          <Button 
            onClick={calculateLove}
            disabled={!name1 || !name2}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-300"
          >
            Calculate Love Match
          </Button>

          {result && (
            <Alert className="mt-4 bg-pink-50/80 border-pink-200">
              <AlertDescription className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      fill="none"
                      stroke="#f3e8ff"
                      strokeWidth="8"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 60}`}
                      strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-2xl font-bold text-pink-600">{progress}%</span>
                  </div>
                </div>
                <div className="text-lg text-gray-700 font-medium mt-4">
                  {result.relationship}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;