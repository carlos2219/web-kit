// Source of truth for all visible copy. Every string is a set of fields <key>_<lang>, one per LANGS; read with t().
export const LANGS = ['es', 'en']
export const t = (obj, key, lang) => obj[`${key}_${lang}`]

export const site = {
  brand: '__NAME__',
  // Per-page <title> and meta description, keyed like ROUTES in src/router.js.
  pages: {
    home: {
      title_es: '__NAME__',
      title_en: '__NAME__',
      description_es: 'web-kit:placeholder',
      description_en: 'web-kit:placeholder',
    },
    notFound: {
      title_es: 'Página no encontrada — __NAME__',
      title_en: 'Page not found — __NAME__',
      description_es: 'La página que buscas no existe.',
      description_en: 'The page you are looking for does not exist.',
    },
  },
  nav: {
    label_es: 'Principal',
    label_en: 'Main',
    menu_es: 'Menú',
    menu_en: 'Menu',
    langs_es: 'Idioma',
    langs_en: 'Language',
  },
  home: {
    title_es: 'web-kit:placeholder',
    title_en: 'web-kit:placeholder',
  },
  notFound: {
    heading_es: 'Esta página no existe.',
    heading_en: 'This page doesn’t exist.',
    link_es: 'Volver al inicio',
    link_en: 'Back to home',
  },
}
