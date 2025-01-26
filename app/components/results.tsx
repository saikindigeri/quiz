import { Button } from '@/components/ui/button';
import { PhoneForwarded, Copy } from 'lucide-react';

import 'chart.js/auto';


import { Piechart } from './Piechart';



const Results = () => {


  // const chartData = {
  //   labels: ['CMA IND', 'CA', 'CS', 'ACCA', 'CMA USA'],
  //   datasets: [
  //     {
  //       data: [21.5, 22.5, 16, 25, 16.7],
  //       backgroundColor: [
  //         '#FFA500', // CMA IND - Orange
  //         '#FF8C00', // CA - Dark Orange
  //         '#FF7F50', // CS - Coral
  //         '#FF6347', // ACCA - Tomato
  //         '#FF4500', // CMA USA - Orange Red
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   plugins: {
  //     datalabels: {
  //       anchor: 'end',  // Positions the labels outside the chart
  //       align: 'end',    // Align the label towards the outside
  //       formatter: (value: number, context: any) => {
  //         return `${chartData.labels[context.dataIndex]}: ${value}%`;
  //       },
  //       color: (context: any) => chartData.datasets[0].backgroundColor[context.dataIndex], // Color same as section
  //       font: {
  //         weight: 'bold',
  //         size: 14,
  //       },
  //       offset: 20,
  //       clamp: true,
  //     },
  //   },
  //   layout: {
  //     padding: 30,
  //   },
  //   responsive: true,
  //   maintainAspectRatio: false,
  // };

  return (
    <div className="bg-gray-100  mt-20 h-[90vh] place-items-center align-center p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Your results based on your answers:</h1>
      <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row items-start gap-8">
        
        {/* Left Section: Description */}
        <div className="flex-1">
          <p className="text-gray-600">You are most suitable for</p>
          <h1 className="text-2xl font-bold text-gray-800">Association of Chartered</h1>
          <h2 className="text-xl font-semibold text-orange-500">Certified Accountant (ACCA)</h2>
          <p className="text-gray-600 mt-4">
            Association of Chartered Certified Accountants are professionals who are responsible for the
            financial management of companies, financial reporting, auditing, taxation, and other
            financial aspects of the business. They have global recognition and are highly sought after
            in the finance industry.
          </p>
        </div>

        {/* Right Section: Career Suitability Chart */}
        <div className="w-full  md:w-1/2 flex flex-col items-center">
        
          <div className="relative w-64 h-64">
          <Piechart/>
          </div>
        </div>
      </div>

      {/* Bottom Section: Buttons */}
      <div className="mt-6 flex flex-wrap justify-center md:justify-between gap-4">
        <Button className="bg-gray-800 text-white py-3 px-6 rounded-lg">View Course Details</Button>
        <Button className="flex items-center gap-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-white">
          Consult Assistant <PhoneForwarded size={20} />
        </Button>
        <Button className="flex items-center gap-2 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg  hover:bg-white">
          Copy URL <Copy size={20} />
        </Button>
      </div>

      
    </div>
  );
};

export default Results;
