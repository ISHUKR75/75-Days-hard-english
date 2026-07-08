import React from "react";
import FadeIn from "@/components/animations/FadeIn";
import SlideIn from "@/components/animations/SlideIn";

export default function DynamicTopicPage({ params }) {
  const { category, topicId } = params;

  return (
    <FadeIn className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <SlideIn direction="up">
          <header className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white capitalize">
              {category.replace("-", " ")}: {topicId.replace("-", " ")}
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Welcome to the dynamic learning engine. Content for this module is loaded automatically from our curriculum database.
            </p>
          </header>
        </SlideIn>

        <SlideIn direction="up" delay={0.2}>
          <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Core Concepts</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                This section will dynamically render the detailed explanations,
                Hindi translations, and professional examples based on the selected topic.
              </p>
            </div>
          </section>
        </SlideIn>
      </div>
    </FadeIn>
  );
}
