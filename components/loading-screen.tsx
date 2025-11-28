"use client"

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center gap-4">
        {/* Animated circle spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#128c7e] border-r-[#128c7e] animate-spin"
            style={{
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
