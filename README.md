Delhi Weather Dashboard

A responsive and minimal Weather Dashboard built using React.js that displays historical temperature data for Delhi, India using the Open-Meteo Archive API.
This project demonstrates API integration, dynamic data rendering, conditional UI updates, and statistical calculations in React.

Features
Fetch weather data by specific date
View daily temperatures for a selected month and year
Generate yearly temperature statistics
Highest temperature
Minimum temperature
Median temperature
Fully responsive layout
Error handling for invalid inputs

Tech Stack
1.Frontend: React.js (Create React App)
2.Language: JavaScript (ES6+)
3.Styling: CSS (Custom Baby Pink Theme)
API: Open-Meteo Historical Weather API

API Integration
Open-Meteo Archive API

Base URL:
https://archive-api.open-meteo.com/v1/archive

Data Retrieved:
temperature_2m_mean
temperature_2m_max
temperature_2m_min

Location Used:
City: Delhi, India
Latitude: 28.7041
Longitude: 77.1025
Timezone: Asia/Kolkata

Statistical Calculation Logic
For yearly statistics:
Data is sorted in ascending order.
Minimum → First value
Maximum → Last value
Median → Middle value 

weather-dashboard/
 ├── public/
 ├── src/
 │    ├── App.js
 │    ├── App.css
 │    └── index.js
 ├── package.json
 └── README.md


Key Learning Outcomes:
Handling asynchronous API calls using fetch
Managing state using React Hooks (useState)
Conditional rendering
Dynamic table rendering
Basic statistical data processing
Clean UI structuring with CSS