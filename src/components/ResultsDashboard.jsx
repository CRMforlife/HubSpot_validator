import { motion } from 'framer-motion';
import { calculateRecommendations } from '../utils/RecommendationEngine';

export default function ResultsDashboard({ answers, onRestart, language, t }) {
    const recommendations = calculateRecommendations(answers, language);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-hubspot-obsidian mb-4">
                    {t.resultsTitle}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {t.resultsDescription}
                </p>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {recommendations.map((rec, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                    >
                        <div className="h-2 bg-hubspot-orange" />
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-hubspot-obsidian">{rec.hub}</h3>
                                <span className="px-3 py-1 bg-orange-50 text-hubspot-orange text-xs font-bold uppercase rounded-full tracking-wide">
                                    {rec.tier}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm mb-6 flex-grow">
                                {t.recommended} {rec.reason}
                            </p>

                            <div className="space-y-3">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t.keyFeatures}</h4>
                                <ul className="space-y-2">
                                    {rec.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-sm text-gray-700">
                                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
                            <a
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-2 text-center text-hubspot-orange font-medium text-sm hover:text-orange-600 transition-colors"
                            >
                                {t.viewPricing} →
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="mt-16 text-center">
                <button
                    onClick={onRestart}
                    className="px-8 py-3 bg-white border border-gray-300 text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm"
                >
                    {t.startOver}
                </button>
            </div>
        </div>
    );
}
