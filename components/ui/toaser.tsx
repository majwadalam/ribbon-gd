"use client"

import { useToast } from "@/lib/use-toast"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts
        .filter((toast) => toast.open !== false)
        .map(({ id, title, description, action, variant = "default", ...props }) => (
          <div
            key={id}
            className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full ${
              variant === "destructive"
                ? "destructive border-destructive bg-destructive text-destructive-foreground"
                : "border bg-background text-foreground"
            }`}
            {...props}
          >
            <div className="grid gap-1">
              {title && (
                <div className="text-sm font-semibold">{title}</div>
              )}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action}
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-2 h-6 w-6 p-0 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
              onClick={() => dismiss(id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
    </div>
  )
}