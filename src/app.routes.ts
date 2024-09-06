// =================================================================>> Core Library
import { Routes } from "@nestjs/core";
// =================================================================>> Custom Library
import { SuperAdminRoutes } from "./app/resources/superadmin/super-admin.routes";


export const appRoutes: Routes = [
    {
        path: 'api',
        children: [
            {
                path: "super-admin",
                children: SuperAdminRoutes
            }
            
        ]
    },
];
