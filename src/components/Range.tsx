'use client'
import React, { useState } from 'react'
import { Slider } from './ui/slider'

export default function Range({ onValueChange }: { onValueChange?: (value: number) => void }) {
    const [value, setValue] = useState(0)
    return (
        <div className="bg-accent/50 p-4 rounded-xl flex items-center gap-8 ">
            <Slider min={100} max={10000} onValueChange={(value) => {
                setValue(value[0])
                onValueChange?.(value[0])
            }} />
            <p className='text-sm'>{value}$</p>
        </div>
    )
}
