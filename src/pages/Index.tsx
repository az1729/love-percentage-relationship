import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HeartIcon } from "lucide-react";

const Index = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<{ percentage: number; relationship: string } | null>(null);

  const calculateLove = () => {
    // Simple algorithm to generate a love percentage based on names
    const combinedNames = (name1 + name2).toLowerCase();
    let sum = 0;
    for (let i = 0; i < combinedNames.length; i++) {
      sum += combinedNames.charCodeAt(i);
    }
    const percentage = sum % 101; // Generates a number between 0-100

    // Determine relationship type based on percentage
    let relationship = "";
    if (percentage >= 90) {
      relationship = "Soulmates! 💑";
    } else if (percentage >= 70) {
      relationship = "Perfect Match! 💕";
    } else if (percentage >= 50) {
      relationship = "Good Friends 👫";
    } else if (percentage >= 30) {
      relationship = "Just Friends 🤝";
    } else {
      relationship = "Better as Friends 🙂";
    }

    setResult({ percentage, relationship });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
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
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            Calculate Love Match
          </Button>

          {result && (
            <Alert className="mt-4 bg-pink-50 border-pink-200">
              <AlertDescription className="text-center space-y-2">
                <div className="text-2xl font-bold text-pink-600">
                  {result.percentage}%
                </div>
                <div className="text-lg text-gray-700">
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