## Delhi Weather Dashboard

A responsive and minimal Weather Dashboard built using React.js that displays historical temperature data for Delhi, India using the Open-Meteo Archive API.
This project demonstrates API integration, dynamic data rendering, conditional UI updates, and statistical calculations in React.

## Features
  1. Fetch weather data by specific date
  2. View daily temperatures for a selected month and year
  3. Generate yearly temperature statistics
  4. Highest temperature
  5. Minimum temperature
  6. Median temperature
  7. Fully responsive layout
  8. Error handling for invalid inputs

## Tech Stack
  1.Frontend: React.js (Create React App)
  2.Language: JavaScript (ES6+)
  3.Styling: CSS (Custom Baby Pink Theme)
API: Open-Meteo Historical Weather API

## API Integration
Open-Meteo Archive API

## Base URL:
https://archive-api.open-meteo.com/v1/archive

## Data Retrieved:
temperature_2m_mean
temperature_2m_max
temperature_2m_min

## Location Used:
City: Delhi, India
Latitude: 28.7041
Longitude: 77.1025
Timezone: Asia/Kolkata

## Statistical Calculation Logic
For yearly statistics:
Data is sorted in ascending order.
Minimum → First value
Maximum → Last value
Median → Middle value 
``` plain text
weather-dashboard/
 ├── public/
 ├── src/
 │    ├── App.js
 │    ├── App.css
 │    └── index.js
 ├── package.json
 └── README.md
```

## Key Learning Outcomes:
   1. Handling asynchronous API calls using fetch
   2. Managing state using React Hooks (useState)
   3. Conditional rendering
   4. Dynamic table rendering
   5. Basic statistical data processing
   6. Clean UI structuring with CSS

## OUTPUT:
## 1.Weather Dashboard:
<img width="1917" height="1009" alt="Screenshot 2026-02-25 135513" src="https://github.com/user-attachments/assets/be4b8cef-0ad3-43e7-83c5-de6776f30010" />

## 2.Get By Date:
<img width="1915" height="1010" alt="Screenshot 2026-02-25 135532" src="https://github.com/user-attachments/assets/4662c570-6aa9-41bb-becd-f420a4cb9204" />

## 3.Get By Month based on year:
<img width="1912" height="1013" alt="Screenshot 2026-02-25 135623" src="https://github.com/user-attachments/assets/1cebcadc-40ea-4885-8198-8e6ccc07e7cb" />
<img width="1919" height="1002" alt="Screenshot 2026-02-25 135633" src="https://github.com/user-attachments/assets/65a23822-3207-4e38-aa5f-9f1018550ba7" />

## 4.Get the Statistics value by year 
<img width="1909" height="1005" alt="Screenshot 2026-02-25 135656" src="https://github.com/user-attachments/assets/8c2cfc0b-1b50-44d4-aba0-b0d0361c371f" />

## Student Deails:
NAME: PRIYADHARSHINI M
ROLL NO: 717823P141

