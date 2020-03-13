import { Component, OnInit} from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  toggle: boolean;
  url = 'ws://localhost:3000/';
  url2 = 'ws://18.222.157.241:3000/';
  subject = webSocket(this.url);
  constructor() { }

  ngOnInit(): void {
    this.subject.subscribe({
      next : (data) => alert('Alarma activada'),
      error : console.log,
      complete : () => {}
    }
    );
  }

  onclick(){
    console.log('working');
    this.toggle = !this.toggle;
    this.subject.next({Data : this.toggle});
  }
}
