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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChatSchema } from '../schemas/chatSchema';
import { cloudflareWorkersAI } from '../hooks/cloudflare-workers-ai';

export default function Chat() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(ChatSchema)
    });

    const [question, setQuestion] = useState<string>('')
    const [response, setResponse] = useState('')

    const chat = async () => {
        const res = await cloudflareWorkersAI(question);
        setResponse(res)
        setQuestion('')
    }

    return (
      <div>
        <Center>
            <Flex direction='column'>
                <Box>
                    <Text fontSize='3xl'>Chat with Cloudflare Workers AI</Text>
                    <Text fontWeight="medium">Your Question</ Text>
                    <form onSubmit={handleSubmit(chat)}>
                        <FormControl isInvalid={Boolean(errors.question)} marginBottom={'1rem'}>
                            <Flex direction={'row'}>
                                <Input
                                    type='text'
                                    value={question}
                                    placeholder='What Cloudflare Workers AI ？'
                                    {...register('question')}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                                <Button colorScheme='orange' type="submit" marginLeft={'0.5rem'}>
                                    <Text size={'sm'} p={'1rem'}>Send</Text>
                                </Button>
                            </Flex>
                            {errors.question?.message && <FormErrorMessage><>{errors.question?.message}</></FormErrorMessage>}
                            <FormHelperText>Please type what you want to ask(Only English)</FormHelperText>
                        </FormControl>
                    </form>
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
