import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BookOpen,
  Folder,
  FileText,
  Layers,
  BookText,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const API_BASE = "http://127.0.0.1:5000/api/v1";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State data
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [contents, setContents] = useState([]);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [coursesRes, modulesRes, lessonsRes, contentsRes, journalsRes] =
        await axios.all([
          axios.get(`${API_BASE}/courses`),
          axios.get(`${API_BASE}/modules`),
          axios.get(`${API_BASE}/lessons`),
          axios.get(`${API_BASE}/contents`),
          axios.get(`${API_BASE}/journals`),
        ]);

      setCourses(coursesRes.data.courses || []);
      setModules(modulesRes.data.modules || []);
      setLessons(lessonsRes.data.lessons || []);
      setContents(contentsRes.data.contents || []);
      setJournals(journalsRes.data.journals || []);
    } catch (err) {
      setError(err.message || "Error fetching data");
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statsData = [
    {
      title: "Total Courses",
      value: `${courses.length} Item`,
      icon: BookOpen,
    },
    {
      title: "Total Modules",
      value: `${modules.length} Item`,
      icon: Folder,
    },
    {
      title: "Total Lessons",
      value: `${lessons.length} Item`,
      icon: FileText,
    },
    {
      title: "Content Items",
      value: `${contents.length} Item`,
      icon: Layers,
    },
    {
      title: "Total Journals",
      value: `${journals.length} Item`,
      icon: BookText,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={() => {
                fetchData();
                toast.success("Data refreshed");
              }}
              disabled={loading}
              className="hover:bg-[#1E1F2F] cursor-pointer"
            >
              {loading ? "Loading..." : "Refresh Data"}
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 font-semibold">
            Error loading data: {error}
          </p>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Manage Courses",
              description: "Add, edit, or delete courses",
              icon: BookOpen,
              path: "/admin/course",
            },
            {
              title: "Manage Modules",
              description: "Organize modules within courses",
              icon: Folder,
              path: "/admin/module",
            },
            {
              title: "Manage Lessons",
              description: "Create and edit lessons",
              icon: FileText,
              path: "/admin/lesson",
            },
            {
              title: "Manage Content",
              description: "Add various types of content",
              icon: Layers,
              path: "/admin/content",
            },
            {
              title: "Manage Journals",
              description: "Track academic journals",
              icon: BookText,
              path: "/admin/journal",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="transition-colors cursor-pointer hover:bg-[#1E1F2F]"
              onClick={() => navigate(item.path)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
