# vue-pictures-viewer

vue-pictures-viewer based on `element-ui` and `iv-viewer`

[![NPM version](https://img.shields.io/npm/v/vue-pictures-viewer.svg)](https://www.npmjs.com/package/vue-pictures-viewer)

## Example

[Live Example](https://lzhd.github.io/vue-pictures-viewer/)

## Usage

### 1. Install

```
npm install vue-pictures-viewer element-ui --save
```

```vue
import PicturesViewer from 'vue-pictures-viewer';

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
```

### 2. Template

```vue
<pictures-viewer :images="images" :options="options"></pictures-viewer>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `[picturesViewer]` | 外部样式类 | `string` | - |
| `[images]` | 图片路径数组 | `string[]` | `[]` |
| `[options]` | 自定义配置 | `options` | [默认值](#options) |
| `[showOperate]` | 是否显示所有操作功能 | `boolean` | `true` |
| `[zoom]` | 是否显示放大缩小功能 | `boolean` | `true` |
| `[rotate]` | 是否显示旋转功能 | `boolean` | `true` |
| `[reset]` | 是否显示重置功能 | `boolean` | `true` |
| `[fullscreen]` | 是否显示全屏功能 | `boolean` | `true` |
| `[download]` | 是否显示下载功能 | `boolean` | `true` |
| `[defaultName]` | 图片下载文件前缀 | `string` | `download` |

### options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ivViewerOptions | iv-viewer全局配置，见[Options](https://github.com/s-yadav/iv-viewer#Options) | `IvViewerType` | - |
| imageViewOptions | 功能提示全局配置，见[imageViewOptions](#imageViewOptions) | `imageViewOptions` | - |

#### imageViewOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| zoomInToolTip | 放大功能提示 | `string` | `放大` |
| zoomOutToolTip | 缩小功能提示 | `string` | `缩小` |
| rotateLeftToolTip | 逆时针功能旋转提示 | `string` | `逆时针旋转` |
| rotateRightToolTip | 顺时针功能提示 | `string` | `顺时针旋转` |
| resetToolTip | 重置功能提示 | `string` | `重置` |
| fullScreenToolTip | 全屏功能提示 | `string` | `全屏` |
| downloadToolTip | 下载功能提示 | `string` | `下载` |

### Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| `prevChange` | 切换上一张回调函数 | `(e: number)` |
| `nextChange` | 切换下一张回调函数 | `(e: number)` |

## License

The MIT License (see the [LICENSE](https://github.com/lzhd/vue-pictures-viewer/blob/master/LICENSE) file for the full text)
