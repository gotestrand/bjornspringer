import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
import { ActivityListComponent } from '../components/activity-list/activity-list.component';
import { TokenExchangeComponent } from '../components/token-exchange/token-exchange.component';
    

    const routes: Routes = [
        {
            path: '',
            component: ActivityListComponent
        },
        {
          path: 'token_exchange',
          component: TokenExchangeComponent
        },
        { path: '**', redirectTo: '' }
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }
    