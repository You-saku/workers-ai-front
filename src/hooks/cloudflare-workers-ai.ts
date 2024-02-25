export const cloudflareWorkersAI = async (question: string) => {
    const answer = await fetch(process.env.REACT_APP_CLOUDFLARE_WORKERS_AI_API || "", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                prompt: question
        })
    }).then(response => response.json())
    .then(data => data.response)
    .catch(err => console.error(err))

    return answer
}
