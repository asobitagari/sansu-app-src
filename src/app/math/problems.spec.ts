import { LEVELS, Problem, findLevel, makeRound } from './problems';

const key = (p: Problem) => `${p.a}${p.op}${p.b}`;
const level = (id: string) => findLevel(id)!;

describe('問題の範囲', () => {
  it('たしざん１（くりあがらない）: 1けた + 1けた で、こたえが 9 いか', () => {
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

  it('ひきざん１: 1けた − 1けた で、こたえが マイナスに ならない', () => {
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

  it('たしざん２（くりあがり あり）: 1けた + 1けた で、こたえが 10 いじょう', () => {
    const all = level('carry').all();
    expect(all.length).toBe(45);
    for (const p of all) {
      expect(p.op).toBe('+');
      expect(p.a).toBeLessThanOrEqual(9);
      expect(p.b).toBeLessThanOrEqual(9);
      expect(p.answer).toBeGreaterThanOrEqual(10);
    }
  });

  it('ひきざん２: 10 − 1けた の 9 とおり', () => {
    const all = level('sub10').all();
    expect(all.map(key)).toEqual(['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8', '10-9']);
    for (const p of all) expect(p.answer).toBe(10 - p.b);
  });
});

describe('メニューの名前', () => {
  it('ならびと 名前が たしざん１・ひきざん１・たしざん２・ひきざん２', () => {
    expect(LEVELS.map((l) => [l.id, l.title])).toEqual([
      ['add', 'たしざん１'],
      ['sub', 'ひきざん１'],
      ['carry', 'たしざん２'],
      ['sub10', 'ひきざん２'],
    ]);
  });
});

describe('makeRound', () => {
  const tens = LEVELS.filter((l) => l.id !== 'sub10').map((l) => [l.id, l] as const);
  it.each(tens)('%s: 10もん で、おなじ もんだいが ない', (_, lv) => {
    for (let n = 0; n < 500; n++) {
      const round = makeRound(lv);
      expect(round.length).toBe(10);
      expect(new Set(round.map(key)).size).toBe(10);
    }
  });

  it('ひきざん２: 9もん で、9 とおりが 1 かいずつ でる', () => {
    const orders = new Set<string>();
    for (let n = 0; n < 200; n++) {
      const round = makeRound(level('sub10'));
      expect(round.length).toBe(9);
      expect(new Set(round.map(key)).size).toBe(9);
      orders.add(round.map(key).join(','));
    }
    expect(orders.size).toBeGreaterThan(1);
  });

  it('乱数が いつも 0 でも 重ならない', () => {
    const round = makeRound(level('add'), 10, () => 0);
    expect(new Set(round.map(key)).size).toBe(10);
  });
});
