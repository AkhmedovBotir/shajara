"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import Navbar from "../../components/Navbar"
import FamilyTree from "../../components/FamilyTree"
import FamilyMemberForm from "../../components/FamilyMemberForm"
import ViewSwitcher from "../../components/ViewSwitcher"
import HorizontalTreeView from "../../components/HorizontalTreeView"
import VerticalTreeView from "../../components/VerticalTreeView"
import CircularTreeView from "../../components/CircularTreeView"
import OrgChartTreeView from "../../components/OrgChartTreeView"
import TableView from "../../components/TableView"
import TimelineView from "../../components/TimelineView"
import GridView from "../../components/GridView"
import GalleryView from "../../components/GalleryView"
import NetworkView from "../../components/NetworkView"
import TreeViewSwitcher from "../../components/TreeViewSwitcher"

export default function Shajara() {
  const [user, setUser] = useState(null)
  const [members, setMembers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [notification, setNotification] = useState("")
  const router = useRouter()
  const { t } = useLanguage()
  const [currentView, setCurrentView] = useState("cards")
  const [currentTreeView, setCurrentTreeView] = useState("horizontal")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/")
    }

    // Load family members from localStorage
    const savedMembers = localStorage.getItem("familyMembers")
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("familyMembers")
    router.push("/")
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(""), 3000)
  }

  const handleSaveMember = (memberData) => {
    let updatedMembers
    if (editingMember) {
      // Update existing member
      updatedMembers = members.map((m) => (m.id === memberData.id ? memberData : m))
      showNotification(t("memberUpdated"))
    } else {
      // Add new member
      updatedMembers = [...members, memberData]
      showNotification(t("memberAdded"))
    }

    setMembers(updatedMembers)
    localStorage.setItem("familyMembers", JSON.stringify(updatedMembers))
    setShowForm(false)
    setEditingMember(null)
  }

  const handleEditMember = (member) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleDeleteMember = (member) => {
    if (window.confirm(t("confirmDelete"))) {
      const updatedMembers = members.filter((m) => m.id !== member.id)
      setMembers(updatedMembers)
      localStorage.setItem("familyMembers", JSON.stringify(updatedMembers))
      showNotification(t("memberDeleted"))
    }
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingMember(null)
  }

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  const handleTreeViewChange = (treeView) => {
    setCurrentTreeView(treeView)
  }

  const renderCurrentView = () => {
    const commonProps = { members, onEdit: handleEditMember, onDelete: handleDeleteMember }

    switch (currentView) {
      case "cards":
        return <FamilyTree {...commonProps} />
      case "tree":
        switch (currentTreeView) {
          case "horizontal":
            return <HorizontalTreeView {...commonProps} />
          case "vertical":
            return <VerticalTreeView {...commonProps} />
          case "circular":
            return <CircularTreeView {...commonProps} />
          case "orgchart":
            return <OrgChartTreeView {...commonProps} />
          default:
            return <HorizontalTreeView {...commonProps} />
        }
      case "table":
        return <TableView {...commonProps} />
      case "timeline":
        return <TimelineView {...commonProps} />
      case "grid":
        return <GridView {...commonProps} />
      case "gallery":
        return <GalleryView {...commonProps} />
      case "network":
        return <NetworkView {...commonProps} />
      default:
        return <FamilyTree {...commonProps} />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Navbar user={user} onLogout={handleLogout} />

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg z-40"
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{t("familyTree")}</h1>
                <p className="text-slate-600 dark:text-slate-400">{members.length} ta a'zo</p>
              </div>
              <button
                onClick={handleAddMember}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 self-start lg:self-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>{t("addMember")}</span>
              </button>
            </div>

            {/* View Switchers */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <ViewSwitcher currentView={currentView} onViewChange={handleViewChange} />
              {currentView === "tree" && (
                <TreeViewSwitcher currentTreeView={currentTreeView} onTreeViewChange={handleTreeViewChange} />
              )}
            </div>
          </div>

          {/* Family Tree */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
          >
            {renderCurrentView()}
          </motion.div>
        </motion.div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <FamilyMemberForm
            member={editingMember}
            members={members}
            onSave={handleSaveMember}
            onCancel={handleCancelForm}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
