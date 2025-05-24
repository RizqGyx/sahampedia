import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileWarning, List } from "lucide-react";
import CourseNavigation from "@/components/course/CourseNavigation";
import CourseContent from "@/components/course/CourseContent";
import { Layout } from "@/components/layout/Layout";
import CourseMobileNav from "@/components/course/CourseMobileNav";

const Course = () => {
  const params = useParams();
  const course_id = params.course_id || "course1";
  const [courseData, setCourseData] = useState(null);
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setLoading(true);
    setCourseData(null);
    const fetchCourseData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/v1/courses/${course_id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch course data");
        }
        const data = await res.json();
        setCourseData(data.course);
      } catch (err) {
        setError(err.message || "Data kursus tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [course_id]);

  return (
    <Layout>
      {/* Loading state */}
      {loading && (
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute inset-3 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Memuat Data Kursus...
            </p>
          </div>
        </div>
      )}

      {/* Error or no data state */}
      {!loading && (error || !courseData) && (
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <FileWarning className="relative w-16 h-16" />
            <p className="text-gray-600 dark:text-gray-300">
              Data Kursus Tidak Ditemukan
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      {!loading && !error && courseData && (
        <>
          <CourseMobileNav
            title={courseData.title}
            modules={courseData.modules}
            currentModule={courseData.modules[activeModule].title}
            currentLesson={
              courseData.modules[activeModule].lessons[activeLesson].title
            }
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
                className={`${
                  showSidebar ? "w-full md:w-64 lg:w-80" : "w-0"
                } bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 rounded-l-lg transition-all duration-300 overflow-hidden hidden lg:flex`}
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
                    onClick={() => setShowSidebar(!showSidebar)}
                    aria-label="Toggle navigation"
                    className="text-white cursor-pointer"
                  >
                    <List className="h-5 w-5" />
                  </Button>
                  <h3 className="ml-2 font-bold text-sm text-white">
                    {courseData.modules[activeModule].title} -{" "}
                    {
                      courseData.modules[activeModule].lessons[activeLesson]
                        .title
                    }
                  </h3>
                </div>

                <div className="container py-6 px-4 md:px-6 max-w-4xl mx-auto">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
                    {
                      courseData.modules[activeModule].lessons[activeLesson]
                        .title
                    }
                  </h1>
                  <CourseContent
                    content={
                      courseData.modules[activeModule].lessons[activeLesson]
                        .contents
                    }
                  />

                  <div className="flex justify-between mt-10 py-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (activeLesson > 0) {
                          setActiveLesson(activeLesson - 1);
                        } else if (activeModule > 0) {
                          setActiveModule(activeModule - 1);
                          setActiveLesson(
                            courseData.modules[activeModule - 1].lessons
                              .length - 1
                          );
                        }
                      }}
                      disabled={activeModule === 0 && activeLesson === 0}
                      className="flex items-center cursor-pointer bg-gray-600 dark:bg-gray-700 text-white hover:bg-gray-900 hover:text-white"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous Lesson
                    </Button>

                    <Button
                      onClick={() => {
                        if (
                          activeLesson <
                          courseData.modules[activeModule].lessons.length - 1
                        ) {
                          setActiveLesson(activeLesson + 1);
                        } else if (
                          activeModule <
                          courseData.modules.length - 1
                        ) {
                          setActiveModule(activeModule + 1);
                          setActiveLesson(0);
                        }
                      }}
                      disabled={
                        activeModule === courseData.modules.length - 1 &&
                        activeLesson ===
                          courseData.modules[activeModule].lessons.length - 1
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
        </>
      )}
    </Layout>
  );
};

export default Course;
