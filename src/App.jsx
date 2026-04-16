import { useState, useEffect } from 'react'
import Header from './components/Header'
import CategoryTabs from './components/CategoryTabs'
import ShoppingList from './components/ShoppingList'
import AddItemForm from './components/AddItemForm'
import LoginScreen from './components/LoginScreen'
import { useAuth } from './context/AuthContext'

export const CATEGORIES = [
  { id: 'potraviny', label: 'Potraviny', emoji: '🥦' },
  { id: 'drogeria', label: 'Drogeria', emoji: '🧴' },
  { id: 'kozmetika', label: 'Kozmetika', emoji: '💄' },
  { id: 'ostatne', label: 'Ostatne', emoji: '🛍️' },
]

export const CATEGORY_STYLES = {
  potraviny: {
    tab: 'bg-emerald-500 text-white shadow-lg shadow-emerald-200',
    inactive: 'text-emerald-700 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-200',
    checkboxActive: 'bg-emerald-500 border-emerald-500',
  },
  drogeria: {
    tab: 'bg-sky-500 text-white shadow-lg shadow-sky-200',
    inactive: 'text-sky-700 border border-sky-200 bg-sky-50 hover:bg-sky-100',
    badge: 'bg-sky-100 text-sky-700',
    button: 'bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-200',
    checkboxActive: 'bg-sky-500 border-sky-500',
  },
  kozmetika: {
    tab: 'bg-rose-500 text-white shadow-lg shadow-rose-200',
    inactive: 'text-rose-700 border border-rose-200 bg-rose-50 hover:bg-rose-100',
    badge: 'bg-rose-100 text-rose-700',
    button: 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200',
    checkboxActive: 'bg-rose-500 border-rose-500',
  },
  ostatne: {
    tab: 'bg-amber-500 text-white shadow-lg shadow-amber-200',
    inactive: 'text-amber-700 border border-amber-200 bg-amber-50 hover:bg-amber-100',
    badge: 'bg-amber-100 text-amber-700',
    button: 'bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200',
    checkboxActive: 'bg-amber-500 border-amber-500',
  },
}

function App() {
  const { session, logout } = useAuth()

  if (!session) return <LoginScreen />

  return <ShoppingApp groupName={session.groupName} displayName={session.displayName} onLogout={logout} />
}

function ShoppingApp({ groupName, displayName, onLogout }) {
  const storageKey = `nakupni_seznam_v1_${groupName}`

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [activeCategory, setActiveCategory] = useState('potraviny')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey])

  const addItem = ({ name, quantity }) => {
    if (!name.trim()) return
    const newItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      quantity: quantity.trim(),
      category: activeCategory,
      completed: false,
      createdAt: Date.now(),
    }
    setItems(prev => [newItem, ...prev])
  }

  const toggleItem = (id) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    )
  }

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateItem = (id, name, quantity) => {
    if (!name.trim()) return
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, name: name.trim(), quantity: quantity.trim() } : item
      )
    )
    setEditingId(null)
  }

  const clearCompleted = (category) => {
    setItems(prev => prev.filter(item => !(item.completed && item.category === category)))
  }

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat)
    setEditingId(null)
  }

  const filteredItems = items.filter(item => item.category === activeCategory)
  const activeItems = filteredItems.filter(i => !i.completed)
  const completedItems = filteredItems.filter(i => i.completed)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col shadow-2xl bg-white/80 backdrop-blur-sm">
        <Header items={items} categories={CATEGORIES} displayName={displayName} groupName={groupName} onLogout={onLogout} />
        <CategoryTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
          items={items}
        />
        <main className="flex-1 overflow-y-auto px-4 pb-40 pt-3">
          <ShoppingList
            activeItems={activeItems}
            completedItems={completedItems}
            editingId={editingId}
            activeCategory={activeCategory}
            onToggle={toggleItem}
            onDelete={deleteItem}
            onEdit={setEditingId}
            onUpdate={updateItem}
            onClearCompleted={() => clearCompleted(activeCategory)}
          />
        </main>
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-20">
          <AddItemForm
            onAdd={addItem}
            activeCategory={activeCategory}
          />
        </div>
      </div>
    </div>
  )
}

export { ShoppingApp }
export default App
