# Weather App

This is a weather application built with Next.js, TypeScript, and Tailwind CSS. Users can view current weather information for cities in Turkey.

## Features

- OpenWeatherMap API key management
- Weather information display for Turkish cities
- City selection
- Responsive design
- Location-based automatic weather display

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your_username/weather-app.git
   ```

2. Navigate to the project directory:

   ```
   cd weather-app
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

## Usage

1. When you run the application for the first time, you'll be prompted to enter an OpenWeatherMap API key.
2. If you don't have an API key, sign up at [OpenWeatherMap](https://openweathermap.org/) and get a free API key.
3. After entering your API key, select a city from the list of Turkish cities.
4. Current weather information for the selected city will be displayed.

## About the API Key

- This application uses the OpenWeatherMap API to fetch weather data.
- For security reasons, your API key is stored locally and is only valid for the duration of your browser session.
- When you close the browser or tab, your API key is deleted, and you'll need to enter it again.

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)
