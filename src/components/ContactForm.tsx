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
      const response = await fetch(`https://n8n.yimo.world/webhook/87bc623c-d3f3-4070-a8ff-6271cd0ba674?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
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
      <div className="w-full max-w-lg mx-auto">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl animate-fadeIn text-center relative">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/10 via-transparent to-emerald-400/5 pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-emerald-400/40">
              <CheckCircle className="w-10 h-10 text-emerald-300 drop-shadow-lg" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-light text-white">Thank you!</h3>
              <p className="text-gray-300 text-lg">
                We've received your information and our agent will process it shortly.
              </p>
            </div>
            <button 
              onClick={resetForm}
              className="w-full h-12 bg-gradient-to-r from-emerald-500/80 to-cyan-500/80 hover:from-emerald-500 hover:to-cyan-500 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-[1.02]"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl animate-fadeIn relative">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"></div>
        
        <div className="space-y-8 relative z-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400/30 to-cyan-400/30 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
              <Mail className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-light text-white">Get Started</h2>
              <p className="text-gray-300 text-lg">
                Enter your details and our intelligent agent will get to work
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-medium text-gray-200 pl-1">
                Full Name
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-gray-200 transition-colors" />
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 disabled:opacity-50"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-200 pl-1">
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-gray-200 transition-colors" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 disabled:opacity-50"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-purple-500/80 to-cyan-500/80 hover:from-purple-500 hover:to-cyan-500 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-medium text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Start Process
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;