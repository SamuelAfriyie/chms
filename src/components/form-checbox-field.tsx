import { FormControl, FormItem, FormLabel } from "./ui/form"
import { Checkbox } from "./ui/checkbox";
import type { ControllerRenderProps } from "react-hook-form";

type Props = {
    field: ControllerRenderProps<any>,
    lable: string;
    disabled?: boolean
}

export default function FormCheckboxField({ lable, field, disabled }: Props) {
    return (
        <FormItem className="flex items-center space-x-0.5">
            <FormLabel className="text-xs text-nowrap">
                {lable}
            </FormLabel>
            <FormControl>
                <div className="px-1 py-1 border rounded-sm flex items-center">
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                    />
                </div>
            </FormControl>

        </FormItem>
    )
}