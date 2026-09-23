import { useState } from 'react'
import { LANGS, site, t } from '../content/site'
import Link from './Link'

// [path, key into site.nav]. Add an entry per page in the main navigation.
const NAV = []

export default function Layout({ lang, setLang, route, children }) {
  return (
    <>
      <Nav lang={lang} setLang={setLang} route={route} />
      <main>{children}</main>
      <Footer lang={lang} />
    </>
  )
}

function Wordmark() {
  return (
    <Link href="/" className="font-display text-xl font-medium text-paper">
      {site.brand}
    </Link>
  )
}

function LangToggle({ lang, setLang, className }) {
  if (LANGS.length < 2) return null
  return (
    <div className={`font-mono text-xs ${className}`} role="group" aria-label={t(site.nav, 'langs', lang)}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2 py-1 uppercase ${lang === code ? 'text-paper' : 'text-muted hover:text-accent'}`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

function Nav({ lang, setLang, route }) {
  const [open, setOpen] = useState(false)
  const { nav } = site
  const links = NAV.map(([href, key]) => (
    <Link
      key={href}
      href={href}
      aria-current={route === href ? 'page' : undefined}
      className={route === href ? 'text-paper' : 'text-muted hover:text-accent'}
    >
      {t(nav, key, lang)}
    </Link>
  ))

  return (
    // Any link click closes the mobile menu.
    <header className="mx-auto max-w-7xl px-6 py-6" onClick={(e) => e.target.closest('a') && setOpen(false)}>
      <div className="flex items-center justify-between gap-4">
        <Wordmark />
        <nav aria-label={t(nav, 'label', lang)} className="hidden items-center gap-8 text-sm md:flex">
          {links}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} className="hidden md:flex" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="px-2 py-2 font-mono text-xs tracking-wide text-accent uppercase md:hidden"
          >
            {t(nav, 'menu', lang)}
          </button>
        </div>
      </div>
      {open && (
        <div id="menu-movil" className="mt-4 border-t border-line pt-4 md:hidden">
          <nav aria-label={t(nav, 'label', lang)} className="flex flex-col gap-4">
            {links}
          </nav>
          <LangToggle lang={lang} setLang={setLang} className="mt-4 -ml-2 flex" />
        </div>
      )}
    </header>
  )
}

function Footer({ lang }) {
  const { nav } = site
  return (
    <footer className="border-t border-line px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:justify-between">
        <Wordmark />
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {NAV.map(([href, key]) => (
            <li key={href}>
              <Link href={href} className="text-muted hover:text-accent">
                {t(nav, key, lang)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-8 max-w-7xl font-mono text-xs text-muted">
        © {new Date().getFullYear()} {site.brand}
      </p>
    </footer>
  )
}
