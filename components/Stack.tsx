import { STAGES, type Load, type StageId, type StageState } from '@/lib/snapshot.ts';

// The six-stage map, drawn as layers. Freedom sits on top, Formation at the base.
export function Stack({ map, load, yours }: { map: Partial<Record<StageId, StageState>>; load: Load; yours: StageId | null }) {
  const rows = [...STAGES].reverse();
  return (
    <ol className="stack" reversed>
      {rows.map((s) => {
        if (s.id === 'formation') {
          return (
            <li key={s.id} className="layer context">
              <span>{s.n} {s.name}</span><span className="state">{load} load</span>
            </li>
          );
        }
        const state = map[s.id] ?? 'Building';
        const isYours = yours === s.id;
        return (
          <li key={s.id} className={'layer ' + state.toLowerCase() + (isYours ? ' yours' : '')}>
            <span>{s.n} {s.name}</span>
            <span className="state">{state}{isYours ? ' · start here' : ''}</span>
          </li>
        );
      })}
    </ol>
  );
}
