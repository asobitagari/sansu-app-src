export type Op = '+' | '-';

export interface Problem {
  a: number;
  b: number;
  op: Op;
  answer: number;
}

/** 0 以上 1 未満を返す乱数関数。テストで差し替えられるよう引数で受け取る。 */
export type Rand = () => number;

export interface Level {
  id: string;
  title: string;
  example: string;
  /** この段階で出せる問題すべて */
  all: () => Problem[];
}

const add = (a: number, b: number): Problem => ({ a, b, op: '+', answer: a + b });
const sub = (a: number, b: number): Problem => ({ a, b, op: '-', answer: a - b });

/** 1〜9 の 2 つの数の組み合わせのうち、条件に合うものすべてを作る */
function pairs(make: (a: number, b: number) => Problem, keep: (p: Problem) => boolean): Problem[] {
  const list: Problem[] = [];
  for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) {
      const p = make(a, b);
      if (keep(p)) list.push(p);
    }
  }
  return list;
}

export const LEVELS: Level[] = [
  {
    id: 'add',
    title: 'たしざん１',
    example: '3 + 4',
    all: () => pairs(add, (p) => p.answer <= 9),
  },
  {
    id: 'sub',
    title: 'ひきざん',
    example: '8 − 5',
    all: () => pairs(sub, (p) => p.answer >= 0),
  },
  {
    id: 'carry',
    title: 'たしざん２',
    example: '7 + 6',
    all: () => pairs(add, (p) => p.answer >= 10),
  },
];

export function findLevel(id: string): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}

/** 1 回分の問題を作る。同じ問題は出さない。 */
export function makeRound(level: Level, count = 10, rand: Rand = Math.random): Problem[] {
  const pool = level.all();
  // フィッシャー–イェーツで先頭 count 個だけ混ぜる
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    const j = i + Math.floor(rand() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export const OP_LABEL: Record<Op, string> = { '+': '+', '-': '−' };
