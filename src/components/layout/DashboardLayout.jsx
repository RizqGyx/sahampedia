import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  House,
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  FileText,
  Layers,
  ScrollText,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [name, setName] = useState("");

  const fetchData = async () => {
    try {
      const [userRes] = await axios.all([
        axios.get(`http://localhost:5000/api/v1/users/me`, {
          withCredentials: true,
        }),
      ]);
      setName(userRes.data.username || "Unknown");
    } catch (err) {
      toast.error("Failed to load data");
    }
  };

  const menuItems = [
    { icon: House, label: "Home", path: "/" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: BookOpen, label: "Courses", path: "/admin/course" },
    { icon: FolderOpen, label: "Modules", path: "/admin/module" },
    { icon: FileText, label: "Lessons", path: "/admin/lesson" },
    { icon: Layers, label: "Content", path: "/admin/content" },
    { icon: ScrollText, label: "Journals", path: "/admin/journal" },
  ];

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
        setMobile(true);
      } else {
        setCollapsed(false);
        setMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#0D0F1C] text-white flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          {!collapsed ? (
            <span className="text-xl font-bold text-white">AdminPanel</span>
          ) : (
            <img src="/Icon.png" alt="icon" className="w-6 h-6" />
          )}
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 py-4">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex items-center w-full text-left px-4 py-2 hover:bg-[#1E1F2F] transition cursor-pointer"
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="ml-3">{label}</span>}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="border-t border-gray-700 px-4 py-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left py-2 hover:bg-[#1E1F2F] transition cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-[#0D0F1C] text-white h-16 flex items-center justify-between px-4 border-b border-gray-700">
          <div className="flex items-center">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`cursor-pointer ${mobile ? "hidden" : "block"}`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="ml-4 text-lg font-semibold">
              Admin <span className="text-blue-500">Dashboard</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>{name}</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
