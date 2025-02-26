import { Button } from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "@/components/theme-provider.tsx";

export function ModeToggle() {
    const {theme,setTheme} = useTheme()
    return (
        <Button
            variant="ghost"
            type="button"
            size="icon"
            className="px-2 rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {/* <Sun className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" /> */}
            <img className="   dark:hidden " src="https://img.icons8.com/?size=100&id=Stt5D6Q7ZedJ&format=png&color=000000" alt="" />
            <img className="   hidden   dark:block  " src="https://img.icons8.com/?size=100&id=116896&format=png&color=000000" alt="" />
            {/* <Moon className="" /> */}
        </Button>
    );
}