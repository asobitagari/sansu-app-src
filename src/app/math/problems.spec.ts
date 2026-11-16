import { LEVELS, Problem, findLevel, makeRound } from './problems';

const key = (p: Problem) => `${p.a}${p.op}${p.b}`;
const level = (id: string) => findLevel(id)!;

describe('問題の範囲', () => {
  it('くりあがらない たしざん: 1けた + 1けた で、こたえが 9 いか', () => {
    const all = level('add').all();
    expect(all.length).toBe(36);
    for (const p of all) {
      expect(p.op).toBe('+');
      expect(p.a).toBeGreaterThanOrEqual(1);
      expect(p.b).toBeGreaterThanOrEqual(1);
      expect(p.answer).toBe(p.a + p.b);
      expect(p.answer).toBeLessThanOrEqual(9);
    }
  });

  it('ひきざん: 1けた − 1けた で、こたえが マイナスに ならない', () => {
    const all = level('sub').all();
    expect(all.length).toBe(45);
    for (const p of all) {
      expect(p.op).toBe('-');
      expect(p.a).toBeLessThanOrEqual(9);
      expect(p.b).toBeGreaterThanOrEqual(1);
      expect(p.answer).toBe(p.a - p.b);
      expect(p.answer).toBeGreaterThanOrEqual(0);
    }
  });

  it('くりあがりの ある たしざん: 1けた + 1けた で、こたえが 10 いじょう', () => {
    const all = level('carry').all();
    expect(all.length).toBe(45);
    for (const p of all) {
      expect(p.op).toBe('+');
      expect(p.a).toBeLessThanOrEqual(9);
      expect(p.b).toBeLessThanOrEqual(9);
      expect(p.answer).toBeGreaterThanOrEqual(10);
    }
  });
});

describe('makeRound', () => {
  it.each(LEVELS.map((l) => [l.id, l] as const))('%s: 10もん で、おなじ もんだいが ない', (_, lv) => {
    for (let n = 0; n < 500; n++) {
      const round = makeRound(lv);
      expect(round.length).toBe(10);
      expect(new Set(round.map(key)).size).toBe(10);
    }
  });

  it('乱数が いつも 0 でも 重ならない', () => {
    const round = makeRound(level('add'), 10, () => 0);
    expect(new Set(round.map(key)).size).toBe(10);
  });
});
