import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_REGION,
      allowGuestAccess: true,
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_APP_CLIENT_ID,
      authenticationFlowType: "USER_PASSWORD_AUTH",
    },
  },
} as any);

createRoot(document.getElementById("root")!).render(<App />);
