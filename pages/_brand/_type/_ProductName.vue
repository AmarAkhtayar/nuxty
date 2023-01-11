<template>
  <div class="parent">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <img
            class="w-100"
            style="border-radius: 16px"
            :src="myProduct.api_featured_image"
            alt=""
          />
        </div>
        <div class="col-6">
          <h3>{{ myProduct.name }}</h3>
          <p v-for="tags in myProduct.tag_list" :key="tags.id">
            <span>
              <b-icon icon="check-square" variant="success"></b-icon>
            </span>
            {{ tags }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { IconsPlugin } from 'bootstrap-vue'

export default {
  components: {
    IconsPlugin,
  },
  data() {
    return {
      productData: '',
      myProduct: '',
    }
  },
  methods: {
    ...mapActions(['getProductDetails']),
  },
  computed: {
    ...mapState(['productInfo']),
  },
  async mounted() {
    const payload = {
      brand: this.$route.params.brand,
      type: this.$route.params.type,
    }
    await this.getProductDetails(payload)
    const filterProduct = this.productInfo.filter(
      (el) => el.name === this.$route.params.ProductName
    )[0]
    this.myProduct = filterProduct
    console.log('filterProduct', filterProduct)
  },
}
</script>
