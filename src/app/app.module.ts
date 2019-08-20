import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PortfolioComponent,
    ResumeComponent,
    BookmarkComponent,
    ContactComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
