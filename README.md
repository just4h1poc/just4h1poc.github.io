# zonduu — static blog

A hand-built static site (plain HTML + CSS + a sprinkle of JS). No build step, no
framework, no dependencies. Drop the folder on any static host and it works.
Terminal-flavored dark theme, rebuilt from the old zonduu.me and redesigned.

## View it locally

Any static file server works. With the little one included here:

```bash
node serve.js . 4321
```

Then open http://localhost:4321/ .

> `serve.js` is only for local preview — you don't deploy it. If you already have
> Python: `python -m http.server 4321` works too. Opening `index.html` directly as
> a `file://` won't work because the site uses absolute `/assets/...` paths.

## File layout

```
index.html                         # homepage (hero + latest posts)
posts/index.html                   # all posts list
posts/http-request-smuggling/      # a post = a folder with index.html
  index.html
_post-template.html                # copy this to start a new post
404.html
assets/
  css/style.css                    # all styling + theme tokens (colors up top)
  js/main.js                       # copy buttons + footer year
  img/avatar.jpg
```

## Add a new post

1. Copy `_post-template.html` to `posts/your-slug/index.html`.
2. Fill in the title, date, description, tags, and write the body (see the
   existing writeup for examples of headings, links, blockquotes, code blocks).
3. Add a `<li class="post-item">…</li>` entry to `posts/index.html` (newest at the
   top of its year group), and optionally to the "latest" list in `index.html`.

That's it — the post is live. URL is `/posts/your-slug/`.

### Linking a post out to Medium

Just point the list item's `<a href="...">` at the Medium URL, add `target="_blank"
rel="noopener"`, and mark it with `<span class="post-item__ext">↗ medium</span>`.
(The two 2020 Medium posts are already set up this way.)

## Reskin

All colors and fonts are CSS variables at the top of `assets/css/style.css`
(`:root { ... }`). Change `--accent` to swap the green for any color; everything
follows.

## Deploy to GitHub Pages (later)

1. Create a repo on your new GitHub account and push these files to it.
2. Repo → **Settings → Pages** → Source: `Deploy from a branch`, branch `main`,
   folder `/ (root)`.
3. For a custom domain (e.g. a new `zonduu.*`), add it under Pages → Custom domain
   and create a `CNAME` file with the domain.

Because the site uses absolute `/assets/...` paths, it expects to live at the root
of a domain (a custom domain, or a `username.github.io` user site). If you use a
project site served from `username.github.io/repo/`, either add a custom domain or
switch the asset paths to relative.

Netlify / Cloudflare Pages: just drag the folder in (or connect the repo). No build
command, publish directory = the folder itself.
