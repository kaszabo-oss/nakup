import { useState, useRef } from 'react'
import { Plus } from 'lucide-react'
import { CATEGORY_STYLES } from '../App'

export default function AddItemForm({ onAdd, activeCategory }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const inputRef = useRef(null)
  const styles = CATEGORY_STYLES[activeCategory]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ name, quantity })
    setName('')
    setQuantity('')
    inputRef.current?.focus()
  }

  const handleQtyKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e)
  }

  return (
    <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-4 pb-safe">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Pridať položku…"
          maxLength={100}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm
            outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300
            transition-all duration-200 placeholder:text-gray-400"
        />
        <input
          type="text"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          onKeyDown={handleQtyKeyDown}
          placeholder="ks / kg"
          maxLength={20}
          className="w-24 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 text-sm
            outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300
            transition-all duration-200 placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          aria-label="Pridať položku"
          className={`flex items-center justify-center w-12 h-12 rounded-2xl text-white
            transition-all duration-200 active:scale-95
            ${name.trim()
              ? `${styles.button}`
              : 'bg-gray-200 cursor-not-allowed'
            }`}
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  )
}
