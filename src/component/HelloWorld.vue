<script>
export default {
  name: 'HelloWorld',
  functional: true,
  render(h,{props}) {
    const {propData} = props
    return <h1 class="head">Does reload using render function with .vue? No 
            <span>{propData}</span>
           </h1>
  },
}
</script>
<style lang="css" scoped>
@import url('../css/index.css');
</style>