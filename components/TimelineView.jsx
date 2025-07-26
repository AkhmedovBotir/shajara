"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

export default function TimelineView({ members, onEdit, onDelete }) {
  const { t } = useLanguage()

  const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString()
  }

  const getYear = (dateString) => {
    if (!dateString) return 0
    return new Date(dateString).getFullYear()
  }

  // Sort members by birth date
  const sortedMembers = [...members].sort((a, b) => {
    const yearA = getYear(a.birthDate) || 9999
    const yearB = getYear(b.birthDate) || 9999
    return yearA - yearB
  })

  if (members.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-emerald-600 dark:text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">{t("noMembers")}</h3>
          <p className="text-slate-600 dark:text-slate-400">{t("startBuilding")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-300 dark:bg-emerald-700"></div>

      <div className="space-y-8">
        {sortedMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center"
          >
            {/* Timeline dot */}
            <div className="absolute left-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-800 z-10"></div>

            {/* Content */}
            <div className="ml-16 bg-white dark:bg-slate-700 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-600 flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Image */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-600 flex-shrink-0">
                  {member.image ? (
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center ${
                        member.gender === "male" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-pink-100 dark:bg-pink-900/30"
                      }`}
                    >
                      <svg
                        className={`w-8 h-8 ${
                          member.gender === "male"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-pink-600 dark:text-pink-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{member.name}</h3>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => onEdit(member)}
                        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(member)}
                        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">{t("birthDate")}:</span>
                      <span className="ml-2 text-slate-800 dark:text-white">{formatDate(member.birthDate) || "-"}</span>
                    </div>
                    {member.deathDate && (
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">{t("deathDate")}:</span>
                        <span className="ml-2 text-slate-800 dark:text-white">{formatDate(member.deathDate)}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">{t("gender")}:</span>
                      <span className="ml-2 text-slate-800 dark:text-white">
                        {member.gender === "male" ? t("male") : t("female")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
