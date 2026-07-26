import { Outlet } from "react-router-dom";
import { SideBar } from "../navbar/Sidebar";
import { BottomBar } from "../navbar/Bottombar";

export function AdmLayout() {
  return (
    <div className="min-h-screen w-screen flex text-amber-50 relative">
      <div className="hidden md:block ">
        <SideBar />
      </div>

      <main className="flex-1">
        {" "}
        {/*Flex-1 ocupa todo o espaço disponível*/}
        <Outlet />
        {/* Mobile BottomBar */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomBar />
        </div>
      </main>
    </div>
  );
}
