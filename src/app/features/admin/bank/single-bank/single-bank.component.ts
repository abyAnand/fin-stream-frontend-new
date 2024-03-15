import { Component, OnInit } from '@angular/core';
import { BankInfoDto } from '../../../../core/models/bank/BankInfoDto.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-bank',
  templateUrl: './single-bank.component.html',
  styleUrls: ['./single-bank.component.css']
})
export class SingleBankComponent implements OnInit{

  bank : BankInfoDto | null = null;


  constructor(
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params =>{
      if(params['bankData']){
        this.bank = JSON.parse(params['bankData']);
      }
    });

    console.log(this.bank);

  }



}
