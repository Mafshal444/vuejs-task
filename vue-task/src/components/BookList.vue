<template>
  <div>
    <b-table 
      striped hover 
      :current-page="currentPage"
      :items="bookList"
      :fields="fields"
      per-page=5
    >
    <template v-slot:cell(action)="data">
      <div style="display: flex; justify-content: space-evenly;">
        <div>
          <b-button variant="primary" size="sm" class="mb-2" @click="updateBook(data), $event.preventDefault()">
            EDIT
          </b-button>
        </div>
        <div>
          <b-button variant="danger" size="sm" class="mb-2" @click="deleteBook(data), $event.preventDefault()">
            DELETE
          </b-button>
        </div>
      </div>
    </template>
    <template #table-caption>BooKStore.</template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="bookList.length"
      per-page=5
    ></b-pagination>
  </div>
</template>

<script>
import axios from "axios";
// import { LAMT_API } from "../api"
export default {
  name: "booklist",
  data(){
    return {
      fields: ['id', 'title', 'description', 'due_date', 'status', 'action'],
      books: [],
      currentPage: 1
    }
  },
  computed: {
    bookList(){
      return this?.books?.data?.books ?? []
    }
  },
  methods: {
    async getBooks(){
      try{
      let data = await axios.get(process.env.VUE_APP_BASE_URL)
      this.books = data;
      console.log("books", this.books)
      } catch(err){
        console.log("error", err)
      }
    },
    async deleteBook(data){
      try{
        console.log("deleteBook", data)
        await axios.delete(`${process.env.VUE_APP_BASE_URL}?id=${data?.item?.id}`)
        this.getBooks()
      } catch(err){
        console.log("error", err)
      }

    },
    updateBook(data){
      this.$root.$emit("updateBook", {payload: data})
    }
  },
  async mounted(){
    try{
      this.getBooks()
      this.$root.$on("bookAdded", this.getBooks)
      this.$root.$on("bookupdated", this.getBooks)
    } catch(err){
      console.log("error", err)
    }
  },
  beforeDestroy(){
    this.$root.$off("bookAdded", this.getBooks)
    this.$root.$off("bookupdated", this.getBooks)
  }
}
</script>

<style>

</style>