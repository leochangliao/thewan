import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { AdminContentComponent } from './pages/admin/content/admin.content.component';
import { AdminBookmarkComponent } from './pages/admin/content/bookmark/bookmark.component';
import { AdminPortfolioComponent } from './pages/admin/content/portfolio/portfolio.component';
import { AdminResumeComponent } from './pages/admin/content/resume/resume.component';
import { AdminMessageComponent } from './pages/admin/content/message/message.component';
import { AdminControlComponent } from './pages/admin/control/control.component';
import { AssetsManagerComponent } from './shared/assets/assets.component';
import { ConfirmModal } from './shared/modal/confirm/confirm.component';
import { AlertModal } from './shared/modal/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PortfolioComponent,
    ResumeComponent,
    BookmarkComponent,
    ContactComponent,
    PageNotFoundComponent,
    AdminComponent,
    LoginComponent,
    AdminContentComponent,
    AdminBookmarkComponent,
    AdminPortfolioComponent,
    AdminResumeComponent,
    AdminMessageComponent,
    AdminControlComponent,
    AssetsManagerComponent,
    ConfirmModal,
    AlertModal
  ],
  entryComponents: [
    AlertModal,
    ConfirmModal
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    NgbModule,
    DragDropModule,
    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
