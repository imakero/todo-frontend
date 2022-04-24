import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"

const TagList = ({ tags, onDelete }) => {
  return (
    <HStack>
      {tags.map((tag) => (
        <Tag
          size="md"
          key={tag._id}
          borderRadius="full"
          variant="outline"
          colorScheme="green"
        >
          <TagLabel>{tag.text}</TagLabel>
          {onDelete && <TagCloseButton onClick={() => onDelete(tag._id)} />}
        </Tag>
      ))}
    </HStack>
  )
}

export default TagList
