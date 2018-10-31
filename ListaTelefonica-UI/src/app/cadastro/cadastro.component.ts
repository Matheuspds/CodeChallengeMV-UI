import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { Pessoa } from '../pessoa'
import { Telefone } from '../telefone'
import { PessoaService } from '../pessoa.service'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {

  pessoa: Pessoa = new Pessoa()
  listTelefone: Array<Telefone> = []
  telefone: Telefone = new Telefone()
  edit: boolean = false;

  constructor(private service: PessoaService, private router: Router,
    private confirmationService: ConfirmationService) { }

  async ngOnInit() {
    try {
      this.pessoa = await this.service.getCurrentPessoa()
      if (this.pessoa.id) {
        this.edit = true
        this.listTelefone = this.pessoa.listTelefone
      }
    } catch (e) {
      console.log(e)
    }
  }

  ngOnDestroy() {
    this.goBack()
  }

  validateForm() {
    return (!this.pessoa.cpf || !this.pessoa.dataNascimento || !this.pessoa.email || !this.pessoa.nome)
  }

  validateTelefone() {
    return (!this.telefone.ddd || !this.telefone.numero)
  }

  savePessoa() {
    this.pessoa.listTelefone = this.listTelefone
    this.service.savePessoa(this.pessoa).subscribe(
      (data) => {
        this.goBack()
      },
      (error) => console.log(error)
    )
  }

  editPessoa() {
    this.pessoa.listTelefone = this.listTelefone
    this.service.editPessoa(this.pessoa).subscribe(
      (data) => {
        this.goBack()
      },
      (error) => console.log(error)
    )
  }

  adicionarTelefone() {
    this.listTelefone.push(this.telefone)
    this.telefone = new Telefone()
  }

  deleteTelefone(telefone) {
    this.confirmationService.confirm(
      {
        message: "Tem certeza que deseja excluir este registro ?",
        accept: () => {
          if (telefone.id) {
            this.service.deleteTelefone(this.pessoa.id, telefone.id).subscribe(
              (data) => {
                this.spliceTelefone(telefone)
              },
              (error) => console.log(error)
            )
          } else {
            this.spliceTelefone(telefone)
          }
        }
      }
    )

  }

  spliceTelefone(tel) {
    var index = this.listTelefone.indexOf(tel)
    this.listTelefone.splice(index, 1)
  }

  goBack() {
    this.router.navigateByUrl('/listagem')
    this.pessoa = new Pessoa()
    this.service.cleanCurrentPessoa()
  }
}
