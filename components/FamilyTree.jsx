"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

export default function FamilyTree({ members, onEdit, onDelete }) {
  const { t } = useLanguage()

  const getMemberById = (id) => members.find((m) => m.id === id)

  const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString()
  }

  const getAge = (birthDate, deathDate) => {
    if (!birthDate) return ""
    const birth = new Date(birthDate)
    const end = deathDate ? new Date(deathDate) : new Date()
    const age = end.getFullYear() - birth.getFullYear()
    return age > 0 ? `${age} yosh` : ""
  }

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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-600"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ${
                    member.image
                      ? ""
                      : member.gender === "male"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-pink-100 dark:bg-pink-900/30"
                  }`}
                >
                  {member.image ? (
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className={`w-6 h-6 ${
                        member.gender === "male"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-pink-600 dark:text-pink-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {member.gender === "male" ? t("male") : t("female")}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(member)}
                  className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
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
                  className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
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

            <div className="space-y-2 text-sm">
              {member.birthDate && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t("birthDate")}:</span>
                  <span className="text-slate-800 dark:text-white">{formatDate(member.birthDate)}</span>
                </div>
              )}

              {member.deathDate && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t("deathDate")}:</span>
                  <span className="text-slate-800 dark:text-white">{formatDate(member.deathDate)}</span>
                </div>
              )}

              {member.birthDate && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Yosh:</span>
                  <span className="text-slate-800 dark:text-white">{getAge(member.birthDate, member.deathDate)}</span>
                </div>
              )}

              {member.fatherId && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t("father")}:</span>
                  <span className="text-slate-800 dark:text-white">{getMemberById(member.fatherId)?.name}</span>
                </div>
              )}

              {member.motherId && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t("mother")}:</span>
                  <span className="text-slate-800 dark:text-white">{getMemberById(member.motherId)?.name}</span>
                </div>
              )}

              {member.spouseId && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{t("spouse")}:</span>
                  <span className="text-slate-800 dark:text-white">{getMemberById(member.spouseId)?.name}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
