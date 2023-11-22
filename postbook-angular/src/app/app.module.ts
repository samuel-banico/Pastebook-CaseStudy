import { Component, NgModule } from '@angular/core';
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
import { CreatealbummodalComponent } from './components/createalbummodal/createalbummodal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PostmodalComponent } from './components/postmodal/postmodal.component';
import { NotifnavbarmodalComponent } from './components/notifnavbarmodal/notifnavbarmodal.component';
import { SearchmodalComponent } from './components/searchmodal/searchmodal.component';
import { LandingComponent } from '@components/landing/landing.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { FriendrequestmodalComponent } from './components/friendrequestmodal/friendrequestmodal.component';
import { PostComponent } from './pages/post/post.component';
import { PostlikelistComponent } from './components/postlikelist/postlikelist.component';



const appRoutes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  //Edited 'home' to ''
  {path: '', component: LandingComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: WallComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'albums', component: AlbumsComponent},
  {path: 'create', component: CreateAlbumComponent},
  {path: 'landing', component:LandingComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'post', component:PostComponent}
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
    WallComponent,
    CreatealbummodalComponent,
    NotifnavbarmodalComponent,
    ForgotpasswordComponent,
    PostmodalComponent,
    LandingComponent,
    NotifnavbarmodalComponent,
    SearchmodalComponent,
    FriendrequestmodalComponent,
    PostComponent,
    PostlikelistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  exports: [RouterModule, CreatealbummodalComponent],
  providers: [MdbModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
