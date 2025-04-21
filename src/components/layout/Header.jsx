import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isPrediksiOpen, setIsPrediksiOpen] = React.useState(false);
  const location = useLocation();

  const prediksiOptions = [
    { label: "BBCA", path: "/prediction/bbca" },
    { label: "BBNI", path: "/prediction/bbni" },
    { label: "BBRI", path: "/prediction/bbri" },
    { label: "BMRI", path: "/prediction/bmri" },
    { label: "TLKM", path: "/prediction/tlkm" },
    { label: "ASII", path: "/prediction/asii" },
    { label: "UNVR", path: "/prediction/unvr" },
    { label: "ICBP", path: "/prediction/icbp" },
    { label: "INDF", path: "/prediction/indf" },
    { label: "KLBF", path: "/prediction/klbf" },
    { label: "ANTM", path: "/prediction/antm" },
    { label: "PTBA", path: "/prediction/ptba" },
    { label: "PGAS", path: "/prediction/pgas" },
    { label: "SMGR", path: "/prediction/smgr" },
    { label: "UNTR", path: "/prediction/untr" },
  ];

  const isActivePath = (path) => {
    if (path.startsWith("/prediction/")) {
      return location.pathname.startsWith("/prediction/");
    }
    return location.pathname === path;
  };

  const togglePrediksi = () => {
    setIsPrediksiOpen(!isPrediksiOpen);
  };

  const activePrediksiOption = prediksiOptions.find(
    (option) => location.pathname === option.path
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 mb-4">
      <div className="container px-4 py-3 w-11/12 mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">SahamPedia</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className={`px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                      isActivePath("/") ? "bg-gray-100" : ""
                    }`}
                  >
                    Beranda
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 ${
                      isActivePath("/prediction/")
                        ? "bg-gray-100 rounded-md"
                        : ""
                    }`}
                  >
                    Prediksi
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-5 gap-2 p-4 bg-white w-[600px]">
                      {prediksiOptions.map((option) => (
                        <Link
                          key={option.path}
                          to={option.path}
                          className={`block text-center px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md ${
                            location.pathname === option.path
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          {option.label}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/course"
                    className={`px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                      isActivePath("/course") ? "bg-gray-100" : ""
                    }`}
                  >
                    Kursus
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/implementation"
                    className={`px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                      isActivePath("/implementation") ? "bg-gray-100" : ""
                    }`}
                  >
                    Implementasi
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/reference"
                    className={`px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors ${
                      isActivePath("/reference") ? "bg-gray-100" : ""
                    }`}
                  >
                    Referensi
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-blue-600 hover:bg-blue-700">Mulai</Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-6">
                <Link
                  to="/"
                  className={`text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-md ${
                    isActivePath("/") ? "bg-gray-100" : ""
                  }`}
                >
                  Beranda
                </Link>
                <div className="space-y-2">
                  <button
                    onClick={togglePrediksi}
                    className={`flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-md ${
                      isActivePath("/prediction/") ? "bg-gray-100" : ""
                    }`}
                  >
                    <span>Prediksi</span>
                    <span
                      className={`transform transition-transform ${
                        isPrediksiOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {isPrediksiOpen && (
                    <div className="pl-4 space-y-2">
                      {prediksiOptions.map((option) => (
                        <Link
                          key={option.path}
                          to={option.path}
                          className={`block text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md ${
                            location.pathname === option.path
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          {option.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link
                  to="/course"
                  className={`text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-md ${
                    isActivePath("/course") ? "bg-gray-100" : ""
                  }`}
                >
                  Kursus
                </Link>
                <Link
                  to="/implementation"
                  className={`text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-md ${
                    isActivePath("/implementation") ? "bg-gray-100" : ""
                  }`}
                >
                  Implementasi
                </Link>
                <Link
                  to="/reference"
                  className={`text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-md ${
                    isActivePath("/reference") ? "bg-gray-100" : ""
                  }`}
                >
                  Referensi
                </Link>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Mulai
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
