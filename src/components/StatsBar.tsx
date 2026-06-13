const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '5+', label: 'Live Projects' },
  { value: '8.4', label: 'CGPA Score' },
  { value: '5+', label: 'Certifications' },
];

export function StatsBar() {
  return (
    <div className="border-y border-white/10 py-6" style={{ background: 'rgba(12,18,35,0.65)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text font-display">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-1 tracking-wide uppercase font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
