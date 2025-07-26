"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { useMemo } from "react"

export default function NetworkView({ members, onEdit, onDelete }) {
  const { t } = useLanguage()

  const getMemberById = (id) => members.find((m) => m.id === id)

  // Calculate network positions
  const networkData = useMemo(() => {
    if (members.length === 0) return { nodes: [], connections: [] }

    const nodes = []
    const connections = []
    const viewBoxWidth = 800 // Fixed viewBox width
    const viewBoxHeight = 600 // Fixed viewBox height
    const centerX = viewBoxWidth / 2
    const centerY = viewBoxHeight / 2

    // Create nodes with positions
    members.forEach((member, index) => {
      const angle = (index / members.length) * 2 * Math.PI
      const radius = Math.min(200 + members.length * 5, 300) // Max radius adjusted for viewBox
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      nodes.push({
        ...member,
        x,
        y,
      })

      // Create connections
      if (member.fatherId) {
        connections.push({
          from: member.id,
          to: member.fatherId,
          type: "parent",
        })
      }
      if (member.motherId) {
        connections.push({
          from: member.id,
          to: member.motherId,
          type: "parent",
        })
      }
      if (member.spouseId) {
        connections.push({
          from: member.id,
          to: member.spouseId,
          type: "spouse",
        })
      }
    })

    return { nodes, connections, viewBoxWidth, viewBoxHeight }
  }, [members])

  const getNodeById = (id) => networkData.nodes.find((n) => n.id === id)

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
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
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
    <div className="relative w-full h-[600px] max-w-[800px] mx-auto overflow-hidden">
      {" "}
      {/* Added max-w for better scaling */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${networkData.viewBoxWidth} ${networkData.viewBoxHeight}`}
      >
        {/* Connections */}
        {networkData.connections.map((connection, index) => {
          const fromNode = getNodeById(connection.from)
          const toNode = getNodeById(connection.to)

          if (!fromNode || !toNode) return null

          return (
            <motion.line
              key={`${connection.from}-${connection.to}-${index}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={connection.type === "spouse" ? "#ef4444" : "#64748b"}
              strokeWidth={connection.type === "spouse" ? "3" : "2"}
              className="dark:stroke-slate-600"
            />
          )
        })}
      </svg>
      {/* Nodes */}
      {networkData.nodes.map((node, index) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{
            left: node.x,
            top: node.y,
          }}
        >
          <div className="relative">
            {/* Node circle */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white dark:bg-slate-700 border-4 border-emerald-300 dark:border-emerald-600 shadow-lg group-hover:border-emerald-500 transition-colors">
              {node.image ? (
                <img src={node.image || "/placeholder.svg"} alt={node.name} className="w-full h-full object-cover" />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    node.gender === "male" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-pink-100 dark:bg-pink-900/30"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 ${
                      node.gender === "male" ? "text-blue-600 dark:text-blue-400" : "text-pink-600 dark:text-pink-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Name label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-md border border-slate-200 dark:border-slate-600 whitespace-nowrap">
              <span className="text-xs font-medium text-slate-800 dark:text-white">{node.name}</span>
            </div>

            {/* Actions (visible on hover) */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              <button
                onClick={() => onEdit(node)}
                className="p-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
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
                onClick={() => onDelete(node)}
                className="p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
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
        </motion.div>
      ))}
    </div>
  )
}
