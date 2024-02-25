import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    FormHelperText,
    Flex,
    Input,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ZodError } from 'zod';
import { ChatSchema } from '../schemas/chatSchema';
import { cloudflareWorkersAI } from '../hooks/cloudflare-workers-ai';

export default function Chat() {
    const [input, setInput] = useState('')
    const [validated, setValidated] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [validateErrorMessage, setValidateErrMessage] = useState<string|null>(null)
    const [response, setResponse] = useState('')

    const chat = async () => {
        setIsValid(false)

        try {
            const validated = ChatSchema.parse(input);
            setValidated(validated)
        } catch (err: any) {
            if (err instanceof ZodError) {
                setValidateErrMessage(err.format()._errors[0])
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
        <Center>
            <Flex direction='column' align='center' justify='center'>
                <Text fontSize='3xl'>Chat with Cloudflare Workers AI</Text>
                <FormControl isInvalid={isValid}>
                    <FormLabel>Input</FormLabel>
                    <Input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
                    {validateErrorMessage && <FormErrorMessage>{validateErrorMessage}</FormErrorMessage>}
                    <FormHelperText>Please type what you want to ask(Only English)</FormHelperText>
                </FormControl>
                <Button colorScheme='orange' size='md' type="submit" m={'1rem'} onClick={chat}>Submit</Button>
                <Text>Output</Text>
                {response && <Box maxW={'24rem'} p={'0.5rem'} border={'1px'}>{response}</Box>}
            </Flex>
        </Center>
      </div>
    )
  }
