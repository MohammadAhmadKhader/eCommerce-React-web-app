import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../../features/ThemeFeature/ThemeProvider";
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../../customHooks/useDebounce";
import { WindowWidthContext } from "../../../features/WindowWidthFeature/WindowWidthProvider";
import { CssVarsProvider, ThemeProvider, extendTheme } from '@mui/joy/styles';

const PriceRangeFilter = () => {
    const { windowWidth } = useContext(WindowWidthContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const customTheme = extendTheme({
        components: {
            JoySlider: {
                styleOverrides: {
                    thumb: {
                        color: "var(--light--accent--color)"
                    },
                    track: {
                        backgroundColor: "var(--light--accent--color)"
                    },
                }
            }

        },
    });
      
    function valueText(value: number) {
        return `${value}$`;
    }
    const [value, setValue] = useState<number[]>([0, 300]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    useEffect(() => {
        console.log("value has been changed")
        searchParams.set("price_lte", value[1].toString())
        searchParams.set("price_gte", value[0].toString())
        setSearchParams(searchParams)
    }, [value])
    return (
        <div className="flex flex-col gap-y-4 my-5">

            <Box sx={{ maxWidth: windowWidth > 768 ? 350 : "auto", marginLeft: 1.5, marginRight: 2.5 }}>
                <ThemeProvider theme={customTheme}>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        value={value}
                        max={300}
                        min={0}

                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valueText}
                        marks={[
                            {
                                value: 0,
                                label: '0$',
                            },
                            {
                                value: 300,
                                label: '300$',
                            },
                        ]}

                    />
                </ThemeProvider>
            </Box>
        </div>
    )
}



export default PriceRangeFilter