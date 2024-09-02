import {ChangeEventHandler} from "react";

type StSwitchProps = {
    index: number,
    checked: boolean,
    handleToggle: ChangeEventHandler<HTMLInputElement>,
}

export default function StSwitch({index,checked,handleToggle}:StSwitchProps) {
    return (
        <div className="st_subscribe-and-save">
            <label htmlFor={`subscribeCheckbox`}>
                <input
                    type="checkbox"
                    id={`subscribeCheckbox`}
                    name="subscribeCheckbox"
                />
                <span className="st_check"></span>
            </label>
            <span className="text-[14px] text-[black]">Subscribe and save 10% something</span>
        </div>
    )
}