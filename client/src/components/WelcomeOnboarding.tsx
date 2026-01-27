export function WelcomeOnboarding() {
  const progress = 0
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (circumference * progress) / 100

  return (
    <header className="relative overflow-hidden rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-8 text-[#002855] shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur md:p-12 dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15 dark:text-white">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text">
            Welcome to Tatweer! 🎉
          </h1>
          <p className="text-lg leading-relaxed mb-6 text-slate-600 dark:text-slate-300">
            Your journey at Tatweer Educational Technologies begins here. We're excited to have you join our mission to transform education through technology.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center rounded-full border border-[#002855]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#002855] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/30 dark:text-white">
              📅 Start Date: January 13, 2026
            </span>
            <span className="flex items-center rounded-full border border-[#002855]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#002855] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/30 dark:text-white">
              📍 Riyadh, Saudi Arabia
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 96 96">
              <circle 
                cx="48" 
                cy="48" 
                r={radius} 
                stroke="rgba(0,40,85,0.18)" 
                strokeWidth="8" 
                fill="transparent" 
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#E1523E"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-bold">{progress}%</span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Complete</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#002855]/10 -mr-32 -mt-32 dark:bg-white/5" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#E1523E]/10 -ml-20 -mb-20 dark:bg-white/5" />
    </header>
  )
}
