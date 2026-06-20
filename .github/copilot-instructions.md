# GitHub Copilot Instructions – donofden.github.io

Personal portfolio website for **Aravind Kumar G** (`donofden`). Built with Jekyll, hosted on GitHub Pages at [donofden.com](https://donofden.com).

## Stack

- **Jekyll** 3.10.0 (pinned via `github-pages` gem v232 — matches GitHub Pages production)
- **Ruby** 3.3.4
- **Bootstrap** 3.x (layout/UI, CDN)
- **Liquid** templating
- **FontAwesome** icon set
- `jekyll-github-metadata` for auto-populating GitHub repo data
- `jemoji`, `jekyll-octicons`

## Project Layout

| Path | Purpose |
|---|---|
| `_includes/` | Page sections: `about`, `experience`, `education`, `projects`, `quotes`, `leftmenu`, `header`, `footer`, `main`, `repo-card` |
| `_layouts/default.html` | Main shell (sidebar + content area) |
| `_layouts/post.html` | Blog post layout |
| `_posts/` | Markdown blog posts — filename format `YYYY-MM-DD-title.md` |
| `_data/quotes.yml` | Favourite quotes — add entries here to show in the Quotes section |
| `_config.yml` | Site config — `projects.show` controls which GitHub repos appear in Projects |
| `.github/workflows/` | CI/CD workflows |
| `css/`, `sass/` | Stylesheets |
| `images/` | Site images |

## Key Conventions

- **Menu order**: Home › About › Projects › Experience › Education › Blog › My Travel › Gallery › Quotes
- All section `<section>` elements use `data-section="<name>"` for scroll-spy navigation
- Section order in `index.html` should match menu order
- **Projects allowlist**: Only repos listed under `projects.show` in `_config.yml` appear in the Projects section. To add a new featured project, add its GitHub repo name there.
- **Quotes**: Stored in `_data/quotes.yml` as a list of `{text, author}` objects; rendered by `_includes/quotes.html`
- Blog posts need front matter: `layout: post`, `title`, `date`, `tags`

## Owner / Personal Details

- **Name**: Aravind Kumar G
- **Alias**: DonOfDen
- **Current role**: Engineering Manager at OptumUK (Belfast, Northern Ireland, UK)
- **Email**: aravindkumar.ganesan@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/aravind-kumar-g/
- **Twitter**: @aravind_kumar_g
- **GitHub**: @donofden
- **Stack**: Python, AWS, React.js, GoLang, Airflow, CI/CD

## Deployment Flow

1. Make changes and commit to `main`
2. Release Drafter automatically drafts release notes as PRs merge
3. When ready to deploy: go to GitHub Releases → review the draft → **Publish release**
4. `deploy.yml` triggers on release publish → builds Jekyll → deploys to GitHub Pages
5. **Only the repo owner** (donofden) can publish releases, so deployments are owner-gated

### Local development

```bash
make install    # First-time: install gems into vendor/bundle
make start      # Serve with live-reload at http://localhost:4000/
make stop       # Kill the dev server
make build      # Production build into _site/
make clean      # Remove _site/, vendor/, .jekyll-cache/
make update     # Update all gem dependencies
make release VERSION=v1.2.0  # Tag and push a release
```

## Adding / Updating Content

| Task | What to change |
|---|---|
| Add blog post | Create `_posts/YYYY-MM-DD-title.md` with front matter |
| Add quote | Append to `_data/quotes.yml` |
| Feature a project | Add repo name to `projects.show` in `_config.yml` |
| Update experience | Edit `_includes/experience.html` (timeline entries) |
| Update about text | Edit `_includes/about.html` |
| Update education | Edit `_includes/education.html` |

## GitHub Pages Compatibility Notes

- Stick to plugins listed at https://pages.github.com/versions/ — custom plugins won't run on GitHub Pages
- The `github-pages` gem version in `Gemfile` should match the version on pages.github.com/versions (currently **232**)
- Ruby version for local dev should match GitHub Pages (currently **3.3.4**)
