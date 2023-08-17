<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: flex-start; align-content: stretch; flex-direction: column;">
      <div style="width: 55%; padding: 15px;">
        <b-form-input
          id="input-live"
          v-model="book.form.title"
          placeholder="Enter Book Title"
          trim
        ></b-form-input>
        <p v-if="book.form.submitted && $v.book.form.title.$invalid">
					<span v-if="!$v.book.form.title.required">Title is required</span>
				</p>
      </div>
      <div style="width: 55%; padding: 15px;">
        <b-form-input
          id="input-live"
          v-model="book.form.description"
          placeholder="Enter Book Description"
          trim
        ></b-form-input>
        <p v-if="book.form.submitted && $v.book.form.description.$invalid">
					<span v-if="!$v.book.form.description.required">Description is required</span>
				</p>
      </div>
      <div style="width: 55%; padding: 15px;">
        <b-form-input
          id="input-live"
          v-model="book.form.due_date"
          placeholder="Enter Book Due Date"
          trim
        ></b-form-input>
        <p v-if="book.form.submitted && $v.book.form.due_date.$invalid">
					<span v-if="!$v.book.form.due_date.required">Due Date is required</span>
				</p>
      </div>
      <div style="width: 55%; padding: 15px;">
        <b-form-select v-model="book.form.status" :options="options"></b-form-select>
        <p v-if="book.form.submitted && $v.book.form.status.$invalid">
					<span v-if="!$v.book.form.status.required">status is required</span>
				</p>
      </div>
      <div style="width: 55%; padding: 15px;">
        <b-button variant="primary" @click="addBook">Add Book</b-button>
      </div>
    </div>
    <div style="padding: 30px;">
      <BookList />
    </div>
    <EditBookModal modalName="EditBookModal" />
  </div>
</template>

<script>
import axios from 'axios'
import BookList from './BookList.vue';
import { required } from "vuelidate/lib/validators";
import EditBookModal from '../modal/EditBookModal.vue';
const options = [
  {
    value: "pending",
    text: "Pending"
  },
  {
    value: "inprogress",
    text: "Inprogress"
  },
  {
    value: "completed",
    text: "Completed"
  }
]
export default {
  name: "books",
  components: {
    BookList,
    EditBookModal
  },
  data(){
    return {
      book: {
        form: {
          title: '',
          description: '',
          due_date: '',
          status: '',
          submitted: false,
          send: false
        },
        reset(){
          this.form.title = ''
          this.form.description = ''
          this.form.due_date = ''
          this.form.status = ''
          this.form.submitted = false
          this.form.send = false
        }
      }
    }
  },
  validations: {
		book: {
      form: {
        title: {
					required,
				},
        description: {
					required,
				},
        due_date: {
					required,
				},
        status: {
					required,
				}
      },
    }
	},
  computed: {
    options(){
      return options
    }
  },
  methods: {
    async addBook(){
      try{
        this.book.form.submitted = true
        this.$v.book.form.$touch()
        if(this.book.form.send || this.$v.book.form.$invalid) return;
        this.book.form.send = true
        let added = await axios.post(process.env.VUE_APP_BASE_URL, this.book.form)
        console.log("added", added)
        this.book.reset()
        this.$root.$emit("bookAdded")
      } catch(err){
        console.log("error", err)
      }
    },
    updateBook(data){
      console.log("updateBook", data);
      this.$modal.show("EditBookModal", { event: data })
    }
  },
  mounted(){
    this.$root.$on("updateBook", this.updateBook)
  },
  beforeDestroy(){
    this.$root.$off("updateBook", this.updateBook)
  }
}
</script>

<style>

</style>