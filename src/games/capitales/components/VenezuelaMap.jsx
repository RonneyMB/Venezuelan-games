export default function VenezuelaMap({ states, activeId }) {
  return (
    <svg
      viewBox="0 0 1000 877"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full max-h-full"
    >
      {states.map((st) => (
        <path
          key={st.id}
          d={st.path}
          className={`state-path ${activeId === st.id ? 'active' : ''}`}
        >
          <title>{st.name}</title>
        </path>
      ))}
    </svg>
  )
}
