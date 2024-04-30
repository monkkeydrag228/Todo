<template>
  <body>
    <header>
      <img
        v-if="!tagClicked"
        src="../src/assets/tg_image_1987214057.jpeg"
        alt=""
      />
      <img v-else src="../src/assets/bg-desktop-dark.73e47dbb.jpg" alt="" />
      <section class="all">
        <h1>TODO</h1>
        <button @click="changeBackgroundColor()" class="moon">
          <img
            v-if="!tagClicked"
            class="dark"
            src="../src/assets/Remove-bg.ai_1699444737341.png"
            alt=""
          />
          <img
            v-else
            class="light"
            src="../src/assets/Remove-bg.ai_1700166706464.png"
            alt=""
          />
        </button>
      </section>
      <div class="input_note">
        <button @click="addNewNote"></button>
        <input
          type="text"
          placeholder="Создайте новое задание..."
          v-model="inputValue"
          @keypress.enter="addNewNote"
        />
      </div>
    </header>

    <main>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(oneNote, index) in notes"
          :key="index"
          :style="{
            textDecoration: oneNote && oneNote.active ? 'line-through' : 'none',
          }"
        >
          <button
            class="btn"
            @click="handleClick(index)"
            :style="{
              background: oneNote.active
                ? 'linear-gradient(90deg,#57ddff,#c058f3)'
                : 'transparent',
              border: oneNote.active
                ? '3px solid #696969'
                : '3px solid #A9A9A9',
            }"
          >
            ---
          </button>
          {{ oneNote.text }}
          <div class="del_button">
            <button
              class="btn btn-danger"
              @click="deleteNote(index)"
              :style="{
                background: oneNote.active
                  ? 'linear-gradient(90deg,#57ddff,#c058f3)'
                  : 'transparent',
                border: oneNote.active
                  ? '3px solid #696969'
                  : '3px solid #A9A9A9',
              }"
            ></button>
          </div>
          <br />
        </li>
      </ul>
    </main>
  </body>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: "white",
      liColor: "white",
      liColorBtn: 'black',
      btnColor: "black",
      inputValue: "",
      notes: [],
      tagClicked: false,
    };
  },
  mounted() {
    const savedNotes = localStorage.getItem("todo-notes");
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  },
  methods: {
    changeBackgroundColor() {
      this.tagClicked = !this.tagClicked;
      this.backgroundColor = this.tagClicked ? "#000000" : "white";
      this.liColor = this.tagClicked ? "#25273c" : "white";
      this.btnColor = this.tagClicked ? "white" : "#25273c";
      this.liColorBtn = this.tagClicked ? "white" : "#25273c";
    },
    handleClick(index) {
      this.notes[index].active = !this.notes[index].active;
      this.saveToLocalStorage();
    },
    addNewNote() {
      if (this.inputValue.trim() !== "") {
        this.notes.push({ text: this.inputValue, active: false });
        this.inputValue = "";
        this.saveToLocalStorage();
      }
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("todo-notes", JSON.stringify(this.notes));
    },
  },
};
</script>




<style>
.btn {
  color: v-bind(btnColor) !important;
}
body {
  transition: background-color 2s ease;
  background-color: v-bind(backgroundColor);
  height: 100vh;
}

.del_button {
  position: absolute;
  right: 300px;
}
.list-group-item button {
  margin-right: 300px;
  background-color: rgb(153, 255, 128);
  margin-right: 5 0px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.list-group-item {
  transition: background-color 2s ease;
  margin-top: 20px;
  background-color: v-bind(liColor) !important;
  color: v-bind(liColorBtn) !important;
  padding-left: 50px;
  padding-top: 20px;
  box-shadow: -20px 10px 500px 105px rgba(0, 0, 0, 0.07);
  margin-left: 500px;
  border: none;
  background-color: rgb(255, 255, 255);
  display: flex;
  width: 760px;
  height: 100px;
  font-size: 50px;
  border-radius: 10px;
}
.input_note {
  position: absolute;
  bottom: 560px;
  margin-left: 500px;
}
.input_note input {
  transition: background-color 2s ease;
  background-color: v-bind(liColor) !important;
  padding-left: 100px;
  font-size: 40px;
  /* position: relative; */
  height: 100px;
  width: 710px;
  border: none;
  outline: none;
  border-radius: 10px;
}
.input_note button:hover {
  border: 2px solid aqua;
  background-color: aquamarine;
}
.input_note button {
  top: 22px;
  left: 20px;
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgb(93, 238, 93);
  background-color: rgb(153, 255, 128);
  height: 60px;
  width: 60px;
}

.all {
  margin-left: 510px;
  width: 1200px;
  height: 300px;
  justify-content: space-between;
  display: flex;
  position: absolute;
  bottom: 500px;
}
.moon {
  margin-right: 380px;
  height: 50px;
  width: 60px;
  background: transparent;
  border: none;
  margin-top: 20px;
  cursor: pointer;
}
.moon .dark {
  width: 80px;
  height: 70px;
}
.moon .light {
  width: 120px;
  height: 80px;
}
.all h1 {
  font-weight: 1000px;
  font-size: 80px;
  color: rgb(255, 255, 255);
}

header img {
  transition: all 2s;
  position: relative;
  width: 1872px;
  height: 426px;
}
* {
  margin: 0;
  padding: 0;
}
</style>