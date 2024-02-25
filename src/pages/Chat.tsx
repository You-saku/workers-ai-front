import {
    Box,
    Button,
    Center,
    FormControl,
    FormErrorMessage,
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
    const [input, setInput] = useState<string>('')
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [validateErrorMessage, setValidateErrMessage] = useState<string|null>(null)
    const [response, setResponse] = useState('')

    const chat = async () => {
        let validatedInput = "";
        try {
            validatedInput = ChatSchema.parse(input);
            setIsInvalid(false);
        } catch (err: any) {
            if (err instanceof ZodError) {
                setValidateErrMessage(err.format()._errors[0]);
                setIsInvalid(true);
                return
            }
        }
        const res = await cloudflareWorkersAI(validatedInput);

        setResponse(res)
        setInput('')
    }

    return (
      <div>
        <Center>
            <Flex direction='column'>
                <Box>
                    <Text fontSize='3xl'>Chat with Cloudflare Workers AI</Text>
                    <Text fontWeight="medium">Your Question</ Text>
                    <FormControl isInvalid={isInvalid} marginBottom={'1rem'}>
                        <Flex direction={'row'}>
                            <Input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
                            <Button colorScheme='orange' marginLeft={'0.5rem'} type="submit" onClick={chat}>Submit</Button>
                        </Flex>
                        {validateErrorMessage && <FormErrorMessage>{validateErrorMessage}</FormErrorMessage>}
                        <FormHelperText>Please type what you want to ask(Only English)</FormHelperText>
                    </FormControl>
                </Box>
                <Box>
                    <Text fontWeight="medium">Workers AI Answer</ Text>
                    {response && <Box maxW={'27rem'} p={'0.5rem'} border={'1px'}>{response}</Box>}
                </Box>
            </Flex>
        </Center>
      </div>
    )
  }
