import { Button, HStack, ListItem } from "@chakra-ui/react"
import InternalLink from "./InternalLink"
import { GrTrash } from "react-icons/gr"

const Attachment = ({ attachment }) => {
  return (
    <ListItem>
      <HStack justify="space-between">
        <InternalLink href={attachment.path}>
          {attachment.filename}
        </InternalLink>
        <Button variant="ghost">
          <GrTrash />
        </Button>
      </HStack>
    </ListItem>
  )
}

export default Attachment
