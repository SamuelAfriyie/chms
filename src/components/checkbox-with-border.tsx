import { useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
    checked?: CheckedState | undefined;
    onCheckedChange?: (v: string) => void;
}

export default function CheckBoxWithBorder({onCheckedChange }: Props) {
    const [chk, setChecked] = useState<CheckedState>("indeterminate");
    const currentChk = useRef<boolean | "indeterminate">('indeterminate');

    const handleCheckedChange = () => {
        if (chk === true) {
            setChecked(false);
            currentChk.current = false;
        } else if (chk === false) {
            setChecked('indeterminate');
            currentChk.current = "indeterminate"
        } else {
            setChecked(true);
            currentChk.current = true;
        }

        if (onCheckedChange) {
            onCheckedChange(currentChk.current === 'indeterminate' ? "" : currentChk.current.toString());
        }
    }

    return (
        <div className="p-1 rounded-sm flex border items-center dark:bg-muted size-fit">
            <Checkbox defaultChecked="indeterminate" onCheckedChange={handleCheckedChange} checked={chk} />
        </div>
    )
}