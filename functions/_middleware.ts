export async function onRequest(context: any) {
    console.log('onRequest middleware');
    try {
        return await context.next();
    } catch (err: any) {
        return new Response(`${err.message}\n${err.stack}`, { status: 500 });
    }
}
