import React, { Component } from 'react'
import {VictoryChart, VictoryBar, VictoryLine, VictoryPie} from 'victory'

function VictoryCharts() {
    const dataset = [
        { x: "Sunday", y: 3, label: "Party at Ian" },
        { x: "Monday", y: 2, label: "Leftovers from Ian" },
        { x: "Tuesday", y: 0, label: "Against Taco Tuesday" },
        {
          x: "Wednesday",
          y: 8,
          label: "Needed more Tacos due to yesterday was Rebel Taco Tuesday"
        },
        { x: "Thursday", y: 4, label: "They had a good deal" },
        { x: "Friday", y: 2, label: "Was getting tired of tacos today" },
        { x: "Saturday", y: 4, label: "Nevermind, I love tacos" },
        { x: "Sunday", y: 6, label: "My boy Ian loves having Taco Parties" }
      ]

    return (
        <div>
            <VictoryChart>
            <VictoryLine data = {dataset}/>

            </VictoryChart>
        </div>
    )
}
export default VictoryCharts

