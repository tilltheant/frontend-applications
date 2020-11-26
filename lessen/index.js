var app = new Vue ({
el: '#app',
data: {
  product: 'sokken gemaakt van otters',
  text: 'Maat',
  image: './assets/otters.jpg',
  link: 'https://genshin.gg/characters/Beidou',
  inventory: 0,
  onSale: false,
  details: ["Real fur", "Home-made"],
  variants: [
    {
      variantId: 2234,
      variantColor: "een otter",
      variantImage: './assets/otters.jpg'
    },
    {
      variantId: 2235,
      variantColor: "twee otters",
      variantImage: './assets/otters2.jpg'
    }
  ],
  size: [
    {
      sizeId: 50,
      sizeList: 50
    },
    {
      sizeId: 49,
      sizeList: 49
    },
    {
      sizeId: 48,
      sizeList: 48
    },
  ],
  cart: 0
  },
methods: {
  addtoCart() {
    this.cart += 1
  },
  updateProduct(variantImage){
    this.image = variantImage
  }
},



})
