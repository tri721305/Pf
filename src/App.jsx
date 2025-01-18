import { useEffect, useState } from "react";
import { CameraPermission } from "./pages";
import "./App.css";
import CusSidebar from "./custom/CusSidebar";
import Login from "./pages/Login/Login";
import Sidebar from "./components/custom-sidebar";
import useIsCollapsed from "./hooks/use-is-collapsed";
import { Route, Routes, Outlet } from "react-router";
import PrivateRoutes from "./router/PrivateRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
// import router from "./router/router";
import { Separator } from "./components/ui/separator";
import { AppSidebar } from "./components/app-side";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./components/ui/breadcrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";
import DashboardDetail from "./pages/Dashboard/DashboardDetail";
import ThemeSwitch from "./components/theme-switch";
import StoreManager from "./pages/StoreManager/StoreManager";
import { useSelector } from "react-redux";
import { useTheme } from "./components/theme-provider";
import SlideCamera from "./pages/SlideCamera/SlideCamera";
import PCManager from "./pages/PCManager/PCManager";
import PCDetail from "./pages/PCManager/PCDetail";
import PackageManager from "./pages/PackageManager/PackageManager";
import PortManager from "./pages/PortManager/PortManager";
import AreaManager from "./pages/AreaManager/AreaManager";
import GroupManager from "./pages/GroupManager/GroupManager";
import GroupDetail from "./pages/GroupManager/GroupDetail";
import RoleManager from "./pages/RoleManager/RoleManager";
function App() {
  const [parent, setParent] = useState();
  const childrenBreakCrumb = useSelector(
    (state) => state?.dashboard?.childrenBreakCrumb
  );
  const { theme } = useTheme();
  useEffect(() => {
    let url = window.location.href?.split("/");
    if (url?.length > 3) {
      setParent(url[3]);
    }
  }, [window.location.href]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <div className="relative h-full overflow-hidden bg-background">
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center justify-between gap-2">
                      <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger
                          className={`-ml-1 ${theme == "dark" && "text-white"}`}
                        />
                        <Separator
                          orientation="vertical"
                          className="mr-2 h-4"
                        />
                        <Breadcrumb>
                          <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                              <BreadcrumbLink href={parent}>
                                <BreadcrumbPage className="font-bold">
                                  {parent}
                                </BreadcrumbPage>
                              </BreadcrumbLink>
                            </BreadcrumbItem>
                            {childrenBreakCrumb && (
                              <>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                  <BreadcrumbPage className="font-bold">
                                    {childrenBreakCrumb}
                                  </BreadcrumbPage>
                                </BreadcrumbItem>
                              </>
                            )}
                          </BreadcrumbList>
                        </Breadcrumb>
                      </div>
                      <ThemeSwitch />
                    </header>
                    <div className="flex flex-1 flex-col p-2 pt-0">
                      <Outlet />
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </div>
            </PrivateRoutes>
          }
        >
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard/:id" element={<DashboardDetail />} />
          <Route path="/storemanager" element={<StoreManager />} />
          <Route path="/slidecamera" element={<SlideCamera />} />
          <Route path="/CameraPermission" element={<CameraPermission />} />
          <Route path="/PCManager" element={<PCManager />} />
          <Route path="/PCManager/:id" element={<PCDetail />} />
          <Route path="/PackageManager" element={<PackageManager />} />
          <Route path="/PortManager" element={<PortManager />} />
          <Route path="/AreaManager" element={<AreaManager />} />
          <Route path="/GroupManager" element={<GroupManager />} />
          <Route path="/GroupManager/:id" element={<GroupDetail />} />
          <Route path="/RoleManager" element={<RoleManager />} />
        </Route>
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
