<template>
  <div class="alert__wrap">
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'CompAlert',
  props: {
    msg: String
  }
};
</script>
<style>
.alert__wrap {
  position: fixed;
  right: 10px;
  top: 10px;
  color: red;
}
</style>
