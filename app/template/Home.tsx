"use client";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getChartUser, getTotalDurableByUserId } from "@/service/serverService";

type Props = {
  session: any;
};

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = ({ session }: Props) => {
  const [chart, setShart] = React.useState<any>();
  const [durableTotal, setDurableTotal] = React.useState(0);
  const [priceTotal, setPriceTotal] = React.useState(0);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    try {
      const _fetchData = async () => {
        setLoading(true);
        await getChartUser(
          session?.user?.users?.user_id,
          session?.user?.token
        ).then((res) => {
          setLoading(false);
          setShart(res);
        });
        await getTotalDurableByUserId(
          session.user.users.user_id,
          session.user.token
        ).then((res) => {
          setDurableTotal(res.data.totalDurable.sum);
          setPriceTotal(res.data.totalPrice.price_total);
        });
      };
      _fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const data = {
    labels: [
      "ใช้งานได้",
      "ชำรุดรอซ่อม",
      "ชำรุดรอจำหน่าย",
      "สูญหาย",
      "ยังไม่ได้สำรวจ",
    ],
    datasets: [
      {
        label: "มีดังนี้",
        data: [
          chart?.count?.countOne,
          chart?.count?.countTwo,
          chart?.count?.countTree,
          chart?.count?.countcountFour,
          durableTotal -
            (chart?.count?.countOne +
              chart?.count?.countTwo +
              chart?.count?.countThree +
              chart?.count?.countFour) || 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 123, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 123, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md text-center"></span>
        </div>
      )}

      {chart && (
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:gap-4 m-4 ">
          <div className="card lg:card-compact dark:bg-neutral-focus shadow-xl col-span-1 m-2">
            <div className="card-body">
              <h2 className="card-title">รายการครุภัณฑ์</h2>
              <div className="flex flex-col">
                <div className="flex flex-row m-2 w-full drop-shadow-md">
                  <div className="dark:bg-slate-700 bg-slate-100 w-70 lg:p-10 p-4 lg:text-3xl rounded-l-lg">
                    รายการครุภัณฑ์ทั้งหมด
                  </div>
                  <div className="dark:bg-slate-800 bg-slate-50 w-30 rounded-r-lg">
                    <h3 className="text-3xl lg:text-4xl w-6/12 lg:p-10 pt-10 px-3">
                      {durableTotal}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-row m-2 w-full drop-shadow-md">
                  <div className="dark:bg-slate-700 bg-slate-100 w-70 lg:p-10 p-4 lg:text-3xl rounded-l-lg">
                    ราคารวมครุภัณฑ์
                  </div>
                  <div className="dark:bg-slate-800 bg-slate-50 w-30 rounded-r-lg">
                    <h3 className="text-3xl lg:text-4xl p-4 w-6/12 lg:p-10 pt-10 px-3">
                      {priceTotal}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card lg:card-compact dark:bg-neutral-focus shadow-xl col-span-1 m-2">
            <div className="card-body">
              <h2 className="card-title">รายงานครุภัณฑ์</h2>
              <Pie data={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
