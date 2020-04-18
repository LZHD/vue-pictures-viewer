<template>
  <div class="content">
    <h1>{{ title }}</h1>
    <p>基于iv-viewer和element-ui的图片查看器</p>
    <pictures-viewer :images="images"></pictures-viewer>
  </div>
</template>

<script>
import PicturesViewer from '../lib/src/picture-viewer';

export default {
  name: 'App',
  components: {
    PicturesViewer
  },
  data() {
    return {
      title: 'vue-pictures-viewer',
      images: [
        require('./assets/c1.jpg'),
        require('./assets/c2.jpg'),
        require('./assets/c3.jpg'),
        require('./assets/p1.jpg'),
        require('./assets/p2.jpg'),
        require('./assets/p3.jpg')
      ]
    };
  }
};
</script>

<style lang="scss">
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
