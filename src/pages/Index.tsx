import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-fresh bg-clip-text text-transparent mb-4">
            Connect with Our AI Agent
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Submit your information and let our intelligent n8n agent handle the rest. 
            Simple, fast, and automated.
          </p>
        </div>
        
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
