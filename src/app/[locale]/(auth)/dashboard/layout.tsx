import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'
import { BookIcon, Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <SidebarProvider>
            <Sidebar variant='inset'>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem >
                                    <SidebarMenuButton asChild>
                                        <Link href={'/dashboard/blogs'} className=' bg-accent shadow  shadow-black/40'>
                                            <BookIcon />
                                            <span>Blogs</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <SidebarInset className='px-4 py-4'>
                <SidebarTrigger />

                <div>

                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
