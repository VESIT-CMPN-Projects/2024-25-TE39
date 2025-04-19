import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <PageLayout title="Dashboard">
      <Dashboard />
    </PageLayout>
  );
};

export default DashboardPage;
