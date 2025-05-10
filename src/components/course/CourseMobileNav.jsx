import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const CourseMobileNav = ({
  title,
  modules,
  currentModule,
  currentLesson,
  activeModule,
  activeLesson,
  onSelectModule,
}) => {
  return (
    <div className="sticky lg:hidden top-16 z-30 -mx-4 px-4 py-3 transition-all duration-200 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 rounded-b-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentModule}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentLesson}
            </p>
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden cursor-pointer p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:outline-none">
              <Menu className="h-6 w-6 " />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[300px] border-r lg:hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 [&>button:last-of-type]:hidden"
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
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400">
                {title}
              </span>
            </SheetTitle>
            <div className="flex flex-col space-y-4 mt-6">
              <Accordion
                type="multiple"
                defaultValue={[`module-${activeModule}`]}
                className="w-full"
              >
                {modules.map((module, moduleIndex) => (
                  <AccordionItem
                    key={module.id}
                    value={`module-${moduleIndex}`}
                  >
                    <AccordionTrigger className="text-left text-white [&>svg]:text-white">
                      {module.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pl-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lesson.id}>
                            <button
                              className={cn(
                                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer hover:bg-slate-100 hover:text-gray-900",
                                moduleIndex === activeModule &&
                                  lessonIndex === activeLesson
                                  ? "bg-slate-200 font-medium text-violet-900"
                                  : "text-white"
                              )}
                              onClick={() =>
                                onSelectModule(moduleIndex, lessonIndex)
                              }
                            >
                              {lesson.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CourseMobileNav;
