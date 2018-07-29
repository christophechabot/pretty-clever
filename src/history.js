export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          done: [],
          undone: [],
          newMutation: true
        };
      },
      created() {
        this.$store.subscribe(mutation => {
          if (
            mutation.type === 'tickBox'
            || (mutation.type === 'emptySheet' && mutation.payload && mutation.payload.reset)
          ) {
            this.done.push(mutation);
          }
          if (this.newMutation) {
            this.undone = [];
          }
        })
      },
      methods: {
        undo() {
          this.undone.push(this.done.pop());
          this.newMutation = false;
          this.$store.commit('emptySheet');
          this.done.forEach(mutation => {
            this.$store.commit(`${mutation.type}`, mutation.payload);
            this.done.pop();
          });
          this.newMutation = true;
        },
        redo() {
          let mutation = this.undone.pop();
          this.newMutation = false;
          this.$store.commit(`${mutation.type}`, mutation.payload);
          this.newMutation = true;
        }
      },
      computed: {
        canRedo() {
          return this.undone.length;
        },
        canUndo() {
          return this.done.length;
        }
      }
    })
  }
};