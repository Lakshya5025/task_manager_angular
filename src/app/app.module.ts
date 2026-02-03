import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './tasks/list/list.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { UpsertComponent } from './tasks/upsert/upsert.component';
import { AuthService } from './auth/auth.service';
import { DataModifyService } from './core/data.modify.service';
import { HighlightDirective } from './core/highlight.directive';
import { TruncatePipe } from './core/truncate.pipe';
import { TokenInterceptor } from './core/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginComponent,
    UpsertComponent,
    HighlightDirective,
    TruncatePipe,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    AuthService,
    DataModifyService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
