import { useEffect, useState } from 'react'
import { LANGS, site, t } from './content/site'
import { ROUTES, matchRoute } from './router'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

const PAGES = { home: Home }

const readLocation = () => ({ path: window.location.pathname, hash: window.location.hash })

export default function App() {
  const [lang, setLang] = useState(LANGS[0])
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    const onPop = () => setLocation(readLocation())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const route = matchRoute(location.path)
  const key = route ? ROUTES[route] : 'notFound'
  const Page = PAGES[key] ?? NotFound

  useEffect(() => {
    const meta = site.pages[key]
    document.documentElement.lang = lang
    document.title = t(meta, 'title', lang)
    document.querySelector('meta[name="description"]')?.setAttribute('content', t(meta, 'description', lang))
  }, [key, lang])

  useEffect(() => {
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [location])

  return (
    <Layout lang={lang} setLang={setLang} route={route}>
      <Page lang={lang} />
    </Layout>
  )
}
