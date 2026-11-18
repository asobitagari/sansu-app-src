import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEVELS } from '../math/problems';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main class="page">
      <header class="hero">
        <h1>さんすう れんしゅう</h1>
        <p class="hero-sub">やりたい もんだいを えらんでね</p>
      </header>

      <nav class="menu" aria-label="れんしゅうする もんだい">
        @for (lv of levels; track lv.id; let i = $index) {
          <a class="menu-btn" [class]="lv.id" [routerLink]="['/play', lv.id]">
            <span class="menu-num" aria-hidden="true">{{ i + 1 }}</span>
            <span class="menu-text">
              <span class="menu-title">{{ lv.title }}</span>
              <span class="menu-example">れい: {{ lv.example }}</span>
            </span>
          </a>
        }
      </nav>
    </main>
  `,
  styles: `
    .hero {
      text-align: center;
      margin: 32px 0 28px;
    }
    h1 {
      margin: 0;
      font-size: clamp(2rem, 8vw, 3rem);
    }
    .hero-sub {
      margin: 8px 0 0;
      color: var(--muted);
      font-weight: 700;
    }
    .menu {
      display: grid;
      gap: 16px;
    }
    .menu-btn {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 18px 20px;
      border-radius: var(--radius);
      color: #fff;
      text-decoration: none;
      box-shadow: 0 4px 0 rgb(0 0 0 / 0.18);
      transition: transform 0.08s;
    }
    .menu-btn:active {
      transform: translateY(3px);
      box-shadow: 0 1px 0 rgb(0 0 0 / 0.18);
    }
    .menu-num {
      flex: none;
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgb(255 255 255 / 0.25);
      font-size: 2rem;
      font-weight: 800;
    }
    .menu-text {
      display: grid;
      gap: 2px;
    }
    .menu-title {
      font-size: clamp(1.2rem, 5.2vw, 1.6rem);
      word-break: keep-all;
      font-weight: 800;
    }
    .menu-example {
      font-size: 1.05rem;
      font-weight: 700;
      opacity: 0.9;
    }
    .add { background: var(--add); }
    .sub { background: var(--sub); }
    .carry { background: var(--carry); }
    .sub10 { background: var(--sub10); }
  `,
})
export class Home {
  protected readonly levels = LEVELS;
}
