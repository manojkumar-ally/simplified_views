import { useRef } from "react";

export default (dragCallback) => {
  let dragCol = useRef();
  let startX = useRef(0);
  let startWidth = useRef(0);

  const onElementClick = (e, className) => {
    // person is trying to re-drag from resizer
    // person is trying to stop column resize state
    // person trying to start column resize for another column
    const element = e.target;
    const reDragFromResizer = element.className.includes("resizer");
    if (reDragFromResizer) return;

    if (!dragCol.current) {
      resizeInit(className);
    } else {
      if (dragCol.current === className) {
        destroyResize();
      } else {
        destroyResize();
        resizeInit(className);
      }
    }
  };

  const resizeInit = (className) => {
    dragCol.current = className;
    const column = document.querySelector(`.header.${className}`);
    column.className = column.className + " resizable";
    const resizer = document.createElement("div");
    resizer.className = "resizer";
    column.appendChild(resizer);
    resizer.addEventListener("mousedown", initDrag, false);
  };

  const destroyResize = () => {
    const column = document.querySelector(`.header.${dragCol.current}`);
    column.className = column.className.replace(" resizable", "");
    column.removeChild(column.childNodes[1]);
    dragCol.current = null;
  };

  const initDrag = (e) => {
    const column = document.querySelector(`.header.${dragCol.current}`);
    startX.current = e.clientX;
    startWidth.current = parseInt(window.getComputedStyle(column).width, 10);
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  };

  const doDrag = (e) => {
    let newWidth = startWidth.current + e.clientX - startX.current;
    document.querySelectorAll(`.${dragCol.current}`).forEach((el) => {
      el.style.width = newWidth + "px";
    });

    if (dragCallback) dragCallback(dragCol.current, newWidth);
  };

  const stopDrag = (e) => {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  };

  return [onElementClick, () => {}];
};
