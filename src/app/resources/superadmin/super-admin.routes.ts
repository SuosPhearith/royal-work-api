// =================================================================>> Core Library
import { Routes } from "@nestjs/core";
import { DashboardModule } from "./s1-dashboard/dashboard.module";
import { DocsModule } from "./s2-docs/docs.module";
import { OrgsModule } from "./s3-orgs/orgs.module";
import { UserModule } from "./s4-user/user.module";
import { SettingRoutes } from "./s5-setting/setting.routes";


// =================================================================>> Custom Library
export const SuperAdminRoutes: Routes = [
    {
        path: 'cp',
        children: [
            {
                path: "dashboard",
                module: DashboardModule,
            },
            {
                path: "docs",
                module: DocsModule,
            },
            {
                path: "orgs",
                module: OrgsModule,
            },
            {
                path: "user",
                module: UserModule,
            },
            {
                path: "setting",
                children: SettingRoutes
            },
        ]
    },

]