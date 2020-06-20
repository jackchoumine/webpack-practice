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
      <font-awesome-icon icon="coffee" />
      <i class="fas fa-camera fa-xs" />
      <i class="fas fa-camera fa-sm" />
      <i class="fas fa-camera fa-lg" />
      <i class="fas fa-camera fa-2x" />
      <i class="fas fa-camera fa-3x" />
      <i class="fas fa-camera fa-5x" />
      <i class="fas fa-camera fa-7x" />
      <i class="fas fa-camera fa-10x" />
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
    background-color: #e4e3e3;

    .inner-container {
      background-color: blue;
      margin: 20px;
    }
  }
</style>