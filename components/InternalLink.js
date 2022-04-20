import { Link } from "@chakra-ui/react"
import NextLink from "next/link"

const InternalLink = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  )
}

export default InternalLink
