/**
 * useKeyboard - Keyboard shortcuts hook
 * @param {object} shortcuts - Map of key names to handler functions
 *   e.g. { 'ArrowRight': () => next(), 'Space': () => pause() }
 * @param {object} options - { enabled: boolean, target: EventTarget }
 *
 * Supported modifiers: prefix keys with 'Ctrl+', 'Shift+', 'Alt+'
 * e.g. { 'Ctrl+Enter': submitHandler }
 */
import { useEffect, useRef } from 'react';

export function useKeyboard(shortcuts = {}, options = {}) {
  const { enabled = true, target } = options;
  // Keep a ref to avoid stale closures on shortcuts
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const eventTarget = target || window;

    const handleKeyDown = (event) => {
      const parts = [];
      if (event.ctrlKey || event.metaKey) parts.push('Ctrl');
      if (event.shiftKey) parts.push('Shift');
      if (event.altKey) parts.push('Alt');
      parts.push(event.key);
      const combo = parts.join('+');

      // Also match plain key without modifiers
      const handler =
        shortcutsRef.current[combo] ||
        shortcutsRef.current[event.key] ||
        shortcutsRef.current[event.code];

      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    eventTarget.addEventListener('keydown', handleKeyDown);
    return () => eventTarget.removeEventListener('keydown', handleKeyDown);
  }, [enabled, target]);
}

export default useKeyboard;
