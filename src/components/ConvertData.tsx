export const convertStatus = (status: any) => {
  let text: string;
  switch (status) {
    case "1":
      text = "ใช้งานได้";
      break;
    case "2":
      text = "ชำรุดรอการซ่อม";
      break;
    case "3":
      text = "ชำรุดรอจำหน่าย";
      break;
    case "4":
      text = "สูญหาย";
      break;
    default:
      text = "ยังไม่ได้สำรวจ";
      break;
  }
  return text;
};

export const convertStatusColor = (status: any) => {
  let color: string;
  switch (status) {
    case "1":
      color = "badge-success";
      break;
    case "2":
      color = "badge-secondary";
      break;
    case "3":
      color = "badge-warning";
      break;
    case "4":
      color = "badge-error";
      break;
    default:
      color = "";
      break;
  }
  return color;
};
