import { site, t } from '../content/site'

export default function Home({ lang }) {
  const { home } = site
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="page-title max-w-3xl">{t(home, 'title', lang)}</h1>
    </section>
  )
}
