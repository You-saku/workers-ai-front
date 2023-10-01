import React, { useState } from 'react'
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, 
    Input,
    Text,
    VStack,
} from '@chakra-ui/react'

export default function ChatPage() {
    const [input, setInput] = useState('')
    const [response, setResponse] = useState('')

    const chat = async () => {
        console.log(input)

        const res = await fetch(process.env.REACT_APP_CLOUDFLAWE_WORKERS_AI_API || "", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    prompt: input
            })
        }).then(res => res.json())
        .then(data => data.response)
        .catch(err => console.log(err))

        console.log(res)

        setResponse(res)
        setInput('')
    }

    return (
      <div>
        <Center py={6}>
            <VStack spacing={6}>
            <Text fontSize='3xl'>Chat with Cloudflare Workers AI</Text>
            <FormControl>
                <FormLabel>Input</FormLabel>
                <Input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
                <FormHelperText>Please type what you want to ask(Only English)</FormHelperText>
            </FormControl>
            <Button colorScheme='orange' size='md' type="submit" onClick={chat}>Submit</Button>
            <FormControl isReadOnly={true}>
                <FormLabel>Output</FormLabel>
            </FormControl>
            <Box maxW="500px">{response}</Box>
            </VStack>
        </Center>
      </div>
    )
  }