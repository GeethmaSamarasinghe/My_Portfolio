# Geethma Samarasinghe — Portfolio (React + Vite + Tailwind)

A React rebuild of the original static site: same typing hero, scroll-reveal
About section, animated skills grid, flip-card project, and contact section.

## 1. Add your images

Drop your existing image files into `public/images/` using these exact names
(the component already points at them):

| File you had before      | Put it here as              |
|---------------------------|------------------------------|
| `gif 2.gif`                | `public/images/intro.gif`   |
| `img 1.jpg`                 | `public/images/profile.jpg` |
| `Project 1.png`             | `public/images/project-1.png` |
| `Contact Me.png`            | `public/images/contact-me.png` |
| `html.png`, `css.png`, `tailwind.png`, `js.png`, `reactjs.png`, `java.png`, `c.png`, `mysql.png`, `figma.png`, `canva.png` | same names in `public/images/` |

(You can rename things in `src/Portfolio.jsx` instead, if you'd rather keep
your original filenames — just update the `src="/images/..."` paths.)

## 2. Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Host it (fastest path: Vercel)

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add
   New → Project**, and import the repo.
3. Vercel auto-detects Vite — leave the defaults (Build command
   `npm run build`, Output directory `dist`) and click **Deploy**.
4. You'll get a live URL like `your-portfolio.vercel.app` in about a minute.
   Every future push to `main` auto-redeploys.

**Netlify** works the same way (drag-and-drop the `dist/` folder after
`npm run build`, or connect the GitHub repo for auto-deploys) if you'd
rather use that instead.

## Notes on this rebuild

- All the vanilla-JS behavior from `script.js` (typing effect, scroll
  reveals, staggered skill-card animation, flip-card hover) is now React
  state/hooks — no separate script file needed.
- Styling was ported from `style.css` to Tailwind utility classes, so there's
  no separate stylesheet to keep in sync.
- The original stylesheet had a structural bug (an unclosed `.card-back`
  rule that swallowed the `.reveal` and `footer` rules into it) — this
  rebuild fixes that, so those animations now actually apply.
