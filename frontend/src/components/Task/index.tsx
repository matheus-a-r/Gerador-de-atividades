import { ResponseTemplate } from "@/types";
import { useEffect, useState } from "react";

type Props = {
    data: ResponseTemplate | null
}

type ImageData = {
    alt: string | null;
    exp: string | null;
  };

export default function Task(props: Props) {
    const { data } = props;

    const [html, setHtml] = useState<string | undefined>();

    const [question, setQuestion] = useState<string | undefined>();
    const [imagesList, setImagesList] = useState<ImageData[]>([]);

    useEffect(() => {
        getText(data?.html);
    }, [data])
    
    const getText = (html: string | undefined) => {
        if (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const firstDiv = doc.querySelector("div");
            
            if (firstDiv?.hasAttribute("style")) {
                // firstDiv.removeAttribute("style");
                firstDiv.setAttribute(
                    "style",
                    "width: 100%;"
                );
            }

            doc.querySelectorAll("img").forEach((img) => {
                img.setAttribute("src", "https://s2-casaejardim.glbimg.com/xdgh9nWSpiINzuJWTRofzTbGKa8=/0x0:1400x933/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/J/4/f5RFT9TQKFr8LM9TA7hw/cactos-e-flor-de-cactos-gettyimages-1447981386.jpg");
                img.setAttribute(
                    "style",
                    "max-width: 300px;"
                );
            });

            const containerDiv = doc.querySelector("div.container");
            if (containerDiv) {
                containerDiv.setAttribute(
                    "style",
                    "display: flex; justify-content: center; align-items: center; gap: 10px;"
                );
            }

            setHtml(doc.body.innerHTML);
        }
    }
    
    return (
        <div className="flex w-full max-w-6xl">
                <div className="flex flex-col gap-8">
                    <div className="self-center" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
        </div>
    )
}