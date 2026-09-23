// Client-side routes: path → page key (also the key into site.pages).
// ponytail: pushState router, no deps; move to a router lib if routes need params or nesting.
export const ROUTES = {
  '/': 'home',
}

export function matchRoute(pathname) {
  const path = pathname.toLowerCase().replace(/\/+$/, '') || '/'
  return path in ROUTES ? path : null
}

export function navigate(href) {
  window.history.pushState(null, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
