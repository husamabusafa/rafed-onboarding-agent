export function WelcomeOnboarding() {
  const progress = 0
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (circumference * progress) / 100

  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 text-white shadow-2xl">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text">
            Welcome to TETCO! 🎉
          </h1>
          <p className="text-indigo-100 text-lg opacity-90 leading-relaxed mb-6">
            Your journey at Tatweer Educational Technologies begins here. We're excited to have you join our mission to transform education through technology.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg border border-white/30">
              📅 Start Date: January 13, 2026
            </span>
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg border border-white/30">
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
                stroke="rgba(255,255,255,0.2)" 
                strokeWidth="8" 
                fill="transparent" 
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="white"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-bold">{progress}%</span>
              <p className="text-xs opacity-75">Complete</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-20 -mb-20" />
    </header>
  )
}
