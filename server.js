
import express from 'express'
import { Liquid } from 'liquidjs';

// const likesBaseUrl = 'https://fdnd-agency.directus.app/items/milledoni_users/9?fields=*.*'
// const apiResponse = await fetch('https://fdnd-agency.directus.app/items/milledoni_products')
// const apiResponseJSON = await apiResponse.json()

const app = express()
app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')
app.use(express.urlencoded({ extended: true }))

// MARK: Home
app.get('/', async function (request, response) {
    // Geef hier eventueel data aan mee
    const likesResponse = await fetch(likesBaseUrl)
    const likesResponseJSON = await likesResponse.json()
    const savedGifts = likesResponseJSON.data.saved_products; // array met gift-ids
  
  
    const allProducts = apiResponseJSON.data;
  
    const items = checkSavedGifts(allProducts, savedGifts)
  
    // console.log(items);
    response.render('index.liquid', { items: items })
  })
  
  function checkSavedGifts(allProducts, savedGifts) {
    // Deze functie geeft alle producten terug maar voegt een property toe 'is_saved'
    // waarmee je kan checken of een product gesaved is of niet.
  
    // We maken een simpele array van savedGifts; a la [20, 32] etc.
    const simpleSavedGifts = savedGifts.map(gift => {
      return gift.milledoni_products_id
    })
    // Voor alle cadeaus willen we checken of het id bestaat in de savedGifts 
    // array onder de property milledoni_products_id.
    // We voegen aan elk product de property is_saved toe, en op basis van de bovenstaande
    // condition is die true of false.
    const newArray = allProducts.map(product => {
  
      product.is_saved = simpleSavedGifts.includes(product.id)
      return product
    });
    return newArray
  }

app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })


  // MARK: detail
  app.get('/cadeau/:slug', async function (request, response) {
    const slug = request.params.slug;
    const apiResponseCadeau = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products?filter={"slug":"${slug}"}&limit=1`)
  
    const apiResponseCadeauJSON = await apiResponseCadeau.json()
  
    if (apiResponseCadeauJSON.data[0]) {
      response.render('cadeau.liquid', { item: apiResponseCadeauJSON.data[0], items: apiResponseJSON.data })
    } else {
      response.render('404.liquid');
    }
  })


    // MARK: favorite
    app.get('/favourite', async function (request, response) {
        // Fetch user data with saved products
        const favouriteResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_users/?fields=*.*&filter[id][_eq]=9`);
        const favouriteResponseJSON = await favouriteResponse.json();
      
        // Extract saved product IDs
        const savedProducts = favouriteResponseJSON.data[0].saved_products;
        const productIds = [...new Set(savedProducts.map(item => item.milledoni_products_id))]; // Remove duplicates
      
        // Fetch product details for each product ID
        const products = await Promise.all(productIds.map(async (productId) => {
          const productResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products/${productId}`);
          const productData = await productResponse.json();
          productData.data.is_saved = true
          return productData.data;
        }));
      
        // Render the template with fetched product details
        response.render("favourite.liquid", {
          favourites: products
        });
      });
      
      
      //  zo zou ik ook cadeaus kunnen ophalen op basis van of ze gesaved zijn of niet.
      function returnSavedGifts(allProducts, savedGifts) {
        // deze functie geeft alleen de cadeaus terug die gesaved zijn
        const simpleSavedGifts = savedGifts.map(gift => {
          return gift.milledoni_products_id
        })
        const newSavedGifts = allProducts.filter(product => {
      
          if (simpleSavedGifts.includes(product.id)) {
            return product
          }
        });
        return newSavedGifts
      }
      
      
      const savedProductsUrl = 'https://fdnd-agency.directus.app/items/milledoni_users_milledoni_products'
      
      // Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
      
      app.post('/:itemId', async function (request, response) {
        const itemId = request.params.itemId;
        const isSaved = request.body.liked_status
      
        const filterString = `?filter={"milledoni_users_id":"${request.body.milledoni_users_id}","milledoni_products_id":"${itemId}"}`
        const findGift = await fetch(savedProductsUrl + filterString)
        const foundId = await findGift.json()
        
      
        if (isSaved) {
          await fetch(savedProductsUrl + '/' + foundId.data[0].id, {
            method: 'DELETE',
              headers: {
              'Content-Type': 'application/json;charset=UTF-8'
              }
          });
      
        } else {
          await fetch(`${savedProductsUrl}?limit=-1`, {
            method: 'POST',
            body: JSON.stringify({
              milledoni_products_id: request.body.milledoni_products_id,
              milledoni_users_id: request.body.milledoni_users_id
            }),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          })
        }
      
        response.redirect(303, '/#' + itemId);
      });


  // MARK: 404
      app.use((req, res, next) => {
        res.status(404).render("404.liquid")
      })