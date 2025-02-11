"use client"
import { cn } from "@/lib/utils"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"
import * as React from "react"

export function Toast({ title, description, className, ...props }: any) {
  return (
    <ToastPrimitives.Root
      className={cn(
        "fixed bottom-4 right-4 z-50 flex w-96 transform-gpu items-center gap-4 rounded-lg border bg-background p-6 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
        className
      )}
      {...props}
    >
      <img
        src="/icon.png"
        alt="Facundo"
        className="w-12 h-12 rounded-full"
      />
      <div className="grid gap-1">
        {title && <ToastPrimitives.Title className="text-sm font-semibold">{title}</ToastPrimitives.Title>}
        {description && <ToastPrimitives.Description className="text-sm opacity-90">{description}</ToastPrimitives.Description>}
      </div>
      <ToastPrimitives.Close className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100">
        <X className="h-4 w-4" />
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  )
}

export function Toaster() {
  return (
    <ToastPrimitives.Provider>
      <ToastPrimitives.Viewport />
    </ToastPrimitives.Provider>
  )
} 