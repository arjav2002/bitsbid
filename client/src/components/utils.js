import React from 'react'

const WEEK = 1000*3600*24*7
const DAY = WEEK/7;
const HOUR = DAY/24;
const MIN = HOUR/60;
const SEC = MIN/60;

export const get24hrTime = function(date) {
    const h = date.getHours()
    const m = date.getMinutes()
    return (h<10?"0":"") + h + ":" + (m<10?"0":"") + m
}

export const getRemainingTimeString = function(timeLeft) {
    let ms = timeLeft
    const week = Math.floor(ms/WEEK)
    ms -= week*WEEK
    const day = Math.floor(ms/DAY)
    ms -= day*DAY
    const hr = Math.floor(ms/HOUR)
    ms -= hr*HOUR
    const min = Math.floor(ms/MIN)
    ms -= min*MIN
    const s = Math.floor(ms/SEC)

    const weekStr = " week" + (week>1?"s":"")
    const dayStr = " day" + (day>1?"s":"")
    const hourStr = " hour" + (hr>1?"s":"")
    const minStr = " minute" + (min>1?"s":"")
    const secStr = " second" + (s>1?"s":"")
    
    if(week) return (week?(week + weekStr):"") + (day?(", " + day + dayStr):"") + (hr?(", " + hr + hourStr):"")
    if(day) return (day?(day + dayStr):"") + (hr?(", " + hr + hourStr):"") + (min?(", " + min + minStr):"")
    if(hr) return (hr?(hr + hourStr):"") + (min?(", " + min + minStr):"") + (s?(", " + s + secStr):"")
    if(min) return (min?(min + minStr):"") + (s?(", " + s + secStr):"")

    return s + secStr
}

export class TimeCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {timeLeft: props.timeLeft}
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ timeLeft: this.state.timeLeft-1000 }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (<>{getRemainingTimeString(this.state.timeLeft)}</>)
    }
}