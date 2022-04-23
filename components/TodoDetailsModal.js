import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Heading,
  HStack,
  Input,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import { GrTextAlignFull, GrAttachment } from "react-icons/gr"
import { BiTask } from "react-icons/bi"
import Attachment from "./Attachment"

const TodoDetailsModal = ({ todo, isOpen, onClose }) => {
  const [title, setTitle] = useState(todo.title)
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [content, setContent] = useState(todo.content)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              <BiTask />
              <Editable
                fontSize="lg"
                fontWeight="bold"
                value={title}
                onChange={setTitle}
              >
                <EditableInput />
                <EditablePreview />
              </Editable>
            </HStack>
            <Divider my={2} />
            <HStack>
              <GrTextAlignFull />
              <Heading fontSize="lg">Content</Heading>
              {isEditingContent ? (
                <Button onClick={() => setIsEditingContent(false)}>
                  Confirm
                </Button>
              ) : (
                <Button onClick={() => setIsEditingContent(true)}>Edit</Button>
              )}
            </HStack>
            <Box
              ml={6}
              my={2}
              onClick={() => setIsEditingContent((previous) => !previous)}
            >
              {!isEditingContent ? (
                <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
                  {content}
                </ReactMarkdown>
              ) : (
                <Textarea
                  value={content}
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  onChange={(event) => setContent(event.target.value)}
                  onBlur={() => setIsEditingContent(false)}
                ></Textarea>
              )}
            </Box>
            <Divider my={2} />
            <HStack>
              <GrAttachment />
              <Heading fontSize="lg">Attachments</Heading>
            </HStack>
            <Box ml={6}>
              <List>
                {todo.attachments.map((attachment) => (
                  <Attachment key={attachment._id} attachment={attachment} />
                ))}
              </List>
              <HStack>
                <Input type="file" />
                <Button>Upload</Button>
              </HStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TodoDetailsModal
