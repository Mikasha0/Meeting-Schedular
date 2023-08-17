import { btnTypes } from "./z.schema";

export interface NormalButtonType{
    btnName:string,
    type:btnTypes,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void

}