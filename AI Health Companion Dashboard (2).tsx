// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
const App: React.FC = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeTab, setActiveTab] = useState('home');
const [showPreventiveCare, setShowPreventiveCare] = useState(false);
const [showMentalWellness, setShowMentalWellness] = useState(false);
const [showNutritionalGuide, setShowNutritionalGuide] = useState(false);
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
const [isPaused, setIsPaused] = useState(false);
const [showSignIn, setShowSignIn] = useState(false);
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
case 'analysis':
return (
<div className="space-y-8">
<div className="bg-white rounded-xl p-8 shadow-lg">
<div className="flex items-center justify-between mb-6">
<h2 className="text-2xl font-semibold text-gray-800">Health Analysis Results</h2>
<button
onClick={() => setActiveTab('symptom checker')}
className="!rounded-button text-gray-600 hover:text-gray-800"
>
<i className="fas fa-times text-xl"></i>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-6">
<div className="bg-emerald-50 rounded-lg p-6">
<h3 className="text-lg font-semibold text-emerald-800 mb-4">Recommended Medications</h3>
<ul className="space-y-3">
<li className="flex items-start space-x-3">
<i className="fas fa-pills text-emerald-600 mt-1"></i>
<div>
<p className="font-medium text-emerald-900">Ibuprofen (400mg)</p>
<p className="text-sm text-emerald-700">Take 1 tablet every 6-8 hours after meals</p>
</div>
</li>
<li className="flex items-start space-x-3">
<i className="fas fa-capsules text-emerald-600 mt-1"></i>
<div>
<p className="font-medium text-emerald-900">Acetaminophen (500mg)</p>
<p className="text-sm text-emerald-700">Take 1-2 tablets every 4-6 hours as needed</p>
</div>
</li>
</ul>
<div className="mt-4 p-3 bg-white/50 rounded-lg">
<p className="text-sm text-emerald-800"><i className="fas fa-exclamation-circle mr-2"></i>Always consult with a healthcare provider before starting any medication</p>
</div>
</div>
<div className="bg-blue-50 rounded-lg p-6">
<h3 className="text-lg font-semibold text-blue-800 mb-4">Health Tips</h3>
<ul className="space-y-3">
<li className="flex items-start space-x-3">
<i className="fas fa-bed text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-900">Rest & Recovery</p>
<p className="text-sm text-blue-700">Get 7-9 hours of sleep and avoid strenuous activities</p>
</div>
</li>
<li className="flex items-start space-x-3">
<i className="fas fa-glass-water text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-900">Stay Hydrated</p>
<p className="text-sm text-blue-700">Drink 8-10 glasses of water daily</p>
</div>
</li>
<li className="flex items-start space-x-3">
<i className="fas fa-apple-alt text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-900">Balanced Diet</p>
<p className="text-sm text-blue-700">Focus on nutrient-rich foods and avoid processed items</p>
</div>
</li>
</ul>
</div>
</div>
<div className="space-y-6">
<div className="bg-purple-50 rounded-lg p-6">
<h3 className="text-lg font-semibold text-purple-800 mb-4">Nearby Healthcare Providers</h3>
<div className="space-y-4">
<div className="bg-white/50 p-4 rounded-lg">
<div className="flex items-start justify-between">
<div>
<h4 className="font-medium text-purple-900">Dr. Emily Thompson</h4>
<p className="text-sm text-purple-700">General Physician</p>
<p className="text-sm text-purple-600 mt-1">
<i className="fas fa-location-dot mr-1"></i>
2.3 miles away
</p>
</div>
<button className="!rounded-button bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 whitespace-nowrap">
Book Now
</button>
</div>
</div>
<div className="bg-white/50 p-4 rounded-lg">
<div className="flex items-start justify-between">
<div>
<h4 className="font-medium text-purple-900">Dr. James Wilson</h4>
<p className="text-sm text-purple-700">Internal Medicine</p>
<p className="text-sm text-purple-600 mt-1">
<i className="fas fa-location-dot mr-1"></i>
3.1 miles away
</p>
</div>
<button className="!rounded-button bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 whitespace-nowrap">
Book Now
</button>
</div>
</div>
</div>
</div>
<div className="bg-orange-50 rounded-lg p-6">
<h3 className="text-lg font-semibold text-orange-800 mb-4">Follow-up Care</h3>
<div className="space-y-4">
<div className="flex items-start space-x-3">
<i className="fas fa-calendar-check text-orange-600 mt-1"></i>
<div>
<p className="font-medium text-orange-900">Schedule Follow-up</p>
<p className="text-sm text-orange-700">Book a follow-up appointment in 7 days</p>
</div>
</div>
<div className="flex items-start space-x-3">
<i className="fas fa-notes-medical text-orange-600 mt-1"></i>
<div>
<p className="font-medium text-orange-900">Symptom Journal</p>
<p className="text-sm text-orange-700">Track your symptoms daily for better diagnosis</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
);
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
onClick={() => {
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
setActiveTab('analysis');
}
}}
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
<div className="bg-purple-50 p-6 rounded-lg transform transition-all duration-300 hover:scale-105">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-brain text-purple-600 text-xl"></i>
<h3 className="font-semibold text-purple-900">Mental Wellness</h3>
</div>
<p className="text-purple-700 mb-4">Access resources for stress management, anxiety relief, and emotional support.</p>
<button
onClick={() => {
setShowMentalWellness(true);
setActiveTab('mental wellness');
}}
className="!rounded-button bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 whitespace-nowrap">
Explore Resources
</button>
</div>
<div className="bg-blue-50 p-6 rounded-lg transform transition-all duration-300 hover:scale-105">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-heartbeat text-blue-600 text-xl"></i>
<h3 className="font-semibold text-blue-900">Preventive Care</h3>
</div>
<p className="text-blue-700 mb-4">Learn about health screenings, vaccinations, and preventive measures.</p>
<button
onClick={() => {
setShowPreventiveCare(true);
setActiveTab('preventive care');
}}
className="!rounded-button bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 whitespace-nowrap">
View Guidelines
</button>
</div>
<div className="bg-emerald-50 p-6 rounded-lg transform transition-all duration-300 hover:scale-105">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-apple-alt text-emerald-600 text-xl"></i>
<h3 className="font-semibold text-emerald-900">Nutrition Guide</h3>
</div>
<p className="text-emerald-700 mb-4">Get personalized nutrition advice and healthy meal planning tips.</p>
<button
onClick={() => {
setShowNutritionalGuide(true);
setActiveTab('nutritional guide');
}}
className="!rounded-button bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700 whitespace-nowrap">
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
case 'mental wellness':
return (
<div className="space-y-8">
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Mental Wellness Resources</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-purple-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-brain text-purple-600 text-xl"></i>
<h3 className="font-semibold text-purple-900">Stress Management</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Guided breathing exercises</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Progressive muscle relaxation</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Time management techniques</span>
</li>
</ul>
<button className="!rounded-button mt-4 bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-700 whitespace-nowrap">
Start Exercise
</button>
</div>
<div className="bg-blue-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-music text-blue-600 text-xl"></i>
<h3 className="font-semibold text-blue-900">Music Therapy</h3>
</div>
<div className="space-y-4">
<div className="bg-white/50 p-4 rounded-lg">
<h4 className="font-medium text-blue-800">Calming Playlists</h4>
<p className="text-blue-600 text-sm">Curated music for relaxation</p>
</div>
<div className="bg-white/50 p-4 rounded-lg">
<h4 className="font-medium text-blue-800">Nature Sounds</h4>
<p className="text-blue-600 text-sm">Ambient environmental audio</p>
</div>
</div>
<button className="!rounded-button mt-4 bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 whitespace-nowrap">
Play Music
</button>
</div>
<div className="bg-emerald-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-video text-emerald-600 text-xl"></i>
<h3 className="font-semibold text-emerald-900">Aesthetic Videos</h3>
</div>
<div className="space-y-4">
<div className="bg-white/50 p-4 rounded-lg">
<h4 className="font-medium text-emerald-800">Mindful Moments</h4>
<p className="text-emerald-600 text-sm">Short calming visual experiences</p>
</div>
<div className="bg-white/50 p-4 rounded-lg">
<h4 className="font-medium text-emerald-800">Guided Imagery</h4>
<p className="text-emerald-600 text-sm">Visual meditation journeys</p>
</div>
</div>
<button className="!rounded-button mt-4 bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700 whitespace-nowrap">
Watch Now
</button>
</div>
</div>
</div>
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Relaxation Activities</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
<img
src="https://public.readdy.ai/ai/img_res/ca03d599984b92a79d4f2749b5fa33cb.jpg"
alt="Guided Meditation"
className="w-full h-48 object-cover rounded-lg mb-4"
/>
<h3 className="text-xl font-semibold text-indigo-900 mb-2">Guided Meditation</h3>
<p className="text-indigo-700 mb-4">Expert-led meditation sessions for inner peace and mental clarity.</p>
<button className="!rounded-button bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700 whitespace-nowrap">
Begin Session
</button>
</div>
<div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg">
<img
src="https://public.readdy.ai/ai/img_res/c1781dfd4594f8ff3ef09eb1a12f8ec0.jpg"
alt="Gentle Movement"
className="w-full h-48 object-cover rounded-lg mb-4"
/>
<h3 className="text-xl font-semibold text-emerald-900 mb-2">Gentle Movement</h3>
<p className="text-emerald-700 mb-4">Simple stretches and exercises to release tension and promote relaxation.</p>
<button className="!rounded-button bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700 whitespace-nowrap">
Start Moving
</button>
</div>
</div>
</div>
</div>
);
case 'preventive care':
return (
<div className="space-y-8">
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Preventive Care Guidelines</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-blue-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-syringe text-blue-600 text-xl"></i>
<h3 className="font-semibold text-blue-900">Vaccination Schedule</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-800">Influenza (Flu)</p>
<p className="text-blue-600 text-sm">Annual vaccination recommended</p>
</div>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-800">Tdap</p>
<p className="text-blue-600 text-sm">Every 10 years</p>
</div>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-800">Pneumococcal</p>
<p className="text-blue-600 text-sm">Age 65+ or high risk</p>
</div>
</li>
</ul>
</div>
<div className="bg-emerald-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-heartbeat text-emerald-600 text-xl"></i>
<h3 className="font-semibold text-emerald-900">Health Screenings</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-emerald-600 mt-1"></i>
<div>
<p className="font-medium text-emerald-800">Blood Pressure</p>
<p className="text-emerald-600 text-sm">Every 2 years</p>
</div>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-emerald-600 mt-1"></i>
<div>
<p className="font-medium text-emerald-800">Cholesterol</p>
<p className="text-emerald-600 text-sm">Every 4-6 years</p>
</div>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-emerald-600 mt-1"></i>
<div>
<p className="font-medium text-emerald-800">Diabetes</p>
<p className="text-emerald-600 text-sm">Every 3 years</p>
</div>
</li>
</ul>
</div>
<div className="bg-purple-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-shield-alt text-purple-600 text-xl"></i>
<h3 className="font-semibold text-purple-900">Preventive Measures</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Regular exercise routine</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Balanced nutrition</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Adequate sleep</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Stress management</span>
</li>
</ul>
</div>
</div>
</div>
</div>
);
case 'nutritional guide':
return (
<div className="space-y-8">
<div className="bg-white rounded-xl p-8 shadow-lg">
<h2 className="text-2xl font-semibold text-gray-800 mb-6">Personalized Nutrition Guide</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-emerald-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-apple-alt text-emerald-600 text-xl"></i>
<h3 className="font-semibold text-emerald-900">Dietary Recommendations</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-emerald-600 mt-1"></i>
<div>
<p className="font-medium text-emerald-800">Balanced Macros</p>
<p className="text-emerald-600 text-sm">40% carbs, 30% protein, 30% fats</p>
</div>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-emerald-600 mt-1"></i>
<div>
<p className="font-medium text-emerald-800">Portion Control</p>
<p className="text-emerald-600 text-sm">Use hand measurements</p>
</div>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-emerald-600 mt-1"></i>
<div>
<p className="font-medium text-emerald-800">Meal Timing</p>
<p className="text-emerald-600 text-sm">Every 3-4 hours</p>
</div>
</li>
</ul>
</div>
<div className="bg-blue-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-pills text-blue-600 text-xl"></i>
<h3 className="font-semibold text-blue-900">Supplement Guide</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-800">Multivitamin</p>
<p className="text-blue-600 text-sm">Daily with breakfast</p>
</div>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-800">Omega-3</p>
<p className="text-blue-600 text-sm">2000mg daily</p>
</div>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-blue-600 mt-1"></i>
<div>
<p className="font-medium text-blue-800">Vitamin D</p>
<p className="text-blue-600 text-sm">2000-4000 IU daily</p>
</div>
</li>
</ul>
</div>
<div className="bg-purple-50 p-6 rounded-lg">
<div className="flex items-center space-x-3 mb-4">
<i className="fas fa-utensils text-purple-600 text-xl"></i>
<h3 className="font-semibold text-purple-900">Meal Planning Tips</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Prep meals in advance</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Include variety of colors</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Balance each plate</span>
</li>
<li className="flex items-start space-x-2">
<i className="fas fa-check-circle text-purple-600 mt-1"></i>
<span className="text-purple-700">Stay hydrated</span>
</li>
</ul>
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
<div className="space-y-6">
<div className="text-center">
<span className="text-6xl font-bold text-indigo-600">{Math.floor(meditationTime / 60)}:{(meditationTime % 60).toString().padStart(2, '0')}</span>
</div>
<div className="flex justify-center space-x-4">
<button
onClick={() => {
if (!isMeditating && !isPaused) {
setIsMeditating(true);
const timer = setInterval(() => {
setMeditationTime(prev => prev + 1);
}, 1000);
// Store timer ID in a ref to clear it later
window.meditationTimer = timer;
}
}}
className="!rounded-button bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 flex items-center space-x-3 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
disabled={isMeditating}
>
<i className={`fas ${!isMeditating ? 'fa-play' : 'fa-spinner fa-spin'} text-lg`}></i>
<span className="font-medium">{!isMeditating ? 'Start Meditation' : 'Meditating...'}</span>
</button>
<button
onClick={() => {
if (isMeditating) {
setIsMeditating(false);
setIsPaused(true);
clearInterval(window.meditationTimer);
} else if (isPaused) {
setIsMeditating(true);
setIsPaused(false);
const timer = setInterval(() => {
setMeditationTime(prev => prev + 1);
}, 1000);
window.meditationTimer = timer;
}
}}
className={`!rounded-button px-8 py-4 flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap ${
isMeditating || isPaused
? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700'
: 'bg-gray-200 text-gray-400 cursor-not-allowed'
}`}
disabled={!isMeditating && !isPaused}
>
<i className={`fas ${isMeditating ? 'fa-pause' : 'fa-play'} text-lg`}></i>
<span className="font-medium">{isMeditating ? 'Pause' : 'Resume'}</span>
</button>
<button
onClick={() => {
setIsMeditating(false);
setIsPaused(false);
setMeditationTime(0);
clearInterval(window.meditationTimer);
}}
className={`!rounded-button px-8 py-4 flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap ${
isMeditating || isPaused
? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
: 'bg-gray-200 text-gray-400 cursor-not-allowed'
}`}
disabled={!isMeditating && !isPaused}
>
<i className="fas fa-stop text-lg"></i>
<span className="font-medium">End Session</span>
</button>
</div>
{isMeditating && (
<div className="text-center text-gray-600">
<p>Take deep breaths and focus on the present moment</p>
</div>
)}
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
<button
onClick={() => setShowSignIn(true)}
className="!rounded-button bg-white/20 backdrop-blur-md border border-white/30 text-indigo-600 px-4 py-2 text-sm font-medium hover:bg-white/30 transition-all duration-300 shadow-lg whitespace-nowrap flex items-center space-x-2"
>
<i className="fas fa-user-circle"></i>
<span>Sign In</span>
</button>
{showSignIn && (
<div className="fixed inset-0 flex items-center justify-center z-50">
<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 backdrop-blur-sm"></div>
<div className="relative w-full max-w-4xl h-[600px] flex rounded-2xl overflow-hidden shadow-2xl">
{/* Left Panel - Decorative */}
<div className="relative w-1/2 bg-gradient-to-br from-indigo-600/90 to-purple-600/90 p-8 overflow-hidden">
<div className="absolute inset-0 backdrop-blur-sm"></div>
<div className="relative z-10">
<i className="fas fa-heartbeat text-white text-4xl mb-6 block"></i>
<h2 className="text-3xl font-bold text-white mb-4">Welcome to HealthAI</h2>
<p className="text-white/80 mb-6">Your personal AI-powered healthcare companion. Join us for a healthier tomorrow.</p>
<div className="grid grid-cols-2 gap-4 mb-8">
<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
<i className="fas fa-brain text-white text-xl mb-2"></i>
<p className="text-white text-sm">Mental Wellness Tracking</p>
</div>
<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
<i className="fas fa-heartbeat text-white text-xl mb-2"></i>
<p className="text-white text-sm">Health Monitoring</p>
</div>
<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
<i className="fas fa-apple-alt text-white text-xl mb-2"></i>
<p className="text-white text-sm">Nutrition Planning</p>
</div>
<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
<i className="fas fa-medkit text-white text-xl mb-2"></i>
<p className="text-white text-sm">Medical Assistance</p>
</div>
</div>
</div>
{/* Floating Health Elements */}
<div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full backdrop-blur-sm"></div>
<div className="absolute top-20 -right-10 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"></div>
</div>
{/* Right Panel - Form */}
<div className="w-1/2 bg-white/80 backdrop-blur-md p-8 flex flex-col justify-center relative">
<button
onClick={() => setShowSignIn(false)}
className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
<div className="max-w-sm mx-auto w-full">
<h3 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h3>
<div className="space-y-4">
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
<div className="relative">
<i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
<input
type="email"
className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500"
placeholder="Enter your email"
/>
</div>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
<div className="relative">
<i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
<input
type="password"
className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:border-indigo-500"
placeholder="Enter your password"
/>
</div>
</div>
<div className="flex items-center justify-between text-sm">
<label className="flex items-center">
<input type="checkbox" className="mr-2" />
<span className="text-gray-600">Remember me</span>
</label>
<a href="#" className="text-indigo-600 hover:text-indigo-700">Forgot password?</a>
</div>
<button className="!rounded-button w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 whitespace-nowrap">
Sign In
</button>
<div className="relative my-6">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t border-gray-300"></div>
</div>
<div className="relative flex justify-center text-sm">
<span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
</div>
</div>
<div className="grid grid-cols-3 gap-3">
<button className="!rounded-button flex items-center justify-center py-2 px-4 border border-gray-300 bg-white/50 hover:bg-white/80 whitespace-nowrap">
<i className="fab fa-google text-red-500"></i>
</button>
<button className="!rounded-button flex items-center justify-center py-2 px-4 border border-gray-300 bg-white/50 hover:bg-white/80 whitespace-nowrap">
<i className="fab fa-apple text-gray-800"></i>
</button>
<button className="!rounded-button flex items-center justify-center py-2 px-4 border border-gray-300 bg-white/50 hover:bg-white/80 whitespace-nowrap">
<i className="fab fa-facebook text-blue-600"></i>
</button>
</div>
<div className="text-center text-sm text-gray-600 mt-4">
Don't have an account? <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign up</a>
</div>
</div>
</div>
</div>
</div>
</div>
)}
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
