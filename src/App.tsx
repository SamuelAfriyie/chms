import { BrowserRouter, Route, Routes } from "react-router"
import { routes, type RouteType } from "./config/router/route"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map((route: RouteType) => <Route {...route} />)
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App;
