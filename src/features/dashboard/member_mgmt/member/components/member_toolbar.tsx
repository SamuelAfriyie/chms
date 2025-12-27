import RangeSelector from "@/components/calendar-02";
import ChipSelect from "@/components/chip-select";
import { Input } from "@/components/ui/input"; 

const MemberToolbar = () => {
    return (
        <main className="border-none rounded-sm py-1 px-1 bg-transparent flex items-center w-full h-[35px] space-x-2">
            <div className="w-[300px]">
                <Input className="max-w-sm focus-visible:ring-0 h-7 rounded-sm" placeholder="Search here..." />
            </div>
            <div className="w-auto hidden md:block">
                <ChipSelect label="Memb. Status:" placeholder="Select" options={[]} onSelect={() => { }} />
            </div>
            <div className="w-auto hidden md:block">
                <ChipSelect label="Baptism Status:" placeholder="Select" options={[]} onSelect={() => { }} />
            </div>
            <div className="w-auto hidden md:block">
                <RangeSelector />
            </div>
        </main>
    )
}

export default MemberToolbar;