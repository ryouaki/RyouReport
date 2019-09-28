<template>
  <section class="layout__fullscreen">
    <router-view/>
  </section>
</template>
<script>
export default {
  name: 'layout-fullscreen'
};
</script>
<style>
.layout__fullscreen {
  width: 100%;
  height: 100%;
}
</style>
