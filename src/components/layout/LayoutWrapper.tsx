import { FC, PropsWithChildren } from "react"
import { Header } from "./Header"

export const GlobalLayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className="flex flex-col h-screen w-screen">
        <Header />
        <section className="w-full flex-1 overflow-hidden">
            {children}
        </section>
    </div>
}