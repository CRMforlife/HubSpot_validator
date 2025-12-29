import { useState } from 'react';
import { questions } from '../data/questions';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Questionnaire({ onComplete, language, t }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [direction, setDirection] = useState(0);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (option) => {
        if (currentQuestion.multiSelect) {
            const currentAnswer = answers[currentQuestion.id] || [];
            const isSelected = currentAnswer.some((a) => a.id === option.id);

            let newAnswer;
            if (isSelected) {
                newAnswer = currentAnswer.filter((a) => a.id !== option.id);
            } else {
                newAnswer = [...currentAnswer, option];
            }

            setAnswers({ ...answers, [currentQuestion.id]: newAnswer });
        } else {
            const newAnswers = { ...answers, [currentQuestion.id]: option };
            setAnswers(newAnswers);

            if (isLastQuestion) {
                onComplete(newAnswers);
            } else {
                setDirection(1);
                setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 300);
            }
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            onComplete(answers);
        } else {
            setDirection(1);
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setDirection(-1);
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-hubspot-orange transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-right">
                    {t.step} {currentQuestionIndex + 1} {t.of} {questions.length}
                </p>
            </div>

            <div className="relative overflow-hidden min-h-[400px]">
                <AnimatePresence initial={false} custom={direction} mode='wait'>
                    <motion.div
                        key={currentQuestionIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="w-full"
                    >
                        <h2 className="text-3xl font-bold text-hubspot-obsidian mb-8 leading-tight">
                            {currentQuestion.text[language]}
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option)}
                                    className={cn(
                                        "group relative p-6 text-left rounded-xl bg-white border-2 transition-all duration-200 hover:shadow-lg",
                                        (currentQuestion.multiSelect
                                            ? (answers[currentQuestion.id] || []).some(a => a.id === option.id)
                                            : answers[currentQuestion.id]?.id === option.id)
                                            ? "border-hubspot-orange bg-orange-50/10"
                                            : "border-gray-100 hover:border-hubspot-orange/50"
                                    )}
                                >
                                    <span className="block text-lg font-medium text-hubspot-obsidian group-hover:text-hubspot-orange transition-colors">
                                        {option.label[language]}
                                    </span>
                                    {option.description && (
                                        <span className="block text-sm text-gray-500 mt-1">
                                            {option.description[language]}
                                        </span>
                                    )}

                                    <div className={cn(
                                        "absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                        (currentQuestion.multiSelect
                                            ? (answers[currentQuestion.id] || []).some(a => a.id === option.id)
                                            : answers[currentQuestion.id]?.id === option.id)
                                            ? "border-hubspot-orange bg-hubspot-orange"
                                            : "border-gray-200 group-hover:border-hubspot-orange"
                                    )}>
                                        {(currentQuestion.multiSelect
                                            ? (answers[currentQuestion.id] || []).some(a => a.id === option.id)
                                            : answers[currentQuestion.id]?.id === option.id) && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                            )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className={cn(
                        "px-6 py-2 rounded-lg text-sm font-medium text-gray-500 transition-colors",
                        currentQuestionIndex === 0
                            ? "opacity-0 cursor-default"
                            : "hover:text-hubspot-obsidian hover:bg-gray-100"
                    )}
                >
                    ← {t.back}
                </button>

                {currentQuestion.multiSelect && (
                    <button
                        onClick={handleNext}
                        disabled={!(answers[currentQuestion.id] && answers[currentQuestion.id].length > 0)}
                        className={cn(
                            "px-8 py-2 rounded-full font-medium text-white transition-all transform",
                            (answers[currentQuestion.id] && answers[currentQuestion.id].length > 0)
                                ? "bg-hubspot-orange hover:bg-orange-600 shadow-md translate-y-0 opacity-100"
                                : "bg-gray-300 cursor-not-allowed translate-y-2 opacity-0"
                        )}
                    >
                        {t.continue} →
                    </button>
                )}
            </div>
        </div>
    );
}
