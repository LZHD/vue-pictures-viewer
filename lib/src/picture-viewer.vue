<template>
  <div class="pictures-viewer" :class="picturesViewer">
    <div class="pictures-viewer-panel">
      <div class="pictures-viewer-panel-header">
        <div v-if="showOperate" class="pictures-viewer-panel-header-operation">
          <el-tooltip
            v-if="zoom"
            :content="getOptions.imageViewOptions.zoomInToolTip"
          >
            <span @click="zoomInImage"><i class="el-icon-zoom-in"></i></span>
          </el-tooltip>
          <el-tooltip
            v-if="zoom"
            :content="getOptions.imageViewOptions.zoomOutToolTip"
          >
            <span @click="zoomOutImage"><i class="el-icon-zoom-out"></i></span>
          </el-tooltip>
          <el-tooltip
            v-if="rotate"
            :content="getOptions.imageViewOptions.rotateLeftToolTip"
          >
            <span @click="rotateImage(false)">
              <i class="el-icon-refresh-left"></i>
            </span>
          </el-tooltip>
          <el-tooltip
            v-if="rotate"
            :content="getOptions.imageViewOptions.rotateRightToolTip"
          >
            <span @click="rotateImage(true)">
              <i class="el-icon-refresh-right"></i>
            </span>
          </el-tooltip>
          <el-tooltip
            v-if="reset"
            :content="getOptions.imageViewOptions.resetToolTip"
          >
            <span @click="showImage()"><i class="el-icon-refresh"></i></span>
          </el-tooltip>
          <el-tooltip
            v-if="fullscreen"
            :content="getOptions.imageViewOptions.fullScreenToolTip"
          >
            <span @click="fullscreenImage">
              <i class="el-icon-full-screen"></i>
            </span>
          </el-tooltip>
          <el-tooltip
            v-if="download"
            :content="getOptions.imageViewOptions.downloadToolTip"
          >
            <span @click="downloadImage"><i class="el-icon-download"></i></span>
          </el-tooltip>
        </div>
      </div>
      <div
        class="pictures-viewer-panel-body"
        :class="{ 'pictures-viewer-panel-body-has-footer': images.length > 1 }"
      >
        <div class="pictures-viewer-panel-body-content"></div>
        <span
          v-if="images.length > 1"
          class="pictures-viewer-panel-body-prev"
          @click="prevImage"
          ><i class="el-icon-arrow-left"></i
        ></span>
        <span
          v-if="images.length > 1"
          class="pictures-viewer-panel-body-next"
          @click="nextImage"
          ><i class="el-icon-arrow-right"></i
        ></span>
      </div>
      <div v-if="images.length > 1" class="pictures-viewer-panel-footer">
        {{ currentIndex + 1 }} / {{ imageTotal }}
      </div>
    </div>
  </div>
</template>

<script>
import ImageViewer, { FullScreenViewer } from 'iv-viewer';
import 'iv-viewer/dist/iv-viewer.css';

export default {
  name: 'PictureViewer',
  data() {
    return {
      ROTATE_ANGLE: 90,
      imageViewer$: null,
      fullScreenViewer$: null,
      currentIndex: 0,
      imageTotal: 0,
      zoomValue: 100,
      isVertical: false,
      imageRotate: 0
    };
  },
  props: {
    picturesViewer: {
      type: String
    },
    images: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    defaultName: {
      type: String,
      default: 'download'
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    showOperate: {
      type: Boolean,
      default: true
    },
    zoom: {
      type: Boolean,
      default: true
    },
    rotate: {
      type: Boolean,
      default: true
    },
    reset: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    download: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.imageTotal = this.images.length;
  },
  mounted() {
    this.initImageViewer();
  },
  computed: {
    getOptions() {
      return Object.assign(
        {
          imageViewOptions: {
            zoomInToolTip: '放大',
            zoomOutToolTip: '缩小',
            rotateLeftToolTip: '逆时针旋转',
            rotateRightToolTip: '顺时针旋转',
            resetToolTip: '重置',
            fullScreenToolTip: '全屏',
            downloadToolTip: '下载'
          },
          ivViewerOptions: {
            zoomValue: 100,
            maxZoom: 500,
            snapView: true,
            refreshOnResize: true,
            zoomOnMouseWheel: true
          }
        },
        this.options
      );
    }
  },
  methods: {
    zoomInImage() {
      this.zoomValue += 10;
      this.imageViewer$.zoom(this.zoomValue);
    },
    zoomOutImage() {
      if (this.zoomValue === 100) {
        return;
      }
      this.zoomValue -= 10;
      if (this.zoomValue < 0) {
        this.zoomValue = 0;
      }
      this.imageViewer$.zoom(this.zoomValue);
    },
    rotateImage(isClockwise) {
      this.beforeRotateImage().then(time => {
        if (isClockwise) {
          this.imageRotate += this.ROTATE_ANGLE;
        } else {
          this.imageRotate -= this.ROTATE_ANGLE;
        }
        this.isVertical = !this.isVertical;
        time <= 0
          ? this.addImageRotate()
          : setTimeout(() => this.addImageRotate(), time);
      });
    },
    fullscreenImage() {
      this.beforeRotateImage().then(time => {
        if (time <= 0) {
          this.fullScreenViewer$.show(this.images[this.currentIndex]);
          this.addImageRotate(false);
        } else {
          setTimeout(() => {
            this.fullScreenViewer$.show(this.images[this.currentIndex]);
            this.addImageRotate(false);
          }, time);
        }
      });
    },
    downloadImage() {
      const download = document.createElement('a');
      download.setAttribute(
        'download',
        `${this.defaultName}-${this.currentIndex + 1}`
      );
      download.setAttribute('display', 'none');
      download.setAttribute('href', this.images[this.currentIndex]);
      download.setAttribute('target', '_blank');
      this.$el.appendChild(download);
      download.click();
      this.$el.removeChild(download);
    },
    prevImage() {
      this.isVertical = false;
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.imageTotal - 1;
      }
      this.showImage();
      this.$emit('prev-change', this.currentIndex);
    },
    nextImage() {
      this.isVertical = false;
      this.currentIndex++;
      if (this.currentIndex > this.imageTotal - 1) {
        this.currentIndex = 0;
      }
      this.showImage();
      this.$emit('next-change', this.currentIndex);
    },
    initImageViewer() {
      this.imageViewer$ = new ImageViewer(
        this.$el.querySelector('.pictures-viewer-panel-body-content'),
        this.getOptions.ivViewerOptions
      );
      this.fullScreenViewer$ = new FullScreenViewer(
        this.getOptions.imageViewOptions
      );
      this.showImage();
    },
    addImageRotate(isAnimation = true) {
      let scale = '';
      if (this.isVertical && this.isImageOverVertical()) {
        scale = `scale(${this.getScale()})`;
      }
      const rotate = `rotate(${this.imageRotate}deg)`;
      if (isAnimation) {
        this.addTransition('iv-snap-image');
        this.addTransition('iv-small-image');
      }
      this.setImageRotate('iv-snap-image', rotate, scale);
      this.setImageRotate('iv-small-image', rotate, scale);
      setTimeout(() => {
        if (isAnimation) {
          this.removeAnimation('iv-snap-image');
          this.removeAnimation('iv-small-image');
        }
      }, 500);
    },
    async beforeRotateImage() {
      this.zoomValue = 100;
      const time = this.imageViewer$._state.zoomValue - this.zoomValue;
      await this.imageViewer$.resetZoom();
      await this.imageViewer$.refresh();
      return time === 0 ? 0 : 500;
    },
    showImage() {
      this.imageRotate = 0;
      this.isVertical = false;
      this.imageViewer$.load(this.images[this.currentIndex]);
    },
    isImageOverVertical() {
      const imageViewerHeight = this.$el.clientHeight;
      const currentImageWidth = this.$el.querySelector('.iv-small-image')
        .clientWidth;
      return imageViewerHeight < currentImageWidth + 10;
    },
    getScale() {
      const imageViewerHeight = this.$el.querySelector(
        '.pictures-viewer-panel-body-content'
      ).clientHeight;
      const currentImageWidth = this.$el.querySelector('.iv-small-image')
        .clientWidth;
      const differenceWidth = currentImageWidth - imageViewerHeight;
      if (differenceWidth >= 250 && differenceWidth < 300) {
        return differenceWidth / imageViewerHeight - 0.1;
      } else if (differenceWidth >= 300 && differenceWidth < 400) {
        return differenceWidth / imageViewerHeight - 0.15;
      } else if (differenceWidth >= 400) {
        return differenceWidth / imageViewerHeight - 0.32;
      } else if (differenceWidth < 0) {
        return 1;
      }
      return 0.6;
    },
    setStyle(node, name, value) {
      const elements = document.querySelectorAll(`.${node}`);
      elements.forEach(ele => ele.style.setProperty(name, value));
    },
    addTransition(node) {
      this.setStyle(node, 'transition', '0.5s linear');
    },
    removeAnimation(node) {
      this.setStyle(node, 'transition', 'auto');
    },
    setImageRotate(node, rotate, scale) {
      this.setStyle(node, 'transform', `${rotate} ${scale}`);
    }
  },
  destroyed() {
    if (this.imageViewer$) {
      this.imageViewer$ = this.imageViewer$.destroy();
    }
    if (this.fullScreenViewer$) {
      this.fullScreenViewer$ = this.fullScreenViewer$.destroy();
    }
  }
};
</script>

<style scoped lang="scss">
$prefix: 'pictures-viewer';
$size: 12px;
$color: rgba(0, 0, 0, 0.65);
$borderColor: #d9d9d9;
$full: 100%;

*,
::after,
::before {
  box-sizing: border-box;
}

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
