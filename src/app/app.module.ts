import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';

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
import { UrlPipe } from './upload-image/url-pipe';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { VariationsListComponent } from './variations-list/variations-list.component';
import { BulletListDisplayComponent } from './bullet-list-display/bullet-list-display.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    StorefrontComponent,
    ProductFormComponent,
    UploadImageComponent,
    CartComponent,
    BulletListComponent,
    CategoryViewComponent,
    UrlPipe,
    ProductModalComponent,
    NavbarComponent,
    AboutComponent,
    ContactComponent,
    VariationsListComponent,
    BulletListDisplayComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule, 
    MatButtonModule, 
    MatSidenavModule, 
    MatToolbarModule,
    FlexLayoutModule,
    HttpClientModule,
    MatMenuModule,
    AngularFontAwesomeModule
  ],
  providers: [AngularFirestore, AuthService, AngularFireAuth, UploadService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  entryComponents: [
    ProductModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
