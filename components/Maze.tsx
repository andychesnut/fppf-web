// The home page picture: money comes in, most of it runs down dead ends, and one route reaches what you want.
// Two fixed mazes (wide and tall), drawn as SVG so they scale. Decorative: the captions carry the meaning.
type Flow = { d: string; cls: string; w?: number };
type Label = { x: number; y: number; t: string; anchor?: 'start' | 'middle' | 'end'; bold?: boolean; small?: boolean };
type MazeData = {
  w: number; h: number; walls: string; grey: Flow[]; ends: [number, number, number][];
  segs: [string, string, string]; tank: [number, number, number, number]; sw: [number, number, number]; dest: [number, number];
  labels: Label[]; cls: string;
};

const WIDE: MazeData = {
  cls: 'maze-wide', w: 640, h: 540,
  walls: 'M32 18H608M176 90H320M392 90H464M536 90H608M104 162H248M392 162H464M536 162H608M104 234H464M104 306H176M392 306H464M536 306H608M32 378H176M320 378H608M104 450H320M464 450H536M32 522H608M32 18V162M32 234V522M104 90V162M104 306V378M176 90V162M176 234V306M176 378V450M248 18V90M248 234V306M248 378V450M320 162V234M320 306V378M392 18V162M392 378V450M464 234V306M536 162V234M536 378V450M608 18V378M608 450V522',
  grey: [
    { d: 'M2 198L284 198L284 126L356 126L356 198L500 198L500 342', cls: 'leak' },
    { d: 'M68 198L68 54L140 54L140 126', cls: 'fixed' },
    { d: 'M68 198L68 270L140 270', cls: 'leak' },
    { d: 'M356 126L356 54L284 54', cls: 'leak' },
    { d: 'M500 198L500 54L572 54', cls: '', w: 5 },
    { d: 'M500 270L572 270L572 198', cls: '', w: 4 },
    { d: 'M284 342L140 342', cls: 'leak' },
    { d: 'M356 486L68 486L68 414L140 414', cls: 'leak' },
  ],
  ends: [[140, 126, 6], [140, 270, 4], [284, 54, 4], [572, 54, 5], [572, 198, 5], [140, 342, 4], [140, 414, 4]],
  segs: ['M2 198L284 198L284 126L356 126L356 198L500 198L500 342L460 342', 'M396 342L356 342L356 270L284 270L284 414L356 414L356 486L434 486', 'M498 486L572 486L572 414L622 414'],
  tank: [398, 322, 60, 40], sw: [436, 496, 486], dest: [628, 414],
  labels: [
    { x: 0, y: 184, t: 'MONEY IN', small: true },
    { x: 142, y: 152, t: 'Must-pay bills', anchor: 'middle' },
    { x: 572, y: 80, t: 'Day to day', anchor: 'middle' },
    { x: 572, y: 184, t: 'Everything else', anchor: 'middle' },
    { x: 428, y: 312, t: 'Savings', anchor: 'middle', bold: true },
    { x: 466, y: 512, t: 'Your call', anchor: 'middle', bold: true },
    { x: 606, y: 400, t: 'What you want', anchor: 'end', bold: true },
  ],
};

const TALL: MazeData = {
  cls: 'maze-tall', w: 390, h: 540,
  walls: 'M35 40H163M227 40H355M163 104H227M35 168H227M35 232H99M163 232H227M291 232H355M35 296H99M163 296H227M227 360H355M99 424H227M35 488H291M35 40V488M99 104V168M99 296V360M99 424V488M163 168V232M163 296V360M227 40V104M227 296V360M291 40V104M291 168V232M291 296V360M291 424V488M355 40V488',
  grey: [
    { d: 'M195 12L195 72L131 72L131 136L259 136L259 264L131 264L131 392', cls: 'leak' },
    { d: 'M131 72L67 72L67 136', cls: 'fixed' },
    { d: 'M259 136L323 136L323 72', cls: '', w: 4 },
    { d: 'M259 264L323 264L323 328', cls: '', w: 3 },
    { d: 'M131 264L131 200L67 200', cls: 'leak' },
    { d: 'M131 392L67 392L67 456', cls: 'leak' },
  ],
  ends: [[67, 136, 5], [323, 72, 5], [323, 328, 4], [67, 200, 4], [67, 456, 4]],
  segs: ['M195 12L195 72L131 72L131 136L259 136L259 264L225 264', 'M165 264L131 264L131 392L197 392', 'M257 392L323 392L323 506'],
  tank: [167, 244, 56, 40], sw: [199, 255, 392], dest: [323, 514],
  labels: [
    { x: 208, y: 28, t: 'MONEY IN', small: true },
    { x: 67, y: 160, t: 'Bills', anchor: 'middle' },
    { x: 323, y: 58, t: 'Day to day', anchor: 'middle' },
    { x: 323, y: 350, t: 'Other', anchor: 'middle' },
    { x: 195, y: 234, t: 'Savings', anchor: 'middle', bold: true },
    { x: 227, y: 420, t: 'Your call', anchor: 'middle', bold: true },
    { x: 306, y: 518, t: 'What you want', anchor: 'end', bold: true },
  ],
};

function One({ m }: { m: MazeData }) {
  const [tx, ty, tw, th] = m.tank;
  const [sx1, sx2, sy] = m.sw;
  return (
    <svg className={'maze ' + m.cls} viewBox={`0 0 ${m.w} ${m.h}`} aria-hidden="true">
      <path className="maze-walls" d={m.walls} />
      {m.grey.map((f) => <path key={f.d} className={'maze-flow maze-grey ' + f.cls} d={f.d} style={f.w ? { strokeWidth: f.w } : undefined} />)}
      {m.ends.map(([x, y, r]) => <circle key={x + '-' + y} className="maze-end" cx={x} cy={y} r={r} />)}
      {m.segs.map((d, k) => <path key={'l' + k} className={'maze-line seg-' + 'abc'[k]} d={d} />)}
      {m.segs.map((d, k) => <path key={'f' + k} className={'maze-flow maze-live seg-' + 'abc'[k]} d={d} />)}
      <rect className="maze-tank-bg" x={tx} y={ty} width={tw} height={th} />
      <rect className="maze-tank-fill" x={tx + 1} y={ty + 1} width={tw - 2} height={th - 2} />
      <rect className="maze-tank" x={tx} y={ty} width={tw} height={th} />
      {['<1 mo', '2 mo', '4 mo', '6 mo'].map((t, k) => <text key={t} className={'maze-val cap' + (k + 1)} x={tx + tw / 2} y={ty + th / 2 + 5} textAnchor="middle">{t}</text>)}
      <line className="maze-arm" x1={sx1} y1={sy} x2={sx2} y2={sy} style={{ transformOrigin: `${sx1}px ${sy}px` }} />
      <circle className="maze-contact" cx={sx1} cy={sy} r="6" /><circle className="maze-contact" cx={sx2} cy={sy} r="6" />
      <circle className="maze-dest" cx={m.dest[0]} cy={m.dest[1]} r="8" /><circle className="maze-dest-on seg-c" cx={m.dest[0]} cy={m.dest[1]} r="8" />
      {m.labels.map((l) => <text key={l.t} className={'maze-label' + (l.bold ? ' b' : '') + (l.small ? ' s' : '')} x={l.x} y={l.y} textAnchor={l.anchor ?? 'start'}>{l.t}</text>)}
    </svg>
  );
}

const CAPTIONS: [string, string][] = [
  ['Stuck.', "Money comes in and it's already gone."],
  ['Making room.', "There's a little left at the end of the month."],
  ['Building.', 'You could go a few months without a paycheck.'],
  ['Solid ground.', 'You can say no, and you can pay for what you want.'],
];

export function Maze() {
  return (
    <div className="maze-wrap">
      <One m={WIDE} />
      <One m={TALL} />
      <div className="maze-caps">{CAPTIONS.map(([b, t], k) => <p key={b} className={'cap' + (k + 1)}><strong>{b}</strong> {t}</p>)}</div>
    </div>
  );
}
