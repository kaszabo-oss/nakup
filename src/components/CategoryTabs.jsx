import { CATEGORY_STYLES } from '../App'

export default function CategoryTabs({ categories, activeCategory, onSelect, items }) {
  return (
    <nav className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide bg-white/70 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
      {categories.map(cat => {
        const pendingCount = items.filter(i => i.category === cat.id && !i.completed).length
        const styles = CATEGORY_STYLES[cat.id]
        const isActive = activeCategory === cat.id

        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
              transition-all duration-200 whitespace-nowrap flex-shrink-0 focus:outline-none
              ${isActive ? styles.tab : styles.inactive}`}
          >
            <span className="text-base leading-none">{cat.emoji}</span>
            <span>{cat.label}</span>
            {pendingCount > 0 && (
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center
                  ${isActive ? 'bg-white/30 text-white' : styles.badge}`}
              >
                {pendingCount}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
