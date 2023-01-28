import requests

# Replace YOUR_API_KEY with your actual API key
api_key = "c3cb005e340dd8d0222dc4c8f7bb5098"

# Tenerife coordinates
lat = 28.291564
lon = -16.629130

# Make a request to the OpenWeatherMap API
url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
response = requests.get(url)
data = response.json()

# Extract the weather information
weather = data["weather"][0]["main"]
temp = data["main"]["temp"] - 273.15 # Convert from Kelvin to Celsius

# Extract some interesting information about Tenerife
interesting_facts = [
    "Tenerife is the largest of the Canary Islands.",
    "Tenerife is home to the highest peak in Spain, Mount Teide.",
    "Tenerife is a popular tourist destination, known for its beaches, nightlife, and Carnival of Santa Cruz de Tenerife.",
    "Tenerife has a subtropical climate, with warm temperatures year-round."
]

# Print the weather information and interesting facts
print(f"Weather: {weather}")
print(f"Temperature: {temp}°C")
print("\nInteresting facts about Tenerife:")
for fact in interesting_facts:
    print(fact)
