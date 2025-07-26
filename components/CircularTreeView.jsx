"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { useMemo } from "react"

export default function CircularTreeView({ members, onEdit, onDelete }) {
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

  // Calculate positions for circular layout
  const calculatePositions = useMemo(() => {
    if (members.length === 0) return []

    const positions = []
    const centerX = 400 // Relative to viewBox
    const centerY = 400 // Relative to viewBox
    const baseRadius = 120

    const processLevel = (memberIds, level, startAngle = 0, angleSpan = 2 * Math.PI) => {
      const radius = baseRadius + level * 100
      const angleStep = angleSpan / Math.max(memberIds.length, 1)

      memberIds.forEach((memberId, index) => {
        const angle = startAngle + index * angleStep
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        positions.push({
          id: memberId,
          x,
          y,
          level,
          angle,
        })

        // Process children
        const children = getChildren(memberId)
        if (children.length > 0) {
          const childStartAngle = angle - angleStep / 2
          const childAngleSpan = angleStep
          processLevel(
            children.map((c) => c.id),
            level + 1,
            childStartAngle,
            childAngleSpan,
          )
        }
      })
    }

    const rootMembers = getRootMembers()
    if (rootMembers.length > 0) {
      // Place root members in center or first circle
      if (rootMembers.length === 1) {
        positions.push({
          id: rootMembers[0].id,
          x: centerX,
          y: centerY,
          level: 0,
          angle: 0,
        })

        const children = getChildren(rootMembers[0].id)
        if (children.length > 0) {
          processLevel(
            children.map((c) => c.id),
            1,
          )
        }
      } else {
        processLevel(
          rootMembers.map((m) => m.id),
          0,
        )
      }
    }

    return positions
  }, [members])

  const getPositionById = (id) => {
    return calculatePositions.find((pos) => pos.id === id)
  }

  const MemberCard = ({ member, position }) => {
    const spouse = getSpouse(member.id)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: position.level * 0.2 }}
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <div className="flex items-center space-x-2">
          {/* Main Member */}
          <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-2 border-2 border-emerald-200 dark:border-emerald-700 min-w-[120px]">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-1">
                <div
                  className={`w-5 h-5 rounded-full overflow-hidden flex items-center justify-center ${
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
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => onEdit(member)}
                  className="p-0.5 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="p-0.5 text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Spouse */}
          {spouse && (
            <>
              <div className="w-1 h-1 bg-red-400 rounded-full"></div>
              <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-2 border-2 border-pink-200 dark:border-pink-700 min-w-[120px]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1">
                    <div
                      className={`w-5 h-5 rounded-full overflow-hidden flex items-center justify-center ${
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
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => onEdit(spouse)}
                      className="p-0.5 text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className="p-0.5 text-red-600 hover:text-red-800 dark:text-red-400"
                    >
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </motion.div>
    )
  }

  // Connection lines
  const ConnectionLines = () => {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800">
        {members.map((member) => {
          const children = getChildren(member.id)
          const memberPos = getPositionById(member.id)

          if (!memberPos || children.length === 0) return null

          return children.map((child) => {
            const childPos = getPositionById(child.id)
            if (!childPos) return null

            return (
              <motion.line
                key={`${member.id}-${child.id}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: memberPos.level * 0.2 + 0.5, duration: 0.5 }}
                x1={memberPos.x}
                y1={memberPos.y}
                x2={childPos.x}
                y2={childPos.y}
                stroke="rgb(148 163 184)"
                strokeWidth="2"
                className="dark:stroke-slate-600"
              />
            )
          })
        })}
      </svg>
    )
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
              <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
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
      <div className="relative w-full h-[800px] max-w-[800px] mx-auto">
        {" "}
        {/* Added max-w and h for better scaling */}
        <ConnectionLines />
        {members.map((member) => {
          const position = getPositionById(member.id)
          if (!position) return null

          return <MemberCard key={member.id} member={member} position={position} />
        })}
      </div>
    </div>
  )
}
