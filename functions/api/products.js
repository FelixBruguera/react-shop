import data from '../../src/data/data.json'

export function onRequestGet(request) {
    let products = data
    const params = new URL(request.request.url).searchParams
    const page = params.get('page') || 1
    const minPrice = parseInt(params.get('min'))
    const maxPrice = parseInt(params.get('max'))
    const category = params.get('category')
    const sort = params.get('sortBy')
    if (minPrice > 0 || maxPrice < 1000 || category !== 'all') {
        products = data.filter(product => product.price >= minPrice && product.price <= maxPrice && product.category.slug === category)
    }
    if (sort !== 'category') {
        switch(sort) {
            case 'lowest': 
                products = products.toSorted((a,b) => a.price - b.price)
                break
            
            case 'highest': 
                products = products.toSorted((a,b) => b.price - a.price)
                break
            
            case 'name': 
                products = products.toSorted((a, b) => {
                    if (a.title < b.title) {
                      return -1;
                    }
                    if (a.title > b.title) {
                      return 1;
                    }
                    return 0;
                  });
                  
                break
        }
    }
    const startingIndex = (page*10) - 10
    const response = {
        'products':  products.slice(startingIndex, startingIndex+10),
        'info': {"pages": Math.ceil(products.length/10)}
    }

    return Response.json(response)
}