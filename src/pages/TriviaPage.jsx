import { useEffect } from 'react'
import { useSound } from '../hooks/useSound.js'
import { useConfetti } from '../hooks/useConfetti.js'
import { useTables } from '../context/TablesContext.jsx'
import { useGameBroadcast } from '../lib/sync.js'
import { useTriviaGame, QUESTION_TIME } from '../games/trivia/hooks/useTriviaGame.js'
import TableScoreboard from '../games/trivia/components/TableScoreboard.jsx'
import TimerBar from '../games/trivia/components/TimerBar.jsx'
import TurnBanner from '../games/trivia/components/TurnBanner.jsx'
import QuestionCard from '../games/trivia/components/QuestionCard.jsx'
import OptionsGrid from '../games/trivia/components/OptionsGrid.jsx'
import ExplanationBox from '../games/trivia/components/ExplanationBox.jsx'
import HostPanel from '../games/trivia/components/HostPanel.jsx'
import WinnerModal from '../games/trivia/components/WinnerModal.jsx'
import WildcardModal from '../games/trivia/components/WildcardModal.jsx'

export default function TriviaPage() {
  const { tables } = useTables()
  const { enabled, toggle, play } = useSound(true)
  const { celebrate } = useConfetti()
  const game = useTriviaGame(tables, play)

  const {
    queue,
    currentIndex,
    currentQuestion: q,
    scores,
    activeTable,
    selected,
    answered,
    showHost,
    setShowHost,
    finished,
    winner,
    timeLeft,
    isRunning,
    phase,
    startTimer,
    restart,
    selectOption,
    nextQuestion,
    adjustScore,
    forceTurn,
    togglePause,
    wildcardsRemaining,
    wildcardPhase,
    currentWildcard,
    wildcardResult,
    openWildcard,
    cancelWildcard,
    selectWildcardGame,
    answerWildcard,
    finishWildcard,
  } = game

  useEffect(() => {
    if (finished) celebrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  const activeTableName = tables.find((t) => t.id === activeTable)?.name ?? '—'
  const percent = (timeLeft / QUESTION_TIME) * 100

  useGameBroadcast('incret-trivia-display', {
    ready: true,
    totalQuestions: queue.length,
    currentIndex,
    category: q?.category ?? '',
    question: q?.question ?? '',
    options: q?.options ?? [],
    correct: q?.correct ?? -1,
    activeTableId: activeTable,
    activeTableName,
    tables: tables.map((t) => ({ id: t.id, name: t.name, score: scores[t.id] ?? 0 })),
    selected,
    answered,
    timeLeft,
    phase,
    finished,
    winnerName: tables.find((t) => t.id === winner)?.name ?? '',
    wildcardPhase,
    currentWildcard,
    wildcardResult,
  })

  let explanation = null
  if (answered && q) {
    if (selected === q.correct) {
      explanation = {
        success: true,
        title: `¡Excelente respuesta de ${activeTableName}! (+10 pts)`,
        text: q.explanation,
      }
    } else if (selected === null) {
      explanation = {
        success: false,
        title: `¡Tiempo agotado para ${activeTableName}!`,
        text: q.explanation,
      }
    } else {
      explanation = {
        success: false,
        title: `Respuesta incorrecta de ${activeTableName}.`,
        text: q.explanation,
      }
    }
  }

  const confirmRestart = () => {
    if (window.confirm('¿Deseas reiniciar la trivia y los puntajes de las mesas?')) {
      restart()
    }
  }

  return (
    <div className="flex-1 w-full bg-brand-bg">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
            <i className="fa-solid fa-dice text-brand-green" /> Trivia Venezolana 360NET
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.open('#/trivia/display', '_blank', 'noopener')}
              className="bg-brand-navy hover:bg-brand-navy-light text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-700"
            >
              <span>📺</span>
              <span className="hidden sm:inline">Abrir Pantalla</span>
            </button>
            <button
              onClick={toggle}
              className="bg-white hover:bg-slate-100 text-brand-navy px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-200"
            >
              <i
                className={`fa-solid ${
                  enabled ? 'fa-volume-high text-brand-green' : 'fa-volume-xmark text-red-400'
                }`}
              />
              <span className="hidden sm:inline">Sonido</span>
            </button>
            <button
              onClick={() => setShowHost(true)}
              className="bg-white hover:bg-slate-100 text-brand-navy px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-200"
            >
              <i className="fa-solid fa-sliders text-amber-400" />
              <span className="hidden sm:inline">Panel Host</span>
            </button>
            <button
              onClick={confirmRestart}
              className="bg-brand-green hover:bg-brand-green-hover text-brand-navy px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 shadow-md"
            >
              <i className="fa-solid fa-rotate-right" />
              <span>Nuevo Juego</span>
            </button>
          </div>
        </div>

        <TableScoreboard
          tables={tables}
          scores={scores}
          activeTable={activeTable}
          onAdjust={adjustScore}
        />

        <section className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
          <div className="bg-brand-navy text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b-2 border-brand-green">
            <div className="flex items-center gap-3">
              <span className="bg-brand-green/20 text-brand-green border border-brand-green/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <i className="fa-solid fa-layer-group" /> {q?.category}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Pregunta {currentIndex + 1}/{queue.length}
              </span>
            </div>
            <TimerBar timeLeft={timeLeft} total={QUESTION_TIME} phase={answered ? 'answering' : phase} />
          </div>

          <div className="w-full bg-slate-100 h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                timeLeft <= 4 ? 'bg-red-500' : 'bg-brand-green'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <TurnBanner activeTableName={activeTableName} />

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <QuestionCard question={q?.question} />

            <OptionsGrid
              options={q?.options}
              correct={q?.correct}
              selected={selected}
              answered={answered}
              onSelect={selectOption}
            />

            <ExplanationBox
              visible={Boolean(explanation)}
              success={explanation?.success}
              title={explanation?.title}
              text={explanation?.text}
            />

            <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-2 gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                {phase === 'ready' && !answered ? (
                  <button
                    onClick={startTimer}
                    className="bg-brand-green hover:bg-brand-green-hover text-brand-navy font-extrabold text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md animate-pulse"
                  >
                    <i className="fa-solid fa-play" />
                    <span>COMENZAR CONTADOR</span>
                  </button>
                ) : (
                  <>
                    {!answered && wildcardsRemaining > 0 && (
                      <button
                        onClick={openWildcard}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-700 font-extrabold text-xs px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 border border-amber-300"
                      >
                        <span>🃏</span>
                        <span>USAR COMODÍN ({wildcardsRemaining})</span>
                      </button>
                    )}
                    <button
                      onClick={togglePause}
                      disabled={answered}
                      className="bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5"
                    >
                      <i className={`fa-solid ${isRunning ? 'fa-pause' : 'fa-play'}`} />
                      <span>{isRunning ? 'Pausar' : 'Reanudar'}</span>
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={nextQuestion}
                className="ml-auto bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md"
              >
                <span>Siguiente Pregunta</span>
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <HostPanel
        open={showHost}
        onClose={() => setShowHost(false)}
        tables={tables}
        scores={scores}
        onAdjust={adjustScore}
        onForceTurn={forceTurn}
      />

      <WinnerModal
        open={finished}
        winner={winner}
        tables={tables}
        scores={scores}
        onRestart={restart}
      />

      <WildcardModal
        phase={wildcardPhase}
        current={currentWildcard}
        result={wildcardResult}
        onSelectGame={selectWildcardGame}
        onAnswer={answerWildcard}
        onFinish={finishWildcard}
        onCancel={cancelWildcard}
      />
    </div>
  )
}
