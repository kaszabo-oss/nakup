import { ShoppingCart, LogOut, Users } from 'lucide-react'

export default function Header({ items, categories, displayName, groupName, onLogout }) {
  const totalActive = items.filter(i => !i.completed).length
  const totalAll = items.length
  const completedPct =
    totalAll > 0 ? Math.round(((totalAll - totalActive) / totalAll) * 100) : 0

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white px-6 pt-10 pb-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-12 -translate-x-8 pointer-events-none" />
      <div className="absolute top-1/2 right-8 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-2xl">
            <ShoppingCart size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight leading-none">Nákupný Zoznam</h1>
            {groupName && (
              <div className="flex items-center gap-1 mt-0.5">
                <Users size={11} className="text-indigo-300" />
                <p className="text-indigo-300 text-xs truncate max-w-[160px]">{groupName}</p>
              </div>
            )}
          </div>
          {displayName && (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-white text-xs font-semibold leading-tight">{displayName}</p>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 text-indigo-300 hover:text-white text-xs transition mt-0.5"
                >
                  <LogOut size={11} />
                  Odhlásiť
                </button>
              </div>
              <div className="bg-white/20 backdrop-blur-sm w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-stretch gap-3">
          <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3">
            <p className="text-xs text-indigo-300 mb-1 uppercase tracking-wider font-medium">Na nakúpenie</p>
            <p className="text-3xl font-bold leading-none">{totalActive}</p>
          </div>
          <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3">
            <p className="text-xs text-indigo-300 mb-1 uppercase tracking-wider font-medium">Celkom</p>
            <p className="text-3xl font-bold leading-none">{totalAll}</p>
          </div>
          <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3">
            <p className="text-xs text-indigo-300 mb-1 uppercase tracking-wider font-medium">Hotovo</p>
            <p className="text-3xl font-bold leading-none">{completedPct}%</p>
          </div>
        </div>
      </div>
    </header>
  )
}
