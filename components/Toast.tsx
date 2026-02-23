'use client'
import { useState, useEffect, createContext, useContext } from 'react'

type Toast = { id: number; message: string; type: 'success' | 'error' | 'info' }
const ToastCtx = createContext<{ showToast: (msg: string, type?: 'success'|'error'|'info') => void }>({ showToast: () => {} })

export function useToast() { return useContext(ToastCtx) }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  let nextId = 0

  const showToast = (message: string, type: 'success'|'error'|'info' = 'success') => {
    const id = ++nextId
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
  }

  return (
    <ToastCtx.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#fff', maxWidth: 320,
            background: t.type === 'error' ? '#DC2626' : t.type === 'info' ? '#2563EB' : '#16A34A',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            animation: 'slideIn 0.3s ease',
          }}>
            {t.type === 'success' ? '✅ ' : t.type === 'error' ? '❌ ' : 'ℹ️ '}{t.message}
          </div>
        ))}
      </div>
      <style>{`@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </ToastCtx.Provider>
  )
}
