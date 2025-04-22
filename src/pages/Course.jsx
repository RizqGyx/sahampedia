import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  BookOpen,
  GraduationCap,
  Clock,
  Users,
  Star,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { courses } from "../lib/dummyData";
import { levels } from "../lib/constants";

function Course() {
  TabTitle("SahamPedia | Course");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Semua");

  // Filter courses based on search term and selected level
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      selectedLevel === "Semua" || course.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <div className="relative overflow-hidden py-16 sm:py-24 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 mb-8 px-6 md:px-12">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg
                className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4"
                width="500"
                height="500"
                fill="none"
                viewBox="0 0 500 500"
              >
                <circle
                  cx="250"
                  cy="250"
                  r="200"
                  strokeWidth="2"
                  className="text-white/30"
                  stroke="currentColor"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="150"
                  strokeWidth="2"
                  className="text-white/30"
                  stroke="currentColor"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="100"
                  strokeWidth="2"
                  className="text-white/30"
                  stroke="currentColor"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="50"
                  strokeWidth="2"
                  className="text-white/30"
                  stroke="currentColor"
                />
              </svg>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                  Platform Kursus
                </span>{" "}
                SahamPedia
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Tingkatkan pengetahuan dan keterampilan investasi Anda melalui
                kursus-kursus terkurasi dan belajar langsung dari para ahli.
              </p>

              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Cari kursus, topik, atau pengajar..."
                  className="w-full py-6 pl-12 pr-4 rounded-full border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white shadow-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {levels.map((level) => (
              <Button
                key={level}
                onClick={() => setSelectedLevel(level)}
                variant={selectedLevel === level ? "default" : "outline"}
                className={
                  selectedLevel === level
                    ? "bg-blue-600 dark:bg-blue-700 text-white"
                    : "bg-transparent text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                }
              >
                {level}
              </Button>
            ))}
          </div>
        </section>

        <section>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <Card
                key={course.id}
                className={`group relative overflow-hidden bg-white/90 dark:bg-gray-900/80 hover:shadow-xl border transition-all duration-300 dark:border-gray-800 animate-fade-in [animation-delay:var(--delay)]`}
                style={{ "--delay": `${0.1 * index}s` }}
              >
                {course.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium rounded-full z-10">
                    Featured
                  </div>
                )}

                <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10"></div>

                <CardHeader className="flex flex-row items-center gap-4 pb-0">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${
                      course.level === "Pemula"
                        ? "from-blue-500 to-cyan-500"
                        : course.level === "Menengah"
                        ? "from-purple-500 to-pink-500"
                        : "from-green-500 to-teal-500"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <course.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <span>{course.teacher}</span>
                      <span className="text-xs">•</span>
                      <span className="text-sm flex items-center">
                        <Star className="w-3.5 h-3.5 text-yellow-500 mr-0.5" />
                        {course.rating}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-800 dark:text-gray-300">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} Pelajaran
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()} Siswa
                    </span>
                  </div>
                  <Button className="w-full group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 border-0 text-white shadow-md hover:shadow-lg transition-all duration-200">
                    Mulai Kursus
                    <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-800 dark:text-gray-200 mb-2">
                Tidak ada kursus yang ditemukan
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Silakan coba dengan kata kunci atau filter yang berbeda
              </p>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-20 mb-10 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-blue-950"></div>

          <div className="relative py-16 px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Dapatkan Pembaruan Kursus
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Berlangganan newsletter kami untuk mendapatkan informasi kursus
                baru dan materi eksklusif.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  className="py-6 px-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
                <Button className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white">
                  Berlangganan
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Course;
