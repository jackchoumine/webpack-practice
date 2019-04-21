<template>
  <div id="app">
    Hello, {{ name }}!
    <div
      v-for="item of items"
      
      :key="item.id"
    >
      {{ item.name }}
    </div>
    <button @click="onClick">
      Button
    </button>
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
        console.log('Hello world');
      }
    }
  };
</script>
<style>
  #app {
    background-color: azure;
  }
</style>