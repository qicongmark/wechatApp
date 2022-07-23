const defaultOptions = {
  selector: '#canvas-drag'
};

function CanvasDrag(options = {}) {
  options = {
    ...defaultOptions,
    ...options,
  };

  const pages = getCurrentPages();
  const ctx = pages[pages.length - 1];

  const canvasDrag = ctx.selectComponent(options.selector);
  delete options.selector;

  return canvasDrag;
};

CanvasDrag.export = () => {
  const canvasDrag = CanvasDrag();
  if (!canvasDrag) {
    console.error('请设置组件的id="canvas-drag"!!!');
  } else {
    return CanvasDrag().export();
  }
}

CanvasDrag.changFontColor = (color) => {
  const canvasDrag = CanvasDrag();
  if (!canvasDrag) {
    console.error('请设置组件的id="canvas-drag"!!!');
  } else {
    return CanvasDrag().changColor(color);
  }
}

CanvasDrag.changeBgColor = (color) => {
  const canvasDrag = CanvasDrag();
  if (!canvasDrag) {
    console.error('请设置组件的id="canvas-drag"!!!');
  } else {
    return CanvasDrag().changeBgColor(color);
  }
}

CanvasDrag.changeBgImage = (imageUrl) => {
  const canvasDrag = CanvasDrag();
  if (!canvasDrag) {
    console.error('请设置组件的id="canvas-drag"!!!');
  } else {
    return CanvasDrag().changeBgImage(imageUrl);
  }
}

//根据短边剪切
CanvasDrag.changeBgImageCut = (imageUrl, bgWidth, bgHeight) => {
  const canvasDrag = CanvasDrag();
  if (!canvasDrag) {
    console.error('请设置组件的id="canvas-drag"!!!');
  } else {
    return CanvasDrag().changeBgImageCut(imageUrl, bgWidth, bgHeight);
  }
}

export default CanvasDrag;