
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import CropRecommendation from "@/components/CropRecommendation";

const CropRecommendationPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn={true} onLogout={() => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
      }} />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <CropRecommendation />
        </div>
      </main>
    </div>
  );
};

export default CropRecommendationPage;
