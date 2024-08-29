import { useState } from "react";
import chevronIcon from '../../../assets/chevron.svg'

export type SubMenuProps = {
    title: string;
    children: React.ReactNode;
    active?: boolean
}

export const SubMenu: React.FC<SubMenuProps> = ({ title, children, active }) => {
    const [isOpen, setIsOpen] = useState(active ?? false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full text-white border-b border-white">
            <div className={"flex items-center p-3 hover:bg-primary-light"} onClick={toggle}>
                <div className="w-full">
                    {title}
                </div>
                <img className={`w-4 h-auto ${isOpen && "transform scale-y-[-1]"}`} src={chevronIcon} alt="" width={64} height={64} />
            </div>
            {isOpen && <div className="bg-primary-dark">{children}</div>}
        </div>
    );
};
