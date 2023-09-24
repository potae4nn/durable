"use client";
import React from "react";
import Link from "next/link";
import { Daum } from "@/model/durable";
import Image from "next/image";
import { convertStatus,convertStatusColor } from "@/app/template/ConvertData";

type Props = { item: Daum };

const Card = ({ item }: Props) => {
  return (
    <div>
      <div className="card card-side dark:bg-neutral-focus shadow-xl">
        <figure className="w-2/4">
          {item.image ? (
            <Image
              src={`https://shc.sut.ac.th/durableapi/image/durables/${item.image}`}
              alt={item.durable_id}
              width={200}
              height={200}
            />
          ) : (
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="800px"
              height="800px"
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
          <h2 className="card-title">{item.name}</h2>
          <p>
            รหัสครุภัณฑ์ : {item.durable_id} <br /> สถานที่เก็บ :{" "}
            {item.location} <br />
            หมายเหตุ : {item.remark}
          </p>
          สถานะ
          <div
            className={`badge badge-outline ${convertStatusColor(
              item.check_status
            )}`}
          >
            {convertStatus(item.check_status)}
          </div>
          <div className="card-actions justify-end">
            <Link href={`/durable/edit/${item.id}`}>
              <button className="btn btn-primary">รายละเอียด</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;