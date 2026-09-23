import { navigate } from '../router'

// In-app link: plain <a> (works without JS, middle-click opens a tab), navigates without reload on normal click.
export default function Link({ href, children, ...rest }) {
  function handleClick(e) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(href)
  }
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export function MoreLink({ href, children }) {
  return (
    <Link href={href} className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-paper">
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  )
}
