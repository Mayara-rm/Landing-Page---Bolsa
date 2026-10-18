import { useEffect, useRef } from 'react';

const LOCK_MS = 900; // tempo parado depois de trocar (precisa ser >= a transição do CSS)

/**
 * @param {number}   total     quantidade de telas
 * @param {number}   index     tela atual
 * @param {function} setIndex  troca a tela atual
 * @param {object}   guards    ref { [index]: (dir) => boolean }
 *                             uma tela devolve true quando ainda tem o que mostrar
 *                             (ex.: o carrossel de Detalhes) e o scroll NÃO muda de tela
 */
export default function useFullPage({ total, index, setIndex, guards }) {
  const indexRef = useRef(index);
  const lockRef = useRef(0);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const go = (dir) => {
      const now = Date.now();
      if (now - lockRef.current < LOCK_MS) return;

      // 1) a tela atual ainda tem conteúdo interno?
      const guard = guards.current[indexRef.current];
      if (guard && guard(dir)) {
        lockRef.current = now;
        return;
      }

      // 2) senão, troca de tela
      const next = Math.min(Math.max(indexRef.current + dir, 0), total - 1);
      if (next === indexRef.current) return;
      lockRef.current = now;
      setIndex(next);
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 8) return;
      go(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e) => {
      // dentro de campos de texto as teclas funcionam normalmente
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
      // espaço em botão/link é "clicar", não "descer"
      if (e.key === ' ' && e.target.closest?.('button, a')) return;

      const down = ['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey);
      const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
      if (!down && !up) return;

      e.preventDefault();
      go(down ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [total, setIndex, guards]);
}
