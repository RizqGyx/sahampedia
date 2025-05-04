import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Menu, Moon, Sun } from "lucide-react";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { prediksiOptions } from "../../lib/constants";

export const Header = () => {
  const [isPrediksiOpen, setIsPrediksiOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const isActivePath = (path) => {
    if (path.startsWith("/prediction/")) {
      return location.pathname.startsWith("/prediction/");
    }
    return location.pathname === path;
  };

  const togglePrediksi = () => {
    setIsPrediksiOpen(!isPrediksiOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative overflow-hidden rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-md group-hover:shadow-lg transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400">
              SahamPedia
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className={`px-4 py-2 rounded-md font-normal text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
                      isActivePath("/")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    Beranda
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`px-4 py-2 cursor-pointer text-base font-normal bg- text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 ${
                      isActivePath("/prediction/")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md"
                        : ""
                    }`}
                  >
                    Prediksi
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-4 gap-2 p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl w-[600px]">
                      {prediksiOptions.map((option) => (
                        <Link
                          key={option.path}
                          to={option.path}
                          className={`block text-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md ${
                            location.pathname === option.path
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
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
                    className={`px-4 py-2 rounded-md font-normal text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
                      isActivePath("/course")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    Kursus
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/implementation"
                    className={`px-4 py-2 rounded-md font-normal text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
                      isActivePath("/implementation")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    Implementasi
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/reference"
                    className={`px-4 py-2 rounded-md font-normal text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
                      isActivePath("/reference")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    Referensi
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="md:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden cursor-pointer p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none">
                  <Menu className="h-6 w-6 " />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[300px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 [&>button:last-of-type]:hidden"
              >
                <SheetClose asChild>
                  <button
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 text-3xl font-bold cursor-pointer"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </SheetClose>
                <SheetTitle className="flex items-center mb-6 space-x-2">
                  <div className="relative overflow-hidden rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400">
                    SahamPedia
                  </span>
                </SheetTitle>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link
                    to="/"
                    className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors px-4 py-2 rounded-md ${
                      isActivePath("/")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    Beranda
                  </Link>
                  <div className="space-y-2 ">
                    <button
                      onClick={togglePrediksi}
                      className={`flex items-center justify-between w-full cursor-pointer text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors px-4 py-2 rounded-md ${
                        isActivePath("/prediction/")
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : ""
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
                      <div className="pl-4 space-y-2 max-h-60 overflow-y-auto border-l-2 border-white">
                        {prediksiOptions.map((option) => (
                          <Link
                            key={option.path}
                            to={option.path}
                            className={`block text-gray-600 dark:text-gray-400  hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-4 py-2 rounded-md ${
                              location.pathname === option.path
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
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
                    className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors px-4 py-2 rounded-md ${
                      isActivePath("/course")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    Kursus
                  </Link>
                  <Link
                    to="/implementation"
                    className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors px-4 py-2 rounded-md ${
                      isActivePath("/implementation")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    Implementasi
                  </Link>
                  <Link
                    to="/reference"
                    className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors px-4 py-2 rounded-md ${
                      isActivePath("/reference")
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    Referensi
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
