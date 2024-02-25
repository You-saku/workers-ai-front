export const cloudflareWorkersAI = async (input: string) => {
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

    return res
}
