"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

export default function VerticalTreeView({ members, onEdit, onDelete }) {
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: level * 0.1 }}
        className="flex flex-col items-center"
      >
        {/* Member and Spouse Row */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Main Member */}
          <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-3 border-2 border-emerald-200 dark:border-emerald-700 min-w-[160px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center ${
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
                      className={`w-3 h-3 ${
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
                  <h3 className="font-semibold text-slate-800 dark:text-white text-xs">{member.name}</h3>
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

          {/* Marriage Connection */}
          {spouse && (
            <>
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-red-400"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-0.5 h-4 bg-red-400"></div>
              </div>

              {/* Spouse */}
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-3 border-2 border-pink-200 dark:border-pink-700 min-w-[160px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center ${
                        spouse.image
                          ? ""
                          : spouse.gender === "male"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : "bg-pink-100 dark:bg-pink-900/30"
                      }`}
                    >
                      {spouse.image ? (
                        <img
                          src={spouse.image || "/placeholder.svg"}
                          alt={spouse.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className={`w-3 h-3 ${
                            spouse.gender === "male"
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
                      <h3 className="font-semibold text-slate-800 dark:text-white text-xs">{spouse.name}</h3>
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
          <div className="relative">
            {/* Vertical line down */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-slate-300 dark:bg-slate-600"></div>

            {/* Horizontal line for multiple children */}
            {children.length > 1 && (
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
            )}

            <div className="pt-8 flex justify-center space-x-8">
              {children.map((child, index) => (
                <div key={child.id} className="relative">
                  {/* Vertical connector to child */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-slate-300 dark:bg-slate-600"></div>
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
    <div className="overflow-auto">
      <div className="min-w-max p-8">
        <div className="flex justify-center space-x-16">
          {rootMembers.map((member) => (
            <MemberNode key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}
