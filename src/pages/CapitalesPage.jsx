import { useSound } from '../hooks/useSound.js'
import { useGameBroadcast } from '../lib/sync.js'
import { useCapitalesGame } from '../games/capitales/hooks/useCapitalesGame.js'
import StartScreen from '../games/capitales/components/StartScreen.jsx'
import GameScreen from '../games/capitales/components/GameScreen.jsx'
import ResultsScreen from '../games/capitales/components/ResultsScreen.jsx'

export default function CapitalesPage() {
  const { enabled, toggle, play } = useSound(true)
  const game = useCapitalesGame(play)

  useGameBroadcast('incret-capitales-display', {
    ready: true,
    screen: game.screen,
    mode: game.mode,
    stateName: game.currentState?.name ?? '',
    activeId: game.currentState?.id ?? null,
    currentIndex: game.currentIndex,
    total: game.total,
    score: game.score,
    streak: game.streak,
    roundTimeLeft: game.roundTimeLeft,
    roundTimerRunning: game.roundTimerRunning,
    totalAttempts: game.totalAttempts,
    elapsed: game.elapsed,
    answered: game.answered,
    feedback: game.feedback,
  })

  return (
    <div className="flex-1 w-full bg-brand-bg text-brand-navy">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-5 flex items-center justify-between gap-3">
        <h2 className="font-outfit font-black text-lg md:text-xl tracking-wide text-amber-600 flex items-center gap-2">
          <span className="text-2xl">🇻🇪</span> CAPITALES DE VENEZUELA
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              window.open('#/capitales/display', '_blank', 'noopener')
            }
            className="px-3 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light transition text-white border border-slate-700 text-xs font-bold flex items-center gap-2"
          >
            <span>📺</span>
            <span className="hidden sm:inline">Abrir Pantalla</span>
          </button>
          <button
            onClick={toggle}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-100 transition text-amber-600 border border-amber-300 text-sm"
            title="Sonido"
          >
            {enabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col justify-center items-center min-h-[72vh]">
        {game.screen === 'start' && <StartScreen onStart={game.startGame} />}

        {game.screen === 'game' && (
          <GameScreen
            currentState={game.currentState}
            mode={game.mode}
            roundTimeLeft={game.roundTimeLeft}
            roundTimerRunning={game.roundTimerRunning}
            score={game.score}
            streak={game.streak}
            currentIndex={game.currentIndex}
            total={game.total}
            feedback={game.feedback}
            answered={game.answered}
            anim={game.anim}
            onMarkCorrect={game.markCorrect}
            onMarkIncorrect={game.markIncorrect}
            onNext={game.nextState}
            onStartTimer={game.startRoundTimer}
            onPauseTimer={game.pauseRoundTimer}
            onResetTimer={game.resetRoundTimer}
          />
        )}

        {game.screen === 'results' && (
          <ResultsScreen
            score={game.score}
            total={game.total}
            totalAttempts={game.totalAttempts}
            elapsed={game.elapsed}
            onPlayAgain={game.showStartScreen}
          />
        )}
      </div>

      <p className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-6 text-center text-[11px] text-slate-400">
        Mapa de Venezuela: © 2024 Simplemaps.com — Free for Commercial Use
      </p>
    </div>
  )
}
