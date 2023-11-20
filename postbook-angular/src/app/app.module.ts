import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { CreateAlbumComponent } from './pages/create-album/create-album.component';
import { WallComponent } from './pages/wall/wall.component';


const appRoutes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'home', component: HomeComponent},
  // editted hehe
  {path: 'profile', component: WallComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'albums', component: AlbumsComponent},
  {path: 'create', component: CreateAlbumComponent}
  //{path: '**', component: NotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    SettingsComponent,
    FriendsComponent,
    AlbumsComponent,
    CreateAlbumComponent,
    WallComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
