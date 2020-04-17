<template>
  <div class="pictures-viewer">
    <div class="pictures-viewer-panel">
      <div class="pictures-viewer-panel-header">
        <div class="pictures-viewer-panel-header-operation">
        </div>
      </div>
      <div class="pictures-viewer-panel-body" :class="{'pictures-viewer-panel-body-has-footer': images.length > 1}">
        <div class="pictures-viewer-panel-body-content">

        </div>
        <span v-if="images.length > 1" class="pictures-viewer-panel-body-prev"></span>
        <span v-if="images.length > 1" class="pictures-viewer-panel-body-next"></span>
      </div>
      <div v-if="images.length > 1" class="pictures-viewer-panel-footer">
        {{currentImgIndex}} / {{imageTotal}}
      </div>
    </div>
  </div>
</template>

<script>
import ImageViewer from 'iv-viewer';
import { FullScreenViewer } from 'iv-viewer';
import 'iv-viewer/dist/iv-viewer.css';
export default {
  name: 'PictureViewer',
  data() {
    return {
      ROTATE_ANGLE: 90,
      imageViewer$: null,
      fullScreenViewer$: null,
      currentImgIndex: 1,
      imageTotal: 0, //imgTotal
      zoomValue: 100,
      isVertical: false,
      imagesRotate: 0 //imgRotate
    }
  },
  props: {
    images: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    download: {
      type: String,
      default: 'download'
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    picturesViewer: {
      type: String
    }
  },
  beforeCreate() {
    this.imageTotal = this.images.length;
  },
  mounted() {

  },
  methods: {
    initImageViewer() {
      this.imageViewer$ = new ImageViewer(this.document.querySelector(this.$el.querySelector('.img-viewer-panel-body-content', this.options.ivViewerOptions)));
      this.fullScreenViewer$ = new FullScreenViewer(this.options.ivViewerOptions);
      this.showImage();
    },
    showImage() {
      this.imageViewer$.load(this.images[this.currentImgIndex - 1]);
    }
  }
};
</script>

<style scoped lang="scss">
$prefix: 'pictures-viewer';
$size: 12px;
$color: rgba(0, 0, 0, .65);
$borderColor: #d9d9d9;
$full: 100%;

.#{$prefix} {
  position: relative;
  line-height: 1.5;
  font-family: Consolas, Menlo, Courier, monospace;
  text-align: left;
  color: $color;
  width: 600px;
  height: 450px;

  .#{$prefix}-panel {
    width: $full;
    height: $full;
    font-size: $size;
    border: 1px solid $borderColor;
    display: inline-block;
    border-radius: 4px;
    vertical-align: middle;
    position: relative;
    padding-top: 50px;

    &-header {
      padding: 8px 12px;
      height: 50px;
      border-radius: 4px 4px 0 0;
      border-bottom: 1px solid $borderColor;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: $full;
      font-size: 24px;
      line-height: 33px;

      &-pdf {
        position: absolute;
        left: 12px;
      }

      &-operation {
        position: absolute;
        right: 12px;

        span {
          margin: 0 3px;
        }
      }
    }

    &-body {
      height: 100%;
      font-size: $size;
      position: relative;

      .switch {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        font-size: 24px;

        &:hover {
          color: #cccccc;
        }
      }

      &-prev {
        @extend .switch;
        left: 12px;
      }

      &-next {
        @extend .switch;
        right: 12px;
      }

      &-content {
        padding: 0;
        overflow: hidden;
        height: 100%;
      }

      &-has-footer {
        padding-bottom: 50px;
      }
    }

    &-footer {
      height: 50px;
      border-radius: 0 0 4px 4px;
      border-top: 1px solid $borderColor;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      background-color: #cacaca;
    }
  }
}

/deep/ .iv-loader {
  border-top: 1.1em solid rgba(0, 0, 0, 0.7);
  border-right: 1.1em solid rgba(36, 239, 43, 0.7);
  border-bottom: 1.1em solid rgba(254, 202, 55, 0.7);
  border-left: 1.1em solid rgba(254, 207, 219, 0.7);
}
</style>
