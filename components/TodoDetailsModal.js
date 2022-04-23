import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  HStack,
  Input,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import { GrTextAlignFull, GrAttachment } from "react-icons/gr"
import { BiTask } from "react-icons/bi"
import Attachment from "./Attachment"
import { useMutation, useQueryClient } from "react-query"
import {
  addTodoAttachment,
  removeTodoAttachment,
  updateTodo,
} from "../lib/apiWrappers"

const TodoDetailsModal = ({ todo, isOpen, onClose }) => {
  const [title, setTitle] = useState(todo.title)
  const [titleError, setTitleError] = useState(null)
  const [contentError, setContentError] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [attachment, setAttachment] = useState("")
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [content, setContent] = useState(todo.content)
  const queryClient = useQueryClient()

  const invalidateTodos = () => {
    queryClient.invalidateQueries("todos")
  }

  const todoTitleMutation = useMutation(updateTodo, {
    onSuccess: invalidateTodos,
  })
  const todoContentMutation = useMutation(updateTodo, {
    onSuccess: invalidateTodos,
  })
  const attachmentDeletionMutation = useMutation(removeTodoAttachment, {
    onSuccess: invalidateTodos,
  })
  const attachmentUploadMutation = useMutation(addTodoAttachment, {
    onSuccess: invalidateTodos,
  })

  const handleTitleSubmit = () => {
    todoTitleMutation.mutate(
      { todoId: todo._id, update: { title } },
      {
        onSuccess: (data) => {
          if (data.error) {
            setTitleError(data.error.data?.validationErrors?.title)
            setTitle(todo.title)
          } else {
            setTitleError(null)
          }
        },
      }
    )
  }

  const handleContentSubmit = () => {
    setIsEditingContent(false)
    todoContentMutation.mutate(
      {
        todoId: todo._id,
        update: { content, title },
      },
      {
        onSuccess: (data) => {
          if (data.error) {
            setContentError(data.error.data?.validationErrors?.title)
          } else {
            setContentError(null)
          }
        },
      }
    )
  }

  const handleDeleteAttachment = (attachmentId) => {
    attachmentDeletionMutation.mutate({
      todoId: todo._id,
      attachmentId,
    })
  }

  const handleAttachmentSubmit = (event) => {
    event.preventDefault()

    if (!attachment) {
      return
    }

    attachmentUploadMutation.mutate(
      {
        todoId: todo._id,
        attachment,
      },
      {
        onSuccess: (data) => {
          if (data.error) {
            setUploadError(data.error.message)
          } else {
            console.log("not an error")
            setAttachment("")
            setUploadError(null)
          }
        },
      }
    )
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start">
              <HStack>
                <BiTask />
                <Editable
                  fontSize="lg"
                  fontWeight="bold"
                  value={title}
                  onChange={setTitle}
                  onSubmit={handleTitleSubmit}
                >
                  <EditableInput />
                  <EditablePreview />
                </Editable>
              </HStack>
              {titleError && <Text color="red.300">{titleError}</Text>}
            </VStack>
            <Divider my={2} />
            <HStack>
              <GrTextAlignFull />
              <Heading fontSize="lg">Content</Heading>
              {isEditingContent && (
                <Button onClick={handleContentSubmit}>Confirm</Button>
              )}
            </HStack>
            <Box
              ml={6}
              my={2}
              onClick={() => !isEditingContent && setIsEditingContent(true)}
            >
              {!isEditingContent && content ? (
                <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
                  {content}
                </ReactMarkdown>
              ) : (
                <Textarea
                  value={content}
                  onClick={(event) => {
                    event.stopPropagation()
                    setIsEditingContent(true)
                  }}
                  placeholder="Add a detailed description of this todo."
                  onChange={(event) => setContent(event.target.value)}
                  onBlur={handleContentSubmit}
                ></Textarea>
              )}
            </Box>
            <Divider my={2} />
            <HStack>
              <GrAttachment />
              <Heading fontSize="lg">Attachments</Heading>
            </HStack>
            <Box ml={6}>
              <List mb={2}>
                {todo.attachments.map((attachment) => (
                  <Attachment
                    key={attachment._id}
                    attachment={attachment}
                    onDelete={handleDeleteAttachment}
                  />
                ))}
              </List>
              <form onSubmit={handleAttachmentSubmit}>
                <VStack>
                  <HStack>
                    <Input
                      type="file"
                      onChange={(event) => setAttachment(event.target.files[0])}
                    />
                    <Button type="submit">Upload</Button>
                  </HStack>
                  {uploadError && <Text color="red.300">{uploadError}</Text>}
                </VStack>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TodoDetailsModal
