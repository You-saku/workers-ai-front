import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    FormHelperText, 
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ZodError, z } from 'zod';
import  { cloudflareWorkersAI } from '../hooks/cloudflare-workers-ai';

export default function Chat() {
    const [input, setInput] = useState('')
    const [validated, setValidated] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [errorMessage, setErrMessage] = useState<string|null>(null)
    const [response, setResponse] = useState('')

    const ChatSchema = z.string().min(1, { message: 'Please input more than 1 character.' });

    const chat = async () => {
        setIsValid(false)

        try {
            const validated = ChatSchema.parse(input);
            setValidated(validated)
        } catch (err: any) {
            if (err instanceof ZodError) {
                setErrMessage(err.format()._errors[0])
                setIsValid(true)
                return
            }
        }

        const res = await cloudflareWorkersAI(validated);

        setResponse(res)
        setInput('')
    }

    return (
      <div>
        <Center py={6}>
            <VStack spacing={6}>
            <Text fontSize='3xl'>Chat with Cloudflare Workers AI</Text>
            <FormControl isInvalid={isValid}>
                <FormLabel>Input</FormLabel>
                <Input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
                {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
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
