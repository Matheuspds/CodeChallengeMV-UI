import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {InputMaskModule} from 'primeng/inputmask';

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemComponent } from './listagem/listagem.component';
import { PessoaService } from './pessoa.service';
import { MessageService, ConfirmationService } from 'primeng/api';

const appRoutes: Routes = [
  { path: '', redirectTo: '/listagem', pathMatch: 'full' },
  { path: 'listagem', component: ListagemComponent },
  { path: 'cadastro', component: CadastroComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ListagemComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    ConfirmDialogModule,
    InputMaskModule
  ],
  providers: [PessoaService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
