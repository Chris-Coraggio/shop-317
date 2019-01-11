import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { AuthService } from './core/auth.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { UploadService } from './core/upload.service';
import { CartComponent } from './cart/cart.component';
import { BulletListComponent } from './bullet-list/bullet-list.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { FileNamePipe } from './upload-image/file-name-pipe';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    LoginComponent,
    StorefrontComponent,
    ProductFormComponent,
    UploadImageComponent,
    CartComponent,
    BulletListComponent,
    CategoryViewComponent,
    FileNamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [AngularFirestore, AuthService, AngularFireAuth, UploadService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
