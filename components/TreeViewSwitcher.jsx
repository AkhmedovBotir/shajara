"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

export default function TreeViewSwitcher({ currentTreeView, onTreeViewChange }) {
  const { t } = useLanguage()

  const treeViews = [
    {
      id: "horizontal",
      name: t("horizontalTree") || "Gorizontal",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: "vertical",
      name: t("verticalTree") || "Vertikal",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18" />
        </svg>
      ),
    },
    {
      id: "circular",
      name: t("circularTree") || "Doira",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      id: "orgchart",
      name: t("orgChartTree") || "Tashkilot",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 p-1 rounded-lg border border-emerald-200 dark:border-emerald-700">
      {treeViews.map((view) => (
        <motion.button
          key={view.id}
          onClick={() => onTreeViewChange(view.id)}
          className={`flex items-center space-x-1 px-2 py-1.5 rounded-md transition-all duration-200 text-xs ${
            currentTreeView === view.id
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800/50"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {view.icon}
          <span className="font-medium hidden sm:inline">{view.name}</span>
        </motion.button>
      ))}
    </div>
  )
}
