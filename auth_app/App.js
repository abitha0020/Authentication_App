import React, { useState } from "react";
import { AuthenticatedUserProvider } from "./src/contexts/index";
import RootNavigator from "./src/navigators/navigator";

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
