import React from 'react'
import { IResult } from './containers/App/IRandomUser'
export interface IContextProps {
    style:any
}
export interface IStarterProviderProps {
    children?: React.ReactNode
}
interface IServiceRenderer {
    (data:Array<IResult>): React.ReactNode;
}
export interface IStarterContext {
    HTMLtitlePre: string,
    JSONdata:IResult[],
    serviceRenderer: IServiceRenderer
}
export interface IFormFields {
    email:string,
    firstName:string,
    lastName:string
}
