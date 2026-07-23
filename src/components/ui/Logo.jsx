export default function Logo({ className = 'w-9 h-9' }) {
  return (
    <div className={`${className} bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center relative overflow-hidden group shadow-lg shadow-emerald-500/20`}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <svg className="w-5 h-5 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    </div>
  )
}
