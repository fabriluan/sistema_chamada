import { TitleSl } from "./styleTl";

export default function Title({children, text}){
    return(
        <TitleSl>
            {children}
            <p>{text}</p>
        </TitleSl>
    )
}