import React, { useEffect, useState, useCallback } from "react";
import Card from "@/components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDurable, searchDurable } from "@/service/serverService";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { CiSearch } from "react-icons/ci";
import debounce from "lodash.debounce";

type Props = {
  session: any;
};

const Durable = ({}: Props) => {
  const { data: session, status }: any = useSession();
  const userId = session?.user?.users.user_id;
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [dataSearch, setDataSearch] = useState<any>([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [sumpage, setSumpage] = useState(0);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await getDurable(userId, pageCurrent);
      setData((prevData: any) => [...prevData, ...res.data]);
      setSumpage(Math.ceil(Number(res.sum[0].sum) / 10));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userId, pageCurrent]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = useCallback(
    debounce(async () => {
      if (!userId || search === undefined) return;
      try {
        const res = await searchDurable(userId, search);
        if (res.data[0] !== undefined) {
          setDataSearch(res.data);
        } else {
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    }, 500),
    [search, userId, fetchData]
  );

  const handleLoadMore = async () => {
    if (pageCurrent >= sumpage) {
      setHasMore(false);
      return;
    }
    setPageCurrent((prevPage) => prevPage + 1);
  };

  const getLoader = () => (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );

  return (
    <Layout>
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md text-center"></span>
        </div>
      )}
      <div className="z-40 w-full fixed bg-base-100 pb-4">
        <div className="flex sm:justify-end lg:justify-end mt-4 mr-4 ml-4 lg:w-1/3 sm:w-fit ">
          <div className="form-control w-full">
            <input
              type="text"
              onKeyUp={(e: any) => {
                const value = e.target.value;
                if (value === "") {
                  setSearch(undefined);
                  location.reload();
                } else {
                  setSearch(value);
                  handleSearch();
                }
              }}
              placeholder="ค้นหาครุภัณฑ์ ชื่อ/รหัส(เลขหน้า 9 หลัก)"
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      {data.length > 0 && (
        <>
          {dataSearch.length === 0 ? (
            <InfiniteScroll
              dataLength={data.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={getLoader()}
            >
              <div className="grid p-4 mt-16 mb-12 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
                {data.map((item: any, index: number) => (
                  <div key={index}>
                    <Card item={item} />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="grid p-4 mt-16 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
              {dataSearch.map((item: any, index: number) => (
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
