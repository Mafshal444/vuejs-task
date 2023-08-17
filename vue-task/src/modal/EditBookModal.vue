<template>
	<modal :name="modalName" @before-open="onBeforeOpen($event)" @before-close="onBeforeClose()" :scrollable="true">
		<div style="
      padding: 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: nowrap;
      align-items: center;
    ">
      <h1>Update Book</h1>
      <div style="width: 45%; padding: 10px;">
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
      <div style="width: 45%; padding: 10px;">
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
      <div style="width: 45%; padding: 10px;">
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
      <div style="width: 45%; padding: 10px;">
        <b-form-select v-model="book.form.status" :options="options"></b-form-select>
        <p v-if="book.form.submitted && $v.book.form.status.$invalid">
					<span v-if="!$v.book.form.status.required">status is required</span>
				</p>
      </div>
      <div style="
        display: flex;
        flex-direction: row;
        align-items: flex-start;
      ">
        <div style="padding: 10px;">
          <b-button variant="primary" @click="updateBook">Update</b-button>
        </div> 
        <div style="padding: 10px;">
          <b-button variant="danger" @click="onBeforeClose, $modal.hide(modalName)">Cancel</b-button>
        </div>
      </div>
    </div>
	</modal>
</template>

<script>
import axios from 'axios'
import { required } from "vuelidate/lib/validators";
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
	name: 'EditBookModal',
	props: {
		modalName: {
			type: String,
			default: 'NewAddResourceCopy'
		}
	},
	data(){
		return {
      book: {
        form: {
          id: '',
          title: '',
          description: '',
          due_date: '',
          status: '',
          submitted: false,
          send: false
        },
        reset(){
          this.form.id = ''
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
		onBeforeOpen(event){
			// TODO
			console.log("modal is open", event)
      let { item } = event?.params?.event?.payload;
			console.log("modal is open", item)
      this.book.form.id = item.id;
      this.book.form.title = item.title;
      this.book.form.description = item.description;
      this.book.form.due_date = item.due_date;
      this.book.form.status = item.status

		},
		onBeforeClose(){
      this.book.reset()
		},
    async updateBook(){
      try{
        this.book.form.submitted = true
        this.$v.book.form.$touch()
        if(this.book.form.send || this.$v.book.form.$invalid) return;
        let updated = await axios.put(process.env.VUE_APP_BASE_URL, this.book.form)
        console.log("updated", updated)
        this.book.reset()
        this.$modal.hide(this.modalName)
        this.$root.$emit("bookupdated")
      } catch(err){
        console.log("error", err)
      }
    }
	},
}
</script>

<style>
.vm--modal{
  height: 400px !important;
}


</style>