export default function OptionsGrid({ options = [], correct, selected, answered, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      {options.map((opt, idx) => {
        const isCorrect = answered && idx === correct
        const isWrong = answered && idx === selected && idx !== correct

        let cls = 'bg-slate-50 hover:bg-brand-navy hover:text-white text-slate-800 border-slate-200'
        if (isCorrect) cls = 'bg-emerald-500 text-white border-emerald-700 shadow-md'
        else if (isWrong) cls = 'bg-red-500 text-white border-red-700 shadow-md'
        else if (answered) cls = 'bg-slate-50 text-slate-400 border-slate-200 opacity-70'

        return (
          <button
            key={idx}
            type="button"
            disabled={answered}
            onClick={() => onSelect(idx)}
            className={`w-full text-left font-bold p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between text-sm sm:text-base shadow-sm ${cls}`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center shrink-0 border ${
                  isCorrect
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-slate-200 text-brand-navy border-slate-300'
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{opt}</span>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-300 text-xs" />
          </button>
        )
      })}
    </div>
  )
}
