import { routes } from "./config/router/route"

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { getContext, Provider } from "./lib/Provider/query-provider";
import { Toaster } from 'sonner';

const router = createBrowserRouter(routes);

function App() {
  const rxQueryClient = getContext().queryClient;
  return (
    <Provider queryClient={rxQueryClient}>
      <Toaster /> 
        <RouterProvider router={router} /> 
    </Provider>
  )
}

export default App;
