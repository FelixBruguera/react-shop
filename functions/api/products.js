import data from '../../src/data/data.json'

export function onRequestGet(request) {
    const params = new URL(request.request.url).searchParams
    const page = params.get('page') || 1
    const startingIndex = (page*10) - 10
    const response = {
        'products':  data.slice(startingIndex, startingIndex+10),
        'info': {"pages": data.length/10}
    }

    return Response.json(response)
}