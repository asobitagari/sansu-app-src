import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Play } from './play';

function setup(levelId = 'add') {
  TestBed.configureTestingModule({ imports: [Play], providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(Play);
  fixture.componentRef.setInput('levelId', levelId);
  fixture.detectChanges();
  return fixture;
}

const el = (f: ComponentFixture<Play>) => f.nativeElement as HTMLElement;
const text = (f: ComponentFixture<Play>) => el(f).textContent ?? '';
function click(f: ComponentFixture<Play>, label: string): void {
  const btn = [...el(f).querySelectorAll('button')].find((b) => b.textContent?.includes(label));
  if (!btn) throw new Error(`ボタン「${label}」が ない`);
  btn.click();
  f.detectChanges();
}

describe('Play', () => {
  it('はじめは こたえが かくれていて、「こたえを みる」で でる', () => {
    const f = setup();
    expect(el(f).querySelector('.answer-box')?.textContent?.trim()).toBe('?');
    expect(text(f)).not.toContain('あってた');

    click(f, 'こたえを みる');
    const answer = Number(el(f).querySelector('.answer-box')?.textContent);
    const [a, , b] = [...el(f).querySelectorAll('.formula span')].map((s) => Number(s.textContent));
    expect(answer).toBe(a + b);
    expect(text(f)).toContain('あってた');
    expect(text(f)).toContain('まちがってた');
  });

  it('あってた・まちがってた を えらぶと つぎの もんだいへ すすむ', () => {
    const f = setup();
    expect(el(f).querySelector('.progress')?.textContent).toContain('1 / 10');
    click(f, 'こたえを みる');
    click(f, 'あってた');
    expect(el(f).querySelector('.progress')?.textContent).toContain('2 / 10');
    expect(el(f).querySelector('.answer-box')?.textContent?.trim()).toBe('?');
  });

  it('10もん おわると けっかと まちがえた もんだいが でる', () => {
    const f = setup('sub');
    const wrong: string[] = [];
    for (let i = 0; i < 10; i++) {
      click(f, 'こたえを みる');
      if (i % 3 === 0) {
        wrong.push(el(f).querySelector('.formula')!.textContent!.replace(/\s+/g, ''));
        click(f, 'まちがってた');
      } else {
        click(f, 'あってた');
      }
    }
    expect(text(f)).toContain('10もん ちゅう 6もん あってた');
    const items = [...el(f).querySelectorAll('.review li')].map((li) =>
      li.textContent!.replace(/\s+/g, ''),
    );
    expect(items).toEqual(wrong);

    click(f, 'もういちど');
    expect(el(f).querySelector('.progress')?.textContent).toContain('1 / 10');
  });

  it('ひきざん２ は 9もん で おわる', () => {
    const f = setup('sub10');
    expect(el(f).querySelector('.progress')?.textContent).toContain('1 / 9');
    for (let i = 0; i < 9; i++) {
      expect(el(f).querySelector('.formula')!.textContent!.replace(/\s+/g, '')).toMatch(/^10−[1-9]=\?$/);
      click(f, 'こたえを みる');
      click(f, i === 0 ? 'まちがってた' : 'あってた');
    }
    expect(text(f)).toContain('9もん ちゅう 8もん あってた');
  });

  it('ぜんぶ あってたら まちがえた もんだいの いちらんは でない', () => {
    const f = setup('carry');
    for (let i = 0; i < 10; i++) {
      click(f, 'こたえを みる');
      click(f, 'あってた');
    }
    expect(text(f)).toContain('ぜんぶ あってた');
    expect(el(f).querySelector('.review')).toBeNull();
  });
});
