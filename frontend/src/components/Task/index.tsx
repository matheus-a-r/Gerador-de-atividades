import { getImageById } from "@/api/image";
import { ResponseTemplate } from "@/types";
import { useEffect, useState } from "react";

type Props = {
    data: ResponseTemplate | null;
    ref: any;
}

export default function Task(props: Props) {
    const { data, ref } = props;

    const [html, setHtml] = useState<string | TrustedHTML>();

    useEffect(() => {
        getText(data?.html);
    }, [data])
    
    const getText = async (html: string | undefined) => {
        if (html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
      
          const firstDiv = doc.querySelector("div");
          if (firstDiv?.hasAttribute("style")) {
            firstDiv.setAttribute("style", "width: 100%;");
          }
      
          const containerDiv = doc.querySelector("div.activity");
          if (containerDiv) {
            containerDiv.setAttribute("style", '');
          }
      
          const images = Array.from(doc.querySelectorAll("img"));
      
          await Promise.all(
            images.map(async (img) => {
              const src = img.getAttribute("src");
              if (src && !src.startsWith("data:image/")) {
                const response = await getImageById(src);
                if (response && response.status === 200) {
                  img.src = `data:image/png;base64,${response.data.imageUrl}`;
                }
              }
            })
          );
      
          setHtml(doc.body.innerHTML);
        }
      }
    
    return (
        <div ref={ref}className="flex w-full text-wrap">
                <div className="flex flex-col gap-8 text-wrap">
                    {html && <div className="self-center text-wrap" dangerouslySetInnerHTML={{ __html: html }} />}
                </div>
        </div>
    )
}