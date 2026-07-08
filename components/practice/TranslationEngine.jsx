"use client";

import React, { useState } from "react";
import { useSound } from "@/hooks/useSound";
import { useProgressStore } from "@/store/useProgressStore";
import { motion, AnimatePresence } from "framer-motion";
import SlideIn from "@/components/animations/SlideIn";

export default function TranslationEngine({ hindi, englishOptions }) {
  const [userInput, setUserInput] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'

  const { playCorrect, playWrong, playCoin } = useSound();
  const { addXP, addCoins, recordAnswer } = useProgressStore();

  const normalizeString = (str) => {
    return str.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
  };

  const handleCheck = () => {
    if (!userInput.trim()) return;

    const normalizedInput = normalizeString(userInput);
    const isCorrect = englishOptions.some(
      (opt) => normalizeString(opt) === normalizedInput
    );

    if (isCorrect) {
      setFeedback("correct");
      playCorrect();
      setTimeout(playCoin, 500); // coin sound slightly after correct
      addXP(10);
      addCoins(5);
      recordAnswer(true);
    } else {
      setFeedback("incorrect");
      playWrong();
      recordAnswer(false);
    }
    
    setIsRevealed(true);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    setFeedback("revealed");
    // If they reveal without trying, it counts as a missed attempt
    if (!feedback) {
      recordAnswer(false);
    }
  };

  return (
    <SlideIn direction="up">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full max-w-2xl mx-auto my-4 transition-all">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
          Translate to English:
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {hindi}
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isRevealed}
            placeholder="Type your English translation here..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:opacity-70 transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isRevealed) handleCheck();
            }}
          />

          <div className="flex gap-4">
            {!isRevealed && (
              <>
                <button
                  onClick={handleCheck}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors w-full sm:w-auto"
                >
                  Check Answer
                </button>
                <button
                  onClick={handleReveal}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-xl transition-colors w-full sm:w-auto"
                >
                  Reveal
                </button>
              </>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 overflow-hidden"
            >
              <div
                className={`p-4 rounded-xl border-2 ${
                  feedback === "correct"
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 text-green-800 dark:text-green-300"
                    : "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-300"
                }`}
              >
                <p className="font-semibold mb-1">
                  {feedback === "correct"
                    ? "🎉 Perfect! +10 XP"
                    : feedback === "incorrect"
                    ? "❌ Not quite right."
                    : "👁️ Answer revealed."}
                </p>
                <p>
                  <span className="opacity-80 text-sm">Correct translation:</span>
                  <br />
                  <span className="font-bold text-lg">{englishOptions[0]}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideIn>
  );
}
