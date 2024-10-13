import { useState, useEffect } from 'react';
import Image from 'next/image';
import seaLevelImage from '../public/sensor_image.png';
import dynamic from 'next/dynamic';

const Gauge = dynamic(() => import('../components/Gauge'), { ssr: false });

const Home = () => {
  const [seaLevel, setSeaLevel] = useState<number>(1.5); // Initial sea level in meters
  const [temperature, setTemperature] = useState<number>(25); // Initial temperature in °C
  const [windSpeed, setWindSpeed] = useState<number>(10); // Initial wind speed in km/h
  const [waterPh, setWaterPh] = useState<number>(7.5); // Initial water pH level
  const [conductivity, setConductivity] = useState<number>(1.2); // Initial conductivity in mS/cm
  const [airPressure, setAirPressure] = useState<number>(1013); // Initial air pressure in hPa
  const [depth, setDepth] = useState<number>(10); // Initial depth in meters
  const [pingTime, setPingTime] = useState<number>(0); // Initial ping return time in milliseconds

  // Function to update depth based on sea level (sensor floats on water)
  const updateDepth = (seaLevel: number) => setDepth(seaLevel + 8);

  // Function to calculate sonar ping time based on depth
  const calculatePingTime = (depth: number) => {
    const speedOfSoundInWater = 1500; // Speed of sound in water in m/s
    return (depth * 2) / (speedOfSoundInWater / 1000); // Time in milliseconds for the ping to go down and back up
  };

  // Simulate sensor data changing every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => Math.round((prev + (Math.random() * 0.2 - 0.1)) * 10) / 10); // Subtle random fluctuation
      setWindSpeed((prev) => Math.round((prev + (Math.random() * 0.2 - 0.1)) * 10) / 10);
      setWaterPh((prev) => Math.round((prev + (Math.random() * 0.05 - 0.025)) * 10) / 10);
      setConductivity((prev) => Math.round((prev + (Math.random() * 0.05 - 0.025)) * 10) / 10);
      setAirPressure((prev) => Math.round((prev + (Math.random() * 0.5 - 0.25)) * 10) / 10);
      updateDepth(seaLevel);
      setPingTime(parseFloat(calculatePingTime(depth).toFixed(2))); // Calculate and set ping time
    }, 1000);

    return () => clearInterval(interval);
  }, [seaLevel, depth]);

  // Handlers to increase or decrease sea level
  const increaseSeaLevel = () => setSeaLevel((prev) => Math.round((prev + 0.1) * 10) / 10);
  const decreaseSeaLevel = () => setSeaLevel((prev) => Math.round((prev - 0.1) * 10) / 10);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 flex flex-col items-center p-8">
      <h1 className="text-5xl font-extrabold text-white mb-10 drop-shadow-lg">Project SWIMS Simulation</h1>

      <div className="flex flex-col items-center mb-10">
        <Image src={seaLevelImage} alt="Sensor Image" width={300} height={300} className="rounded-full shadow-xl" />
      </div>

      <table className="table-auto mb-12">
        <tbody>
          <tr>
            <td className="p-6"><Gauge title="Sea Level" value={seaLevel} unit="m" min={0} max={5} /></td>
            <td className="p-6"><Gauge title="Temperature" value={temperature} unit="°C" min={-10} max={50} /></td>
            <td className="p-6"><Gauge title="Wind Speed" value={windSpeed} unit="km/h" min={0} max={100} /></td>
          </tr>
          <tr>
            <td className="p-6"><Gauge title="Water pH" value={waterPh} unit="" min={0} max={14} /></td>
            <td className="p-6"><Gauge title="Conductivity" value={conductivity} unit="mS/cm" min={0} max={10} /></td>
            <td className="p-6"><Gauge title="Air Pressure" value={airPressure} unit="hPa" min={900} max={1100} /></td>
          </tr>
          <tr>
            <td className="p-6"><Gauge title="Depth" value={depth} unit="m" min={0} max={100} /></td>
            <td className="p-6"><Gauge title="Ping Time" value={pingTime} unit="ms" min={0} max={200} /></td>
          </tr>
        </tbody>
      </table>

      <div className="flex space-x-6 mt-10">
        <button onClick={increaseSeaLevel} className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-md">
          Increase Sea Level
        </button>
        <button onClick={decreaseSeaLevel} className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-md">
          Decrease Sea Level
        </button>
      </div>
    </div>
  );
};

export default Home;
