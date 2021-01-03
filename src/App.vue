<!--
 * @Description: vue 文件
 * @Date: 2020-06-18 01:25:40
 * @Author: JackChouMine
 * @LastEditTime: 2021-01-03 16:38:49 +0800
 * @LastEditors: JackChou
-->
<template>
	<div id="app">
		<div class="container">
			<div v-for="item of items" :key="item.id" class="inner-container">
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
		<h2>loader 处理图片</h2>
		<div>
			<img :src="imgSrc" alt="mac图片" class="img" />
		</div>
		<HelloWorld />
	</div>
</template>
<script>
import HelloWorld from './component/HelloWorld.vue'
import mac from './img/mac.png'
export default {
  name: 'App',
  components: { HelloWorld },
  data() {
    return {
      imgSrc: mac,
      name: 'World',
      items: [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'c' },
      ],
    }
  },
  methods: {
    onClick() {
      console.log('Hello world')
    },
  },
}
</script>
<style scoped lang="scss">
.container {
  background-color: #e4e3e3;
  .inner-container {
    background-color:lightblue;
    margin: 20px;
  }
  h2 {
    color:lightseagreen;
  }
}
</style>
