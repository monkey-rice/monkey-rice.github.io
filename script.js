// 무료 날씨 API(Open-Meteo)를 사용해 실시간 데이터를 가져옵니다.
async function fetchWeather(lat, lon, elementId, cityName) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Asia%2FSeoul`);
        const data = await response.json();
        
        const temp = data.current_weather.temperature;
        const code = data.current_weather.weathercode;
        
        // WMO 날씨 코드를 한글 텍스트와 이모지로 변환
        let condition = "";
        let emoji = "";
        if (code === 0) { condition = "맑음"; emoji = "☀️"; }
        else if (code >= 1 && code <= 3) { condition = "구름/흐림"; emoji = "☁️"; }
        else if (code >= 45 && code <= 48) { condition = "안개"; emoji = "🌫️"; }
        else if (code >= 51 && code <= 67) { condition = "비"; emoji = "🌧️"; }
        else if (code >= 71 && code <= 77) { condition = "눈"; emoji = "❄️"; }
        else if (code >= 80 && code <= 82) { condition = "소나기"; emoji = "🌦️"; }
        else if (code >= 95 && code <= 99) { condition = "뇌우"; emoji = "⛈️"; }
        else { condition = "알 수 없음"; emoji = "❓"; }

        // 화면에 데이터 출력
        document.getElementById(elementId).innerText = `${cityName}: ${temp}°C ${condition} ${emoji}`;
    } catch (error) {
        document.getElementById(elementId).innerText = `${cityName}: 날씨 정보 오류`;
        console.error('날씨 데이터를 가져오는데 실패했습니다:', error);
    }
}

// 화면이 로드되면 서울과 제주의 날씨를 각각 크롤링(API 요청)합니다.
window.onload = function() {
    fetchWeather(37.5665, 126.9780, 'weather-seoul', '서울');
    fetchWeather(33.4996, 126.5312, 'weather-jeju', '제주');
};