import data from '../../../src/data/data.json'

export function onRequestGet(request) {
    const slug = request.params.slug[0]
    const product = data.find(prod => prod.slug === slug)
    if (product) {
        return Response.json(product)
    }
    else {
        return new Response(JSON.stringify({error: 'Not found'}), {status: 404})
    }
}