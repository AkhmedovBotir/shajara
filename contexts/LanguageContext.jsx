"use client"

import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

const translations = {
  uz: {
    // Navigation
    familyTree: "Oila Shajarasi",
    welcome: "Xush kelibsiz",
    logout: "Chiqish",

    // Family Tree
    addMember: "A'zo qo'shish",
    editMember: "A'zoni tahrirlash",
    deleteMember: "A'zoni o'chirish",
    noMembers: "Hozircha oila a'zolari yo'q",
    startBuilding: "Shajara qurish",

    // Form
    name: "Ism",
    birthDate: "Tug'ilgan sana",
    deathDate: "Vafot etgan sana",
    gender: "Jins",
    male: "Erkak",
    female: "Ayol",
    father: "Ota",
    mother: "Ona",
    spouse: "Turmush o'rtog'i",
    selectFather: "Otani tanlang",
    selectMother: "Onani tanlang",
    selectSpouse: "Turmush o'rtog'ini tanlang",
    none: "Yo'q",
    save: "Saqlash",
    cancel: "Bekor qilish",
    photo: "Rasm",
    selectPhoto: "Rasm tanlash",
    remove: "O'chirish",

    // Messages
    memberAdded: "A'zo muvaffaqiyatli qo'shildi",
    memberUpdated: "A'zo ma'lumotlari yangilandi",
    memberDeleted: "A'zo o'chirildi",
    confirmDelete: "Rostdan ham bu a'zoni o'chirmoqchimisiz?",

    // Profile
    profileInfo: "Profil ma'lumotlari",
    email: "Email",

    // Views
    cardView: "Kartochka",
    treeView: "Daraxt",
    tableView: "Jadval",
    timelineView: "Vaqt chizig'i",
    gridView: "To'r",
    galleryView: "Galereya",
    networkView: "Tarmoq",

    // Tree Views
    horizontalTree: "Gorizontal",
    verticalTree: "Vertikal",
    circularTree: "Doira",
    orgChartTree: "Tashkilot",
  },
  en: {
    // Navigation
    familyTree: "Family Tree",
    welcome: "Welcome",
    logout: "Logout",

    // Family Tree
    addMember: "Add Member",
    editMember: "Edit Member",
    deleteMember: "Delete Member",
    noMembers: "No family members yet",
    startBuilding: "Start Building",

    // Form
    name: "Name",
    birthDate: "Birth Date",
    deathDate: "Death Date",
    gender: "Gender",
    male: "Male",
    female: "Female",
    father: "Father",
    mother: "Mother",
    spouse: "Spouse",
    selectFather: "Select Father",
    selectMother: "Select Mother",
    selectSpouse: "Select Spouse",
    none: "None",
    save: "Save",
    cancel: "Cancel",
    photo: "Photo",
    selectPhoto: "Select Photo",
    remove: "Remove",

    // Messages
    memberAdded: "Member added successfully",
    memberUpdated: "Member updated successfully",
    memberDeleted: "Member deleted",
    confirmDelete: "Are you sure you want to delete this member?",

    // Profile
    profileInfo: "Profile Information",
    email: "Email",

    // Views
    cardView: "Cards",
    treeView: "Tree",
    tableView: "Table",
    timelineView: "Timeline",
    gridView: "Grid",
    galleryView: "Gallery",
    networkView: "Network",

    // Tree Views
    horizontalTree: "Horizontal",
    verticalTree: "Vertical",
    circularTree: "Circular",
    orgChartTree: "Org Chart",
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("uz")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(language === "uz" ? "en" : "uz")
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
