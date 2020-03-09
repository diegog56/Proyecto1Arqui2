import { Component, OnInit, PipeTransform } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [DecimalPipe]
})
export class PrincipalComponent implements OnInit {
  page = 1;
  pageSize = 2;
  collectionSize;
  
  //filter = new FormControl('');
  data:Array<any>=[];
  data$: Observable<any>;
  filter = new FormControl('');
  //fecha = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');

  constructor(private pipe: DecimalPipe,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.apiservice.getData().subscribe(
      res => {
        // this.data=Object.entries(res);
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
              this.data.push(res[key]);
          }
        }
        this.data$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search1(text, this.pipe))
        );
        this.collectionSize=this.data.length;
      },
      err => console.log(err)
    )
  }

  search1(text: string, pipe: PipeTransform): any {
    return this.data.filter(data => {
      const term = text.toLowerCase();
      return data.date.toLowerCase().includes(term)
        || pipe.transform(data.steps).includes(term)
        || pipe.transform(data.BPM).includes(term)
        || pipe.transform(data.weight).includes(term)
        || pipe.transform(data.position).includes(term)
        || pipe.transform(data.luminousIntensity).includes(term)
        || pipe.transform(data.soundIntensity).includes(term)
        || pipe.transform(data.water).includes(term)
        || pipe.transform(data.location.latitude).includes(term)
        || pipe.transform(data.location.longitude).includes(term)
        || pipe.transform(data.location.height).includes(term);
    });
  }


  // descargarPDF() {
  //   let doc = new jsPDF();

  //   let specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   let content = this.contenido.nativeElement;

  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     'width': 190,
  //     'elementHandlres': specialElementHandlers
  //   });

  //   doc.save(this.titulo + ' ' + this.fecha + '.pdf');
  // }

}
