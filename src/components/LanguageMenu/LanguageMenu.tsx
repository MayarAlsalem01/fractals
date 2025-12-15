'use client'
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { LanguagesIcon, GlobeIcon } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

export function LanguageMenu({ className }: { className?: string }) {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Select defaultValue={locale} onValueChange={(e) => {
            router.replace(pathname, { locale: e })
        }} >
            <SelectTrigger className={`flex font-gravesend w-fit rounded-2xl rounded-tr-none rounded-bl-none focus-visible:ring-0 xl:py-5 xl:px-4 ${className}`}>
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="font-gravesend">languages</SelectLabel>
                    <SelectItem className="" value="en">
                        <GlobeIcon />
                        en
                    </SelectItem>
                    <SelectItem value="de">
                        <GlobeIcon />
                        de
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
