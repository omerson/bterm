import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlimScrollModule } from 'ng2-slimscroll';
import { HtermServiceProvider } from './services/hterm.service';
import { PTYServiceProvider } from './services/pty.service';
import { ConfigServiceProvider } from './services/config.service';
import { SearchServiceProvider } from './services/search.service';
import { AppComponent } from './app.component';
import { WindowTopComponent } from './components/window-top';
import { WindowTerminalComponent } from './components/window-terminal';
import { WindowBottomComponent } from './components/window-bottom';
import { WindowSidebarComponent } from './components/window-sidebar';
import { WindowNotificationComponent } from './components/window-notification';

@NgModule({
  declarations: [
    AppComponent,
    WindowTopComponent,
    WindowTerminalComponent,
    WindowBottomComponent,
    WindowSidebarComponent,
    WindowNotificationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    SlimScrollModule
  ],
  providers: [
    HtermServiceProvider,
    PTYServiceProvider,
    ConfigServiceProvider,
    SearchServiceProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
