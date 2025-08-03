import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, Send, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both your name and email.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you'll connect your n8n webhook
      // const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email })
      // });

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "We've received your information and will be in touch soon.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-card animate-fadeIn">
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-fresh rounded-full flex items-center justify-center mx-auto animate-float">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Thank you!</h3>
            <p className="text-muted-foreground">
              We've received your information and our agent will process it shortly.
            </p>
          </div>
          <Button 
            onClick={resetForm}
            variant="outline"
            className="w-full"
          >
            Submit Another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-card animate-fadeIn">
      <CardContent className="pt-8 pb-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Get Started</h2>
            <p className="text-muted-foreground">
              Enter your details and our intelligent agent will get to work
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 border-border focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-border focus:ring-primary"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Start Process
                </div>
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;