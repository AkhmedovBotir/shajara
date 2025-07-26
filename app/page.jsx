"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"

// Mock user validation function
const validateUser = (emailOrPhone, password) => {
  // Mock users for demonstration
  const mockUsers = [
    { id: 1, email: "admin@shajara.uz", phone: "+998901234567", password: "123456", name: "Admin User" },
    { id: 2, email: "user@example.com", phone: "+998907654321", password: "password", name: "Test User" },
  ]

  return mockUsers.find(
    (user) => (user.email === emailOrPhone || user.phone === emailOrPhone) && user.password === password,
  )
}

// Subtle background pattern
const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f8f9fa] dark:bg-[#0f172a]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlOWVhZWQiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMjEgMjN2NmgtNnYtNmE1IDUgMCAxIDAgNiAwek0xNSAzYTEwIDEwIDAgMCAxIDAgMjAgMTAgMTAgMCAwIDEgMC0yMHpNNSAxM2E4IDggMCAwIDAgOCA4djFhOSA5IDAgMSAxLTktOXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 dark:opacity-10"></div>
    </div>
  )
}

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!emailOrPhone.trim()) {
      setError("Iltimos, telefon raqam yoki email kiriting")
      return
    }

    if (!password) {
      setError("Iltimos, parolni kiriting")
      return
    }

    try {
      setIsLoading(true)
      setError("")

      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

      const user = validateUser(emailOrPhone, password)

      if (user) {
        // Successfully authenticated
        localStorage.setItem("user", JSON.stringify(user))
        router.push("/shajara")
      } else {
        setError("Noto'g'ri telefon raqam/email yoki parol")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <BackgroundPattern />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative"
      >
        {/* Main Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg p-8 rounded-xl relative overflow-hidden transition-colors duration-300">
          {/* Decorative Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">Shajara.uz</h1>
            <p className="text-slate-500 dark:text-slate-400">Oila shajarangizga xush kelibsiz</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm backdrop-blur-sm">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label
                htmlFor="emailOrPhone"
                className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Telefon raqam yoki Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="emailOrPhone"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition duration-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="example@mail.com yoki +998901234567"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Parol
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition duration-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                  isLoading ? "opacity-80" : "hover:shadow-md hover:shadow-emerald-500/20 hover:-translate-y-0.5"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Kirilmoqda...
                  </>
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">Kirish</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </motion.div>
          </form>

          {/* Demo credentials info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">Demo uchun:</p>
            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <div>Email: admin@shajara.uz</div>
              <div>Parol: 123456</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
