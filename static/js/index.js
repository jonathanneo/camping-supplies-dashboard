function sortObject(unsorted){
    var sortedlist = Object.keys(unsorted).sort(function(a,b){return unsorted[a]-unsorted[b]});
    var sorted = {}
    sortedlist.forEach(function(item){
        sorted[item]=unsorted[item]
    })
    return sorted;
}


var renderTimeseries = (metric, years) => $.get(`/api/timeseries/${metric.toLowerCase()}/${years}`, (res) => {
    var year = Object.keys(res);
    var metricValue = Object.values(res);
    var data = [
        {
            x: year,
            y: metricValue,
            type: 'bar',
            marker: {
                color: '#212529',
                width: 1
            }
        }
    ];
    var layout = {
        title: `${metric} Time Series`,
        yaxis: {
            title: `${metric} ($)`
        },
        xaxis: {
            title: `Year`,
            tickformat: 'd'
        }
      };
    
    Plotly.newPlot('timeseries', data, layout);
});


var renderCountry = (metric, years) => $.get(`/api/country/${metric.toLowerCase()}/${years}`, (res) => {
    
    var resSorted = sortObject(res);
    var country = Object.keys(resSorted);
    var metricValue = Object.values(resSorted);
    var data = [
        {
            y: country,
            x: metricValue,
            type: 'bar',
            marker: {
                color: '#212529',
                width: 1,
            },
            orientation: 'h'
        }
    ];
    var layout = {
        title: `${metric} by Country`,
        xaxis: {
            title: `${metric} ($)`
        },
        yaxis: {
            title: `Country`
        }
      };
    
    Plotly.newPlot('country', data, layout);
});

var renderChannel = (metric, years) => $.get(`/api/channel/${metric.toLowerCase()}/${years}`, (res) => {
    
    var resSorted = sortObject(res);
    var channel = Object.keys(resSorted);
    var metricValue = Object.values(resSorted);
    var data = [
        {
            y: channel,
            x: metricValue,
            type: 'bar',
            marker: {
                color: '#212529',
                width: 1,
            },
            orientation: 'h'
        }
    ];
    var layout = {
        title: `${metric} by Channel`,
        xaxis: {
            title: `${metric} ($)`
        },
        yaxis: {
            title: `Channel`
        }
      };
    
    Plotly.newPlot('channel', data, layout);
});

var renderProduct = (metric, years) => $.get(`/api/product/${metric.toLowerCase()}/${years}`, (res) => {
    
    var resSorted = sortObject(res);
    var product = Object.keys(resSorted);
    var metricValue = Object.values(resSorted);
    var data = [
        {
            y: product,
            x: metricValue,
            type: 'bar',
            marker: {
                color: '#212529',
                width: 1,
            },
            orientation: 'h'
        }
    ];
    var layout = {
        title: `${metric} by Top 10 Products`,
        xaxis: {
            title: `${metric} ($)`
        },
        yaxis: {
            title: `Product`
        }
      };
    
    Plotly.newPlot('product', data, layout);
});

$("#yearSelector").change(() =>{
    var years = $("#yearSelector").val();
    var metric = $("#metricSelector").val();
    renderTimeseries(metric, years);
    renderCountry(metric, years);
    renderChannel(metric, years);
    renderProduct(metric, years);
});

$("#metricSelector").change(() =>{
    var years = $("#yearSelector").val();
    var metric = $("#metricSelector").val();
    renderTimeseries(metric, years);
    renderCountry(metric, years);
    renderChannel(metric, years);
    renderProduct(metric, years);
});

$(document).ready(()=>{
    var metric = $("#metricSelector").val();
    var years = $("#yearSelector").val();
    renderTimeseries(metric, years);
    renderCountry(metric, years);
    renderChannel(metric, years);
    renderProduct(metric, years);
});