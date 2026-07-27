export default function Logo({ className = 'w-9 h-9' }) {
  return (
    <div className={`${className} bg-gradient-to-br from-[#C4663A] to-[#A85430] rounded-xl flex items-center justify-center relative overflow-hidden group shadow-lg shadow-[#C4663A]/20`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4794E] to-[#C4663A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <svg className="w-5 h-5 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    </div>
  )
}
