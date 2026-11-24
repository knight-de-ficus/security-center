"use client";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import AppHeader from "@/layout/app-layout/header";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
export default function ShellPreviews() {
  const t = useTranslations("security.workbench.gallery");
  return (
    <>
      <Card columns={12}>
        <CardHeader>
          <CardTitle>{t("applicationHeader")}</CardTitle>
        </CardHeader>
        <CardContent className="em-header-preview">
          <SidebarProvider>
            <AppHeader />
          </SidebarProvider>
        </CardContent>
      </Card>
      <Card columns={4}>
        <CardHeader>
          <CardTitle>{t("sidebar")}</CardTitle>
        </CardHeader>
        <CardContent className="em-sidebar-preview">
          <SidebarProvider>
            <Sidebar collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>{t("navigation")}</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>{t("one")}</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>{t("two")}</SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            {t("three")}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton disabled>
                        {t("disabled")}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        </CardContent>
      </Card>
      <Card columns={8}>
        <CardHeader>
          <CardTitle>{t("structure")}</CardTitle>
        </CardHeader>
        <CardContent className="em-gallery-stack">
          <Breadcrumb aria-label={t("structure")}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#navigation-specimens">
                  {t("navigation")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("fields")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    </>
  );
}
