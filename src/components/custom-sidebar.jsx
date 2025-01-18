import { useEffect, useState } from "react";
import CusBtn from "@/custom/CusBtn";
// import Nav from "./nav";
import { cn } from "@/lib/utils";
import { sidelinks } from "@/data/sidelinks";
import { ChevronLeft, Menu, X } from "lucide-react";
import logo1 from "@/assets/images/logo1.png";
import Nav from "./custom-nav";
import { UserNav } from "./user-nav";
export default function Sidebar({ className, isCollapsed, setIsCollapsed }) {
  const [navOpened, setNavOpened] = useState(false);
  //   const [isCollapsed, setIsCollapsed] = useState(false);
  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  console.log("sidelinks", sidelinks);
  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? "md:w-14" : "md:w-64"
        }`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? "h-svh opacity-50" : "h-0 opacity-0"
        } w-full bg-black md:hidden`}
      />

      <div fixed className={navOpened ? "h-svh" : ""}>
        {/* Header */}
        <div
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4"
        >
          <div className={`flex items-center ${!isCollapsed ? "gap-2" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className={`transition-all ${
                isCollapsed ? "h-6 w-6" : "h-8 w-8"
              }`}
            >
              <rect width="256" height="256" fill="none"></rect>
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></line>
              {/* <span className="sr-only">Website Name</span> */}
            </svg>
            <div
              className={`flex flex-col justify-end truncate ${
                isCollapsed ? "invisible w-0" : "visible w-auto"
              }`}
            >
              <img src={logo1} alt="logo" />
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <CusBtn
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
            title={navOpened ? <X /> : <Menu />}
          />
        </div>

        {/* Navigation links */}
        <div className="nav__container max-h-[600px] overflow-auto">
          <Nav
            id="sidebar-menu"
            className={`z-40 h-full flex-1 overflow-auto ${
              navOpened
                ? "max-h-screen"
                : "max-h-0 py-0 md:max-h-screen md:py-2"
            }`}
            closeNav={() => setNavOpened(false)}
            isCollapsed={isCollapsed}
            links={sidelinks}
          />
        </div>
        {/* Scrollbar width toggle button */}
        <CusBtn
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute w-[40px] h-[40px]  -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
          title={
            <>
              <ChevronLeft
                // stroke={1.5}
                className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
              />
            </>
          }
        ></CusBtn>
        <div className="flex justify-center items-center gap-2 w-full absolute bottom-2">
          <UserNav />
        </div>
      </div>
    </aside>
  );
}
