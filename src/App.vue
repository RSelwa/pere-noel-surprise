<template>
  <div class="bg-gray-850 text-white">
    <div class="bg-gray-950 flex flex-col justify-center mx-auto py-16 w-full">
      <div class="flex justify-between mx-12 md:mx-96">
        <input
          class="
            w-42
            md:w72
            border-b-2 border-gray-800
            text-gray-200
            bg-transparent
            focus:border-gray-600
            transition-all
            focus:outline-none
          "
          type="text"
          v-model="this.nameInput"
          placeholder="Noms des personnes"
          v-on:keyup.enter="addNameToList(nameInput, true)"
        />
        <div
          v-on:click="addNameToList(nameInput, true)"
          class="
            bg-gray-700
            text-white
            w-8
            h-8
            rounded
            text-xl text-gray-200
            flex
            justify-center
            items-center
            cursor-pointer
            hover:bg-gray-850
            transition-all
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="mt-12 mx-12 md:mx-56">
      <div
        class="transition-all bg-gray-950 rounded flex items-center mb-12 hover:shadow-lg  justify-between px-12 py-4 "
        v-for="(name, index) in names"
        v-bind:key="name.id"
      >
      <div class=" flex text-center text-white  text-xl p-4 rounded-t">
<span class="mr-12 font-bold">
          {{ name }}
</span>
<span class="mr-12">

          doit offrir à
</span>
<span class="mr-12 font-bold">
          {{ this.hiddenNames[index] }}
</span>
      </div>
        <div v-on:click="deletePlayer(index)"> <svg
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-x-lg fill-current text-gray-600 hover:text-red-500 cursor-pointer w-6 h-6 font-bold transition"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
          />
          <path
            fill-rule="evenodd"
            d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
          />
        </svg></div>
        <hr />
      </div>
    </div>
    <div class="  mx-12 my-12 md:mx-56 flex flex-wrap">

    <div class="text-xl mr-24 transition-all w-56 text-center bg-green-400 text-gray-100  rounded cursor-pointer hover:bg-green-350 px-4 py-2 md:px-8 md:py-4  text-sm md:text" v-if="this.names.length > 2 && !this.repartition" v-on:click="noel">Donner les noms</div>
    <div class="text-xl mr-24 transition-all w-56 text-center bg-purple-350 text-gray-100  rounded cursor-pointer hover:bg-purple-400 px-4 py-2 md:px-8 md:py-4  text-sm md:text" v-if="this.repartition" v-on:click="reveal">Dévoiler les noms </div>
    <div class="text-xl mr-24 transition-all w-56 text-center bg-yellow-400 text-gray-100  rounded cursor-pointer hover:bg-yellow-350 px-4 py-2 md:px-8 md:py-4  text-sm md:text" v-if="this.repartition" v-on:click="pdf">Génerer un PDF</div>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
export default {
  name: "App",
  data() {
    return {
      repartition: false,
      revealed: false,
      nameInput: "",
      names: [],
      hiddenNames: [],
      newNames: [],
    };
  },
  methods: {
    deletePlayer(i) {
      this.newNames = [];
      this.hiddenNames = [];
      this.repartition = false;
      this.names.splice(i, 1);
    },
    addNameToList(name) {
      this.newNames = [];
      this.hiddenNames = [];
      this.repartition = false;

      if (this.nameInput != "" || this.nameInput == undefined) {
        this.names.push(name);
      }
      this.nameInput = "";
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    noel() {
      this.newNames = JSON.parse(JSON.stringify(this.names));
      this.names.forEach(() => {
        this.hiddenNames.push("*****************");
      });
      console.log("new test");
      for (let i = 0; i < 1; ) {
        let same = false;
        let father = false;
        this.shuffle(this.newNames);

        //same
        this.names.forEach((n, index) => {
          //same
          if (n === this.newNames[index]) {
            same = true;
          }

          //father
          let x = this.newNames.indexOf(n);
          if (this.names[x] === this.newNames[index]) {
            father = true;
          }
        });

        console.log("same " + same);
        console.log("father " + father);
        if (same || father) {
          i = 0;
        } else i = 1;
      }

      this.repartition = true;
      // console.log("name  " + this.names);
      // console.log("new name  " + this.newNames);
    },
    reveal() {
      this.revealed = !this.revealed;
      if (this.revealed) {
        this.newNames.forEach((e, i) => {
          this.hiddenNames[i] = e;
        });
      } else {
        this.newNames.forEach((e, i) => {
          this.hiddenNames[i] = "*****************";
        });
      }
    },
    pdf() {
      let pdfName = "Pere Noel Surprise";
      var doc = new jsPDF();
      doc.setDrawColor(0, 0, 0);
      this.names.forEach((e, i) => {
        if (i != 0 && i % 24 == 0) {
          doc.addPage();
        }

        let y = 10 + 12 * (i % 24);
        doc.text(e, 10, y);
        doc.text(" doit offrir à ", 75, y);
        doc.text(this.newNames[i], 125, y);
        doc.text(i.toString(), 150, y);
        doc.line(10, y + 3, 200, y + 3);
        //le 24 sur une autre page
      });
      doc.save(pdfName + ".pdf");
    },
  },
};
</script>

<style>
</style>
