import { useContext } from 'react'
import { ThemeContext } from '../../../features/ThemeFeature/ThemeProvider';
import SingleOrder from './SingleOrder';
import { GlobalCachingContext } from '../../../features/GlobalCachingContext/GlobalCachingProvider';
import CircularLoader from '../../../shared/CircularLoader';

function SingleOrderDetails() {
    const { theme } = useContext(ThemeContext);
    const { singleOrderDetails, isSingleOrderDetailsLoading } = useContext(GlobalCachingContext);
    return (
        <div>
            <div>
                <div className='border-b my-2' style={{
                    borderColor: theme == "dark" ? "var(--dark--border--color)" : "var(--light--border--color)",
                }}>
                    <h4 className='text-xl py-2'>
                        Product Name
                    </h4>
                </div>
            </div>
            <div className='flex flex-col gap-y-2'>
                {!isSingleOrderDetailsLoading && singleOrderDetails?.orderItems?.length > 0 ?
                    singleOrderDetails?.orderItems.map((orderItem) => {
                        
                        return (
                            <SingleOrder imgUrl={orderItem.thumbnailUrl} price={orderItem.price}
                                name={orderItem.name} quantity={orderItem.quantity} key={orderItem._id} />
                        )
                    })
                    : <CircularLoader minHeight={"250px"} />
                }
            </div>
        </div>
    )
}

export default SingleOrderDetails