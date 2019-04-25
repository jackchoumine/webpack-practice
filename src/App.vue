<template>
  <div id="app">
    <div class="container">
      <div
        v-for="item of items"
        :key="item.id"
        class="inner-container"
      >
        {{ item.name }}
      </div>
      <button
        type="button btn-primary"
        class="btn btn-primary btn-lg btn-block"
        @click="onClick"
      >
        Button
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Hello',
    data() {
      return {
        name: 'World',
        items: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }]
      }
    },
    methods: {
      onClick() {
        let nihao = ''
        console.log('Hello world');
      }
    }
  };
</script>
<style scoped lang="scss">
  .container {
    background-color: red;
    .inner-container {
      background-color: blue;
      margin:20px;
    }
  }
</style>