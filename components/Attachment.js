import { HStack, IconButton, ListItem, Text } from "@chakra-ui/react"
import { GrDownload, GrTrash } from "react-icons/gr"
import { getAuthToken } from "../lib/auth"

const Attachment = ({ attachment, onDelete }) => {
  const download = async (filename) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/attachments/${attachment._id}`,
      { headers: { Authorization: `Bearer ${getAuthToken()}` } }
    )
    const blob = await res.blob()

    var a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.setAttribute("target", "_blank")
    a.setAttribute("download", filename)
    a.click()
  }

  return (
    <ListItem>
      <HStack justify="space-between">
        <Text
          href={`/downloads/6264612074a75995c904b2d3/62646d78d50e2850b5f96c76/`}
          cursor="pointer"
          onClick={() => download(attachment.filename)}
        >
          {attachment.filename}
        </Text>
        <HStack>
          <IconButton
            icon={<GrDownload />}
            variant="ghost"
            onClick={() => download(attachment.filename)}
          />
          <IconButton
            icon={<GrTrash />}
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(attachment._id)}
          />
        </HStack>
      </HStack>
    </ListItem>
  )
}

export default Attachment
