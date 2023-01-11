<template>
  <div class="parent">
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-sm-6 col-lg-4 mb-4"
          v-for="product in products"
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
                    ? product.description.split('').slice(0, 100).join('') +
                      '...'
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
    </div>
    <!-- {{ $route.params.type }} -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      products: [],
    }
  },
  computed: {
    ...mapState(['productCategories', 'cartItems']),
  },
  methods: {
    ...mapActions(['getCatProducts', 'doAddItem', 'calcNumber']),
    doAddToCart(product) {
      this.doAddItem(product)
      this.calcNumber()
    }
  },
  async mounted() {
    await this.getCatProducts(this.$route.params.type)
    this.products = this.productCategories
    console.log(this.products)
  },
}
</script>

<style></style>
