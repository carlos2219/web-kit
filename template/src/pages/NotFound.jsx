import { site, t } from '../content/site'
import Link from '../components/Link'

export default function NotFound({ lang }) {
  const { notFound } = site
  return (
    <section className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="mb-6 font-mono text-sm tracking-wide text-muted">404</p>
      <h1 className="page-title">{t(notFound, 'heading', lang)}</h1>
      <Link href="/" className="mt-10 inline-block text-accent underline underline-offset-4 hover:text-paper">
        {t(notFound, 'link', lang)}
      </Link>
    </section>
  )
}
