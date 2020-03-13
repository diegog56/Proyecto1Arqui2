import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggle: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  onclick(){
    console.log('working');
    this.toggle = !this.toggle;
  }
}
