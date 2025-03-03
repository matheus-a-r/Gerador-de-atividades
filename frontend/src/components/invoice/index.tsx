import { ResponseTemplate } from "@/types";
import React from "react";
import Task from "../Task";

type Props = {
    ref:any
    data: ResponseTemplate | null
}

export default function Invoice(props: Props){
  return(
    <Task ref={props.ref} data={props.data}/>
  )
}