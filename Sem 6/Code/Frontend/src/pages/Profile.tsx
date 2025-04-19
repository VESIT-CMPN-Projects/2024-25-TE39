
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from "@/components/PageLayout";
import UserProfile from "@/components/UserProfile";

const ProfilePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <PageLayout title="User Profile" description="Manage your account details and preferences">
      <UserProfile />
    </PageLayout>
  );
};

export default ProfilePage;
