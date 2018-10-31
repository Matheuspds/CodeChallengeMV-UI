import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { Pessoa } from './pessoa'

@Injectable()
export class PessoaService {

  constructor(private http: Http) { }

  url: string = 'http://localhost:8080/api/mv/pessoa'
  selectedPessoa: Pessoa = new Pessoa()
  pessoas: Array<Pessoa> = [];

  getPessoas() {
    return this.http.get(this.url).pipe(
      map((response: Response) => response.json().object),
      catchError((error: Response) => throwError(error))
    )
  }

  savePessoa(pessoa: Pessoa) {
    return this.http.post(this.url, pessoa).pipe(
      map((response: Response) => response.json().object),
      catchError((error: Response) => throwError(error))
    )
  }

  editPessoa(pessoa: Pessoa) {
    return this.http.put(this.url, pessoa).pipe(
      map((response: Response) => response.json().object),
      catchError((error: Response) => throwError(error))
    )
  }

  deletePessoa(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      map((response: Response) => response.json().object),
      catchError((error: Response) => throwError(error))
    )
  }

  deleteTelefone(pessoaId: number, telefoneId: number) {
    return this.http.delete(`${this.url}/${pessoaId}/telefone/${telefoneId}`).pipe(
      map((response: Response) => response.json().object),
      catchError((error: Response) => throwError(error))
    )
  }

  changeSelectedPessoa(pessoa: Pessoa) {
    this.selectedPessoa = pessoa
  }

  getCurrentPessoa() {
    return this.selectedPessoa
  }

  cleanCurrentPessoa() {
    this.selectedPessoa = new Pessoa()
  }
}
