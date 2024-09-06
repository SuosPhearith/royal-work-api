// =================================================================>> Core Library
import { Module } from "@nestjs/common";
// =================================================================>> Custom Library
import { DashboardModule } from "./s1-dashboard/dashboard.module";
import { DocsModule } from "./s2-docs/docs.module";
import { OrgsModule } from "./s3-orgs/orgs.module";
import { UserModule } from "./s4-user/user.module";
import { SettingModule } from "./s5-setting/setting.module";


@Module({
    imports: [
        DashboardModule,
        DocsModule,
        OrgsModule,
        UserModule,
        SettingModule,
    ]
})
export class SuperAdminModule{};