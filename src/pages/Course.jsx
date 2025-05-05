import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, List, Menu } from "lucide-react";
import CourseNavigation from "@/components/course/CourseNavigation";
import CourseContent from "@/components/course/CourseContent";
import { Layout } from "@/components/layout/Layout";
import CourseMobileNav from "@/components/course/CourseMobileNav";
import { mockCourseData } from "@/lib/dummyData";

const Course = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);

  // In a real app, fetch course data based on courseId
  const courseData = mockCourseData;

  const currentModule = courseData.modules[activeModule];
  const currentLesson = currentModule.lessons[activeLesson];

  const navigateToNextLesson = () => {
    if (activeLesson < currentModule.lessons.length - 1) {
      // Next lesson in same module
      setActiveLesson(activeLesson + 1);
    } else if (activeModule < courseData.modules.length - 1) {
      // First lesson in next module
      setActiveModule(activeModule + 1);
      setActiveLesson(0);
    }
  };

  const navigateToPrevLesson = () => {
    if (activeLesson > 0) {
      // Previous lesson in same module
      setActiveLesson(activeLesson - 1);
    } else if (activeModule > 0) {
      // Last lesson in previous module
      setActiveModule(activeModule - 1);
      setActiveLesson(courseData.modules[activeModule - 1].lessons.length - 1);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Layout>
      <CourseMobileNav
        title={courseData.title}
        modules={courseData.modules}
        currentModule={currentModule.title}
        currentLesson={currentLesson.title}
        activeModule={activeModule}
        activeLesson={activeLesson}
        onSelectModule={(moduleIndex, lessonIndex) => {
          setActiveModule(moduleIndex);
          setActiveLesson(lessonIndex);
        }}
      />
      <div className="min-h-screen flex flex-col text-gray-900">
        <main className="flex-grow flex flex-col md:flex-row">
          <div
            className={`${showSidebar ? "w-full md:w-64 lg:w-80" : "w-0"} 
                       bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 rounded-l-lg transition-all duration-300 
                       overflow-hidden hidden lg:flex`}
          >
            {showSidebar && (
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4 text-white">
                  {courseData.title}
                </h2>
                <CourseNavigation
                  modules={courseData.modules}
                  activeModule={activeModule}
                  activeLesson={activeLesson}
                  onSelectModule={(moduleIndex, lessonIndex) => {
                    setActiveModule(moduleIndex);
                    setActiveLesson(lessonIndex);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            <div
              className={`${
                showSidebar ? "rounded-r" : "rounded-lg"
              } items-center p-2 border-b hidden lg:flex bg-gradient-to-bl from-violet-600 to-blue-600`}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                aria-label="Toggle navigation"
                className="text-white cursor-pointer"
              >
                <List className="h-5 w-5" />
              </Button>
              <h3 className="ml-2 font-bold text-sm text-white">
                {currentModule.title} - {currentLesson.title}
              </h3>
            </div>

            <div className="container py-6 px-4 md:px-6 max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
                {currentLesson.title}
              </h1>
              <CourseContent content={currentLesson.content} />

              {/* Navigation buttons */}
              <div className="flex justify-between mt-10 py-4 border-t">
                <Button
                  variant="outline"
                  onClick={navigateToPrevLesson}
                  disabled={activeModule === 0 && activeLesson === 0}
                  className="flex items-center cursor-pointer bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-900 hover:text-white"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Lesson
                </Button>

                <Button
                  onClick={navigateToNextLesson}
                  disabled={
                    activeModule === courseData.modules.length - 1 &&
                    activeLesson === currentModule.lessons.length - 1
                  }
                  className="flex items-center text-white bg-blue-600 hover:bg-blue-900 cursor-pointer"
                >
                  Next Lesson
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Course;
