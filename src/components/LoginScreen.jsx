import { useState } from 'react'
import { ShoppingCart, Users, User, LogIn, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginScreen() {
  const { login } = useAuth()
  const [groupName, setGroupName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!groupName.trim()) {
      setError('Zadaj názov skupiny.')
      return
    }
    if (!displayName.trim()) {
      setError('Zadaj svoje meno.')
      return
    }
    if (groupName.trim().length < 3) {
      setError('Názov skupiny musí mať aspoň 3 znaky.')
      return
    }
    setError('')
    login({ groupName, displayName })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo card */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-8 mb-6 text-white text-center shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/5 rounded-full translate-y-12 -translate-x-6 pointer-events-none" />
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={30} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Nákupný Zoznam</h1>
            <p className="text-indigo-300 text-sm mt-1">zdieľaný pre celú rodinu</p>
          </div>
        </div>

        {/* Login form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/60 border border-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-indigo-100 p-2 rounded-xl">
              <Users size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 leading-tight">Pripojiť sa k rodine</h2>
              <p className="text-slate-500 text-xs">Rovnaký kód zdieľajte so všetkými</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                Kód skupiny / rodiny
              </label>
              <div className="relative">
                <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                  placeholder="napr. rodina-novakova"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-slate-400"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <p className="text-slate-400 text-xs mt-1.5 ml-1">
                Všetci členovia rodiny zadávajú rovnaký kód.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                Tvoje meno
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="napr. Mama, Tato, Jana…"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-slate-400"
                  autoComplete="given-name"
                />
              </div>
            </div>

            {error && (
              <p className="text-rose-500 text-sm bg-rose-50 border border-rose-200 rounded-2xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-95"
            >
              <LogIn size={18} />
              Vstúpiť do zoznamu
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-xs mt-4">
          Zoznam je zdieľaný cez rovnaký kód skupiny.<br />Žiadne heslo nie je potrebné.
        </p>
      </div>
    </div>
  )
}
