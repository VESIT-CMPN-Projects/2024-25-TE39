
import React from 'react';
import PageLayout from "@/components/PageLayout";
import MarketInsightsComponent from "@/components/MarketInsights";

const MarketInsightsPage: React.FC = () => {
  return (
    <PageLayout 
      title="Market Insights" 
      description="Track prices and market trends to maximize profits"
    >
      <MarketInsightsComponent />
    </PageLayout>
  );
};

export default MarketInsightsPage;
