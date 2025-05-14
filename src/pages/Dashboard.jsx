import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoursesTable } from "@/components/admin/CoursesTable";
import { ModulesTable } from "@/components/admin/ModulesTable";
import { LessonsTable } from "@/components/admin/LessonsTable";
import { ContentsTable } from "@/components/admin/ContentsTable";
import { JournalsTable } from "@/components/admin/JournalsTable";
import { Layout } from "@/components/layout/Layout";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabParam || "courses");

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === "courses") {
      navigate("/admin");
    } else {
      navigate(`/admin?tab=${value}`);
    }
  };

  useEffect(() => {
    const newTab = tabParam || "courses";
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [tabParam, activeTab]);

  return (
    <Layout>
      <div className="w-full space-y-6">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your courses, modules, lessons, content, and journals
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 mb-8 w-full">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="contents">Contents</TabsTrigger>
            <TabsTrigger value="journals">Journals</TabsTrigger>
          </TabsList>
          <TabsContent value="courses">
            <CoursesTable />
          </TabsContent>
          <TabsContent value="modules">
            <ModulesTable />
          </TabsContent>
          <TabsContent value="lessons">
            <LessonsTable />
          </TabsContent>
          <TabsContent value="contents">
            <ContentsTable />
          </TabsContent>
          <TabsContent value="journals">
            <JournalsTable />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
