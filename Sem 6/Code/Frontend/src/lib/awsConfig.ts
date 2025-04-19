export const awsConfig = {
  Auth: {
    region: "ap-south-1",
    userPoolId: "ap-south-1_nFElgCMzP",
    userPoolWebClientId: "1lpbdiupr9etmqjlj7n823bbj1",
    mandatorySignIn: false,
    authenticationFlowType: "USER_PASSWORD_AUTH",
    cookieStorage: {
      domain: "localhost",
      path: "/",
      expires: 365,
      sameSite: "strict",
      secure: true,
    },
    oauth: {
      domain: "",
      scope: [],
      redirectSignIn: "",
      redirectSignOut: "",
      responseType: "code",
    },
  },
};
