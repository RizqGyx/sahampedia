import React from "react";

const CourseContent = ({ content }) => {
  return (
    <div className="space-y-6">
      {content.map((item, index) => {
        if (item.type === "text") {
          return (
            <div key={index} className="prose max-w-none">
              {item.value.split("\n\n").map((paragraph, pIndex) => (
                <p
                  key={`p-${index}-${pIndex}`}
                  className="mb-4 dark:text-white text-gray-900 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          );
        } else if (item.type === "video") {
          return (
            <div
              key={index}
              className="my-8 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative w-full pb-[56.25%] bg-gray-100">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${item.youtubeId}`}
                  title={item.title || "YouTube Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.title || "Video"}
                </h3>
              </div>
            </div>
          );
        } else if (item.type === "conclusion") {
          return (
            <div
              key={index}
              className="border-l-4 border-primary pl-4 italic text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 p-4 rounded-md shadow-sm"
            >
              {item.value}
            </div>
          );
        } else if (item.type === "image") {
          return (
            <div
              key={index}
              className="my-6 rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800"
            >
              <img
                src={item.src}
                alt={item.alt || "Course Image"}
                className="w-1/2 mx-auto h-auto object-cover"
              />
              {item.caption && (
                <div className="p-4 text-sm text-center text-gray-600 dark:text-gray-300 italic">
                  {item.caption}
                </div>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CourseContent;
