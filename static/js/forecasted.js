function sortObject(unsorted){
    var sortedlist = Object.keys(unsorted).sort(function(a,b){return unsorted[a]-unsorted[b]});
    var sorted = {}
    sortedlist.forEach(function(item){
        sorted[item]=unsorted[item]
    })
    return sorted;
}


var renderForecasted = (country, country_actuals, country_forecasted) => {
    var fcs_date = new Date(country_forecasted.date).getFullYear();
    var x_trace1 = Object.keys(country_actuals);
    var y_trace1 = Object.values(country_actuals);
    var trace_actual = {
        x: x_trace1,
        y: y_trace1,
        type: "scatter",
        name: "Actuals",
        marker: {
            color: '#212529'
        }
    }
    
    var trace_forecasted = {
        x: [x_trace1[x_trace1.length -1],`${fcs_date}`],
        y: [y_trace1[y_trace1.length -1], country_forecasted.yhat],
        error_y : {
            type: "data",
            symmetric: false, 
            array: [0, country_forecasted.yhat_upper],
            arrayminus: [0, country_forecasted.yhat_lower],
            type: "scatter"
        },
        marker: {
            color: 'rgb(231,107,243)'
        },
        name: "Forecast"
    }

    var data = [trace_actual, trace_forecasted];
    var layout = {
        title: `${country} Revenue by Year`,
        xaxis: {
            title: `Year`,
            tickformat: 'd'
        },
        yaxis: {
            title: `Revenue ($)`
        }
      };
    
    Plotly.newPlot('forecasted', data, layout);
};

$("#countrySelector").change(() =>{
    $("#spinner").attr("hidden",false);
    $("#forecasted").attr("hidden",true);
    var country = $("#countrySelector").val();
        $.getJSON(`/api/actual_revenue/${country.toLowerCase()}`, (actuals_response) => { 
            $.getJSON(`/api/forecasted_revenue/${country.toLowerCase()}`, (forecasted_response) => { 
                $("#spinner").attr("hidden",true);
                $("#forecasted").attr("hidden",false);
                renderForecasted(country, actuals_response, forecasted_response);
            });
        });
});

$(document).ready( () => { 
    $("#spinner").attr("hidden",false);
    $.get("/api/countries", (countries_response) => {
        countries_response.countries.forEach(country => {
            $("#countrySelector").append(`<option value='${country}'>${country}</option>`)
        })
        var country = $("#countrySelector").val();
        $.getJSON(`/api/actual_revenue/${country.toLowerCase()}`, (actuals_response) => { 
            $.getJSON(`/api/forecasted_revenue/${country.toLowerCase()}`, (forecasted_response) => { 
                $("#spinner").attr("hidden",true);
                renderForecasted(country, actuals_response, forecasted_response);
            });
        });
    });
});