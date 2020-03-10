import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation'; 
import * as FusionCharts from 'fusioncharts';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, AfterViewInit { 

  //RADAR CHART
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Peso', 'Agua', 'Pasos', 'Luz', 'BPM', 'Posicion', 'Sonido'];

  public radarChartData: ChartDataSets[] = [
    { data: [15, 50, 8, 85, 66, 85, 40], label: 'Promedio (datos cada 5 minutos)' }
  ];
  public radarChartType: ChartType = 'radar';

  //BAR CHART STEPS
  filteroption:string="%Y-%m-%d";
  steps:any=[];
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  filterSteps(){
    if(this.toDate!=null){
      let start=this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day;
      let end=this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day;
      console.log(start);
      console.log(end);
      console.log(this.filteroption);
      this.service.getFilteredSteps(start,end,this.filteroption).subscribe(
        res=>{
          this.steps=res;
          console.log(this.steps);
          this.barChartData = [
            { data: [], label: 'Pasos' }
          ];
          this.barChartLabels= [];
          for(let step of this.steps){
            this.barChartData[0]['data'].push(step.totalStep);
            this.barChartLabels.push(step._id);
          }
        },
        err => console.log(err)
      )
    }else alert("Fecha final incorrecta");
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11', '2020-03-12', '2020-03-13', '2020-03-14'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Pasos' }
  ];

  //LINE CHART
   public lineChartData: ChartDataSets[] = [
    { data: [80, 80, 80, 80,
              80, 80, 80, 80,
              65, 59, 80, 81,
              66, 59, 85, 82,
              65, 59, 82, 83,
              67, 59, 81, 81,
              65, 59, 87, 84,
              61, 59, 76, 81,
              65, 59, 65, 85,
              75, 59, 88, 89,
              80, 80, 80, 80,
              65, 59, 80, 81,
              66, 59, 85, 82,
              65, 59, 82, 83,
              67, 59, 81, 81,
              65, 59, 87, 84,
              61, 59, 76, 81,
              65, 59, 65, 85,
              75, 59, 88, 55], label: 'BPM' }
  ];
  public lineChartLabels: Label[] = ['2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05',
  '2020-03-08 00:30:40', '2020-03-08 00:31:20', '2020-03-08 00:31:22', '2020-03-08 00:36:05'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  //RELACIONES
  //cambio de ejes
  //scatter charts for fusion charts could be ideal, linear regresions

  //Intensidad Luminosa vs Ritmo Cardíaco

  //Postura vs Peso

  //Ubicacion

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;
  lat = 14.607815;
  lng = -90.55173;
  markers = [ //data for map info goes in title
  ];
  setMarkers(){
    for(let marker of this.fulldata){
      let t = {
        position: new google.maps.LatLng(marker['location'].latitude,marker['location'].longitude),
        map: this.map,
        title: marker.date
      };
      this.markers.push(t);
    }
  }
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.loadAllMarkers();
  }
  ngAfterViewInit() {
    
  }
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });
  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      //creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      //Add click event to open info window on marker
      marker.addListener("click", () => {
        infoWindow.open(marker.getMap(), marker);
      });

      //Adding marker to google map
      marker.setMap(this.map);
    });
  }

  //BPM CHART

  dataSource: any;
  type: string;
  width: string;
  height: string;
  fulldata:any=[];

  constructor(private service:ApiService, calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.fromDate.year=2020;
    this.fromDate.month=3;
    this.fromDate.day=8;
    this.toDate.year=2020;
    this.toDate.month=3;
    this.toDate.day=10;
    this.service.getData().subscribe(
      res => {
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
              this.fulldata.push(res[key]);
          }
        }
        this.setMarkers();
        this.mapInitializer();
      },
      err => console.log(err) 
    )
    this.service.getSteps().subscribe(
      res => {
        this.steps=res;
        this.barChartData = [
          { data: [], label: 'Pasos' }
        ];
        this.barChartLabels= [];
        for(let step of this.steps){
          this.barChartData[0]['data'].push(step.totalStep);
          this.barChartLabels.push(step._id);
        }
      },
      err => console.log(err)
    )
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSource = {
      data: null,
      caption: {
        text: 'Ritmo Cardiaco'
      },
      yAxis: [
        {
          plot: 'BPM',
          title: 'Latidos por minuto',
          format: {
            suffix: 'BPM'
          },
          style: {
            title: {
              'font-size': '14px'
            }
          },
          referenceLine: [
            {
              label: 'Minimo normal',
              value: '60'
            },
            {
              label: 'Maximo normal',
              value: '90'
            }
          ]
        }
      ]
    };
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    //var jsonify = res => res.json();
    var dataFetch = [
      [
        "3/09/2020 18:00:00",
        2.6,
        150,
        11.9,
        113,
        79
      ],
      [
        "3/09/2020 19:00:00",
        2,
        112,
        9.4,
        92,
        88
      ],
      [
        "3/09/2020 20:00:00",
        2.2,
        66,
        9,
        114,
        67
      ],
      [
        "3/09/2020 21:00:00",
        2.2,
        80,
        9.2,
        122,
        67
      ],
      [
        "3/09/2020 22:00:00",
        1.6,
        51,
        6.5,
        116,
        66
      ],
      [
        "3/09/2020 23:00:00",
        1.2,
        38,
        4.7,
        96,
        90
      ],
      [
        "3/10/2020 0:00:00",
        1.2,
        31,
        3.6,
        77,
        82
      ],
      [
        "3/10/2020 1:00:00",
        1,
        31,
        3.3,
        76,
        66
      ],
      [
        "3/10/2020 2:00:00",
        0.9,
        24,
        2.3,
        60,
        78
      ],
      [
        "3/10/2020 3:00:00",
        0.6,
        19,
        1.7,
        45,
        77
      ],
      [
        "3/10/2020 4:00:00",
        2,
        14,
        1.3,
        34,
        85
      ],
      [
        "3/10/2020 5:00:00",
        0.7,
        8,
        1.1,
        28,
        67
      ],
      [
        "3/10/2020 6:00:00",
        0.7,
        16,
        1.6,
        48,
        76
      ],
      [
        "3/10/2020 7:00:00",
        1.1,
        29,
        3.2,
        82,
        76
      ],
      [
        "3/10/2020 8:00:00",
        2,
        64,
        8,
        112,
        87
      ],
      [
        "3/10/2020 9:00:00",
        2.2,
        87,
        9.5,
        101,
        110
      ],
      [
        "3/10/2020 10:00:00",
        1.7,
        77,
        6.3,
        98,
        120
      ],
      [
        "3/10/2020 11:00:00",
        1.5,
        43,
        5,
        92,
        110
      ],
      [
        "3/10/2020 12:00:00",
        1.6,
        61,
        5.2,
        95,
        65
      ],
      [
        "3/10/2020 13:00:00",
        1.9,
        63,
        7.3,
        112,
        50
      ],
      [
        "3/10/2020 14:00:00",
        2.9,
        164,
        11.5,
        128,
        45
      ],
      [
        "3/10/2020 15:00:00",
        2.2,
        79,
        8.8,
        126,
        52
      ],
      [
        "3/10/2020 16:00:00",
        2.2,
        95,
        8.3,
        131,
        56
      ],
      [
        "3/10/2020 17:00:00",
        2.9,
        150,
        11.2,
        135,
        78
      ],
      [
        "3/10/2020 18:00:00",
        4.8,
        307,
        20.8,
        151,
        89
      ],
      [
        "3/10/2020 19:00:00",
        6.9,
        461,
        27.4,
        172,
        9.7
      ],
      [
        "3/10/2020 20:00:00",
        6.1,
        401,
        24,
        165,
        9.6
      ],
      [
        "3/10/2020 21:00:00",
        3.9,
        197,
        12.8,
        136,
        9.1
      ],
      [
        "3/10/2020 22:00:00",
        1.5,
        61,
        4.7,
        85,
        8.2
      ],
      [
        "3/10/2020 23:00:00",
        1,
        26,
        2.6,
        53,
        8.2
      ],
      [
        "3/11/2020 0:00:00",
        1.7,
        55,
        5.9,
        97,
        8.3
      ],
      [
        "3/11/2020 1:00:00",
        1.9,
        53,
        6.4,
        110,
        7.7
      ],
      [
        "3/11/2020 2:00:00",
        1.4,
        40,
        4.1,
        91,
        7.1
      ],
      [
        "3/11/2020 3:00:00",
        0.8,
        21,
        1.9,
        70,
        7
      ],
      [
        "3/11/2020 4:00:00",
        5,
        10,
        1.1,
        32,
        6.1
      ],
      [
        "3/11/2020 5:00:00",
        0.6,
        7,
        1,
        44,
        6.3
      ],
      [
        "3/11/2020 6:00:00",
        0.8,
        17,
        1.8,
        71,
        6.8
      ],
      [
        "3/11/2020 7:00:00",
        1.4,
        33,
        4.4,
        104,
        6.4
      ],
      [
        "3/11/2020 8:00:00",
        4.4,
        202,
        17.9,
        141,
        7.3
      ],
      [
        "3/11/2020 9:00:00",
        1,
        142,
        22.1,
        130,
        9.2
      ],
      [
        "3/11/2020 10:00:00",
        3.1,
        208,
        14,
        122,
        13.2
      ],
      [
        "3/11/2020 11:00:00",
        2.7,
        166,
        11.6,
        143,
        14.3
      ],
      [
        "3/11/2020 12:00:00",
        2.1,
        114,
        10.2,
        113,
        15
      ],
      [
        "3/11/2020 13:00:00",
        2.5,
        140,
        11,
        116,
        16.1
      ],
      [
        "3/11/2020 14:00:00",
        2.7,
        169,
        12.8,
        123,
        16.3
      ],
      [
        "3/11/2020 15:00:00",
        2.9,
        185,
        14.2,
        126,
        15.8
      ],
      [
        "3/11/2020 16:00:00",
        2.8,
        165,
        12.7,
        120,
        15.9
      ],
      [
        "3/11/2020 17:00:00",
        2.4,
        133,
        11.7,
        119,
        16.9
      ],
      [
        "3/11/2020 18:00:00",
        3.9,
        233,
        19.3,
        149,
        15.1
      ],
      [
        "3/11/2020 19:00:00",
        3.7,
        242,
        18.2,
        145,
        14.4
      ],
      [
        "3/11/2020 20:00:00",
        6.6,
        488,
        32.6,
        170,
        12.9
      ],
      [
        "3/11/2020 21:00:00",
        4.4,
        333,
        20.1,
        149,
        12.1
      ],
      [
        "3/11/2020 22:00:00",
        3.5,
        215,
        14.3,
        139,
        11
      ],
      [
        "3/11/2020 23:00:00",
        5.4,
        367,
        21.8,
        134,
        9.7
      ],
      [
        "3/12/2020 0:00:00",
        2.7,
        122,
        9.6,
        113,
        9.5
      ],
      [
        "3/12/2020 1:00:00",
        1.9,
        67,
        7.4,
        97,
        9.1
      ],
      [
        "3/12/2020 2:00:00",
        1.6,
        43,
        5.4,
        82,
        8.8
      ],
      [
        "3/12/2020 3:00:00",
        1.7,
        46,
        5.4,
        83,
        7.8
      ],
      [
        "3/12/2020 4:00:00",
        5,
        56,
        6.2,
        83,
        7
      ],
      [
        "3/12/2020 5:00:00",
        1,
        30,
        2.6,
        65,
        8.3
      ],
      [
        "3/12/2020 6:00:00",
        1.2,
        27,
        2.9,
        60,
        7.2
      ],
      [
        "3/12/2020 7:00:00",
        1.5,
        47,
        5.1,
        77,
        6.3
      ],
      [
        "3/12/2020 8:00:00",
        2.7,
        132,
        11.8,
        96,
        6.5
      ],
      [
        "3/12/2020 9:00:00",
        3.7,
        239,
        15.1,
        119,
        9.6
      ],
      [
        "3/12/2020 10:00:00",
        3.2,
        160,
        12.9,
        126,
        12.4
      ],
      [
        "3/12/2020 11:00:00",
        4.1,
        283,
        16.1,
        158,
        15.6
      ],
      [
        "3/12/2020 12:00:00",
        3.6,
        210,
        14,
        161,
        18.4
      ],
      [
        "3/12/2020 13:00:00",
        2.8,
        154,
        12.3,
        124,
        19.4
      ],
      [
        "3/12/2020 14:00:00",
        2,
        112,
        8.6,
        102,
        18
      ],
      [
        "3/12/2020 15:00:00",
        2,
        108,
        9.2,
        116,
        18.4
      ],
      [
        "3/12/2020 16:00:00",
        2.5,
        111,
        10.2,
        124,
        17.6
      ],
      [
        "3/12/2020 17:00:00",
        2.3,
        97,
        10.6,
        125,
        16.7
      ],
      [
        "3/12/2020 18:00:00",
        3.2,
        191,
        15.5,
        148,
        16.1
      ],
      [
        "3/12/2020 19:00:00",
        4.2,
        258,
        19.6,
        165,
        15.8
      ],
      [
        "3/12/2020 20:00:00",
        4.2,
        284,
        19.2,
        161,
        15.7
      ],
      [
        "3/12/2020 21:00:00",
        4.2,
        269,
        18.3,
        159,
        15.3
      ],
      [
        "3/12/2020 22:00:00",
        3.1,
        180,
        13.1,
        143,
        14.6
      ],
      [
        "3/12/2020 23:00:00",
        2.6,
        116,
        10.9,
        130,
        14.7
      ]
    ];
    // fetch(
    //   'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/adding-a-reference-line-data.json'
    // ).then(jsonify);
    var schemaFetch = [{
          "name": "Time",
          "type": "date",
          "format": "%-m/%-d/%Y %H:%M:%S"
      }, {
          "name": "Carbon mono-oxide (mg/m^3)",
          "type": "number"
      },{
          "name": "Non methane hydrocarbons (microg/m^3)",
          "type": "number"
      },{
          "name": "Benzene",
          "type": "number"
      },{
          "name": "Nitrogen dioxide",
          "type": "number"
      }, {
          "name": "BPM",
          "type": "number"
      }];
    // fetch(
    //   'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/adding-a-reference-line-schema.json'
    // ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }

  ngOnInit() {
    
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
