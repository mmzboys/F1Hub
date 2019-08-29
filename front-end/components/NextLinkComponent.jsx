import Link from 'next/link'
import Button from '@material-ui/core/Button'

const NextLinkComponent = ({ className, href, hrefAs, children, prefetch }) => (
  <Link href={href} as={hrefAs} prefetch>
    <a className={className}>
      {children}
    </a>
  </Link>
)

export default NextLinkComponent