import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AddphotomodalComponent } from './components/addphotomodal/addphotomodal.component';
import { ResultsComponent } from './pages/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { ScrollDirective } from './directives/scroll.directive';
import { FriendOptionsComponent } from './components/friend-options/friend-options.component';
import { AllnotifsComponent } from './pages/allnotifs/allnotifs.component';
import { EditprofilepicmodalComponent } from '@components/editprofilepicmodal/editprofilepicmodal.component';
import { OtherprofileComponent } from '@components/otherprofile/otherprofile.component';
import { OtherfriendsComponent } from './pages/otherfriends/otherfriends.component';
import { OtheralbumComponent } from './pages/otheralbum/otheralbum.component';
import { OtherwallComponent } from './pages/otherwall/otherwall.component';

const appRoutes: Routes = [
  // Does not need to login to access but should have no token to access
  {path: 'landing', component: LandingComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotpasswordComponent},
  {path: 'page-not-found', component: NotFoundComponent},

  // Needs token to access
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'profile', component: WallComponent}, 
  {path: 'friends', component: FriendsComponent},
  {path: 'post', component: PostComponent},
  {path: 'albums', component: AlbumsComponent},
  {path: 'create', component: CreateAlbumComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'AllNotifications', component: AllnotifsComponent},
  {path: 'otherProfile', component: OtherwallComponent},
  {path: 'otherwall', component: OtherwallComponent}, 
  {path: 'otherfriends', component: OtherfriendsComponent},
  {path: 'otheralbum', component: OtheralbumComponent},
  {path: '**', component: NotFoundComponent}

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
    PostlikelistComponent,
    AddphotomodalComponent,
    NotFoundComponent,
    ResultsComponent,
    ScrollDirective,
    FriendOptionsComponent,
    AllnotifsComponent,
    EditprofilepicmodalComponent,
    OtherfriendsComponent,
    OtheralbumComponent,
    OtherwallComponent,
    OtherprofileComponent 

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdbTooltipModule
  ],
  exports: [RouterModule, CreatealbummodalComponent, AddphotomodalComponent, EditprofilepicmodalComponent],
  providers: [MdbModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
