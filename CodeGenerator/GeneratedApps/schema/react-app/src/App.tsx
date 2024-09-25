import React from "react";
import "./styles/app.css";
import ability from "./router/casl/ability";
import AppRouter from "./router/index";

import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import { AbilityContext } from "./router/casl/AbilityContext";
import { UserProvider } from "./authService/UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AbilityContext.Provider value={ability}>
        <UserProvider>
          <div id="App">
            <AppRouter />
          </div>
        </UserProvider>
      </AbilityContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
