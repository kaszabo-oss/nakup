import { useState, useEffect, useRef } from 'react'
import { Pencil, Trash2, Check, X } from 'lucide-react'
import { CATEGORY_STYLES } from '../App'

export default function ShoppingItem({
  item,
  isEditing,
  activeCategory,
  onToggle,
  onDelete,
  onEdit,
  onUpdate,
}) {
  const [editName, setEditName] = useState(item.name)
  const [editQty, setEditQty] = useState(item.quantity)
  const inputRef = useRef(null)
  const styles = CATEGORY_STYLES[activeCategory]

  useEffect(() => {
    if (isEditing) {
      setEditName(item.name)
      setEditQty(item.quantity)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isEditing, item.name, item.quantity])

  const handleSave = () => {
    if (editName.trim()) {
      onUpdate(item.id, editName, editQty)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') onEdit(null)
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl border-2 border-indigo-300 p-3 shadow-md item-enter">
        <div className="flex gap-2 mb-2.5">
          <input
            ref={inputRef}
            value={editName}
            onChange={e => setEditName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Názov položky"
            maxLength={100}
            className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none
              focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
          />
          <input
            value={editQty}
            onChange={e => setEditQty(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ks / kg"
            maxLength={20}
            className="w-24 text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none
              focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onEdit(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100
              rounded-lg transition-colors font-medium"
          >
            <X size={12} />
            Zrušiť
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-indigo-500 text-white
              hover:bg-indigo-600 rounded-lg transition-colors font-medium"
          >
            <Check size={12} />
            Uložiť
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-100
        transition-all duration-200 group item-enter
        ${item.completed
          ? 'opacity-60'
          : 'shadow-sm hover:shadow-md hover:-translate-y-0.5'
        }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(item.id)}
        aria-label={item.completed ? 'Označiť ako nenakúpené' : 'Označiť ako nakúpené'}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center
          transition-all duration-200
          ${item.completed
            ? styles.checkboxActive
            : 'border-gray-300 hover:border-gray-400'
          }`}
      >
        {item.completed && <Check size={11} strokeWidth={3.5} className="text-white" />}
      </button>

      {/* Label */}
      <div className="flex-1 min-w-0 flex items-baseline gap-2 flex-wrap">
        <span
          className={`font-medium text-sm transition-all duration-300
            ${item.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
        >
          {item.name}
        </span>
        {item.quantity && (
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-medium">
            {item.quantity}
          </span>
        )}
      </div>

      {/* Action buttons — always visible on mobile, hover on desktop */}
      <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-150">
        {!item.completed && (
          <button
            onClick={() => onEdit(item.id)}
            aria-label="Upraviť"
            className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-xl
              transition-colors"
          >
            <Pencil size={14} />
          </button>
        )}
        <button
          onClick={() => onDelete(item.id)}
          aria-label="Odstrániť"
          className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl
            transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
