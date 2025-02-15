import { ResponseTemplate } from "@/types";
import { useEffect, useRef, useState } from "react";
import Element from "../element";
import Draggable from "react-draggable";

type Props = {
    data: ResponseTemplate | null
}

type TagsSize = {
    width: number;
    height: number;
}

type Tags = {
    id: string | number;
    tag: string;
    conteudo: string;
    classe: string | null;
    atributos: any
}

export default function Task(props: Props) {
    const { data } = props;

    const [html, setHtml] = useState<Tags[]>([]);

    const nodeRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);
    const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });
    const [sizes, setSizes] = useState<TagsSize[]>([]);
    const [selectedItem, setSelectedItem] = useState<number>();

    //testes
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Delete' && selectedItem !== null) {
                setSizes(prevItems => prevItems.filter((_, index) => index !== selectedItem));
                setHtml(prevItems => prevItems.filter((_, index) => index !== selectedItem));
                setSelectedItem(null); 
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItem, setSizes]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", stopResize);
        } else {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", stopResize);
        }
    
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", stopResize);
        };
    }, [isResizing]);

    const startResize = (e: React.MouseEvent<HTMLDivElement>, direction: string, index: number) => {
        e.stopPropagation();
        setSelectedItem(index);
        setIsResizing(true);
        setResizeDirection(direction);
        setStartMousePos({ x: e.clientX, y: e.clientY });
        
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", stopResize);
        e.preventDefault();
    };

    const stopResize = () => {
        setIsResizing(false);
        setResizeDirection(null);
        setSelectedItem(null);
        
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopResize);
    };
    
    const onMouseMove = (e) => {
        if (isResizing) {
            const deltaX = e.clientX - startMousePos.x;
            const deltaY = e.clientY - startMousePos.y;
            
            setStartMousePos({ x: e.clientX, y: e.clientY });
            let prevWidth: number;
            let prevHeight: number;
            let width: number;
            let height : number;
            
            if (selectedItem === undefined || !sizes[selectedItem]) return;
            switch (resizeDirection) {
                case 'top-left':
                    prevWidth = sizes[selectedItem].width;
                    prevHeight = sizes[selectedItem].height;
                    width = Math.max(prevWidth - deltaX, 50);
                    height  = Math.max(prevHeight - deltaY, 50);
                    setSizes(prevItems =>
                        prevItems.map((item, index) =>
                            index === selectedItem ? { width: width, height: height } : item
                        )
                    );
                    break;
                case 'top-right':
                    prevWidth = sizes[selectedItem].width;
                    prevHeight = sizes[selectedItem].height;
                    width = Math.max(prevWidth + deltaX, 50);
                    height  = Math.max(prevHeight - deltaY, 50);
                    setSizes(prevItems =>
                        prevItems.map((item, index) =>
                          index === selectedItem ? { width:width, height: height } : item
                        )
                      );
                    break;
                case 'bottom-left':
                    prevWidth = sizes[selectedItem].width;
                    prevHeight = sizes[selectedItem].height;
                    width = Math.max(prevWidth - deltaX, 50);
                    height  = Math.max(prevHeight + deltaY, 50);
                    setSizes(prevItems =>
                        prevItems.map((item, index) =>
                          index === selectedItem ? { width:width, height: height } : item
                        )
                      );
                    break;
                case 'bottom-right':
                    prevWidth = sizes[selectedItem].width;
                    prevHeight = sizes[selectedItem].height;
                    width = Math.max(prevWidth + deltaX, 50);
                    height  = Math.max(prevHeight + deltaY, 50);
                    setSizes(prevItems =>
                        prevItems.map((item, index) =>
                          index === selectedItem ? { width:width, height: height } : item
                        )
                      );
                    break;
                case 'top':
                    prevHeight = sizes[selectedItem].height;
                    height  = Math.max(prevHeight + deltaY, 50);
                    
                    setSizes(prevItems =>
                        prevItems.map((item, index) =>
                          index === selectedItem ? { ...item, height: height } : item
                        )
                      );
                    break;
                case 'bottom':
                    prevHeight = sizes[selectedItem].height;
                    height  = Math.max(prevHeight + deltaY, 50);
                    
                    setSizes(prevItems =>
                        prevItems.map((item, index) =>
                          index === selectedItem ? { ...item, height: height } : item
                        )
                      );
                    break;
                case 'left':
                    prevWidth = sizes[selectedItem].width;
                    width = Math.max(prevWidth - deltaX, 50);
                    
                    setSizes(prevItems =>
                        prevItems.map((item, index) =>
                          index === selectedItem ? { ...item, width: width} : item
                        )
                      );
                    break;
                case 'right':
                    prevWidth = sizes[selectedItem].width;
                    width = Math.max(prevWidth + deltaX, 50);
                    setSizes(prevItems =>
                        prevItems.map((item, index) =>
                          index === selectedItem ? { ...item, width:width} : item
                        )
                      );
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        getText(data?.html);
    }, [data])

    const getText = (html: string | undefined) => {
        if (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const elementos = doc.body.getElementsByTagName("*");
        
            const resultado = [];
        
            for (const el of elementos) {
                const tag = el.tagName.toLowerCase();
        
                if (tag === "p") {
                    const conteudoDireto = Array.from(el.childNodes)
                        .filter(node => node.nodeType === Node.TEXT_NODE)
                        .map(node => node.textContent?.trim())
                        .join(" ");
        
                    if (conteudoDireto) {
                        resultado.push({
                            id: Date.now(),
                            tag: "p",
                            conteudo: conteudoDireto.trim(),
                            classe: el?.className || null,
                            atributos: Object.fromEntries([...el.attributes].map(attr => [attr.name, attr.value]))
                        });
                    }
                } else if (tag === "img") {
                    resultado.push({
                        id: Date.now(),
                        tag: "img",
                        conteudo: null,
                        classe: el?.className || null,
                        atributos: Object.fromEntries([...el.attributes].map(attr => [attr.name, attr.value]))
                    });
                }
            }
        
            let arr = Array.from({ length: 5 }, () => ({ width: 200, height: 150 }));
            setSizes(arr);
            setHtml(resultado);
        }        
    }
    
    return (
        <div className="flex w-full max-w-6xl" onMouseLeave={stopResize}>
            <div className="flex flex-col gap-8">
                {html && html.map((elemento, index) => (
                    <Draggable key={index} nodeRef={nodeRef} disabled={isResizing}>
                        <div
                            ref={nodeRef}
                            className={`group relative p-2 cursor-pointer hover:border hover:border-black hover:box-border 
                                ${index === selectedItem ? "border border-black box-border" : ""}`}
                            style={{ width: `${sizes[index]?.width}px`, height: `${sizes[index]?.height}px` }}
                            onClick={() => setSelectedItem(index)}
                        >
                            <div>
                                <strong>{elemento.tag}</strong> - {elemento.conteudo}
                            </div>

                            <div
                                className="absolute top-0 left-0 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-nwse-resize"
                                onMouseDown={(e) => startResize(e, 'top-left', index)}
                                onMouseMove={onMouseMove}
                            ></div>

                            <div
                                className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-nese-resize"
                                onMouseDown={(e) => startResize(e, 'top-right', index)}
                                onMouseMove={onMouseMove}
                            ></div>

                            <div
                                className="absolute bottom-0 left-0 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-sws-resize"
                                onMouseDown={(e) => startResize(e, 'bottom-left', index)}
                                onMouseMove={onMouseMove}
                            ></div>

                            <div
                                className="absolute bottom-1 right-0 w-2 h-2 bg-black rounded-full transform translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-se-resize"
                                onMouseDown={(e) => startResize(e, 'bottom-right', index)}
                                onMouseMove={onMouseMove}
                            ></div>

                            <div
                                className="absolute -top-1 left-1/2 w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 cursor-ns-resize"
                                onMouseDown={(e) => startResize(e, 'top', index)}
                                onMouseMove={onMouseMove}
                            ></div>

                            <div
                                className="absolute -bottom-1 left-1/2 w-2 h-2 bg-black rounded-full  opacity-0 group-hover:opacity-100 cursor-ns-resize"
                                onMouseDown={(e) => startResize(e, 'bottom', index)}
                                onMouseMove={onMouseMove}
                            ></div>

                            <div
                                className="absolute top-1/2 -left-1 w-2 h-2 bg-black rounded-full  opacity-0 group-hover:opacity-100 cursor-ew-resize"
                                onMouseDown={(e) => startResize(e, 'left', index)}
                                onMouseMove={onMouseMove}
                            ></div>

                            <div
                                className="absolute top-1/2 -right-1 w-2 h-2 bg-black rounded-full  opacity-0 group-hover:opacity-100 cursor-ew-resize"
                                onMouseDown={(e) => startResize(e, 'right', index)}
                                onMouseMove={onMouseMove}
                            ></div>
                        </div>
                    </Draggable>
                ))}
            </div>
        </div>
    )
}