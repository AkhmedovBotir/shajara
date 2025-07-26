"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

export default function GalleryView({ members, onEdit, onDelete }) {
  const { t } = useLanguage()

  const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).getFullYear()
  }

  // Filter members with images first
  const membersWithImages = members.filter((m) => m.image)
  const membersWithoutImages = members.filter((m) => !m.image)
  const sortedMembers = [...membersWithImages, ...membersWithoutImages]

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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
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
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {sortedMembers.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="break-inside-avoid bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-600 hover:shadow-lg transition-shadow duration-200"
        >
          {/* Image */}
          <div className="relative">
            <div className="w-full h-64 bg-slate-100 dark:bg-slate-600">
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
                    className={`w-16 h-16 ${
                      member.gender === "male" ? "text-blue-600 dark:text-blue-400" : "text-pink-600 dark:text-pink-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Actions overlay */}
            <div className="absolute top-2 right-2 flex space-x-1">
              <button
                onClick={() => onEdit(member)}
                className="p-2 bg-white/80 dark:bg-slate-800/80 text-blue-600 hover:text-blue-800 dark:text-blue-400 rounded-full shadow-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
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
                className="p-2 bg-white/80 dark:bg-slate-800/80 text-red-600 hover:text-red-800 dark:text-red-400 rounded-full shadow-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
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

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-slate-800 dark:text-white text-lg mb-2">{member.name}</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">{t("gender")}:</span>
                <span className="text-slate-800 dark:text-white">
                  {member.gender === "male" ? t("male") : t("female")}
                </span>
              </div>
              {member.birthDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{t("birthDate")}:</span>
                  <span className="text-slate-800 dark:text-white">{formatDate(member.birthDate)}</span>
                </div>
              )}
              {member.deathDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{t("deathDate")}:</span>
                  <span className="text-slate-800 dark:text-white">{formatDate(member.deathDate)}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
