package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type WeatherData struct {
	Main struct {
		Temp     float64 `json:"temp"`
		Humidity float64 `json:"humidity"`
	} `json:"main"`
	Wind struct {
		Speed float64 `json:"speed"`
	} `json:"wind"`
	Name string `json:"name"`
}

func getWeatherData(city string) (*WeatherData, error) {
	apiKey := "YOUR_API_KEY"
	url := fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s", city, apiKey)

	response, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	var data WeatherData
	err = json.Unmarshal(body, &data)
	if err != nil {
		return nil, err
	}

	return &data, nil
}

func displayWeather(data *WeatherData) {
	fmt.Printf("Weather information for %s\n", data.Name)
	fmt.Printf("Temperature: %.2f K\n", data.Main.Temp)
	fmt.Printf("Humidity: %.2f %%\n", data.Main.Humidity)
	fmt.Printf("Wind Speed: %.2f m/s\n", data.Wind.Speed)
}

func main() {
	var city string

	fmt.Print("Enter city name: ")
	fmt.Scanln(&city)

	data, err := getWeatherData(city)
	if err != nil {
		log.Fatal("Error: Failed to fetch weather data - ", err)
	}

	displayWeather(data)
}
