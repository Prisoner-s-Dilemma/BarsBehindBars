am5.ready(function() {
    
    // Create root
    var root = am5.Root.new("chartdiv5"); 
    
    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

      // Create wrapper container
      var container = root.container.children.push(am5.Container.new(root, {
        layout: root.horizontalLayout,
        width: am5.p100,
        height: am5.p100
      }))
    
    //create chart 
    var pie = container.children.push(am5percent.PieChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
        radius: am5.percent(65),
        centerY: am5.percent(50),
        y: am5.percent(50)
      }));

    //create series 
    var series = pie.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      }));

      series.labels.template.set("forceHidden", true);
      series.ticks.template.set("forceHidden", true);
      series.get("colors").set("colors", [
        am5.color(0x2A3837), //very bad
        am5.color(0x4A605F), //fairly bad
        am5.color(0x4C908D), //fairly good
        am5.color(0x73BBB8), //very good
        am5.color(0x668886) //unknown
      ]);
      
      var legend = pie.children.push(am5.Legend.new(root, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        centerX: am5.percent(10),
        x: am5.percent(10),
        centerY: am5.percent(0),
        y: am5.percent(0),
      }));
      
      legend.data.setAll([
      {
        name: "Very Bad",
        color: am5.color(0x2A3837)
      }, {
        name: "Fairly Bad",
        color: am5.color(0x4A605F)
      },
      {
        name: "Fairly Good",
        color: am5.color(0x4C908D)
      },
      {
        name: "Very Good",
        color: am5.color(0x73BBB8)
      },
      {
        name: "Unknown",
        color: am5.color(0x668886)
      }
    ]);


    var data = [
      {id: "EE", value: 2, category: "VBAD"},
    {id: "EE", value: 12, category: "FBAD"},
    {id: "EE", value: 48, category: "FGOOD"}, 
    {id: "EE", value: 9, category: "VGOOD"},
    {id: "EE", value: 29, category: "UNK"}, 
    ];

  series.data.setAll(data);

  //heatmap
    var heatmap = 
    container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        wheelY: "none",
        panY: "none",
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout, 
        width: am5.percent(100)
  }));

var polygonSeries = 
    heatmap.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_region_world_europeLow,
        exclude: (["AQ"], ["TR"]),
        valueField: "value",
        fill: am5.color(0xccc8bc),
        stroke: am5.color(0x161616)
      }));
      
    polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}: {value}",
        interactive: true
      });
      
    polygonSeries.set("heatRules", [{
        target: 
        polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0xffddc7),
        minValue: 0,
        max: am5.color(0xff7621),
        maxValue: 126,
        key: "fill"
      }]);
   
var heatLegend = heatmap.children.push(am5.HeatLegend.new(root, {
        orientation: "vertical",
        startColor: am5.color(0xffddc7),
        endColor: am5.color(0xff621f),
        startText: "Lowest",
        startValue: 0,
        endText: "Highest",
        endValue: 126,
        stepCount: 5
      }));

    polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
        heatLegend.showValue(ev.target.dataItem.get("value"));
        heatLegend.showValue();
      });

    polygonSeries.mapPolygons.template.events.on("click", function(ev) {
      console.log("Clicked on a column", ev.target);
      //console.log(ev.target['uid']);
      switch(ev.target['_dataItem']['_settings']['id']) {
        case 'EE':
          var data = [
            {id: "EE", value: 2, category: "VBAD"},
            {id: "EE", value: 12, category: "FBAD"},
            {id: "EE", value: 48, category: "FGOOD"}, 
            {id: "EE", value: 9, category: "VGOOD"},
            {id: "EE", value: 29, category: "UNK"}, 
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Estonia",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'SE':
          var data = [
            {id: "SE", value: 4, category: "VBAD"},
            {id: "SE", value: 8, category: "FBAD"},
            {id: "SE", value: 52, category: "FGOOD"}, 
            {id: "SE", value: 29, category: "VGOOD"},
            {id: "SE", value: 7, category: "UNK"}, 
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Sweeden",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'FI':
          var data = [
            {id:"FI", value: 1, category: "VBAD"},
            {id:"FI", value: 7, category: "FBAD"},
            {id:"FI", value: 61,category: "FGOOD"},
            {id:"FI", value: 23, category: "VGOOD"},
            {id:"FI", value: 8, category: "UNK"},
            ];
        
          series.data.setAll(data);
          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Finland",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'DK':
          var data = [
            {id:"DK", value: 2, category: "VBAD"},
            {id:"DK", value:6, category: "FBAD"},
            {id:"DK", value: 45, category: "FGOOD"},
            {id:"DK", value: 41, category: "VGOOD"},
            {id:"DK", value:6, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Denmakr",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'IE':
          var data = [
            {id:"IE", value: 7, category:"VBAD"},
            {id:"IE", value: 10, category: "FBAD"},
            {id:"IE", value: 55, category:"FGOOD"},
            {id:"IE", value: 20, category:"VGOOD"},
            {id:"IE", value: 9, category: "UNK"},
            ];
        
          series.data.setAll(data);
          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Ireland",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'BG':
          var data = [
            {id:"BG", value: 17, category: "VBAD"},
            {id:"BG", value:31, category: "FBAD"},
            {id:"BG", value: 34, category: "FGOOD"},
            {id:"BG", value: 3, category: "VGOOD"},
            {id:"BG", value: 15, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Bulgaria",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'HG':
          var data = [
            {id:"HG", value:10, category: "VBAD"},
            {id:"HG", value:24, category: "FBAD"},
            {id:"HG", value:42, category: "FGOOD"},
            {id:"HG", value:6, category: "VGOOD"},
            {id:"HG", value:18, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Hungary",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'PL':
          var data = [
            {id:"PL", value:24, category:"VBAD"},
            {id:"PL", value:31, category:"FBAD"},
            {id:"PL", value:29, category:"FGOOD"},
            {id:"PL", value:5, category:"VGOOD"},
            {id:"PL", value:11, category:"UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Poland",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'RO':
          var data = [
            {id: "RO", value:17, category: "VBAD"},
            {id: "RO", value: 28, category: "FBAD"},
            {id: "RO", value:33, category: "FGOOD"},
            {id: "RO", value:4, category: "VGOOD"},
            {id: "RO", value:18, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Romania",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'SK':
          var data = [
            {id: "SK", value:19, category: "VBAD"},
            {id: "SK", value:39, category: "FBAD"},
            {id: "SK", value:26, category: "FGOOD"},
            {id: "SK", value:3, category: "VGOOD"},
            {id: "SK", value:13, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Solvakia",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'SI':
          var data = [
            {id: "SI", value:15, category: "VBAD"},
            {id: "SI", value:31, category: "FBAD"},
            {id: "SI", value:39, category: "FGOOD"},
            {id: "SI", value:3, category: "VGOOD"},
            {id: "SI", value:12, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Slovenia",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'GR':
          var data = [
            {id: "GR", value:11, category: "VBAD"},
            {id: "GR", value:24, category: "FBAD"},
            {id: "GR", value:47, category: "FGOOD"},
            {id: "GR", value:6, category: "VGOOD"},
            {id: "GR", value:12, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Greece",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'IT':
          var data = [
            {id: "IT", value:17, category: "VBAD"},
            {id: "IT", value:37, category: "FBAD"},
            {id: "IT", value:26, category: "FGOOD"},
            {id: "IT", value:5, category: "VGOOD"},
            {id: "IT", value:15, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Italy",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'PT':
          var data = [
            {id: "PT", value:13, category: "VBAD"},
            {id: "PT",value: 34,  category: "FBAD"},
            {id: "PT", value:39,  category: "FGOOD"},
            {id: "PT", value: 2, category: "VGOOD"},
            {id: "PT", value: 11, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Portugal",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'ES':
          var data = [
            {id: "ES", value:15, category:"VBAD"},
            {id: "ES", value:34, category:"FBAD"},
            {id: "ES", value:35, category:"FGOOD"},
            {id: "ES", value:8, category:"VGOOD"},
            {id: "ES", value:7, category:"UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Spain",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'AT':
          var data = [
            {id: "AT", value:2, category: "VBAD"},
            {id: "AT", value:7, category: "FBAD"},
            {id: "AT", value:62, category: "FGOOD"},
            {id: "AT", value:24, category: "VGOOD"},
            {id: "AT", value:5, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Austria",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'FR':
          var data = [
            {id: "FR", value:9, category: "VBAD"},
            {id: "FR", value:22, category: "FBAD"},
            {id: "FR", value: 51, category: "FGOOD"},
            {id: "FR", value:5, category: "VGOOD"},
            {id: "FR", value:13, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - France",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'DE':
          var data = [
            {id: "DE", value:3, category: "VBAD"},
            {id: "DE", value:14, category: "FBAD"},
            {id: "DE", value:55, category: "FGOOD"},
            {id: "DE", value:19, category: "VGOOD"},
            {id: "DE", value:9, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Germany",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'NL':
          var data = [
            {id: "NL", value:3, category: "VBAD"},
            {id: "NL", value:7, category: "FBAD"},
            {id: "NL", value:50, category: "FGOOD"},
            {id: "NL", value:27, category: "VGOOD"},
            {id: "NL", value:13, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Netherland",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;

        case 'BE':
          var data = [
            {id: "BE", value:7, category: "VBAD"},
            {id: "BE", value:19, category: "FBAD"},
            {id: "BE", value:54, category: "FGOOD"},
            {id: "BE", value:9, category: "VGOOD"},
            {id: "BE", value:11, category: "UNK"},
            ];
        
          series.data.setAll(data);

          legend.data.setAll([
            {
              name: "Very Bad",
              color: am5.color(0x2A3837)
            }, {
              name: "Fairly Bad",
              color: am5.color(0x4A605F)
            },
            {
              name: "Fairly Good",
              color: am5.color(0x4C908D)
            },
            {
              name: "Very Good",
              color: am5.color(0x73BBB8)
            },
            {
              name: "Unknown",
              color: am5.color(0x668886)
            },
            {
              name: "Country - Belgium",
              color: am5.color(0xCCC8BC)
            }
          ]);
          break;
      }
    });
      
    heatLegend.startLabel.setAll({
        fontSize: 12,
        fill: heatLegend.get("startColor")
      });
      
    heatLegend.endLabel.setAll({
        fontSize: 12,
        fill: heatLegend.get("endColor")
      });


      var suicideData = polygonSeries.data.setAll([
      {id:"EE",
           value: 3,        }, 
        {   id: "SE",
           value: 2
        }, 
        {   id:"FI",
           value: 4
        }, 
        {   id:"DK",
           value: 4
        }, 

        {   id:"BG",
           value: 1,        },

        {   id:"HU",
           value: 5,
        },

        {   id:"PL",
           value: 27,
        },

        {id:"RO",
           value: 14},
        
        {id:"IT",
           value: 61}
,
        
        {id:"GR",
           value: 6,
        },

        {id:"PT",
           value: 21,
        },
        
        {id:"ES",
           value: 51,        },
        
        {id:"AT",
           value: 8
        },

        {id:"FR",
           value: 119,        },
        
        {id:"NL",
           value: 13,
        },
      ]);

    });// end am5.ready()




      
      
      
      
      
      
      
      
      
      
      
