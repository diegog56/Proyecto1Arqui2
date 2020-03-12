import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation'; 
import * as FusionCharts from 'fusioncharts';
import { ApiService } from 'src/app/services/api.service';
import { interval } from 'rxjs';
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
  public radarChartLabels: Label[] = ['Pasos', 'BPM x 10', 'Peso (kg)', 'Posicion(°) x 10', 'Luz x 3', 'Sonido(dB) x 10', 'Agua x 20'];

  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'Promedio' }
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
      this.service.getFilteredSteps(start,end,this.filteroption).subscribe(
        res=>{
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
  relationsdata=[];

  yaxis:string="Pasos";
  xaxis:string="Ritmo Cardiaco";
  
  sensor1:string="Sensor 1";
  sensor2:string="Sensor 2";
  scatterchart:any=  {
      "chart": {
          "caption": this.sensor1+" vs "+this.sensor2,
          "subCaption": "Relacion entre sensores",
          "baseFont": "Helvetica Neue,Arial",
          "xAxisName": this.sensor1,
          "yAxisName": this.sensor2,
          "xAxisMinValue": "23",
          "xAxisMaxValue": "95",
          "yNumberSuffix": "$",
          "xNumberSuffix": "&deg; F",
          "theme": "fusion"
      },
      "categories": [
          {
              "verticalLineDashed": "1",
              "verticalLineDashLen": "1",
              "verticalLineDashGap": "1",
              "verticalLineThickness": "1",
              "verticalLineColor": "#000000",
              "category": [
                  {
                      "x": "23",
                      "label": "23° F",
                      "showverticalline": "0"
                  },
                  {
                      "x": "32",
                      "label": "32° F",
                      "showverticalline": "1"
                  },
                  {
                      "x": "50",
                      "label": "50° F",
                      "showverticalline": "1"
                  },
                  {
                      "x": "68",
                      "label": "68° F",
                      "showverticalline": "1"
                  },
                  {
                      "x": "80",
                      "label": "80° F",
                      "showverticalline": "1"
                  },
                  {
                      "x": "95",
                      "label": "95° F",
                      "showverticalline": "1"
                  }
              ]
          }
      ],
      "dataset": [
          {
              "seriesname": "Sensor 1 vs Sensor 2",
              "showregressionline": "1",
              "data": [
                  {
                      "x": "23",
                      "y": "1560"
                  },
                  {
                      "x": "24",
                      "y": "1500"
                  },
                  {
                      "x": "24",
                      "y": "1680"
                  },
                  {
                      "x": "25",
                      "y": "1780"
                  },
                  {
                      "x": "25",
                      "y": "1620"
                  },
                  {
                      "x": "26",
                      "y": "1810"
                  },
                  {
                      "x": "27",
                      "y": "2310"
                  },
                  {
                      "x": "29",
                      "y": "2620"
                  },
                  {
                      "x": "31",
                      "y": "2500"
                  },
                  {
                      "x": "32",
                      "y": "2410"
                  },
                  {
                      "x": "35",
                      "y": "2880"
                  },
                  {
                      "x": "36",
                      "y": "3910"
                  },
                  {
                      "x": "34",
                      "y": "3960"
                  },
                  {
                      "x": "38",
                      "y": "4080"
                  },
                  {
                      "x": "40",
                      "y": "4190"
                  },
                  {
                      "x": "41",
                      "y": "4170"
                  },
                  {
                      "x": "42",
                      "y": "4280"
                  },
                  {
                      "x": "54",
                      "y": "5180"
                  },
                  {
                      "x": "53",
                      "y": "5770"
                  },
                  {
                      "x": "55",
                      "y": "5900"
                  },
                  {
                      "x": "56",
                      "y": "5940"
                  },
                  {
                      "x": "58",
                      "y": "6090"
                  },
                  {
                      "x": "61",
                      "y": "6086"
                  },
                  {
                      "x": "67",
                      "y": "6100"
                  },
                  {
                      "x": "68",
                      "y": "6200"
                  },
                  {
                      "x": "70",
                      "y": "6360"
                  },
                  {
                      "x": "75",
                      "y": "6450"
                  },
                  {
                      "x": "79",
                      "y": "6650"
                  },
                  {
                      "x": "80",
                      "y": "6710"
                  },
                  {
                      "x": "79",
                      "y": "6975"
                  },
                  {
                      "x": "82",
                      "y": "7000"
                  },
                  {
                      "x": "85",
                      "y": "7150"
                  },
                  {
                      "x": "86",
                      "y": "7160"
                  },
                  {
                      "x": "86",
                      "y": "7200"
                  },
                  {
                      "x": "88",
                      "y": "7230"
                  },
                  {
                      "x": "87",
                      "y": "7210"
                  },
                  {
                      "x": "86",
                      "y": "7480"
                  },
                  {
                      "x": "89",
                      "y": "7540"
                  },
                  {
                      "x": "89",
                      "y": "7400"
                  },
                  {
                      "x": "90",
                      "y": "7500"
                  },
                  {
                      "x": "92",
                      "y": "7640"
                  }
              ]
          }
      ],
      "vtrendlines": [
          {
              "line": [
                  {
                      "startvalue": "23",
                      "endvalue": "32",
                      "istrendzone": "1",
                      "displayvalue": " ",
                      "color": "#adebff",
                      "alpha": "25"
                  },
                  {
                      "startvalue": "23",
                      "endvalue": "32",
                      "istrendzone": "1",
                      "alpha": "0",
                      "displayvalue": "Very cold"
                  },
                  {
                      "startvalue": "32",
                      "endvalue": "50",
                      "istrendzone": "1",
                      "displayvalue": " ",
                      "color": "#adebff",
                      "alpha": "15"
                  },
                  {
                      "startvalue": "32",
                      "endvalue": "50",
                      "istrendzone": "1",
                      "alpha": "0",
                      "displayvalue": "Cold"
                  },
                  {
                      "startvalue": "50",
                      "endvalue": "68",
                      "istrendzone": "1",
                      "alpha": "0",
                      "displayvalue": "Moderate"
                  },
                  {
                      "startvalue": "68",
                      "endvalue": "80",
                      "istrendzone": "1",
                      "alpha": "0",
                      "displayvalue": "Hot"
                  },
                  {
                      "startvalue": "68",
                      "endvalue": "80",
                      "istrendzone": "1",
                      "displayvalue": " ",
                      "color": "#f2a485",
                      "alpha": "15"
                  },
                  {
                      "startvalue": "80",
                      "endvalue": "95",
                      "istrendzone": "1",
                      "alpha": "0",
                      "displayvalue": "Very hot"
                  },
                  {
                      "startvalue": "80",
                      "endvalue": "95",
                      "istrendzone": "1",
                      "displayvalue": " ",
                      "color": "#f2a485",
                      "alpha": "25"
                  }
              ]
          }
      ]
  }

  graphRelation(){
    this.setRelation(this.xaxis,this.yaxis);
  }

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

  //Ubicacion Mochila Abierta

  robberydata=[];
  @ViewChild('mapContainerR', {static: false}) gmapR: ElementRef;
  mapR: google.maps.Map;
  latR = 14.607815;
  lngR = -90.55173;
  markersR = [ //data for map info goes in title
  ];
  setMarkersR(){
    for(let marker of this.robberydata){
      let t = {
        position: new google.maps.LatLng(marker['location'].latitude,marker['location'].longitude),
        map: this.map,
        title: marker.date
      };
      this.markersR.push(t);
    }
  }
  coordinatesR = new google.maps.LatLng(this.lat, this.lng);
  mapOptionsR: google.maps.MapOptions = {
    center: this.coordinatesR,
    zoom: 8,
  };
  mapInitializerR() {
    this.mapR = new google.maps.Map(this.gmapR.nativeElement, 
    this.mapOptions);
    this.loadAllMarkersR();
  }
  markerR = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });
  loadAllMarkersR(): void {
    this.markersR.forEach(markerInfo => {
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
      marker.setMap(this.mapR);
    });
  }

  //BPM CHART

  dataSource: any = {
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
        this.setRelation("Ritmo Cardiaco","Pasos");
      },
      err => console.log(err) 
    )
    this.service.getRobberies().subscribe(
      res => {
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
              this.robberydata.push(res[key]);
          }
        }
        this.setMarkersR();
        this.mapInitializerR();
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
    this.service.getAverages().subscribe(
      res => {
        this.radarChartData[0].data.push(Math.round(res[0].steps));
        this.radarChartData[0].data.push(Math.round(res[0].BPM)/10);
        this.radarChartData[0].data.push(Math.round(res[0].weight));
        this.radarChartData[0].data.push(Math.round(res[0].position)/10);
        this.radarChartData[0].data.push(Math.round(Math.round(res[0].luminousIntensity)/3));
        this.radarChartData[0].data.push(Math.round(res[0].soundIntensity)/10);
        this.radarChartData[0].data.push(Math.round(res[0].water)/20);
      }
    )
    
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '1200';
    // This is the dataSource of the chart
    this.dataSource = {
      data: null,
      caption: {
        text: 'Sensores'
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
        },{
          plot: 'Agua',
          title: 'Agua',
          format: {
            suffix: ''
          },
          style: {
            title: {
              'font-size': '14px'
            }
          },
          referenceLine: [
            {
              label: 'Peligro debajo',
              value: '350'
            }
          ]
        },{
          plot: 'Peso',
          title: 'Peso',
          format: {
            suffix: 'kg'
          },
          style: {
            title: {
              'font-size': '14px'
            }
          }
        },{
          plot: 'Posicion',
          title: 'Posicion',
          format: {
            suffix: '°'
          },
          style: {
            title: {
              'font-size': '14px'
            }
          }
        },{
          plot: 'Luz',
          title: 'Luz',
          format: {
            suffix: ''
          },
          style: {
            title: {
              'font-size': '14px'
            }
          }
        },{
          plot: 'Sonido',
          title: 'Sonido',
          format: {
            suffix: 'dB'
          },
          style: {
            title: {
              'font-size': '14px'
            }
          }
        }
      ]
    };
    //interval(10000);
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    //var jsonify = res => res.json();
    var dataFetch = [ 
      [
      "3/15/2004 22:00:00",
      3.2
      ]
    ];
    let datasourceforbpm:any=[];
    this.service.getData().subscribe(
      res => {
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            datasourceforbpm.push(res[key]);
          }
        }
        for(let data of datasourceforbpm){
          let x:Array<any> = [data.date.split('T')[0].split('-')[1]+"/"+data.date.split('T')[0].split('-')[2]+"/"+data.date.split('T')[0].split('-')[0]+" "+data.date.split('T')[1].split('.')[0],data.BPM+1,data.water,data.weight,data.position, data.luminousIntensity,data.soundIntensity];
          dataFetch.push(x);
        }
        // fetch(
        //   'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/adding-a-reference-line-data.json'
        // ).then(jsonify);
        var schemaFetch = [{
          "name": "Time",
          "type": "date",
          "format": "%-m/%-d/%Y %H:%M:%S"
      }, {
          "name": "BPM",
          "type": "number"
      },{
          "name": "Agua",
          "type": "number"
      },{
          "name": "Peso",
          "type": "number"
      },{
          "name": "Posicion",
          "type": "number"
      }, {
          "name": "Luz",
          "type": "number"
      }, {
        "name": "Sonido",
        "type": "number"
    }];
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
    )
    // fetch(
    //   'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/adding-a-reference-line-schema.json'
    // ).then(jsonify);

    
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

  setRelation(sensor1,sensor2){
    let s1name,s2name,s1unit,s2unit="";
    let s1max,s1min,s2max,s2min = 0;
    switch(sensor1){
      case "Pasos":
        s1name="steps";
        s1unit="pasos";
        break;
      case "Ritmo Cardiaco":
        s1name="BPM";
        s1unit="BPM";
        break;
      case "Peso":
        s1name="weight";
        s1unit="kg";
        break;
      case "Posicion":
        s1name="position";
        s1unit="°";
        break;
      case "Luz":
        s1name="luminousIntensity";
        s1unit="";
        break;
      case "Sonido":
        s1name="soundIntensity";
        s1unit="dB";
        break;
      case "Agua":
        s1name="water";
        s1unit="";
        break;
    }
    switch(sensor2){
      case "Pasos":
        s2name="steps";
        s2unit="pasos";
        break;
      case "Ritmo Cardiaco":
        s2name="BPM";
        s2unit="BPM";
        break;
      case "Peso":
        s2name="weight";
        s2unit="kg";
        break;
      case "Posicion":
        s2name="position";
        s2unit="°";
        break;
      case "Luz":
        s2name="luminousIntensity";
        s2unit="";
        break;
      case "Sonido":
        s2name="soundIntensity";
        s2unit="dB";
        break;
      case "Agua":
        s2name="water";
        s2unit="";
        break;
    }
    s1max=this.getMaxSensor(s1name);
    s1min=this.getMinSensor(s1name);
    s2max=this.getMaxSensor(s2name);
    s2min=this.getMinSensor(s2name);
    this.scatterchart=  {
        "chart": {
            "caption": sensor1+" vs "+sensor2,
            "subCaption": "Relacion entre sensores",
            "baseFont": "Helvetica Neue,Arial",
            "xAxisName": sensor1,
            "yAxisName": sensor2,
            "xAxisMinValue": ""+s1min,
            "xAxisMaxValue": ""+s1max,
            "yNumberSuffix": s2unit,
            "xNumberSuffix": s1unit,
            "theme": "fusion"
        },
        "categories": [
            {
                "verticalLineDashed": "1",
                "verticalLineDashLen": "1",
                "verticalLineDashGap": "1",
                "verticalLineThickness": "1",
                "verticalLineColor": "#000000",
                "category": [
                  {
                    "x": "0",
                    "label": "0 "+s1unit,
                    "showverticalline": "0"
                  },
                  {
                      "x": ""+((s1max/5)*1),
                      "label": ((s1max/5)*1)+" "+s1unit,
                      "showverticalline": "1"
                  },
                  {
                      "x": ""+((s1max/5)*2),
                      "label": ((s1max/5)*2)+" "+s1unit,
                      "showverticalline": "1"
                  },
                  {
                      "x": ""+((s1max/5)*3),
                      "label": ((s1max/5)*3)+" "+s1unit,
                      "showverticalline": "1"
                  },
                  {
                      "x": ""+((s1max/5)*4),
                      "label": ((s1max/5)*4)+" "+s1unit,
                      "showverticalline": "1"
                  },
                  {
                      "x": ""+s1max,
                      "label": s1max+" "+s1unit,
                      "showverticalline": "1"
                  }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": sensor1+" vs "+sensor2,
                "showregressionline": "1",
                "data": []
            }
        ],
        "vtrendlines": [
            {
                "line": [
                    {
                        "startvalue": "0",
                        "endvalue": ""+((s1max/5)*1),
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#adebff",
                        "alpha": "25"
                    },
                    {
                        "startvalue": ""+((s1max/5)*2),
                        "endvalue": ""+((s1max/5)*3),
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#adebff",
                        "alpha": "15"
                    },
                    {
                        "startvalue": ""+((s1max/5)*3),
                        "endvalue": ""+((s1max/5)*4),
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#f2a485",
                        "alpha": "15"
                    },
                    {
                        "startvalue": ""+((s1max/5)*4),
                        "endvalue": ""+s1max,
                        "istrendzone": "1",
                        "displayvalue": " ",
                        "color": "#f2a485",
                        "alpha": "25"
                    }
                ]
            }
        ]
    }
    for(let d of this.fulldata){
      let point ={"x":d[s1name],"y":d[s2name]};
      this.scatterchart.dataset[0].data.push(point);
    }
    // console.log(this.scatterchart.dataset);
  }

  getMaxSensor(sensor):number{
    let max:number=0;
    for(let d of this.fulldata){
      if(d[sensor]>max)max=d[sensor];
    }
    return max;
  }

  getMinSensor(sensor){
    let min:number=10000000000;
    for(let d of this.fulldata){
      if(d[sensor]<min)min=d[sensor];
    }
    return min;
  }

}
