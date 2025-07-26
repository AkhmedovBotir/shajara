"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

export default function VisualTreeView({ members, onEdit, onDelete }) {
  const { t } = useLanguage()

  const getMemberById = (id) => members.find((m) => m.id === id)

  // Find root members (those without parents)
  const getRootMembers = () => {
    return members.filter((member) => !member.fatherId && !member.motherId)
  }

  // Get children of a member
  const getChildren = (memberId) => {
    return members.filter((member) => member.fatherId === memberId || member.motherId === memberId)
  }

  // Get spouse of a member
  const getSpouse = (memberId) => {
    const member = getMemberById(memberId)
    return member?.spouseId ? getMemberById(member.spouseId) : null
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).getFullYear()
  }

  const MemberNode = ({ member, level = 0 }) => {
    const spouse = getSpouse(member.id)
    const children = getChildren(member.id)

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: level * 0.1 }}
        className="relative"
      >
        {/* Member and Spouse Container */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Main Member */}
          <div className="relative">
            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-4 border-2 border-emerald-200 dark:border-emerald-700 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      member.gender === "male" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-pink-100 dark:bg-pink-900/30"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        member.gender === "male"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-pink-600 dark:text-pink-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {member.gender === "male" ? (
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                      ) : (
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white text-sm">{member.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(member.birthDate)}
                      {member.deathDate && ` - ${formatDate(member.deathDate)}`}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => onEdit(member)}
                    className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>
          </div>

          {/* Marriage Connection */}
          {spouse && (
            <>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-red-400"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-8 h-0.5 bg-red-400"></div>
              </div>

              {/* Spouse */}
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-4 border-2 border-pink-200 dark:border-pink-700 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        spouse.gender === "male" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-pink-100 dark:bg-pink-900/30"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 ${
                          spouse.gender === "male"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-pink-600 dark:text-pink-400"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white text-sm">{spouse.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(spouse.birthDate)}
                        {spouse.deathDate && ` - ${formatDate(spouse.deathDate)}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => onEdit(spouse)}
                      className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(spouse)}
                      className="p-1 text-red-600 hover:text-red-800 dark:text-red-400"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              </div>
            </>
          )}
        </div>

        {/* Children */}
        {children.length > 0 && (
          <div className="ml-8 relative">
            {/* Vertical line from parent */}
            <div className="absolute -top-6 left-0 w-0.5 h-6 bg-slate-300 dark:bg-slate-600"></div>

            {/* Horizontal line */}
            <div className="absolute top-0 left-0 w-8 h-0.5 bg-slate-300 dark:bg-slate-600"></div>

            <div className="space-y-8">
              {children.map((child, index) => (
                <div key={child.id} className="relative">
                  {/* Vertical connector */}
                  {index > 0 && (
                    <div className="absolute -top-4 -left-8 w-0.5 h-4 bg-slate-300 dark:bg-slate-600"></div>
                  )}
                  <MemberNode member={child} level={level + 1} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  const rootMembers = getRootMembers()

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
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
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
    <div className="overflow-x-auto">
      <div className="min-w-max p-8">
        <div className="space-y-12">
          {rootMembers.map((member) => (
            <MemberNode key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}
