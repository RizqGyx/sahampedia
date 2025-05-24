import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const CourseNavigation = ({
  modules,
  activeModule,
  activeLesson,
  onSelectModule,
}) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={[`module-${activeModule}`]}
      className="w-full"
    >
      {modules.map((module, moduleIndex) => (
        <AccordionItem key={module.module_id} value={`module-${moduleIndex}`}>
          <AccordionTrigger className="text-left text-white [&>svg]:text-white">
            {module.title}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1 pl-2">
              {module.lessons.map((lesson, lessonIndex) => (
                <li key={lesson.lesson_id}>
                  <button
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer hover:bg-slate-100 hover:text-gray-900",
                      moduleIndex === activeModule &&
                        lessonIndex === activeLesson
                        ? "bg-slate-200 font-medium text-violet-900"
                        : "text-white"
                    )}
                    onClick={() => onSelectModule(moduleIndex, lessonIndex)}
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
  );
};

export default CourseNavigation;
