<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12 col-sm-6 col-lg-4 mb-4"
        v-for="product in makeupProducts"
        :key="product.id"
      >
        <div>
          <!--  :title='product.name' this is attribute -->

          <b-card
            :title="
              product.name.length <= 20
                ? product.name
                : product.name.split('').splice(0, 20).join('') + '...'
            "
            :img-src="product.api_featured_image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mx-auto mx-sm-0"
          >
            <span
              v-for="(color, index) in product.product_colors"
              :key="index"
              :style="`background: ${color.hex_value}; ${
                index > 7 ? 'display:none' : 'display:inline-block'
              }; width:15px ; height:15px ; margin-right:5px; border-radius:50%`"
            >
            </span>
            <b-card-text>
              {{
                product.description.length > 100
                  ? product.description.split('').slice(0, 100).join('') + '...'
                  : product.description
              }}
            </b-card-text>
            <!-- @click="goToDetails(product.brand, product.product_type)"  -->
            <div class="btns-parent">
              <b-button pill variant="info" href="#" class="mr-3">
                <nuxt-link
                  :to="`/${product.brand}/${product.product_type}/${product.name}`"
                  >Product Info</nuxt-link
                >
              </b-button>
              <b-button
                @click="doAddToCart(product)"
                pill
                variant="outline-secondary"
                >Add To Cart</b-button
              >
            </div>
          </b-card>
        </div>
      </div>
    </div>

    <!-- <Tutorial /> -->
  </div>
  <!-- <Tutorial /> -->
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'Home Page',
      meta: [{ name: 'description', content: 'This is my home page' }],
    }
  },
  data() {
    return {
      makeupProducts: [],
    }
  },
  computed: {
    ...mapState(['makeupData', 'cartItems']),
  },
  methods: {
    ...mapActions(['getAllMakepus', 'doAddItem', 'calcNumber']),
    doAddToCart(product) {
      console.log("add product product", product)
            console.log("cart items", this.cartItems)

      this.doAddItem(product)
      this.calcNumber();
    },
    // goToDetails(brand, type) {
    //   this.$router.push(`/${brand}/${type}`)
    // },
  },
  async mounted() {
    if (this.makeupData) {
      this.makeupProducts = this.makeupData
    } else {
      await this.getAllMakepus();
      this.makeupProducts = this.makeupData
      console.log(this.makeupProducts)
    }
  },
}
</script>
<style lang="scss">
* {
  font-family: cursive;
}
img {
  height: 200px;
  object-fit: cover;
}
.card {
  h4 {
    font-size: 22px;
  }
  .card-text {
    line-height: 1.3;
    font-size: 14px;
    color: #747474;
  }
  .btns-parent {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    button {
      font-size: 13px;
    }
    a {
      color: #fff;
      text-decoration: none;
      font-size: 13px;
    }
  }
}
</style>
