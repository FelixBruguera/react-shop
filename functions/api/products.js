import data from '../../src/data/data.json'

export function onRequestGet(request) {
    let products = data
    const params = new URL(request.request.url).searchParams
    const page = params.get('page') || 1
    const minPrice = parseInt(params.get('min')) || 0
    const maxPrice = parseInt(params.get('max')) || 1000
    const category = params.get('category') || 'all'
    if (category === 'all') {
        products = data.filter(product => product.price >= minPrice && product.price <= maxPrice)
    }
    else {
        products = data.filter(product => product.price >= minPrice && product.price <= maxPrice && product.category.slug === category)
    }
    const startingIndex = (page*10) - 10
    const response = {
        'products':  products.slice(startingIndex, startingIndex+10),
        'info': {"pages": Math.ceil(products.length/10)}
    }

    return Response.json(response)
}