import { Outlet } from "react-router-dom";
import CommonLayout from "./components/layout/CommonLayout";
import { generateRoutes } from "./utils/generateRoutes";
import { adminSidebarItems } from "./routes/adminSidebarItems";

function App() {
  console.log(generateRoutes(adminSidebarItems));

  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}

export default App;
