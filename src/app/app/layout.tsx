import { PropsWithChildren } from "react";
import { SidebarLeft } from "@/components/shad-comp/sidebar-left";
import { SidebarRight } from "@/components/shad-comp/sidebar-right";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="">
      <div className="">
        <SidebarProvider>
          <SidebarLeft />
          <SidebarInset>
            <header className="sticky  top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        STOCKSAGE
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className="w-full bg-gray-50">{children}</main>
          </SidebarInset>

          {/* <SidebarRight /> */}
        </SidebarProvider>
      </div>
    </div>
  );
}
