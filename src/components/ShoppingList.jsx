import ShoppingItem from './ShoppingItem'
import { ClipboardList, CheckCircle2 } from 'lucide-react'

export default function ShoppingList({
  activeItems,
  completedItems,
  editingId,
  activeCategory,
  onToggle,
  onDelete,
  onEdit,
  onUpdate,
  onClearCompleted,
}) {
  const isEmpty = activeItems.length === 0 && completedItems.length === 0

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center select-none">
        <div className="bg-indigo-50 p-7 rounded-3xl mb-5">
          <ClipboardList size={44} className="text-indigo-300" />
        </div>
        <p className="text-gray-700 font-semibold text-lg">Zoznam je prázdny</p>
        <p className="text-gray-400 text-sm mt-1.5">Pridaj prvú položku pomocou poľa nižšie</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {activeItems.map(item => (
        <ShoppingItem
          key={item.id}
          item={item}
          isEditing={editingId === item.id}
          activeCategory={activeCategory}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onUpdate={onUpdate}
        />
      ))}

      {completedItems.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Nakúpené ({completedItems.length})
              </span>
            </div>
            <button
              onClick={onClearCompleted}
              className="text-xs text-rose-400 hover:text-rose-600 font-semibold transition-colors"
            >
              Vymazať všetky
            </button>
          </div>
          <div className="space-y-2">
            {completedItems.map(item => (
              <ShoppingItem
                key={item.id}
                item={item}
                isEditing={editingId === item.id}
                activeCategory={activeCategory}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
