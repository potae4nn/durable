"use client";
import { Daum } from "@/model/durable";
import {
  getDurableByid,
  setCheckDurable,
  updateCheckDurable,
} from "@/service/serverService";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { convertStatus, convertStatusColor } from "@/app/template/ConvertData";

type Props = {
  id: string;
  session: any;
};

const Card = ({ id, session }: Props) => {
  const [item, setItem] = React.useState<Daum[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    await getDurableByid(id, session?.user?.token)
      .then((res) => {
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async (status: number) => {
    const data = {
      id: id,
      check_status: status,
      token: session.user.token,
    };
    if (item[0].check_status !== null) {
      const res = await updateCheckDurable(data);
      if (res.status.code === 200) {
        alert("แก้ไขสำเร็จ");
        router.push("/durable");
      }
    } else {
      const res = await setCheckDurable(data);
      if (res.status.code === 200) {
        alert("เพิ่ม status สำเร็จ");
        router.push("/durable");
      }
    }
  };

  return (
    <div>
      {" "}
      <div className="container mx-auto mt-4 sm:card sm:w-96 bg-base-100 mb-20 lg:card lg:w-full lg:card-side shadow-xl">
        <figure className="lg:w-2/6 relative">
          {/* <img
          src={`http://shc.sut.ac.th/durableapi/image/durables/${item[0]?.image}`}
          alt="Shoes"
        /> */}

          <div className="absolute sm:bottom-3 sm:right-3 lg:top-3 lg:-right-3">
            <button className="btn glass btn-sm text-white">
              เปลี่ยน/เพิ่ม รูปภาพ
            </button>
          </div>

          {item[0]?.image ? (
            <Image
              src={`https://shc.sut.ac.th/durableapi/image/durables/${item[0]?.image}`}
              alt={item[0]?.durable_id}
              width={500}
              height={500}
            />
          ) : (
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="100%"
              height="100%"
              viewBox="0 0 32 32"
              xmlSpace="preserve"
            >
              <g>
                <path
                  fill="#828290"
                  d="M1.5,32h29c0.827,0,1.5-0.673,1.5-1.5v-29C32,0.673,31.327,0,30.5,0h-29C0.673,0,0,0.673,0,1.5v29
  C0,31.327,0.673,32,1.5,32z M1,1.5C1,1.224,1.225,1,1.5,1h29C30.775,1,31,1.224,31,1.5v29c0,0.276-0.225,0.5-0.5,0.5h-29
  C1.225,31,1,30.776,1,30.5V1.5z"
                />
                <path
                  fill="#828290"
                  d="M20.5,12.5c1.103,0,2-0.897,2-2s-0.897-2-2-2s-2,0.897-2,2S19.397,12.5,20.5,12.5z M20.5,9.5
  c0.552,0,1,0.449,1,1s-0.448,1-1,1s-1-0.449-1-1S19.948,9.5,20.5,9.5z"
                />
                <path
                  fill="#828290"
                  d="M4.5,25h23c0.276,0,0.5-0.224,0.5-0.5v-20C28,4.224,27.776,4,27.5,4h-23C4.224,4,4,4.224,4,4.5v20
  C4,24.776,4.224,25,4.5,25z M5,24v-5.638c0.022-0.016,0.047-0.025,0.067-0.045l5.116-5.116c0.26-0.26,0.712-0.259,0.972,0
  l7.521,7.521c0.098,0.098,0.226,0.146,0.354,0.146c0.124,0,0.248-0.046,0.345-0.138l3.866-3.672c0.13-0.13,0.303-0.202,0.486-0.202
  c0.184,0,0.355,0.072,0.471,0.187l2.802,3.052c0,0,0.001,0,0.001,0.001V24H5z M27,5v13.618l-2.081-2.266
  c-0.317-0.319-0.741-0.495-1.191-0.495c-0.001,0-0.001,0-0.001,0c-0.451,0-0.875,0.176-1.185,0.486l-3.504,3.328l-7.176-7.177
  c-0.639-0.638-1.749-0.637-2.386,0L5,16.971V5H27z"
                />
              </g>
            </svg>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item[0]?.name}</h2>
          <div>
            รหัสครุภัณฑ์ : {item[0]?.durable_id} <br /> สถานที่เก็บ :{" "}
            {item[0]?.location} <br />
            ราคา: {item[0]?.price} บาท <br />
            ปีงบประมาณ: {item[0]?.fiscal_year}
            <br />
            หมายเหตุ : {item[0]?.remark}
            <br />
            สถานะครุภัณฑ์ :{" "}
            {item[0]?.check_status == null ? (
              "ยังไม่ได้สำรวจ"
            ) : (
              <p
                className={`badge badge-outline ${convertStatusColor(
                  item[0]?.check_status
                )}`}
              >
                {convertStatus(item[0]?.check_status)}
              </p>
            )}
            <br />
          </div>
          <p></p>
          <div className="card-actions">
            <button
              className="btn btn-outline btn-success"
              onClick={() => {
                handleUpdate(1);
              }}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1.5em"
                width="1.5em"
              >
                <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
                <path d="M10.97 4.97a.235.235 0 00-.02.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-1.071-1.05z" />
              </svg>
              ใช้งานได้
            </button>
            <button
              className="btn btn-outline btn-secondary"
              onClick={() => {
                handleUpdate(2);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1.5em"
                width="1.5em"
              >
                <path d="M21.71 20.29l-1.42 1.42a1 1 0 01-1.41 0L7 9.85A3.81 3.81 0 016 10a4 4 0 01-3.78-5.3l2.54 2.54.53-.53 1.42-1.42.53-.53L4.7 2.22A4 4 0 0110 6a3.81 3.81 0 01-.15 1l11.86 11.88a1 1 0 010 1.41M2.29 18.88a1 1 0 000 1.41l1.42 1.42a1 1 0 001.41 0l5.47-5.46-2.83-2.83M20 2l-4 2v2l-2.17 2.17 2 2L18 8h2l2-4z" />
              </svg>
              ชำรุดรอการซ่อม
            </button>
            <button
              className="btn btn-outline btn-warning"
              onClick={() => {
                handleUpdate(3);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1.5em"
                width="1.5em"
              >
                <path d="M19.148 2.971A2.008 2.008 0 0017.434 2H6.566c-.698 0-1.355.372-1.714.971L2.143 7.485A.995.995 0 002 8a3.97 3.97 0 001 2.618V19c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-8.382A3.97 3.97 0 0022 8a.995.995 0 00-.143-.515l-2.709-4.514zm.836 5.28A2.003 2.003 0 0118 10c-1.103 0-2-.897-2-2 0-.068-.025-.128-.039-.192l.02-.004L15.22 4h2.214l2.55 4.251zM10.819 4h2.361l.813 4.065C13.958 9.137 13.08 10 12 10s-1.958-.863-1.993-1.935L10.819 4zM6.566 4H8.78l-.76 3.804.02.004C8.025 7.872 8 7.932 8 8c0 1.103-.897 2-2 2a2.003 2.003 0 01-1.984-1.749L6.566 4zM10 19v-3h4v3h-4zm6 0v-3c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H5v-7.142c.321.083.652.142 1 .142a3.99 3.99 0 003-1.357c.733.832 1.807 1.357 3 1.357s2.267-.525 3-1.357A3.99 3.99 0 0018 12c.348 0 .679-.059 1-.142V19h-3z" />
              </svg>
              ชำรุดรอจำหน่าย
            </button>
            <button
              className="btn btn-outline btn-error"
              onClick={() => {
                handleUpdate(4);
              }}
            >
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1.5em"
                width="1.5em"
              >
                <path d="M464 720a48 48 0 1096 0 48 48 0 10-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z" />
              </svg>
              สูญหาย
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
