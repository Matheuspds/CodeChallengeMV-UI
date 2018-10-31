import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router'
import { PessoaService } from '../pessoa.service'
import { Pessoa } from '../pessoa'

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})

export class ListagemComponent implements OnInit {

  pessoas: Array<Pessoa> = [];
  pessoaSearch: string;
  cpfSearch: string;

  constructor(private service: PessoaService,
    private router: Router,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.getPessoas()
  }

  search(dt) {
    dt.filter(this.pessoaSearch, 'nome', 'contains')
    dt.filter(this.cpfSearch, 'cpf', 'contains')
  }

  getPessoas() {
    this.service.getPessoas().subscribe(
      (data) => { this.pessoas = data },
      (error) => console.log(error)
    )
  }

  editPessoa(pessoa: Pessoa) {
    this.service.changeSelectedPessoa(pessoa)
    this.router.navigateByUrl('/cadastro')
  }

  calculateIdade(date) {
    return new Date().getFullYear() - new Date(date).getFullYear();
  }

  deletePessoa(id: number) {
    this.confirmationService.confirm(
      {
        message: "Tem certeza que deseja excluir este registro ?",
        accept: () => {
          this.service.deletePessoa(id).subscribe(
            (data) => this.getPessoas(),
            (error) => console.log(error)
          )
        }
      }
    )
  }
}
