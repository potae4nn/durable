"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDurable, searchDurable } from "@/service/serverService";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  session: any;
};

const Durable = ({ session }: Props) => {
  const [data, setData] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true); // Indicates if there are more items to load
  const [pageCurrent, setpageCurrent] = useState(1);
  const [sumpage, setSumpage] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const data = {
      user_id: session?.user?.users?.user_id,
      token: session?.user?.token,
    };
    try {
      setLoading(true);
      // API call to fetch data
      await getDurable(data, pageCurrent).then((res) => {
        setData((prevData: any) => [...prevData, ...res.data]);
        setSumpage(Math.ceil(Number(res.sum[0].sum) / 10));
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageCurrent]); // Fetch data on component mount

  // useEffect(() => {
  //   searchFilterFunction();
  // }, [search]); // Fetch data on component mount

  // async function searchFilterFunction() {
  //   // Check if searched text is not blank
  //   if (search) {
  //     // Inserted text is not blank
  //     // Filter the masterDataSource and update FilteredDataSource
  //     await searchDurable(
  //       session?.user?.users?.user_id,
  //       session?.user?.token,
  //       search
  //     )
  //       .then(async (value) => {
  //         if (value.data !== undefined) {
  //           // setData(await value.data);
  //           setData((prevData: any) => [prevData, ...value.data])
  //         }
  //       })
  //       .then(() => {
  //         // setFilteredDurable(durable);
  //       });
  //   } else {
  //     setData([]);
  //     setTimeout(() => {
  //       setpageCurrent(1);
  //       setSumpage(0);
  //     }, 2000);
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     // setFilteredDurable(durable);
  //     // setSearch(text);
  //   }
  // }

  const handleSearch = async () => {
    console.log(search);
  };

  const handleLoadMore = async () => {
    if (pageCurrent === sumpage) return;
    setTimeout(() => {
      setpageCurrent(pageCurrent + 1);
    }, 300);
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
    <> 
       {loading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md text-center"></span>
        </div>
      )}
      {data[0] && (
        <>
          <div className="flex sm:justify-end lg:justify-end mt-4 mr-4 ml-4 lg:w-1/3 sm:w-full">
            {/* <Paper sx={{ mr: 3, display: "flex", width: "100%" }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            onKeyUp={(e: any) => {
              setTimeout(() => {
                // searchFilterFunction(e.target.value);
                setSearch(e.target.value);
              }, 500);
            }}
            placeholder="ค้นหาครุภัณฑ์"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper> */}
            <div className="form-control w-full">
              <label className="input-group">
                <input
                  type="text"
                  onKeyUp={(e: any) => {
                    setTimeout(() => {
                      // searchFilterFunction(e.target.value);
                      setSearch(e.target.value);
                    }, 500);
                  }}
                  placeholder="ค้นหาครุภัณฑ์"
                  className="input input-bordered w-full"
                />
                <button
                  className="btn"
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  <SearchIcon />
                </button>
              </label>
            </div>
          </div>
          <InfiniteScroll
            dataLength={data.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={getLoader()}
          >
            <div className="grid p-4 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
              {data.map((item: any, index: number) => (
                <div key={index}>
                  {" "}
                  <Card item={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default Durable;
