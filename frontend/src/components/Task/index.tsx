import { getImageById, updateImageById } from "@/api/image";
import { ResponseTemplate } from "@/types";
import { useEffect, useState } from "react";
import FileInput from "../fileInput";

type Props = {
    data: ResponseTemplate | null;
    ref: any;
};

export default function Task(props: Props) {
    const { data, ref } = props;

    const [html, setHtml] = useState<string | TrustedHTML>();
    const [editingImage, setEditingImage] = useState<string | null>(null);

    document.addEventListener("mouseover", (event) => {
      const target = event.target;
  
      if (target && target.tagName === "IMG") {
        const dropzoneContainer = document.createElement("div");
        dropzoneContainer.className = "flex items-center justify-center w-full";

        const label = document.createElement("label");
        label.htmlFor = "dropzone-file";
        label.className = "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600";

        dropzoneContainer.appendChild(label);

        const innerDiv = document.createElement("div");
        innerDiv.className = "flex flex-col items-center justify-center pt-5 pb-6";

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "w-8 h-8 mb-4 text-gray-500 dark:text-gray-400");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("fill", "none");
        svg.setAttribute("viewBox", "0 0 20 16");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("d", "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2");
        svg.appendChild(path);

        const p1 = document.createElement("p");
        p1.className = "mb-2 text-sm text-gray-500 dark:text-gray-400";
        p1.innerHTML = "<span class='font-semibold'>Click to upload</span> or drag and drop";

        const p2 = document.createElement("p");
        p2.className = "text-xs text-gray-500 dark:text-gray-400";
        p2.textContent = "PNG, JPG (MAX. 800x400px)";

        const input = document.createElement("input");
        input.id = "dropzone-file";
        input.type = "file";
        input.className = "hidden";

        innerDiv.appendChild(svg);
        innerDiv.appendChild(p1);
        innerDiv.appendChild(p2);

        label.appendChild(innerDiv);
        label.appendChild(input);
        const originalSrc = target.src;
        const idImage = target.id;

        // Criar o input file
        // const fileInput = document.createElement("input");
        // fileInput.type = "file";
        dropzoneContainer.style.width = target.width + "px";
        dropzoneContainer.style.height = target.height + "px";

        // Substituir a imagem pelo input
        target.replaceWith(dropzoneContainer);

        // Restaurar a imagem quando o mouse sair
        dropzoneContainer.addEventListener("mouseleave", () => {
          dropzoneContainer.replaceWith(target);
        });

        const fileInput = document.getElementById("dropzone-file");
        if(fileInput){
          fileInput.addEventListener("change", async (e) => {
              const file = e.target.files[0];
              if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const response: any = await updateImageById(idImage, formData);
                if (response && response.status == 200) {
                    const responseImage = await getImageById(idImage);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        target.src = `data:image/png;base64,${responseImage.data.imageUrl}`;
                    };
                    reader.readAsDataURL(file);
                }
              }
          });
        }
      }
  });
  

    useEffect(() => {
        getText(data?.html);
    }, [data]);

    const getText = async (html: string | undefined) => {
        if (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const firstDiv = doc.querySelector("div");
            if (firstDiv?.hasAttribute("style")) {
                firstDiv.setAttribute("style", "width: 100%;");
            }

            const containerDiv = doc.querySelector("div.activity");
            if (containerDiv) {
                containerDiv.setAttribute("style", "");
            }

            const images = Array.from(doc.querySelectorAll("img"));

            await Promise.all(
                images.map(async (img) => {
                    const src = img.getAttribute("src");
                    if (src && !src.startsWith("data:image/")) {
                        const response = await getImageById(src);
                        if (response && response.status === 200) {
                            img.id = src
                            img.src = `data:image/png;base64,${response.data.imageUrl}`;
                        }
                    }

                    img.setAttribute("data-id", src || "");
                })
            );

            setHtml(doc.body.innerHTML);
        }
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement;
        setEditingImage(target.getAttribute("data-id"));
    };

    const handleMouseLeave = () => {
        setEditingImage(null);
    };

    const handleFileChange = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result && editingImage) {
                setHtml((prevHtml) => {
                    if (!prevHtml) return prevHtml;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(prevHtml, "text/html");

                    const img = doc.querySelector(`img[data-id="${editingImage}"]`);
                    if (img) {
                        img.src = reader.result as string;
                    }

                    return doc.body.innerHTML;
                });

                setEditingImage(null);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div ref={ref} className="flex w-full text-wrap">
            <div className="flex flex-col gap-8 text-wrap">
                {html && (
                    <div className="self-center text-wrap">
                        <div
                            dangerouslySetInnerHTML={{ __html: html }}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                )}
                {editingImage && (
                    <div className="absolute">
                        <FileInput/>
                    </div>
                )}
            </div>
        </div>
    );
}
