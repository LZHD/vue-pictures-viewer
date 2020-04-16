import PictureViewer from './src/picture-viewer';
export default PictureViewer;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('picture-viewer', PictureViewer);
}
