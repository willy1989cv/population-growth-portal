import { FlatUiTable, LineChart, Table } from "@portaljs/components";
import { useEffect, useState } from "react";
import { csvToArray } from "../../utils";

const Dashboard = ({
  url,
  yAxis = "y",
  xAxis = "x",
  initialView = "table",
  country="this country"
}) => {
  const [csv, setCSV] = useState();

  const [view, setView] = useState(initialView);
  const [data, setData] = useState([]);
  const firstValue = data && data[0] ? data[0][1] : null;
  const lastValue = data && data[0] ? data[data.length-1][1] : null;

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((d) => {
        const arr = csvToArray(d);
        arr.shift();
        setCSV(d);
        setData(arr);
      });
  }, []);

  return (
    
    <div>
      <nav className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-8">
        <a
          href="#"
          className={`inline-block px-4 py-3  rounded-lg ${
            view === "table" ? "active text-white bg-blue-600" : ""
          }`}
          onClick={() => setView("table")}
        >
          Table
        </a>

        <a
          href="#"
          className={`inline-block px-4 py-3 rounded-lg ${
            view === "chart" ? "active text-white bg-blue-600" : ""
          }`}
          onClick={() => setView("chart")}
        >
          Chart
        </a>
      </nav>

      <div className="grid grid-cols-2 gap-10 ">
        {view == "table" && csv && (
          <div className="w-full">
            <Table csv={csv} />
          </div>
        )}

        {view == "chart" && csv && (
          <div className="w-full">
            <LineChart
              className="w-full"
              xAxis={xAxis}
              yAxis={yAxis}
              data={csvToArray(csv)}
              style={{ maxWidth: "100%;" }}
            />
          </div>
        )}
        <div>
            {data[0] && (
                <>
                <div>From <b>{data[0][0]}</b> to <b>{data[data.length-1][0]}</b><br/>the population of {country} increased from <b>{data[0][1]}</b> to <b>{data[data.length-1][1]}</b> people.</div>                
                <div className="mt-5">
                    A growth of <b>{(((lastValue - firstValue)/firstValue)*100).toFixed(2)}%</b> in <b>{data[data.length-1][0] - data[0][0]} years</b>
                </div>
                </>
            )}
          
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
