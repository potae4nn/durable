import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getChartUser, getTotalDurableByUserId } from "@/service/serverService";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";

type Props = {};

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = ({}: Props) => {
  const { data: session, status }: any | undefined = useSession();
  const [chart, setShart] = React.useState<any>();
  const [durableTotal, setDurableTotal] = React.useState(0);
  const [priceTotal, setPriceTotal] = React.useState(0);
  const [loading, setLoading] = useState(false);

  const userId: string | any = session?.user?.users.user_id;

  useEffect(() => {
    const _fetchData = async () => {
      setLoading(true);
      await getChartUser(userId).then((res) => {
        setLoading(false);
        setShart(res);
      });
      await getTotalDurableByUserId(userId).then((res) => {
        setDurableTotal(res.data.totalDurable?.sum);
        setPriceTotal(res.data.totalPrice?.price_total);
      });
    };
    _fetchData();
  }, [session]);

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
          chart?.count?.countThree,
          chart?.count?.countFour,
          durableTotal -
            (chart?.count?.countOne +
              chart?.count?.countTwo +
              chart?.count?.countThree +
              chart?.count?.countFour) || 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 123, 86, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(166,173,187, 0.3)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 123, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(166,173,187, 0.4)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Layout>
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md text-center"></span>
        </div>
      )}

      {chart && (
        <div className="flex">
          <div className="w-full">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 m-4 ">
              <div className="card lg:card-compact dark:bg-neutral-focus shadow-xl col-span-1 m-2">
                <div className="card-body">
                  <h2 className="text-center text-xl lg:text-4xl mb-3">
                    สรุปรายการครุภัณฑ์
                  </h2>
                  <div className="flex flex-row drop-shadow-md mb-2">
                    <div className="dark:bg-slate-700 bg-slate-100 w-[60%] lg:p-5 p-6 text-xl lg:text-3xl rounded-l-lg">
                      ครุภัณฑ์ทั้งหมด
                    </div>
                    <div className="dark:bg-slate-800  bg-slate-50 w-[40%] rounded-r-lg">
                      <h3 className="text-2xl  lg:text-6xl py-8 text-center">
                        {durableTotal}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-row drop-shadow-md ">
                    <div className="dark:bg-slate-700 bg-slate-100 w-[60%] lg:p-5 p-6 text-xl lg:text-3xl rounded-l-lg">
                      ราคารวมครุภัณฑ์
                    </div>
                    <div className="dark:bg-slate-800  bg-slate-50 w-[40%] rounded-r-lg">
                      <h3 className="text-2xl  lg:text-6xl py-8 text-center">
                        {priceTotal?.toLocaleString("en-US")}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card lg:card-compact dark:bg-neutral-focus shadow-xl col-span-1 m-2">
                <div className="card-body">
                  <h2 className="text-center text-xl lg:text-4xl mb-3">
                    กราฟแสดงสถานะครุภัณฑ์
                  </h2>
                  <div className="flex flex-row drop-shadow-md mb-2">
                    {/* <div className="dark:bg-slate-800  bg-slate-50 w-[100%] rounded-r-lg"> */}
                    <div className="w-[100%] item-center">
                      <Pie data={data} />
                      </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        // /* <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 m-4 ">
        //     <div className="card lg:card-compact dark:bg-neutral-focus shadow-xl col-span-1 m-2">
        //      <div className="card-body">
        //         <h2 className="card-title">รายการครุภัณฑ์</h2>
        //        <div className="flex flex-col">
        //           <div className="flex flex-row drop-shadow-md">
        //             <div className="dark:bg-slate-700 bg-slate-100 w-70 lg:p-10 p-4 lg:text-3xl rounded-l-lg">
        //               รายการครุภัณฑ์ทั้งหมด
        //             </div>
        //             <div className="dark:bg-slate-800 bg-slate-50 lg:w-fit w-1/4 rounded-r-lg">
        //               <h3 className="text-3xl lg:text-4xl w-full lg:p-10 pt-10 px-3">
        //                 {durableTotal}
        //               </h3>
        //             </div>
        //           </div>
        //           <div className="flex flex-row m-2  w-full drop-shadow-md">
        //             <div className="dark:bg-slate-700 lg:w-2/3 w-1/3 bg-slate-100 w-70 lg:p-10 p-4 lg:text-3xl rounded-l-lg">
        //               ราคารวมครุภัณฑ์
        //             </div>
        //             <div className="dark:bg-slate-800 bg-slate-50 lg:w-fit w-1/4 rounded-r-lg">
        //               <h3 className="text-3xl lg:text-4xl p-4 w-6/12 lg:p-10 pt-10 px-3">
        //                 {priceTotal}
        //               </h3>
        //             </div>
        //           </div>
        //        </div>
        //       </div>
        //    </div>
        //    <div className="card lg:card-compact dark:bg-neutral-focus shadow-xl col-span-1 m-2">
        //       <div className="card-body">
        //         <h2 className="card-title">รายงานครุภัณฑ์</h2>
        //         <div className="w-fit lg:w-full">
        //            <Pie data={data} />
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        //  </div>
      )}
    </Layout>
  );
};

export default Home;
