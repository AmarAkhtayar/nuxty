<template>
  <div>
    <h1>Hallo from about page</h1>
    <div class="movie" v-for="(movie, index) in movies" :key="index">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
   data () {
    return {
      movies: []
    }
  },
  head() {
    return {
      title: 'About Page',
      meta: [{ name: 'description', content: 'This is my about page' }],
    }
  },
  async fetch () {
    await this.getMovies()
  },
  methods: {
    async getMovies () {
      const data = axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=bc02c5e8b01df103a3545056d57e9b59&language=en-US&page=1'
      )
      // https://api.themoviedb.org/3/movie/550?api_key=bc02c5e8b01df103a3545056d57e9b59

      const result = await data
      // console.log(result.data)
      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })
      console.log(this.movies)
    }
}
}
</script>