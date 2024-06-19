import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDurable, searchDurable } from "@/service/serverService";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { CiSearch } from "react-icons/ci";

type Props = {
  session: any;
};

const Durable = ({}: Props) => {
  const { data: session, status }: any = useSession();
  const userId = session?.user?.users.user_id;
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true); // Indicates if there are more items to load
  const [dataSeach, setDataSeach] = useState<any>([]);
  const [pageCurrent, setpageCurrent] = useState(1);
  const [sumpage, setSumpage] = useState(0);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState(false);
  //   console.log(status);

  useEffect(() => {
    fetchData();
  }, [pageCurrent, session]); // Fetch data on component mount

  const fetchData = async () => {
    try {
      setLoading(true);
      // API call to fetch data
      console.log(userId);
      const res = await getDurable(userId, pageCurrent);
      setData((prevData: any) => [...prevData, ...res.data]);
      setSumpage(Math.ceil(Number(res.sum[0].sum) / 10));
      setLoading(false);

      //   await getDurable(userId, pageCurrent)
      //     .then((res) => {
      //       setData((prevData: any) => [...prevData, ...res.data]);
      //       setSumpage(Math.ceil(Number(res.sum[0].sum) / 10));
      //       setLoading(false);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (search !== undefined) {
      searchDurable(userId, search).then((res) => {
        if (res.data[0] !== undefined) {
          setDataSeach(res.data);
        } else {
          fetchData();
        }
      });
    } else {
      fetchData();
    }
  };

  const handleLoadMore = async () => {
    if (pageCurrent === sumpage) return 0;
    setTimeout(() => {
      setpageCurrent(pageCurrent + 1);
    }, 500);
  };

  const getLoader = () => {
    // function to generate more items
    return (
      <div className="container mx-auto">
        <div className="flex justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md text-center"></span>
        </div>
      )}
      {data[0] && (
        <>
          <div className="flex sm:justify-end lg:justify-end mt-4 mr-4 ml-4 lg:w-1/3 sm:w-full">
            <div className="form-control w-full">
              <label className="input-group">
                <input
                  type="text"
                  onKeyUp={(e: any) => {
                    if (e.target.value == "") {
                      setSearch(undefined);
                      location.reload();
                    } else {
                      setSearch(e.target.value);
                    }
                  }}
                  placeholder="ค้นหาครุภัณฑ์ ชื่อ/รหัส(เลขหน้า 9 หลัก)"
                  className="input input-bordered w-full"
                />
                <button
                  className="btn"
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  <CiSearch />
                </button>
              </label>
            </div>
          </div>
          {dataSeach[0] === undefined ? (
            <InfiniteScroll
              dataLength={data.length}
              next={handleLoadMore}
              hasMore={true}
              loader={getLoader()}
            >
              <div className="grid p-4 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
                {data?.map((item: any, index: number) => (
                  <div key={index}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="grid p-4 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
              {dataSeach?.map((item: any, index: number) => (
                <div key={index}>
                  <Card item={item} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Durable;
