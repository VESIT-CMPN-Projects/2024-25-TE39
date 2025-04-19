import React from "react";
import NavigationLayout from "./NavigationLayout";

const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <NavigationLayout>
    <div className="pt-20">
      <h1 className="text-3xl">{title}</h1>
      {children}
    </div>
  </NavigationLayout>
);

export default PageLayout;
