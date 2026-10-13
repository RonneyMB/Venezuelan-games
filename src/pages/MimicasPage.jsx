import { useTables } from '../context/TablesContext.jsx'
import { useGameBroadcast } from '../lib/sync.js'
import { useMimicasGame } from '../games/mimicas/hooks/useMimicasGame.js'
import TabsNav from '../games/mimicas/components/TabsNav.jsx'
import RankingView from '../games/mimicas/components/RankingView.jsx'
import GameTable from '../games/mimicas/components/GameTable.jsx'
import WordBank from '../games/mimicas/components/WordBank.jsx'
import TurnSummaryModal from '../games/mimicas/components/TurnSummaryModal.jsx'

export default function MimicasPage() {
  const { tables } = useTables()
  const game = useMimicasGame(tables)

  const lastTurnName = game.lastTurn
    ? (tables.find((t) => t.id === game.lastTurn.tableId)?.name ?? '')
    : ''

  useGameBroadcast('incret-mimicas-display', {
    ready: true,
    ranking: game.ranking.map((r) => ({ id: r.id, name: r.name, score: r.score })),
    champion: game.champion
      ? { id: game.champion.id, name: game.champion.name, score: game.champion.score }
      : null,
    finished: game.finished,
    currentTableId: game.currentTable,
    currentTableName: game.currentTableName,
    currentTurnScore: game.currentTurnScore,
    currentWord: game.currentWord,
    timeLeft: game.timeLeft,
    timerRunning: game.timerRunning,
  })

  return (
    <div className="flex-1 w-full bg-slate-100">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
            <i className="fa-solid fa-masks-theater text-brand-green" /> Torneo de Mímicas 360NET
          </h2>
          <button
            onClick={() => window.open('#/mimicas/display', '_blank', 'noopener')}
            className="bg-brand-navy hover:bg-brand-navy-light text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-700"
          >
            <span>📺</span>
            <span className="hidden sm:inline">Abrir Pantalla</span>
          </button>
        </div>

        <TabsNav tab={game.tab} onChange={game.setTab} onReset={game.resetTournament} />

        {game.tab === 'ranking' && (
          <RankingView
            tables={tables}
            ranking={game.ranking}
            champion={game.champion}
            finished={game.finished}
            onStartTurn={game.startNextTurn}
          />
        )}

        {game.tab === 'game' &&
          (game.currentTable ? (
            <GameTable
              activeTeamName={game.currentTableName}
              timeLeft={game.timeLeft}
              timerRunning={game.timerRunning}
              currentTurnScore={game.currentTurnScore}
              currentWord={game.currentWord}
              feedback={game.feedback}
              onToggleTimer={game.toggleTimer}
              onCorrect={game.handleCorrect}
              onPass={game.handlePass}
              onNext={game.handleNextWord}
            />
          ) : (
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-10 text-center flex flex-col items-center gap-4">
              <i className="fa-solid fa-gamepad text-brand-green text-5xl" />
              <h3 className="text-xl font-black text-brand-navy">Ningún turno en curso</h3>
              <p className="text-sm text-slate-500 max-w-md">
                Ve al ranking e inicia el turno de la siguiente mesa para comenzar a jugar.
              </p>
              <button
                onClick={game.startNextTurn}
                className="bg-brand-green hover:bg-brand-green-hover text-brand-navy font-extrabold text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md"
              >
                <i className="fa-solid fa-play" /> Iniciar Siguiente Turno
              </button>
            </div>
          ))}

        {game.tab === 'words' && <WordBank />}
      </div>

      <TurnSummaryModal
        open={game.modalOpen}
        teamName={lastTurnName}
        score={game.lastTurn?.score ?? 0}
        isLast={game.finished}
        onClose={game.closeTurnModal}
      />
    </div>
  )
}
