import { ResponseTemplate } from "@/types";
import { useEffect, useState } from "react";

type Props = {
    data: ResponseTemplate | null;
    ref: any;
}

type ImageData = {
    alt: string | null;
    exp: string | null;
  };

export default function Task(props: Props) {
    const { data, ref } = props;

    const [html, setHtml] = useState<string | TrustedHTML>();

    useEffect(() => {
        getText(data?.html);
    }, [data])
    
    const getText = (html: string | undefined) => {
        if (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const firstDiv = doc.querySelector("div");
            
            if (firstDiv?.hasAttribute("style")) {
                firstDiv.setAttribute(
                    "style",
                    "width: 100%;"
                );
            }

            const containerDiv = doc.querySelector("div.activity");
            if (containerDiv) {
                containerDiv.setAttribute(
                    "style",
                    ''
                );
            }

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