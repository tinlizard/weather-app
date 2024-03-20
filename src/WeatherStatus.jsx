export default function WeatherStatus({isCloudy,City,isRaining,isClear,isSnowing,isMisty,isFoggy,temp}){
    if(isCloudy){
        return (
            <>
                <h1>Weather in {City} is Cloudy</h1>
                <h2>Temperature is {temp}° celsius</h2>
            </>
        )
    }
    else if(isRaining){
        return (
            <>
                <h1>Weather in {City} is Raining</h1>
                <h2>Temperature is {temp}° celsius</h2>
            </>
        )
    }
    else if(isClear){
        return (
            <>
                <h1>Weather in {City} is Clear</h1>
                <h2>Temperature is {temp}° celsius</h2>
            </>
        )
    }
    else if(isSnowing){
        return (
            <>
                <h1>Weather in {City} is Snowing</h1>
                <h2>Temperature is {temp}° celsius</h2>
            </>
        )
    }
    else if(isMisty){
        return (
            <>
                <h1>Weather in {City} is Misty</h1>
                <h2>Temperature is {temp}° celsius</h2>
            </>
        )
    }
    else if(isFoggy){
        return (
            <>
                <h1>Weather in {City} is Foggy</h1>
                <h2>Temperature is {temp}° celsius</h2>
            </>
        )
    }
    else{
        return <h1>Welcome to the weather app! Please search to find weather data.</h1>
    }
}