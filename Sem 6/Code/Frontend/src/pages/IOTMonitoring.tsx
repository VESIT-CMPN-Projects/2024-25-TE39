import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import IOTMonitoring from "@/components/IOTMonitoring";

const IOTMonitoringPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <PageLayout title="IOTMonitoring">
      <IOTMonitoring />
    </PageLayout>
  );
};

export default IOTMonitoringPage;
