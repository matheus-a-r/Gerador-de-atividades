import Draggable from 'react-draggable';
import { useRef, useState, useEffect } from 'react';

const Element = (props) => {
  const nodeRef = useRef(null);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(150);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });

  const startResize = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setStartMousePos({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const stopResize = () => {
    setIsResizing(false);
    setResizeDirection(null);
  };

  const onMouseMove = (e) => {
    console.log(resizeDirection)
    if (isResizing) {
      const deltaX = e.clientX - startMousePos.x;
      const deltaY = e.clientY - startMousePos.y;
  
      setStartMousePos({ x: e.clientX, y: e.clientY });
  
      switch (resizeDirection) {
        case 'top-left':
          setWidth((prevWidth) => Math.max(prevWidth - deltaX, 50));
          setHeight((prevHeight) => Math.max(prevHeight - deltaY, 50));
          break;
        case 'top-right':
          setWidth((prevWidth) => Math.max(prevWidth + deltaX, 50));
          setHeight((prevHeight) => Math.max(prevHeight - deltaY, 50));
          break;
        case 'bottom-left':
          setWidth((prevWidth) => Math.max(prevWidth - deltaX, 50));
          setHeight((prevHeight) => Math.max(prevHeight + deltaY, 50));
          break;
        case 'bottom-right':
          setWidth((prevWidth) => Math.max(prevWidth + deltaX, 50));
          setHeight((prevHeight) => Math.max(prevHeight + deltaY, 50));
          break;
        case 'top':
          setHeight((prevHeight) => Math.max(prevHeight - deltaY, 50));
          break;
        case 'bottom':
          setHeight((prevHeight) => Math.max(prevHeight + deltaY, 50));
          break;
        case 'left':
          setWidth((prevWidth) => Math.max(prevWidth - deltaX, 50));
          break;
        case 'right':
          setWidth((prevWidth) => Math.max(prevWidth + deltaX, 50));
          break;
        default:
          break;
      }
    }
  };

  return (
    <Draggable nodeRef={nodeRef} disabled={isResizing} onMouseLeave={stopResize}>
      <div
        ref={nodeRef}
        className="group relative p-2 cursor-pointer hover:border hover:border-black hover:box-border"
        style={{ width: `${width}px`, height: `${height}px` }}
        onMouseMove={onMouseMove}
        onMouseUp={stopResize}
      >
        <div>
          <strong>{props.elemento.tag}</strong> - {props.elemento.conteudo}
        </div>

        <div
          className="absolute top-0 left-0 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-nwse-resize"
          onMouseDown={(e) => startResize(e, 'top-left')}
          onMouseUp={stopResize}
        ></div>

        <div
          className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-nese-resize"
          onMouseDown={(e) => startResize(e, 'top-right')}
          onMouseUp={stopResize}
        ></div>

        <div
          className="absolute bottom-0 left-0 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-sws-resize"
          onMouseDown={(e) => startResize(e, 'bottom-left')}
          onMouseUp={stopResize}
        ></div>

        <div
          className="absolute bottom-1 right-0 w-2 h-2 bg-black rounded-full transform translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-se-resize"
          onMouseDown={(e) => startResize(e, 'bottom-right')}
          onMouseUp={stopResize}
        ></div>

        <div
          className="absolute -top-1 left-1/2 w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 cursor-ns-resize"
          onMouseDown={(e) => startResize(e, 'top')}
          onMouseUp={stopResize}
        ></div>

        <div
          className="absolute -bottom-1 left-1/2 w-2 h-2 bg-black rounded-full  opacity-0 group-hover:opacity-100 cursor-ns-resize"
          onMouseDown={(e) => startResize(e, 'bottom')}
          onMouseUp={stopResize}
        ></div>

        <div
          className="absolute top-1/2 -left-1 w-2 h-2 bg-black rounded-full  opacity-0 group-hover:opacity-100 cursor-ew-resize"
          onMouseDown={(e) => startResize(e, 'left')}
          onMouseUp={stopResize}
        ></div>

        <div
          className="absolute top-1/2 -right-1 w-2 h-2 bg-black rounded-full  opacity-0 group-hover:opacity-100 cursor-ew-resize"
          onMouseDown={(e) => startResize(e, 'right')}
          onMouseUp={stopResize}
        ></div>
      </div>
    </Draggable>
  );
};

export default Element;
