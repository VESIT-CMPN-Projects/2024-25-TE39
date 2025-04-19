import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import SignupForm from "@/components/SignupForm";
import Header from "@/components/Header";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="flex-1 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-agri-green/10">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center max-w-md animate-fadeIn">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Join AgriVision Today
                </h2>
                <p className="text-muted-foreground">
                  Create your account to start making smarter farming decisions with AI-powered recommendations.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-agri-green/20 p-6 flex items-center justify-center animate-float">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-agri-green/20 to-primary/20 p-6 flex items-center justify-center animate-float [animation-delay:200ms]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-amber-100/50 to-amber-300/50 p-6 flex items-center justify-center animate-float [animation-delay:300ms]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-amber-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-100/50 to-blue-300/50 p-6 flex items-center justify-center animate-float [animation-delay:400ms]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Signup Form */}
        <div className="flex-1 flex items-center justify-center p-6 pt-32 md:pt-6">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;