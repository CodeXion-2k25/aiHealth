// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
const App: React.FC = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeTab, setActiveTab] = useState('home');
const [showChatbot, setShowChatbot] = useState(false);
interface ChatMessage {
text: string;
isUser: boolean;
emotion?: string;
timestamp: Date;
}
const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{
text: "Hello! I'm your AI health assistant. I'm here to help you with your physical and emotional well-being. How are you feeling today?",
isUser: false,
timestamp: new Date()
}]);
const [meditationTime, setMeditationTime] = useState(0);
const [isMeditating, setIsMeditating] = useState(false);
const [moodJournal, setMoodJournal] = useState<Array<{date: Date; mood: number; note: string}>>([]);
const [journalEntry, setJournalEntry] = useState('');
const [messageInput, setMessageInput] = useState('');
const chartRef = useRef<HTMLDivElement>(null);
const moodChartRef = useRef<HTMLDivElement>(null);
const nutritionChartRef = useRef<HTMLDivElement>(null);
const [symptoms, setSymptoms] = useState<string[]>([]);
const [selectedSymptom, setSelectedSymptom] = useState('');
const [moodValue, setMoodValue] = useState(5);
const [showMoodTracker, setShowMoodTracker] = useState(false);
const [selectedDate, setSelectedDate] = useState(new Date());
const [calorieGoal, setCalorieGoal] = useState(2000);
const [waterIntake, setWaterIntake] = useState(0);
const commonSymptoms = [
'Headache',
'Fever',
'Cough',
'Fatigue',
'Nausea',
'Muscle Pain',
'Sore Throat'
];
useEffect(() => {
if (chartRef.current) {
const chart = echarts.init(chartRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'axis'
},
xAxis: {
type: 'category',
data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
},
yAxis: {
type: 'value',
name: 'Sleep Hours'
},
series: [{
data: [8.2, 7.5, 8.0, 8.5, 7.8, 8.3, 8.7],
type: 'line',
smooth: true,
color: '#4F46E5',
name: 'Sleep Duration'
}]
};
chart.setOption(option);
}
if (moodChartRef.current) {
const moodChart = echarts.init(moodChartRef.current);
const moodOption = {
animation: false,
tooltip: {
trigger: 'axis'
},
xAxis: {
type: 'category',
data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
},
yAxis: {
type: 'value',
name: 'Mood Level',
min: 0,
max: 10
},
series: [{
data: [7, 8, 6, 9, 7, 8, 9],
type: 'line',
smooth: true,
color: '#10B981',
name: 'Mood Score'
}]
};
moodChart.setOption(moodOption);
}
if (nutritionChartRef.current) {
const nutritionChart = echarts.init(nutritionChartRef.current);
const nutritionOption = {
animation: false,
tooltip: {
trigger: 'item'
},
legend: {
orient: 'vertical',
right: 10,
top: 'center'
},
series: [{
name: 'Nutrition',
type: 'pie',
radius: ['40%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: '#fff',
borderWidth: 2
},
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: '20',
fontWeight: 'bold'
}
},
data: [
{ value: 40, name: 'Proteins', itemStyle: { color: '#4F46E5' } },
{ value: 30, name: 'Carbs', itemStyle: { color: '#10B981' } },
{ value: 30, name: 'Fats', itemStyle: { color: '#F59E0B' } }
]
}]
};
nutritionChart.setOption(nutritionOption);
}
}, [activeTab]);
const analyzeEmotion = (text: string): string => {
const lowerText = text.toLowerCase();
if (lowerText.includes('sad') || lowerText.includes('depress') || lowerText.includes('unhappy')) return 'sad';
if (lowerText.includes('anxious') || lowerText.includes('worry') || lowerText.includes('stress')) return 'anxious';
if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('great')) return 'happy';
if (lowerText.includes('angry') || lowerText.includes('frustrat') || lowerText.includes('mad')) return 'angry';
return 'neutral';
};
const getAIResponse = (message: string, emotion: string): string => {
const lowerMessage = message.toLowerCase();
// Health-related queries
if (lowerMessage.includes('headache') || lowerMessage.includes('pain')) {
return "I notice you're experiencing physical discomfort. Can you tell me more about when it started and any other symptoms you're experiencing? This will help me provide better guidance.";
}
if (lowerMessage.includes('sleep') || lowerMessage.includes('tired')) {
return "Sleep quality is crucial for overall health. Would you like to explore some science-backed sleep hygiene techniques? We can also look into factors that might be affecting your sleep pattern.";
}
if (lowerMessage.includes('diet') || lowerMessage.includes('eating') || lowerMessage.includes('food')) {
return "Nutrition plays a vital role in our wellbeing. I can help you develop a balanced meal plan or suggest healthy alternatives. What specific aspects of your diet would you like to improve?";
}
// Emotional support
if (emotion === 'sad') {
if (lowerMessage.includes('lonely')) {
return "Feeling lonely can be really challenging. Would you like to explore some ways to connect with others or discuss what might be contributing to these feelings of isolation?";
}
if (lowerMessage.includes('hopeless')) {
return "I hear the weight in your words. While I'm here to support you, please remember that professional help is available. Would you like to talk about what's making you feel this way?";
}
return "I'm here to listen and support you. Sometimes sharing our feelings can help lighten the load. Would you like to tell me more about what's troubling you?";
}
if (emotion === 'anxious') {
if (lowerMessage.includes('overwhelm')) {
return "It's completely normal to feel overwhelmed sometimes. Let's break down what's causing these feelings and tackle them one step at a time. What's the biggest concern on your mind right now?";
}
return "I understand anxiety can be challenging. Would you like to try a quick grounding exercise? It can help bring you back to the present moment. We can also explore what's triggering your anxiety.";
}
if (emotion === 'angry') {
if (lowerMessage.includes('unfair') || lowerMessage.includes('wrong')) {
return "It's valid to feel angry when things seem unfair. Would you like to talk about what happened? Sometimes expressing our frustrations can help us see situations more clearly.";
}
return "I hear your frustration. Let's take a moment to understand these feelings better. What do you think triggered this anger?";
}
if (emotion === 'happy') {
if (lowerMessage.includes('achieve') || lowerMessage.includes('success')) {
return "That's fantastic! Celebrating our achievements is important. Would you like to share more about what you accomplished and how it makes you feel?";
}
return "It's wonderful to hear you're feeling positive! These moments are precious. Would you like to explore what contributed to this happiness so we can build more such experiences?";
}
// General wellness
if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
return "Physical activity is great for both body and mind! What type of exercise interests you? I can suggest some routines tailored to your preferences and fitness level.";
}
if (lowerMessage.includes('stress') || lowerMessage.includes('pressure')) {
return "Managing stress is essential for our wellbeing. Would you like to explore some stress management techniques? We can find approaches that work best for your lifestyle.";
}
// Default response for general conversation
return "I'm here to support your health and wellness journey. Could you tell me more about what's on your mind? The more you share, the better I can assist you.";
};
const handleSendMessage = () => {
if (messageInput.trim()) {
const emotion = analyzeEmotion(messageInput);
const newUserMessage = {
text: messageInput,
isUser: true,
emotion,
timestamp: new Date()
};
setChatMessages(prev => [...prev, newUserMessage]);
setMessageInput('');
setTimeout(() => {
const aiResponse = getAIResponse(messageInput, emotion);
setChatMessages(prev => [...prev, {
text: aiResponse,
isUser: false,
timestamp: new Date()
}]);
}, 1000);
}
};
const [diagnosis, setDiagnosis] = useState<string>('');
const [remedies, setRemedies] = useState<string[]>([]);
const getRemediesForSymptoms = (symptomList: string[]): { diagnosis: string; remedies: string[] } => {
const symptomMap: { [key: string]: { diagnosis: string; remedies: string[] } } = {
'Headache': {
diagnosis: 'Tension Headache',
remedies: [
'Rest in a quiet, dark room',
'Apply a cold or warm compress',
'Stay hydrated',
'Practice relaxation techniques',
'Consider over-the-counter pain relievers'
]
},
'Fever': {
diagnosis: 'Viral Infection',
remedies: [
'Rest and get plenty of sleep',
'Stay hydrated with water and clear fluids',
'Take acetaminophen or ibuprofen',
'Use a light blanket if chills occur',
'Monitor temperature regularly'
]
},
'Cough': {
diagnosis: 'Upper Respiratory Infection',
remedies: [
'Stay hydrated',
'Use honey for soothing throat',
'Try over-the-counter cough suppressants',
'Use a humidifier',
'Gargle with salt water'
]
},
'Fatigue': {
diagnosis: 'Physical or Mental Exhaustion',
remedies: [
'Ensure 7-9 hours of sleep',
'Maintain a balanced diet',
'Regular moderate exercise',
'Stress management techniques',
'Consider B-vitamin supplements'
]
},
'Nausea': {
diagnosis: 'Gastric Distress',
remedies: [
'Eat small, frequent meals',
'Try ginger tea or candies',
'Avoid strong odors',
'Stay hydrated with clear fluids',
'Rest in a seated position'
]
}
};
let primarySymptom = symptomList[0];
return symptomMap[primarySymptom] || {
diagnosis: 'Multiple Symptoms Detected',
remedies: ['Please consult a healthcare provider for a proper diagnosis']
};
};
const handleSymptomAdd = () => {
if (selectedSymptom && !symptoms.includes(selectedSymptom)) {
const newSymptoms = [...symptoms, selectedSymptom];
setSymptoms(newSymptoms);
setSelectedSymptom('');
const { diagnosis: newDiagnosis, remedies: newRemedies } = getRemediesForSymptoms(newSymptoms);
setDiagnosis(newDiagnosis);
setRemedies(newRemedies);
}
};
const handleWaterIncrement = () => {
setWaterIntake(prev => Math.min(prev + 250, 4000));
};
const renderActiveTab = () => {
switch (activeTab.toLowerCase()) {
case 'symptom checker':
return (
<div className="space-y-8">
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Mood Detection</h2>
<div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
  <div className="flex items-center space-x-3 mb-4">
    <i className="fas fa-brain text-2xl text-purple-600"></i>
    <h3 className="text-lg font-semibold text-purple-900">Emotional State Analysis</h3>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-4">
      <div className="bg-white/80 p-4 rounded-lg border-2 border-dashed border-purple-200 flex flex-col items-center justify-center min-h-[200px]">
        <i className="fas fa-camera text-4xl text-purple-400 mb-2"></i>
        <p className="text-purple-700 text-center mb-2">Take a selfie or upload an image</p>
        <div className="flex space-x-2">
          <button className="!rounded-button bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 whitespace-nowrap">
            <i className="fas fa-camera mr-2"></i>Open Camera
          </button>
          <button className="!rounded-button bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 whitespace-nowrap">
            <i className="fas fa-upload mr-2"></i>Upload Image
          </button>
        </div>
      </div>
      <div className="bg-white/80 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Current Emotional State</h4>
        <div className="flex items-center space-x-2 mb-3">
          <i className="fas fa-smile text-2xl text-yellow-500"></i>
          <span className="text-lg font-medium text-gray-800">Calm & Balanced</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Happiness</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Stress</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div className="bg-red-400 h-2 rounded-full" style={{width: '25%'}}></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Energy</span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="bg-white/80 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Personalized Recommendations</h4>
        <ul className="space-y-3">
          <li className="flex items-start space-x-2">
            <i className="fas fa-meditation text-purple-600 mt-1"></i>
            <span className="text-gray-700">10-minute mindfulness meditation</span>
          </li>
          <li className="flex items-start space-x-2">
            <i className="fas fa-walking text-purple-600 mt-1"></i>
            <span className="text-gray-700">Short nature walk to boost mood</span>
          </li>
          <li className="flex items-start space-x-2">
            <i className="fas fa-music text-purple-600 mt-1"></i>
            <span className="text-gray-700">Listen to calming playlist</span>
          </li>
        </ul>
      </div>
      <div className="bg-white/80 p-4 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Mental Health Resources</h4>
        <ul className="space-y-3">
          <li className="flex items-start space-x-2">
            <i className="fas fa-book text-purple-600 mt-1"></i>
            <span className="text-gray-700">Recommended reading: "The Happiness of Pursuit"</span>
          </li>
          <li className="flex items-start space-x-2">
            <i className="fas fa-user-friends text-purple-600 mt-1"></i>
            <span className="text-gray-700">Join our wellness community</span>
          </li>
          <li className="flex items-start space-x-2">
            <i className="fas fa-phone text-purple-600 mt-1"></i>
            <span className="text-gray-700">24/7 Support hotline: 1-800-WELLNESS</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
<h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Health Consultation</h2>
<div className="space-y-6">
<div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-robot text-2xl text-indigo-600"></i>
<h3 className="text-lg font-semibold text-indigo-900">Interactive Symptom Analysis</h3>
</div>
<p className="text-gray-700 mb-4">
Describe your symptoms, concerns, or how you're feeling. Our AI will analyze your condition and provide personalized insights.
</p>
<textarea
value={messageInput}
onChange={(e) => setMessageInput(e.target.value)}
placeholder="Example: I've been experiencing a headache for the past 2 days, along with mild fever and fatigue..."
className="w-full h-32 p-4 border rounded-lg resize-none mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
></textarea>
<div className="flex justify-between items-center">
<div className="flex items-center space-x-2">
<i className="fas fa-shield-alt text-emerald-600"></i>
<span className="text-sm text-gray-600">Your information is private & secure</span>
</div>
<button
onClick={handleSendMessage}
className="!rounded-button bg-indigo-600 text-white px-6 py-2 font-medium hover:bg-indigo-700 whitespace-nowrap"
>
Analyze Symptoms
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-white border rounded-lg p-6">
<h3 className="text-lg font-semibold text-gray-800 mb-4">Common Symptoms</h3>
<div className="flex flex-wrap gap-2">
{commonSymptoms.map((symptom) => (
<button
key={symptom}
onClick={() => setSelectedSymptom(symptom)}
className={`!rounded-button px-3 py-1 text-sm font-medium whitespace-nowrap ${
selectedSymptom === symptom
? 'bg-indigo-600 text-white'
: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
}`}
>
{symptom}
</button>
))}
</div>
</div>
<div className="bg-white border rounded-lg p-6">
<h3 className="text-lg font-semibold text-gray-800 mb-4">Your Symptoms</h3>
<div className="flex flex-wrap gap-2">
{symptoms.map((symptom, index) => (
<div
key={index}
className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center"
>
{symptom}
<button
onClick={() => setSymptoms(symptoms.filter((_, i) => i !== index))}
className="ml-2 text-indigo-600 hover:text-indigo-800"
>
<i className="fas fa-times"></i>
</button>
</div>
))}
</div>
</div>
</div>
{symptoms.length > 0 && (
<div className="space-y-6">
<div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg">
<h3 className="text-xl font-semibold text-emerald-900 mb-4">AI Health Analysis</h3>
<div className="space-y-4">
<div className="bg-white/80 p-4 rounded-lg">
<h4 className="font-medium text-emerald-800 mb-2">Possible Condition</h4>
<p className="text-emerald-700">{diagnosis}</p>
</div>
<div className="bg-white/80 p-4 rounded-lg">
<h4 className="font-medium text-emerald-800 mb-2">Recommended Actions</h4>
<ul className="space-y-2">
{remedies.map((remedy, index) => (
<li key={index} className="flex items-start space-x-2">
<i className="fas fa-check-circle text-emerald-600 mt-1"></i>
<span className="text-emerald-700">{remedy}</span>
</li>
))}
</ul>
</div>
<div className="bg-white/80 p-4 rounded-lg">
<h4 className="font-medium text-emerald-800 mb-2">Lifestyle Recommendations</h4>
<ul className="space-y-2">
<li className="flex items-start space-x-2">
<i className="fas fa-heart text-emerald-600 mt-1"></i>
<span className="text-emerald-700">Maintain regular sleep schedule</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-apple-alt text-emerald-600 mt-1"></i>
<span className="text-emerald-700">Focus on nutrient-rich foods</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-walking text-emerald-600 mt-1"></i>
<span className="text-emerald-700">Light exercise if feeling up to it</span>
</li>
</ul>
</div>
</div>
</div>
<div className="bg-yellow-50 p-6 rounded-lg">
<div className="flex items-start space-x-3 text-yellow-800">
<i className="fas fa-exclamation-triangle mt-1"></i>
<div>
<p className="font-medium mb-2">Important Medical Notice</p>
<p className="text-sm">This AI-powered analysis is for informational purposes only and should not replace professional medical advice. If symptoms persist or worsen, please consult a healthcare provider immediately.</p>
</div>
</div>
</div>
</div>
)}
</div>
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Health Resources</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-purple-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-brain text-purple-600 text-xl"></i>
<h3 className="font-semibold text-purple-900">Mental Wellness</h3>
</div>
<p className="text-purple-700 mb-4">Access resources for stress management, anxiety relief, and emotional support.</p>
<button className="!rounded-button bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 whitespace-nowrap">
Explore Resources
</button>
</div>
<div className="bg-blue-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-heartbeat text-blue-600 text-xl"></i>
<h3 className="font-semibold text-blue-900">Preventive Care</h3>
</div>
<p className="text-blue-700 mb-4">Learn about health screenings, vaccinations, and preventive measures.</p>
<button className="!rounded-button bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 whitespace-nowrap">
View Guidelines
</button>
</div>
<div className="bg-emerald-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-apple-alt text-emerald-600 text-xl"></i>
<h3 className="font-semibold text-emerald-900">Nutrition Guide</h3>
</div>
<p className="text-emerald-700 mb-4">Get personalized nutrition advice and healthy meal planning tips.</p>
<button className="!rounded-button bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700 whitespace-nowrap">
Get Advice
</button>
</div>
</div>
</div>
</div>
);
case 'nutrition':
return (
<div className="space-y-8">
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Nutrition Overview</h2>
<div ref={nutritionChartRef} style={{ height: '400px' }} />
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Water Intake Tracker</h2>
<div className="flex items-center space-x-4">
<div className="flex-1 bg-blue-100 rounded-full h-4">
<div
className="bg-blue-500 h-full rounded-full"
style={{ width: `${(waterIntake / 4000) * 100}%` }}
></div>
</div>
<span className="text-lg font-medium">{waterIntake}ml / 4000ml</span>
<button
onClick={handleWaterIncrement}
className="!rounded-button bg-blue-500 text-white px-4 py-2 whitespace-nowrap"
>
Add 250ml
</button>
</div>
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Meal Tracker</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="space-y-4">
<h3 className="text-lg font-semibold text-gray-700">Breakfast</h3>
<div className="bg-gray-50 p-4 rounded-lg">
<p className="text-gray-800">Oatmeal with Berries</p>
<p className="text-gray-600 text-sm">320 calories</p>
<div className="flex items-center mt-2 text-sm text-gray-500">
<i className="fas fa-clock mr-1"></i>
<span>7:30 AM</span>
</div>
</div>
</div>
<div className="space-y-4">
<h3 className="text-lg font-semibold text-gray-700">Lunch</h3>
<div className="bg-gray-50 p-4 rounded-lg">
<p className="text-gray-800">Grilled Chicken Salad</p>
<p className="text-gray-600 text-sm">450 calories</p>
<div className="flex items-center mt-2 text-sm text-gray-500">
<i className="fas fa-clock mr-1"></i>
<span>12:45 PM</span>
</div>
</div>
</div>
<div className="space-y-4">
<h3 className="text-lg font-semibold text-gray-700">Dinner</h3>
<div className="bg-gray-50 p-4 rounded-lg">
<p className="text-gray-800">Salmon with Quinoa</p>
<p className="text-gray-600 text-sm">580 calories</p>
<div className="flex items-center mt-2 text-sm text-gray-500">
<i className="fas fa-clock mr-1"></i>
<span>7:00 PM</span>
</div>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Recipe Suggestions</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-gray-50 p-6 rounded-lg">
<img
src="https://public.readdy.ai/ai/img_res/d1121ed63ff3c4ca7cb90e551b8cdc06.jpg"
alt="Mediterranean Bowl"
className="w-full h-48 object-cover rounded-lg mb-4"
/>
<h3 className="text-lg font-semibold text-gray-800">Mediterranean Bowl</h3>
<p className="text-gray-600 mb-4">A healthy mix of grilled chicken, quinoa, and fresh vegetables.</p>
<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
<span><i className="fas fa-clock mr-1"></i> 25 mins</span>
<span><i className="fas fa-fire mr-1"></i> 450 cal</span>
<span><i className="fas fa-utensils mr-1"></i> 4 servings</span>
</div>
<button className="!rounded-button bg-emerald-500 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-600 whitespace-nowrap">
View Recipe
</button>
</div>
<div className="bg-gray-50 p-6 rounded-lg">
<img
src="https://public.readdy.ai/ai/img_res/b089b9c21b93ec316ff87c74dad6dad8.jpg"
alt="Buddha Bowl"
className="w-full h-48 object-cover rounded-lg mb-4"
/>
<h3 className="text-lg font-semibold text-gray-800">Buddha Bowl</h3>
<p className="text-gray-600 mb-4">Nutrient-rich bowl with sweet potato, avocado, and chickpeas.</p>
<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
<span><i className="fas fa-clock mr-1"></i> 30 mins</span>
<span><i className="fas fa-fire mr-1"></i> 380 cal</span>
<span><i className="fas fa-utensils mr-1"></i> 3 servings</span>
</div>
<button className="!rounded-button bg-emerald-500 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-600 whitespace-nowrap">
View Recipe
</button>
</div>
</div>
</div>
</div>
);
case 'mental health':
return (
<div className="space-y-8">
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Mood Tracker</h2>
<div ref={moodChartRef} style={{ height: '400px' }} />
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Daily Mood Journal</h2>
<div className="space-y-4">
<div className="flex items-center space-x-4">
<input
type="range"
min="1"
max="10"
value={moodValue}
onChange={(e) => setMoodValue(parseInt(e.target.value))}
className="flex-1"
/>
<span className="text-lg font-medium">{moodValue}/10</span>
</div>
<textarea
value={journalEntry}
onChange={(e) => setJournalEntry(e.target.value)}
placeholder="How are you feeling today? What's on your mind?"
className="w-full h-32 p-3 border rounded-lg resize-none"
/>
<button
onClick={() => {
setMoodJournal([...moodJournal, {
date: new Date(),
mood: moodValue,
note: journalEntry
}]);
setJournalEntry('');
}}
className="!rounded-button bg-indigo-600 text-white px-4 py-2 whitespace-nowrap"
>
Save Journal Entry
</button>
</div>
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Meditation Timer</h2>
<div className="space-y-4">
<div className="text-center">
<span className="text-4xl font-bold">{Math.floor(meditationTime / 60)}:{(meditationTime % 60).toString().padStart(2, '0')}</span>
</div>
<div className="flex justify-center space-x-4">
<button
onClick={() => {
if (!isMeditating) {
setIsMeditating(true);
const timer = setInterval(() => {
setMeditationTime(prev => prev + 1);
}, 1000);
return () => clearInterval(timer);
}
}}
className="!rounded-button bg-emerald-500 text-white px-6 py-3 whitespace-nowrap"
>
{isMeditating ? 'Meditating...' : 'Start Meditation'}
</button>
<button
onClick={() => {
setIsMeditating(false);
setMeditationTime(0);
}}
className="!rounded-button bg-gray-500 text-white px-6 py-3 whitespace-nowrap"
>
Reset
</button>
</div>
</div>
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Previous Journal Entries</h2>
<div className="space-y-4">
{moodJournal.slice().reverse().map((entry, index) => (
<div key={index} className="border rounded-lg p-4">
<div className="flex justify-between items-center mb-2">
<span className="text-gray-600">{entry.date.toLocaleDateString()}</span>
<span className="font-medium">Mood: {entry.mood}/10</span>
</div>
<p className="text-gray-800">{entry.note}</p>
</div>
))}
</div>
</div>
</div>
);
case 'dashboard':
return (
<div className="space-y-8">
<div className="grid grid-cols-3 gap-8">
<div className="bg-white rounded-xl p-6 shadow-lg">
<h3 className="text-lg font-semibold text-gray-800 mb-2">Sleep Quality</h3>
<div ref={chartRef} style={{ height: '200px' }} />
</div>
<div className="bg-white rounded-xl p-6 shadow-lg">
<h3 className="text-lg font-semibold text-gray-800 mb-2">Activity Level</h3>
<div className="text-3xl font-bold text-indigo-600">8,432</div>
<div className="text-gray-600">steps today</div>
</div>
<div className="bg-white rounded-xl p-6 shadow-lg">
<h3 className="text-lg font-semibold text-gray-800 mb-2">Heart Rate</h3>
<div className="text-3xl font-bold text-emerald-600">72</div>
<div className="text-gray-600">bpm (resting)</div>
</div>
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Appointments</h2>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div>
<h4 className="font-medium">Dr. Sarah Chen</h4>
<p className="text-gray-600">General Check-up</p>
</div>
<div className="text-right">
<div className="font-medium">Tomorrow</div>
<div className="text-gray-600">10:30 AM</div>
</div>
</div>
<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div>
<h4 className="font-medium">Dr. Michael Rodriguez</h4>
<p className="text-gray-600">Dental Cleaning</p>
</div>
<div className="text-right">
<div className="font-medium">Next Week</div>
<div className="text-gray-600">2:00 PM</div>
</div>
</div>
</div>
</div>
</div>
);
default:
return null;
}
};
return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
{/* Navigation */}
<nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
<div className="flex items-center space-x-2">
<i className="fas fa-heartbeat text-indigo-600 text-2xl"></i>
<span className="text-xl font-semibold text-gray-800">HealthAI</span>
</div>
<div className="hidden md:flex items-center space-x-8">
{['Home', 'Symptom Checker', 'Nutrition', 'Mental Health', 'Dashboard'].map((item) => (
<button
key={item}
className={`!rounded-button font-medium whitespace-nowrap ${
activeTab.toLowerCase() === item.toLowerCase()
? 'text-indigo-600'
: 'text-gray-600 hover:text-indigo-600'
}`}
onClick={() => setActiveTab(item.toLowerCase())}
>
{item}
</button>
))}
</div>
<div className="flex items-center space-x-4">
<button className="!rounded-button bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 whitespace-nowrap">
Sign In
</button>
</div>
</div>
</nav>
{/* Main Content */}
<main className="pt-20 pb-12 max-w-7xl mx-auto px-4">
{activeTab === 'home' ? (
<>
{/* Hero Section */}
<div className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
<img
src="https://public.readdy.ai/ai/img_res/93d7b572a966a6732da901d7657e76e1.jpg"
alt="Healthcare Platform"
className="absolute inset-0 w-full h-full object-cover"
/>
<div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-transparent">
<div className="max-w-2xl h-full flex flex-col justify-center px-8">
<h1 className="text-4xl font-bold text-white mb-4">
Your Personal AI Health Assistant
</h1>
<p className="text-lg text-gray-200 mb-8">
Experience the future of healthcare with our AI-powered platform. Get personalized health insights, nutrition guidance, and mental wellness support.
</p>
<button className="!rounded-button bg-white text-indigo-600 px-6 py-3 text-lg font-semibold hover:bg-gray-100 w-fit whitespace-nowrap">
Get Started
</button>
</div>
</div>
</div>
{/* Features Grid */}
<div className="grid md:grid-cols-3 gap-8 mb-12">
<div className="bg-white rounded-xl p-6 shadow-lg">
<div className="h-48 rounded-lg overflow-hidden mb-4">
<img
src="https://public.readdy.ai/ai/img_res/3a6ad083f1cfdf3ca0b517f72df940c6.jpg"
alt="Symptom Checker"
className="w-full h-full object-cover"
/>
</div>
<h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Symptom Checker</h3>
<p className="text-gray-600 mb-4">
Advanced AI analysis of your symptoms with personalized recommendations and instant medical guidance.
</p>
<button
onClick={() => setActiveTab('symptom checker')}
className="!rounded-button bg-emerald-500 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-600 whitespace-nowrap"
>
Check Symptoms
</button>
</div>
<div className="bg-white rounded-xl p-6 shadow-lg">
<div className="h-48 rounded-lg overflow-hidden mb-4">
<img
src="https://public.readdy.ai/ai/img_res/1ff740263abc842b6b8dfbec8c722b21.jpg"
alt="Nutrition Planner"
className="w-full h-full object-cover"
/>
</div>
<h3 className="text-xl font-semibold text-gray-800 mb-2">Nutrition Planner</h3>
<p className="text-gray-600 mb-4">
Personalized meal plans, nutritional insights, and smart grocery recommendations tailored to your goals.
</p>
<button
onClick={() => setActiveTab('nutrition')}
className="!rounded-button bg-orange-500 text-white px-4 py-2 text-sm font-medium hover:bg-orange-600 whitespace-nowrap"
>
Plan Meals
</button>
</div>
<div className="bg-white rounded-xl p-6 shadow-lg">
<div className="h-48 rounded-lg overflow-hidden mb-4">
<img
src="https://public.readdy.ai/ai/img_res/38c9c643ed137a0c33ec7a486516c561.jpg"
alt="Mental Wellness"
className="w-full h-full object-cover"
/>
</div>
<h3 className="text-xl font-semibold text-gray-800 mb-2">Mental Wellness</h3>
<p className="text-gray-600 mb-4">
Track your mood, practice guided meditation, and access AI-curated therapeutic content.
</p>
<button
onClick={() => setActiveTab('mental health')}
className="!rounded-button bg-blue-500 text-white px-4 py-2 text-sm font-medium hover:bg-blue-600 whitespace-nowrap"
>
Start Journey
</button>
</div>
</div>
</>
) : (
renderActiveTab()
)}
{/* Chatbot */}
{showChatbot && (
<div className="fixed bottom-20 right-4 w-80 bg-white rounded-xl shadow-xl z-50">
<div className="p-4 border-b">
<div className="flex items-center justify-between">
<h3 className="font-semibold text-gray-800">AI Health Assistant</h3>
<button
onClick={() => setShowChatbot(false)}
className="text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
</div>
</div>
<div className="h-96 overflow-y-auto p-4">
{chatMessages.map((msg, idx) => (
<div key={idx} className={`mb-4 ${msg.isUser ? 'text-right' : ''}`}>
<div className={`inline-block p-3 rounded-lg ${
msg.isUser ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
}`}>
{msg.text}
</div>
</div>
))}
</div>
<div className="p-4 border-t">
<div className="flex space-x-2">
<input
type="text"
value={messageInput}
onChange={(e) => setMessageInput(e.target.value)}
placeholder="Type your message..."
className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
/>
<button
onClick={handleSendMessage}
className="!rounded-button bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 whitespace-nowrap"
>
Send
</button>
</div>
</div>
</div>
)}
{/* Floating Chatbot Button */}
<button
onClick={() => setShowChatbot(!showChatbot)}
className="!rounded-button fixed bottom-4 right-4 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 flex items-center justify-center whitespace-nowrap"
>
<i className="fas fa-robot text-xl"></i>
</button>
</main>
</div>
);
};
export default App
