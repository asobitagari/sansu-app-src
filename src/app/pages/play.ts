import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OP_LABEL, Problem, findLevel, makeRound } from '../math/problems';

const ROUND_SIZE = 10;

@Component({
  selector: 'app-play',
  imports: [RouterLink],
  templateUrl: './play.html',
  styleUrl: './play.css',
})
export class Play implements OnInit {
  readonly levelId = input.required<string>();

  private readonly router = inject(Router);

  protected readonly opLabel = OP_LABEL;
  protected readonly level = computed(() => findLevel(this.levelId()));

  protected readonly problems = signal<Problem[]>([]);
  protected readonly index = signal(0);
  protected readonly revealed = signal(false);
  /** 問題ごとの自己採点（あってた = true） */
  protected readonly marks = signal<boolean[]>([]);

  protected readonly current = computed(() => this.problems()[this.index()]);
  protected readonly finished = computed(
    () => this.problems().length > 0 && this.marks().length === this.problems().length,
  );
  protected readonly correctCount = computed(() => this.marks().filter(Boolean).length);
  protected readonly mistakes = computed(() => this.problems().filter((_, i) => this.marks()[i] === false));
  protected readonly message = computed(() => {
    const n = this.correctCount();
    if (n === this.problems().length) return 'ぜんぶ あってた！すごい！';
    if (n >= 7) return 'よく できました！';
    return 'がんばったね！';
  });

  ngOnInit(): void {
    if (!this.level()) {
      this.router.navigateByUrl('/');
      return;
    }
    this.start();
  }

  protected start(): void {
    this.problems.set(makeRound(this.level()!, ROUND_SIZE));
    this.index.set(0);
    this.revealed.set(false);
    this.marks.set([]);
  }

  protected reveal(): void {
    this.revealed.set(true);
  }

  protected mark(correct: boolean): void {
    if (!this.revealed() || this.finished()) return;
    this.marks.update((m) => [...m, correct]);
    this.revealed.set(false);
    if (this.index() + 1 < this.problems().length) {
      this.index.update((i) => i + 1);
    }
  }
}
