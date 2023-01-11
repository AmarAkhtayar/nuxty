<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>MakeUp store</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="align-items-center">
            <b-nav-item> <nuxt-link to="/">Home</nuxt-link></b-nav-item>
            <b-nav-item-dropdown class="cat-parent" text="Categories" right>
              <b-dropdown-item>
                <nuxt-link to="/products/lipstick">lipstick</nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link to="/products/eyeliner">Eyeliner</nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link to="/products/lip_liner">lip liner</nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <nuxt-link to="/products/foundation">foundation</nuxt-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              > -->
            </b-nav-form>
            <b-button id="toggle-btn" @click="toggleModal"
              ><b-icon icon="cart4"></b-icon>
              <span class="items-num">{{ itemsNumber }}</span></b-button
            >
            <b-modal ref="my-modal" hide-footer title="Shopping Cart">
              <div class="container-fluid">
                <div
                  class="row align-items-center mb-3"
                  v-for="(item, i) in cartItems"
                  :key="i"
                >
                  <div class="col-6">
                    <img :src="item.api_featured_image" alt="" class="w-100" />
                  </div>
                  <div class="col-6">
                    <h4 class="title" style="font-size: 15px">
                      {{ item.name }}
                    </h4>
                    <h4 class="desc" style="font-size: 15px">
                      {{
                        item.description.length > 100
                          ? item.description.split('').slice(0, 100).join('') +
                            '...'
                          : item.description
                      }}
                    </h4>
                    <span>{{ item.itemsNum }}</span>
                    <button @click="deleteItem(i)">Delete</button>
                  </div>
                </div>
              </div>
            </b-modal>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted() {
    if (localStorage.getItem('cart-items')) {
      const localStorageData = JSON.parse(localStorage.getItem('cart-items'))
      this.doCheckLocalStorage(localStorageData)
      this.calcNumber()
    }
  },
  computed: {
    ...mapState(['cartItems', 'itemsNumber']),
  },
  methods: {
    ...mapActions(['doDeleteItem', 'doCheckLocalStorage', 'calcNumber']),
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    deleteItem(i) {
      this.doDeleteItem(i);
      this.calcNumber()
    }
  },
}
</script>
<style lang="scss">
header {
  background: rgb(0, 219, 146);
}

.logo,
li a {
  padding: 1em 2em;
  display: block;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  color: white;
  font-size: 0.9em;
}
/* nav {
        justify-self: right;
    } */
ul {
  list-style-type: none;
}
li {
  display: inline;
}
li a {
  padding: 1em 2em;
  display: inline-block;
}
.modal-dialog {
  height: 90vh;
}
.modal-content {
  height: 100%;
  overflow-y: auto;
}
a:hover {
  color: unset;
  text-decoration: none;
}
.dropdown-item {
  a {
    color: black;
  }
}
</style>
