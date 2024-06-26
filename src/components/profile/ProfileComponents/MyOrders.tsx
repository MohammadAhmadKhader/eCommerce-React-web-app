import { useContext, useEffect, useState } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { ThemeContext } from '../../features/ThemeFeature/ThemeProvider';
import "./MyOrders.css"
import OrdersTable from './OrdersTable';
import { useSearchParams } from 'react-router-dom';
import useAxios from '../../../customHooks/useAxios';
import { UserContext } from '../../features/UserFeature/UserProvider';
import { GlobalCachingContext } from '../../features/GlobalCachingContext/GlobalCachingProvider';
import useEnsureCorrectPagination from '../../../customHooks/useEnsureCorrectPagination';

function MyOrders() {
    const { theme } = useContext(ThemeContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const { GET } = useAxios(true, 600000) // reCache every 10 mins
    const { userData, userToken } = useContext(UserContext);
    const { orders, setOrders } = useContext(GlobalCachingContext)
    const [count, setCount] = useState(0);
    const {ensureCorrectPagination} = useEnsureCorrectPagination()
    const getOrders = async (status: string, page: string, limit: string) => {
        try {
            if (userData) {
                const { data } = await GET(`/orders?status=${status}&page=${page}&limit=${limit}`, userToken);
                setCount(data.count)
                setOrders(data.orders);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const ensureCorrectValueOfStatus = () => {
        if (!searchParams.get("status")) {
            searchParams.set("status", "Placed");
            setSearchParams(searchParams)
        }
        if (searchParams.get("status") &&
            searchParams.get("status") != "Completed" &&
            searchParams.get("status") != "Placed" &&
            searchParams.get("status") != "Processing" &&
            searchParams.get("status") != "Cancelled") {
            searchParams.set("status", "Placed");
            setSearchParams(searchParams)
        }
    }

    useEffect(() => {
        ensureCorrectPagination()
        ensureCorrectValueOfStatus();
    }, [])

    useEffect(() => {
        getOrders(searchParams.get("status"), searchParams.get("page"), searchParams.get("limit"));
    }, [userData])
    useEffect(() => {
        ensureCorrectValueOfStatus();
        ensureCorrectPagination()
    }, [searchParams])

    return (
        <div className='overflow-x-scroll md:overflow-auto'>
            <Tabs className='MyOrders Tabs rounded-lg min-w-[700px] min-h-[500px]' aria-label="Orders tabs" defaultValue={searchParams.get("status") || "Completed"}
                onChange={(event, newValue) => {
                    searchParams.set("status", `${newValue}`);
                    searchParams.set("page", "1")
                    setSearchParams(searchParams);
                }}
                style={{
                    backgroundColor: "transparent",
                    color: theme === "dark" ? "var(--dark--text--color)" : "var(--light--text--color)",
                }}>
                <TabList sx={{
                    backgroundColor: "var(--secondary--tabs--color)",
                    borderRadius: "8px",
                    borderBottom: "0px !important"
                }}>
                    <Tab value='Placed'
                        sx={{
                            margin: "5px",
                            borderRadius: "8px",
                            transition: "400ms",
                        }} disableIndicator>Placed</Tab>
                    <Tab value='Processing'
                        sx={{
                            margin: "5px",
                            borderRadius: "8px",
                            transition: "400ms",
                        }} disableIndicator>Processing</Tab>
                    <Tab value='Completed'
                        sx={{
                            margin: "5px",
                            borderRadius: "8px",
                            transition: "400ms",
                        }} disableIndicator>Completed</Tab>

                    <Tab value='Cancelled'
                        sx={{
                            margin: "5px",
                            borderRadius: "8px",
                            transition: "400ms",
                        }} disableIndicator>Cancelled</Tab>
                </TabList>
                <TabPanel value={"Placed"} className='bg-transparent'>

                    <OrdersTable orders={orders} count={count} getOrders={getOrders} />
                </TabPanel>

                <TabPanel value={"Processing"} className='bg-transparent'>

                    <OrdersTable orders={orders} count={count} getOrders={getOrders} />
                </TabPanel>

                <TabPanel value={"Completed"} className='bg-transparent'>

                    <OrdersTable orders={orders} count={count} getOrders={getOrders} />
                </TabPanel>
                <TabPanel value={"Cancelled"} className='bg-transparent'>

                    <OrdersTable orders={orders} count={count} getOrders={getOrders} />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default MyOrders
