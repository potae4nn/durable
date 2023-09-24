export interface Durable {
    status: Status
    data: Daum[]
    total: Total[]
    sum: Sum[]
  }
  
  export interface Status {
    code: number
    message: string
  }
  
  export interface Daum {
    id: number
    name: string
    location: string
    durable_id: string
    price: number
    fiscal_year: string
    remark: any
    check_status: any
    image: string
  }
  
  export interface Total {
    price_total: number
  }
  
  export interface Sum {
    sum: number
  }
  