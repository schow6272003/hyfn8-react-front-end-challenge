import React from 'react';
import $ from 'jquery';
import dataTable from 'datatables.net'
import fixedColumns from "datatables.net-fixedcolumns"
import './style/datatable_custom.css';

class Datatable extends React.Component {
   constructor(props) {
      super(props);
  
      this.state = {
         data: [],
         columns: [],
         columnsKeys: []
      }
   }
   componentDidMount() {
    this.loadData();
        
   }

   initiateDatatable() {
      $('#ads_table').DataTable({
            "scrollX": true,
            "scrollCollapse": true,
            "fixedColumns":   {
            leftColumns: 1
                      }

    });
   }

  loadData() {
    $.when($.ajax('api/ads.json'), $.ajax('api/ad_metrics.json')
      ).then(function(ads, adsMetrics){
        var columnsNames = adsMetrics[0]["column_names"];
        var adsArray = ads[0].ads;
        var adsMetricsRows = adsMetrics[0].rows;
        var i;
        var records  = [];
        columnsNames.unshift("status");
        columnsNames.unshift("name");

        var formattedColNames =  columnsNames.map(function(column){
            return column[0].toUpperCase() + column.slice(1).replace(/_/g, " ");
        });

        var remoteIds = adsMetricsRows.map(function(r){
              return r.remote_id;
         });


        adsArray.forEach(function(r){
          i = remoteIds.indexOf(r.remote_id);
           if (i >= 0){
              records.push({
                "id" : r.id,
                "name":r.name ,
                "status": r.status,
                "remote_id": r.remote_id,
                "impressions": adsMetricsRows[i]["impressions"],
                "reach": adsMetricsRows[i]["reach"],
                "frequency": adsMetricsRows[i]["frequency"],
                "cpm": adsMetricsRows[i]["cpm"],
                "spend": adsMetricsRows[i]["spend"],
                "ctr": adsMetricsRows[i]["ctr"],
                "cost_per_inline_link_click": adsMetricsRows[i]["cost_per_inline_link_click"],
                "actions:goal": adsMetricsRows[i]["actions:goal"],
                "actions:link_click": adsMetricsRows[i]["actions:link_click"],
                "cost_per_action_type:cost_per_goal": adsMetricsRows[i]["cost_per_action_type:cost_per_goal"],
                "actions:offsite_conversion": adsMetricsRows[i]["actions:offsite_conversion"]
              });
           }
        })
        this.setState({data: records, columns: formattedColNames, columnsKeys: columnsNames});
        this.initiateDatatable();

    }.bind(this))
  }

  render() {
    return (
<table id="ads_table" className="stripe row-border order-column" cellSpacing="0" width="100%">
        <thead>
          <tr>
            {
              this.state.columns.map(function(headerName,i){
                return (
                  <th key={i}>{headerName}</th>
                );
              },this)
            }
          </tr>
        </thead>
        <tfoot>
          <tr>
            {
              this.state.columns.map(function(headerName,i){
                return (
                  <th key={i}>{headerName}</th>
                );
              },this)
            }
          </tr>
        </tfoot>
        <tbody>
            {
            this.state.data.map(function(data,i){
              return (
                <tr key={i}>
                  {
                    this.state.columnsKeys.map(function(headerName,y){
                      return (
                        <td key={y}>{data[headerName]}</td>
                      );                      
                    },this)
                  }
                </tr>
              );
            },this)
          }

        </tbody>
    </table>
    );
  }
}

export default Datatable;