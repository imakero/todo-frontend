import { HStack, IconButton, ListItem } from "@chakra-ui/react"
import InternalLink from "./InternalLink"
import { GrTrash } from "react-icons/gr"

const Attachment = ({ attachment, onDelete }) => {
  return (
    <ListItem>
      <HStack justify="space-between">
        <InternalLink href={attachment.path}>
          {attachment.filename}
        </InternalLink>
        <IconButton
          icon={<GrTrash />}
          variant="ghost"
          colorScheme="red"
          onClick={() => onDelete(attachment._id)}
        />
      </HStack>
    </ListItem>
  )
}

export default Attachment
