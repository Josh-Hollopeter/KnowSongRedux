import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  showText:boolean;

  private section;

  constructor() { }

  ngOnInit(): void{

  }

  ngOnViewInit(){
    
  }

  toggleText(toggle: boolean){

    if(toggle){
      
    } 
    
    else{

    }
    

  }


}
