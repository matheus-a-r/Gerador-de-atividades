import { ResponseTemplate } from "@/types";
import { useEffect, useRef, useState } from "react";
import Element from "../element";
import Draggable from "react-draggable";
import { getImageById, updateImageById } from "@/api/image";
import { div } from "framer-motion/client";

type Props = {
    data: ResponseTemplate | null,
    ref: any
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
    atributos: any;
    src?: string
}

export default function Task(props: Props) {
    const { data, ref } = props;

    const [html, setHtml] = useState<Tags[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const nodeRef = useRef(null);
    const [resized, setResized] = useState<boolean[]>([]);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string | null>(null);
    const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });
    const [sizes, setSizes] = useState<TagsSize[]>([]);
    const [selectedItem, setSelectedItem] = useState<number>();
    const [originalSizes, setOriginalSizes] = useState<any[]>([]);
    const [contextMenu, setContextMenu] = useState<{idImg: string, x: number; y: number } | null>(null);


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

    const handleContextMenu = (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const rect = e.currentTarget.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top; 
        const elementId = target.id;

        setContextMenu({idImg: elementId, x: relativeX, y: relativeY });
    };

    console.log(contextMenu);

    const handleChangeImage = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
            if (file) {
            const formData = new FormData();
            formData.append("file", file);
            const response: any = await updateImageById(contextMenu?.idImg, formData);
            if (response && response.status == 200) {
                const responseImage = await getImageById(contextMenu?.idImg);
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.getElementById(contextMenu?.idImg);
                    img.src = `data:image/png;base64,${responseImage.data.imageUrl}`;
                };
                reader.readAsDataURL(file);
                setContextMenu(null);
            }
        }
    };


    const startResize = (e: React.MouseEvent<HTMLDivElement>, direction: string, index: number) => {
        e.stopPropagation();
        setSelectedItem(index);
        setIsResizing(true);
        setResizeDirection(direction);
        setStartMousePos({ x: e.clientX, y: e.clientY });

        const resizesPrev = resized;
        resizesPrev[index] = true

        setResized(resizesPrev);
        
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

    const getText = async (html: string | undefined) => {
        if (html) {               
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const elementos = doc.body.getElementsByTagName("*");
        
            const resultado = [];
        
            for (const el of elementos) {
                const tag = el.tagName.toLowerCase();

                if (tag === "p") {
                    resultado.push({
                        id: Date.now(),
                        tag: "p",
                        conteudo: el.textContent?.trim(),
                        atributos: Object.fromEntries([...el.attributes].map(attr => [attr.name, attr.value])),
                        width: el.style['width'],
                        height: el.style['height']
                    });
                } else if (tag === "img") {
                    const src = el.getAttribute("src");
                    const response = await getImageById(src);
                    if (response && response.status === 200) {
                        resultado.push({
                            id: src,
                            src:`data:image/png;base64,${response.data.imageUrl}`,
                            tag: "img",
                            conteudo: null,
                            atributos: Object.fromEntries([...el.attributes].map(attr => [attr.name, attr.value])),
                            width: el.style['width'],
                            height: el.style['height']
                        });
                    }
                }
            }
        
            // let arr = Array.from({ length: resultado.length }, () => ({ width: null, height: null }));
            let arr = Array.from({ length: resultado.length }, () => ({}));
            resultado.forEach((element, index) => {
                let obj: { width?: number | string; height?: number | string } = {};
                
                if (element.width !== "") {
                    if(element.width.includes("px")){
                        obj['width'] = parseInt(element.width)
                    }else{
                        obj['width'] = element.width
                    }
                }else{
                    obj['width'] = '100%'
                }
                if(element.height !== "") {
                    if(element.height.includes("px")){
                        obj['height'] = parseInt(element.height)
                    }else{
                        obj['height'] = element.height
                    }
                }else{
                    obj['height'] = 'auto'
                }
        
                arr[index] = obj;
            });
            
            setOriginalSizes(arr);
            setSizes(arr);
            setResized(Array(arr.length).fill(false))
            setHtml(resultado);
        }        
    }

    const handleSelectedItem = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
        setSelectedItem(index)
        
        const element = e.currentTarget as HTMLDivElement;
        const computedStyle = window.getComputedStyle(element);

        const width = computedStyle.width;
        const height = computedStyle.height;
        const sizesPrev = sizes;

        sizesPrev[index] = { width: parseInt(width), height: parseInt(height)};

        setSizes(sizesPrev)

    }

    return (
        <div ref={ref} className="flex w-full max-w-6xl" onMouseLeave={stopResize}>
            <div className="flex flex-col gap-8 w-full">
            {html && html.map((elemento, index) => (
                <Draggable key={index} nodeRef={nodeRef} disabled={isResizing}>
                    <div
                    ref={nodeRef}
                    className={`w-full group p-2 cursor-pointer hover:border hover:border-black hover:box-border 
                        ${index === selectedItem ? "border border-black box-border" : ""}`}
                    style={resized[index] ? { width: `${sizes[index]?.width}px`, height: `${sizes[index]?.height}px` } : {width: originalSizes[index].width, height: originalSizes[index].height}}
                    onClick={(e) => handleSelectedItem(index, e)}
                    >
                    
                    {elemento.tag === "img" ? (
                    <div className="w-full h-full" onContextMenu={handleContextMenu}>
                        <img id={elemento.id} src={elemento.src} alt={`Imagem ${index}`} className="w-full h-full" draggable="false"/>
                        {contextMenu?.idImg === elemento.id && (
                            <div
                                className="fixed bg-black text-white px-2 py-1 rounded shadow-md z-50"
                                style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
                                onClick={handleChangeImage}
                            >
                                Upload image
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

                    </div>
                    ) : (
                    <div>{elemento.conteudo}</div>
                    )}

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