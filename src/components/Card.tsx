import React from "react";
import Link from "next/link";
import { Daum } from "@/model/durable";
import Image from "next/image";
import { convertStatus, convertStatusColor } from "./ConvertData";
import { SlPicture } from "react-icons/sl";

type Props = { item: Daum };

const Card = ({ item }: Props) => {
  return (
    // <div>
    <div className="card card-side dark:bg-neutral-focus shadow-xl">
      <div className="w-[30%] p-4">
        {item.image ? (
          <Link href={`/durable/edit/${item.id}`}>
            <Image
              className="rounded-2xl"
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/durables/${item.image}`}
              alt={item.durable_id}
              width={150}
              height={150}
            />
          </Link>
        ) : (
          <Link href={`/durable/edit/${item.id}`}>
            <SlPicture size={'100%'}/>
          </Link>
        )}
      </div>
      <div className="w-[70%] p-3">
        <h2 className="lg:card-title sm:text-md">{item.name}</h2>
        <p className="lg:text-base text-xs">
          รหัสครุภัณฑ์ : {item.durable_id} <br /> สถานที่เก็บ : {item.location}{" "}
          <br />
          หมายเหตุ : {item.remark}
        </p>
        <p className="lg:text-base text-xs">
          สถานะ :
          <div
            className={`badge badge-outline ml-2 ${convertStatusColor(
              item.check_status
            )}`}
          >
            {convertStatus(item.check_status)}
          </div>
        </p>

        <div className="card-actions justify-end mt-4">
          <Link href={`/durable/edit/${item.id}`}>
            <button className="btn btn-primary btn-sm">รายละเอียด</button>
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Card;
